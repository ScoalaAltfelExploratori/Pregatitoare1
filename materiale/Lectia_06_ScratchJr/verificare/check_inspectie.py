"""Validate recorded browser trajectories and the exact distributed SJR bytes."""
from pathlib import Path
import json,re,hashlib,zipfile,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
m=json.loads((R/'inspectie.json').read_text(encoding='utf-8'))
e=json.loads((R/'capturi_inspectie/observatii-browser.json').read_text(encoding='utf-8'))
runs=e['runs'];hashes={p['key']:p['sha256'] for p in e['testedProjects']}
def xy(s):return tuple(map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',s['transform']).groups()))
def path(key,actor='p1_robot'):return [xy(next(s for s in row['sprites'] if s['id']==actor)) for row in runs[key]]
for p in m['projects']:
    raw=(R/'solutii_inspectie'/p['file']).read_bytes()
    assert hashlib.sha256(raw).hexdigest()==p['sha256']==hashes[p['key']],p['key']
    with zipfile.ZipFile(R/'solutii_inspectie'/p['file']) as z:
        d=json.loads(z.read('project/data.json'));page=d['json'][d['json']['pages'][0]]
        assert len(page['sprites'])==4
        if p['key']=='start':assert all(not page[s]['scripts'] for s in page['sprites'])
        for name in z.namelist():
            if name.endswith('.svg'):
                svg=z.read(name);assert b'<script' not in svg
                for node in ET.fromstring(svg).iter():
                    for k,v in node.attrib.items():
                        if k.endswith('href'):assert v.startswith('data:image/png;base64,'),(name,v[:80])
        for a in p['pages'][0]['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        assert 'project/backgrounds/'+p['pages'][0]['background'] in z.namelist()
        for a in p['pages'][0]['sprites']:
            for s in a['scripts']:
                for b in [s['trigger']]+s['actions']:
                    assert b['block'] in {'onflag','ontouch','onmessage','message','forward','back','up','down','stopmine','say','setspeed','playsnd'}
assert all(x==(12,249) for x in path('start'))
assert path('m1')[-1]==(108,249)
assert path('m1_bariera_mutata')[-1]==(60,249)
assert max(x for x,y in path('m1'))-max(x for x,y in path('m1_bariera_mutata'))==48
assert path('m2')[-1]==(252,249)
summaries={}
for key in runs:
    points=path(key);xs,ys=zip(*points)
    excursions=sum(y<225 and (i==0 or points[i-1][1]>=225) for i,(x,y) in enumerate(points))
    if key in ('m2','m3','m3_reset','m3_redeschis','creatie','r1'):assert excursions==1,(key,excursions)
    if key=='r2':assert excursions==2
    if key.startswith('m3') or key in ('creatie','r2'):assert points[-1]==(316,249),key
    if key=='r1':assert 315<=points[-1][0]<=330 and points[-1][1]==249
    if key in ('m2','m3','m3_reset','m3_redeschis','r1','r2','creatie'):assert min(ys)==153,key
    assert len(set(points[-12:]))==1,(key,'did not stay parked')
    assert runs[key][-1]['go']=='go on',key
    for actor in ['p1_bariera','p1_bariera2','p1_statie']:assert len(set(path(key,actor)))==1,(key,actor)
    final=points[-1];arrival=next(i for i in range(len(points)) if all(p==final for p in points[i:]))
    summaries[key]={'samples':len(points),'detours':excursions,'min_y':min(ys),'final_translation':final,'movement_ms':runs[key][arrival]['t']-runs[key][0]['t']}
assert summaries['r1']['movement_ms']<summaries['m3']['movement_ms']*.8
(R/'verificare/inspectie-rezultate.json').write_text(json.dumps(summaries,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('PASS: seven exact SJR packages; ten recorded runs; brake, moved barrier, detours, station stop, reset/reopen, speed, two barriers, blank starter.')

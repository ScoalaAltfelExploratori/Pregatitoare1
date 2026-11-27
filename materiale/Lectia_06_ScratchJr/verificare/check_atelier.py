"""Check exact exported bytes and the recorded native-browser runs, without simulating ScratchJr."""
from pathlib import Path
import json, hashlib, zipfile, re, xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
manifest=json.loads((R/'atelier.json').read_text(encoding='utf-8'))
evidence=json.loads((R/'capturi_atelier/observatii-browser.json').read_text(encoding='utf-8'))
runs=evidence['runs'];hashes={p['key']:p['sha256'] for p in evidence['testedProjects']}
def actor(row,id):return next(a for a in row['sprites'] if a['id']==id)
def pos(row,id):return tuple(map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',actor(row,id)['transform']).groups()))
def visible_page(row):return next(p['id'] for p in row['pages'] if p['visibility']=='visible')
def clean(rows,prefix):return all(actor(rows[-1],f'{prefix}_rest{i}')['opacity']=='0' for i in range(1,4))
def stable(rows,ids):
    for id in ids:assert len({pos(row,id) for row in rows[-15:]})==1,(id,'not stable')
def charging(rows):
    lit=[next(i for i,row in enumerate(rows) if actor(row,f'p1_segment{k}')['opacity']=='1') for k in (1,2,3)]
    assert lit[0]<lit[1]<lit[2],lit
    dock=next(i for i,row in enumerate(rows) if pos(row,'p1_robot')==(108,201))
    leaving=next(i for i in range(dock+1,len(rows)) if pos(rows[i],'p1_robot')[0]<108)
    assert leaving>lit[2],('left before charging',leaving,lit)
    gaps=[rows[lit[i+1]]['t']-rows[lit[i]]['t'] for i in (0,1)]
    assert all(750<g<1400 for g in gaps),gaps
    return gaps
def door(rows,prefix):
    rising=[r for r in rows if visible_page(r)==prefix.replace('p','page') and 81<pos(r,prefix+'_usa')[1]<201]
    assert rising,(prefix,'no door motion observed')
    assert all(pos(r,prefix+'_robot')==(252,249) for r in rising),'Robot moved before door finished'
    assert pos(rows[-1],prefix+'_usa')==(371,81)
    assert pos(rows[-1],prefix+'_robot')==(372,249)
summary={}
for p in manifest['projects']:
    raw=(R/'solutii_atelier'/p['file']).read_bytes()
    assert hashlib.sha256(raw).hexdigest()==p['sha256']==hashes[p['key']]
    with zipfile.ZipFile(R/'solutii_atelier'/p['file']) as z:
        assert z.testzip() is None
        d=json.loads(z.read('project/data.json'))
        for pg in d['json']['pages']:
            page=d['json'][pg]
            if p['key']=='start':assert all(not page[s]['scripts'] for s in page['sprites'])
        for page in p['pages']:
            assert 'project/backgrounds/'+page['background'] in z.namelist()
            for a in page['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        for file in z.namelist():
            if file.endswith('.svg'):
                svg=z.read(file);assert b'<script' not in svg
                for element in ET.fromstring(svg).iter():
                    for key,value in element.attrib.items():
                        if key.endswith('href'):assert value.startswith('data:image/png;base64,')
for key,rows in runs.items():
    assert rows[-1]['go']=='go on',(key,'still running')
    if key in ('m1','m4','m4_reset','m4_redeschis','creatie','r1','r2'):
        gaps=charging(rows)
        if key!='m1':
            first2=next(i for i,r in enumerate(rows) if visible_page(r)=='page2')
            assert all(actor(rows[first2],f'p1_segment{k}')['opacity']=='1' for k in (1,2,3))
    if key in ('m4','m4_reset','m4_redeschis','creatie','r1','r2'):
        assert clean(rows,'p2');door(rows,'p2');stable(rows,['p2_robot','p2_usa'])
    if key=='m3':assert clean(rows,'p1');door(rows,'p1');stable(rows,['p1_robot','p1_usa'])
    if key=='m2':assert clean(rows,'p1') and pos(rows[-1],'p1_robot')==(204,249)
    if key=='m2_rest_mutat':
        assert actor(rows[-1],'p1_rest1')['opacity']=='1'
        assert all(actor(rows[-1],f'p1_rest{i}')['opacity']=='0' for i in (2,3))
    if key=='m1':assert pos(rows[-1],'p1_robot')==(12,201)
    if key.startswith('start_'):
        for a in rows[0]['sprites']:
            assert len({(pos(r,a['id']),actor(r,a['id'])['opacity']) for r in rows})==1
    if key.startswith('r2_stop_'):
        stable(rows,['p2_robot','p2_usa']);assert pos(rows[-1],'p2_robot')!=(372,249)
        if key=='r2_stop_usa':assert 81<pos(rows[-1],'p2_usa')[1]<201
        else:assert pos(rows[-1],'p2_usa')==(371,201)
    prefix='p2' if len(rows[-1]['pages'])==2 else 'p1'
    summary[key]={'samples':len(rows),'final_page':visible_page(rows[-1]),'robot':pos(rows[-1],prefix+'_robot'),'stopped':True}
for key in ('m4','r1'):
    rows=[r for r in runs[key] if visible_page(r)=='page2'];pts=[(12,249)]+[pos(r,'p2_robot') for r in rows]
    distance=sum(abs(x2-x1)+abs(y2-y1) for (x1,y1),(x2,y2) in zip(pts,pts[1:]))/24
    assert distance=={'m4':23,'r1':21}[key],(key,distance)
    summary[key]['workshop_steps']=distance
(R/'verificare/atelier-rezultate.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'PASS: eight exact packages; {len(runs)} browser runs; charge order, contact-only collection, door waiting, shorter route, emergency stops, reset/reopen, blank starter.')

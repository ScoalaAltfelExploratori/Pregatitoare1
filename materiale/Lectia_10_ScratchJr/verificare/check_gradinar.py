"""Check exported files and recorded DOM observations from the real browser app."""
from pathlib import Path
from collections import defaultdict
import json,hashlib,zipfile,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'gradinar.json').read_text(encoding='utf-8'))
T=json.loads((R/'verificare/tested-projects.json').read_text(encoding='utf-8'))
D=defaultdict(list)
for line in (R/'verificare/run-log.jsonl').read_text().splitlines():
    e=json.loads(line);D[e['label']]+=e['frames']
hashes={p['key']:p['sha256'] for p in T['projects']}
for p in M['projects']:
    file=R/'solutii_gradinar'/p['file']
    assert hashlib.sha256(file.read_bytes()).hexdigest()==p['sha256']==hashes[p['key']]
    with zipfile.ZipFile(file) as z:
        assert z.testzip() is None
        data=json.loads(z.read('project/data.json'));page=data['json']['page1']
        assert len(page['sprites'])==13 and len(data['json']['pages'])==1
        if p['key']=='start':assert all(not page[id]['scripts'] for id in page['sprites'])
        for a in p['pages'][0]['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        assert 'project/backgrounds/'+p['pages'][0]['background'] in z.namelist()
        for name in z.namelist():
            if not name.endswith('.svg'):continue
            for el in ET.fromstring(z.read(name)).iter():
                for k,v in el.attrib.items():
                    if k.endswith('href'):assert v.startswith('data:image/png;base64,')
def pos(a):return a['x'],a['y']
orders={};gauge={};observed=0
for key,expected,expectedg in [('m1',['jeta','jeta'],[3,2,1]),('m2',['jeta','jeta','umplere'],[3,2,1,3]),('m3',['jeta','jeta','umplere','jetb','jetb'],[3,2,1,3,2,1]),('r1',['jeta','jeta','jetb','jetb'],[4,3,2,1,0]),('r2',['jeta','jetb','jeta','umplere','jetb'],[3,2,1,0,3,2])]:
    frames=D['v12-'+key];last=frames[-1]['a'];assert pos(last['robot'])==(96,204)
    assert all(last[id]['opacity']==0 for id in ('jeta','jetb','umplere'))
    assert last['viea']['opacity']==1
    assert last['vieb']['opacity']==(1 if key in ('m3','r1','r2') else 0)
    order=[];prev={id:0 for id in ['jeta','jetb','umplere']};gs=[];counts={'jeta':0,'jetb':0}
    for f in frames:
        a=f['a'];g=(a['indicator']['x']-192)/24
        if abs(g-round(g))<.001 and (not gs or gs[-1]!=round(g)):gs.append(round(g))
        for id in prev:
            if a[id]['opacity']>.5 and prev[id]<=.5:
                order.append(id)
                if id in counts:counts[id]+=1
            prev[id]=a[id]['opacity']
            if a[id]['opacity']>0:
                assert pos(a['robot'])=={'jeta':(240,108),'jetb':(240,252),'umplere':(96,204)}[id],(key,id,'water while moving')
                assert 'scale(1, 1)' in a['robot']['transform'],(key,id,'wrong nozzle orientation')
                observed+=1
        if a['viea']['opacity']>0:assert counts['jeta']==2,(key,'A bloomed early')
        if a['vieb']['opacity']>0:assert counts['jetb']==2,(key,'B bloomed early')
    assert order==expected,(key,order)
    assert gs==expectedg,(key,gs)
    orders[key]=order;gauge[key]=gs
for label in ('m3-restarted','m3-reopened','v12-m3-restarted'):
    a=D[label][-1]['a'];assert pos(a['robot'])==(96,204) and a['indicator']['x']==216
    assert a['viea']['opacity']==a['vieb']['opacity']==1
assert all(f['a']==D['v12-m3-stopped'][0]['a'] for f in D['v12-m3-stopped'])
assert D['v12-start-before'][-1]['a']==D['v12-start-flag'][-1]['a']
assert {p['key'] for p in T['reopened']}==set(hashes)
summary={'result':'PASS','packages':6,'rendered_frames':sum(len(v) for v in D.values()),'stationary_watering_samples':observed,'observed_orders':orders,'observed_gauge_values':gauge,'checked':['import/reopen all six native projects','blank starter','two visible portions per plant','water only at correct stationary position','refill before gauge reset','bloom only after second portion','capacity 4 without refill','two passes with zero remaining before refill','Stop/Flag replay','M3 replay after saving and reopening'],'scope':'ScratchJr Desktop Reborn in browser; physical Lenovo not tested.'}
(R/'verificare/gradinar-rezultate.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(summary,ensure_ascii=False,indent=2))

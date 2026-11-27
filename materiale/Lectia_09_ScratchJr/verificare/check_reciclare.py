"""Verify exported packages and observations of the actual browser app, not a simulator."""
from pathlib import Path
from collections import defaultdict
import hashlib,json,zipfile,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'reciclare.json').read_text(encoding='utf-8'))
T=json.loads((R/'verificare/tested-projects.json').read_text(encoding='utf-8'))
E=[json.loads(x) for x in (R/'verificare/browser-observations.jsonl').read_text(encoding='utf-8').splitlines()]
D=defaultdict(list)
for e in E:D[e['label']].extend(e['frames'])
def last(label):return D[label][-1]['a']
def pos(a):return a['x'],a['y']
def visible(a):return a['opacity']==1
hashes={p['key']:p['sha256'] for p in T['projects']}
for p in M['projects']:
    path=R/'solutii_reciclare'/p['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==p['sha256']==hashes[p['key']]
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        data=json.loads(z.read('project/data.json'));page=data['json']['page1']
        assert len(data['json']['pages'])==1 and len(page['sprites'])==13
        if p['key']=='start':assert all(not page[k]['scripts'] for k in page['sprites'])
        assert 'project/backgrounds/'+p['pages'][0]['background'] in z.namelist()
        for a in p['pages'][0]['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        for name in z.namelist():
            if name.endswith('.svg'):
                raw=z.read(name);assert b'<script' not in raw
                for el in ET.fromstring(raw).iter():
                    for k,v in el.attrib.items():
                        if k.endswith('href'):assert v.startswith('data:image/png;base64,')
targets={'sticla1':(72,260),'doza':(240,260),'hartie':(384,260),'sticla2':(120,260)}
for key,ids in [('m1',['sticla1']),('m2',['sticla1','doza','hartie']),('m3',list(targets)),('r1',list(targets))]:
    a=last(key+'-run');assert pos(a['robot'])==(240,92)
    for id in targets:
        assert visible(a[id])==(id in ids),(key,id)
        if id in ids:assert pos(a[id])==targets[id],(key,id,a[id])
for label in ['m3-reopened-final']:
    a=last(label);assert pos(a['robot'])==(240,92)
    assert all(visible(a[k]) and pos(a[k])==v for k,v in targets.items())
# Every sampled transport frame before the separate final drop keeps the claw offset.
coupled=0
for e in E:
    for f in e['frames']:
        a=f['a'];robot=a['robot']
        for id in targets:
            item=a[id]
            if visible(item) and item['y']<236 and (item['x']!=240 or item['y']>164):
                assert (item['x']-robot['x'],item['y']-robot['y'])==(0,72),(e['label'],id)
                coupled+=1
# A newly dispatched object appears only while the robot is at the loading point.
orders={}
for key,label in [('m1','m1-run'),('m2','m2-run'),('m3','m3-run'),('r1','r1-run'),('r2','r2-first-lot')]:
    seen=set();order=[]
    for f in D[label]:
        for id in targets:
            if visible(f['a'][id]) and id not in seen:
                assert pos(f['a']['robot'])==(240,92),(key,id,'next item too early')
                seen.add(id);order.append(id)
    orders[key]=order
assert orders['m1']==['sticla1']
assert orders['m2']==['sticla1','doza','hartie']
assert orders['m3']==orders['r1']==['sticla1','hartie','doza','sticla2']
assert orders['r2']==['sticla1','hartie','doza']
paper=[f['a']['hartie'] for f in D['r1-run'] if visible(f['a']['hartie'])]
assert max(a['scale'] for a in paper)==2 and paper[-1]['scale']==1
assert all(a['scale']==1 for a in paper if a['x']!=240 or a['y']>164)
for label in ['r2-waiting','r2-reopened-first']:
    a=last(label);assert pos(a['robot'])==(240,92) and visible(a['golire']) and not visible(a['sticla2'])
    assert all(visible(a[k]) and pos(a[k])==targets[k] for k in ['sticla1','doza','hartie'])
assert all(f['a']==D['r2-waiting'][0]['a'] for f in D['r2-waiting'])
for label in ['r2-final-stable','r2-reopened-second']:
    a=last(label);assert pos(a['robot'])==(240,92)
    assert visible(a['sticla2']) and pos(a['sticla2'])==targets['sticla2']
    assert all(not visible(a[k]) for k in ['sticla1','doza','hartie','golire'])
for label in ['r2-clearing','r2-second-lot-hidden-click']:
    for f in D[label]:
        if visible(f['a']['sticla2']):assert all(not visible(f['a'][k]) for k in ['sticla1','doza','hartie','golire'])
for f in D['r2-hidden-before']:
    assert pos(f['a']['robot'])==(240,92) and not visible(f['a']['golire'])
for label in ['start-before','start-after-flag','start-hidden-button','start-reopened']:
    for f in D[label]:
        assert pos(f['a']['robot'])==(240,92) and visible(f['a']['sticla1'])
        assert all(not visible(f['a'][k]) for k in ['doza','hartie','sticla2','golire'])
assert all(f['a']==D['m3-stopped'][0]['a'] for f in D['m3-stopped'])
assert set(T['reopened'])==set(hashes)
summary={'result':'PASS','packages':6,'observations':len(E),'rendered_frames':sum(len(e['frames']) for e in E),'coupled_transport_samples':coupled,'max_cargo_offset_error_px':0,'observed_orders':orders,'checked':['native import and reopen','blank starter','one / three / four items','synchronized transport','distinct bottle positions','empty robot return','stop and restart','paper compaction before dispatch','stable pause','clear bins before next item','hidden button ignored','M3 and R2 replay after reopen'],'scope':'ScratchJr Desktop Reborn in browser; physical Lenovo not tested.'}
(R/'verificare/reciclare-rezultate.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))

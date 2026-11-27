"""Check exact packages and recorded rendered DOM; does not simulate ScratchJr."""
from pathlib import Path
import hashlib,json,re,statistics,zipfile,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'submarin.json').read_text(encoding='utf-8'))
T=json.loads((R/'verificare/tested-projects.json').read_text(encoding='utf-8'))
E=[json.loads(x) for x in (R/'verificare/browser-observations.jsonl').read_text(encoding='utf-8').splitlines()]
D={x['label']:x['frames'] for x in E};hashes={p['key']:p['sha256'] for p in T['projects']}
def pos(r,k):return tuple(map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',r['actors'][k]['transform']).groups()))
def shown(r,k):return float(r['actors'][k]['opacity'])==1
def last(label):return D[label][-1]
for p in M['projects']:
    raw=(R/'solutii_submarin'/p['file']).read_bytes();assert hashlib.sha256(raw).hexdigest()==p['sha256']==hashes[p['key']]
    with zipfile.ZipFile(R/'solutii_submarin'/p['file']) as z:
        assert z.testzip() is None;data=json.loads(z.read('project/data.json'));assert len(data['json']['pages'])==1
        page=data['json']['page1'];assert len(page['sprites'])==12
        if p['key']=='start':assert all(not page[k]['scripts'] for k in page['sprites'])
        assert 'project/backgrounds/'+p['pages'][0]['background'] in z.namelist()
        for a in p['pages'][0]['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        for name in z.namelist():
            if name.endswith('.svg'):
                raw=z.read(name);assert b'<script' not in raw
                for e in ET.fromstring(raw).iter():
                    for k,v in e.attrib.items():
                        if k.endswith('href'):assert v.startswith('data:image/png;base64,')
assert pos(last('m1:right'),'robot')==(88,18)
assert pos(last('m1:down'),'robot')==(88,42)
assert pos(last('m1:left'),'robot')==(40,42)
assert pos(last('m1:up'),'robot')==(40,18)
assert shown(last('m1:up'),'sol') and not shown(last('m1:up'),'transport')
for key in ['m2','m3','creatie','r1','r2']:
    r=last(key+':pickup-ready');x=304 if key=='creatie' else 280
    assert pos(r,'robot')==(x,138) and pos(r,'transport')==(x+36,210)
    assert not shown(r,'sol') and shown(r,'transport') and not shown(r,'livrata')
    assert shown(r,'depune')==(key in ('m3','creatie','r1'))
for e in E:
    if e['label'].split(':')[0] not in ('start','m1'):
        for r in e['frames']:
            a,b=pos(r,'robot'),pos(r,'transport')
            assert (b[0]-a[0],b[1]-a[1])==(36,72),(e['label'],'cargo separated')
for key in ['m3','creatie','r1']:
    r=last(key+':deposited');assert pos(r,'robot')==(40,18)
    assert not shown(r,'transport') and shown(r,'livrata') and pos(r,'livrata')==(76,90)
    label=key+(':empty-speed' if key=='r1' else ':empty-move')
    r=last(label);assert pos(r,'robot')[0]>40 and pos(r,'livrata')==(76,90) and shown(r,'livrata')
for key in ['m2','m3','r1','r2']:
    r=last(key+':reset');assert pos(r,'robot')==(40,18) and pos(r,'transport')==(76,90)
    assert shown(r,'sol') and not shown(r,'transport') and not shown(r,'livrata')
for direction in ['right','left','up','down']:assert 'm3:loaded-'+direction in D
assert shown(last('m3:second-deposited'),'livrata')
assert pos(last('r2:hidden-right-ignored'),'robot')==(280,138)
for e in E:
    if e['label'].startswith('r2:auto-') or e['label']=='r2:hidden-left-during-auto':
        for r in e['frames']:
            if not shown(r,'livrata'):
                assert all(not shown(r,k) for k in ('stanga','dreapta','sus','jos'))
r=last('r2:auto-complete');assert pos(r,'robot')==(40,18) and shown(r,'livrata') and not shown(r,'transport')
assert all(shown(r,k) for k in ('stanga','dreapta','sus','jos'))
assert pos(last('r2:hidden-auto-ignored'),'robot')==(40,18)
assert pos(last('r2:empty-manual-restored'),'robot')==(88,18)
def speed(label):
    rr=D[label];v=[abs(pos(b,'robot')[0]-pos(a,'robot')[0])/(b['t']-a['t']) for a,b in zip(rr,rr[1:]) if pos(a,'robot')!=pos(b,'robot')]
    return statistics.median(v)
speeds={k:speed('r1:'+k) for k in ['right1','left1','empty-speed']}
assert speeds['right1']>speeds['left1']*1.5 and speeds['empty-speed']>speeds['left1']*1.5
for label in ['start:imported','start:no-programs','start:reopened-no-programs']:
    assert pos(last(label),'robot')==(40,18) and shown(last(label),'sol')
summary={'result':'PASS','packages':7,'observations':len(E),'rendered_frames':sum(len(e['frames']) for e in E),'max_cargo_offset_error_px':0,'r1_speed_px_per_ms':speeds,'checked':['four directions','contact pickup','synchronized cargo','manual deposit','empty departure','reset','M3 replay','precision variant','loaded slow / empty normal','automatic return','hidden controls ignored','reopen blank starter'],'scope':'Browser port; physical Lenovo not tested.'}
(R/'verificare/submarin-rezultate.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))

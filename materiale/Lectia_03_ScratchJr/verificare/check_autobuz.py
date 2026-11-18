"""Validate observations of the native browser runtime, not a simulated engine."""
from pathlib import Path
import json,re,hashlib,zipfile
ROOT=Path(__file__).resolve().parents[1]
T=json.loads((ROOT/'capturi_autobuz/verificare.json').read_text(encoding='utf-8'))
M=json.loads((ROOT/'autobuz.json').read_text(encoding='utf-8'))
HALF={'bus':(300,159),'ana':(66,159),'dan':(78,154),'mara':(72,149)}
def sprite(row,page,key):
    a=next(s for s in row['sprites'] if s['id']==f'p{page}_{key}')
    x,y=map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',a['transform']).groups())
    return dict(a,x=x+HALF[key][0],y=y+HALF[key][1],shown=float(a['opacity'])>0)
def check(key,frames):
    kids=['ana'] if key in ('m1','m2') else ['ana','dan','mara']
    for who in kids:
        values=[sprite(r,1,who) for r in frames]
        assert values[-1]['x']==384 and not values[-1]['shown'],(key,who,'boarding end')
        assert any(v['shown'] and v['x']<384 for v in values),(key,who,'missing movement')
        assert all(v['x']==384 for v in values if not v['shown']),(key,who,'hid before door')
    for row in frames:
        bus=sprite(row,1,'bus')
        if any(sprite(row,1,k)['shown'] for k in kids):assert bus['x']==348,(key,'early departure')
    if key=='m1':assert sprite(frames[-1],1,'bus')['x']==348;return
    assert sprite(frames[-1],1,'bus')['x']==444
    pages=[2,3] if key=='r2' else [2]
    for page in pages:
        pagekids=(['ana'] if page==2 else ['dan','mara']) if key=='r2' else kids
        active=[r for r in frames if sprite(r,page,'bus')['visibility']=='visible']
        assert len(active)>5,(key,page,'page not observed')
        for row in active:
            bus=sprite(row,page,'bus')
            for who in pagekids:
                child=sprite(row,page,who)
                if child['shown']:assert bus['x']>=180,(key,page,'early disembarking')
        for who in pagekids:
            child=sprite(active[-1],page,who)
            x={'ana':264,'dan':312,'mara':360}[who]
            y={'ana':216,'dan':264,'mara':312}[who]-(24 if key=='creatie' else 0)
            assert child['shown'] and (child['x'],child['y'])==(x,y),(key,page,who,child)
        if key=='r2' and page==2:
            for row in active:
                for who in ['dan','mara']:assert not sprite(row,2,who)['shown']
                if sprite(row,2,'bus')['x']>180:
                    a=sprite(row,2,'ana');assert(a['x'],a['y'])==(264,216)
        else:assert sprite(active[-1],page,'bus')['x']==180
    if key=='r1':
        ends={k:next(i for i,r in enumerate(frames) if not sprite(r,1,k)['shown']) for k in kids}
        assert ends['mara']>ends['ana'] and ends['mara']>ends['dan'],ends
for key in ['m1','m2','m3','creatie','r1','r2']:check(key,T[key])
check('m3',T['reopened'])
assert not sprite(T['manualHide'][-1],2,'ana')['shown']
for who,position in [('ana',(144,264)),('bus',(348,264))]:
    assert all((sprite(r,1,who)['x'],sprite(r,1,who)['y'])==position for r in T['start'])
for entry in M['projects']:
    path=ROOT/'solutii_autobuz'/entry['file'];assert hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256']
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None and len(z.namelist())==2
        d=json.loads(z.read('project/data.json'))['json']
    for pageid in d['pages']:
        page=d[pageid];assert page['md5'] in ['Suburbs.svg','BeachDay.svg','Park.svg']
        for sid in page['sprites']:
            actor=page[sid]
            if actor['type']!='sprite':continue
            assert actor['md5'] in ['Bus.svg','Girl1.svg','Boy2.svg','Girl3.svg']
            if entry['key']=='start':assert not actor['scripts']
print('PASS: six native journeys; boarding at door; bus waits for all; stopped before exit; slow passenger last; two stops; seven default-asset archives. Reopened:', 'reopened' in T)

"""Check recorded browser observations and the exact distributed SJR archives."""
from pathlib import Path
import json, re, zipfile, hashlib
ROOT = Path(__file__).resolve().parents[1]
T = json.loads((ROOT/'capturi_muzeu/verificare.json').read_text(encoding='utf-8'))

def vals(frames, who, field='angle'):
    out = []
    for row in frames:
        sprite = next(s for s in row['sprites'] if s['id'].endswith('_'+who))
        numbers = re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px, 0px\) rotate\(([-.\d]+)deg\)', sprite['transform'])
        x, y, angle = map(float, numbers.groups())
        out.append({'x': x + {'earth':110, 'planet':196, 'guard':105}[who], 'y':y, 'angle':angle}[field])
        assert sprite['opacity'] == '1', (who, 'unexpected hidden sprite')
    return out

def moving(frames, who):
    # Includes the creation example's deliberate half-second pauses.
    assert len(set(vals(frames, who))) >= 3, (who, 'not rotating')

def frozen(frames, who):
    assert len(frames) >= 8 and len(set(vals(frames, who))) == 1, (who, 'not frozen')

def inspection(t, sleepy=False):
    for who in ['earth','planet']: moving(t['before'],who)
    f=t['full']; xs=vals(f,'guard','x')
    assert max(xs)==336 and xs[-1]==48, ('wrong guard path', min(xs),max(xs),xs[-1])
    journey=[r for r,x in zip(f,xs) if x>48]
    for who in ['earth','planet']: frozen(journey,who)
    moving(f[-20:],'earth')
    if sleepy:
        frozen(f[-20:],'planet')
        for who in ['earth','planet']:moving(t['awake'],who)
    else:moving(f[-20:],'planet')

def separate(t):
    for who in ['earth','planet']:moving(t['before'],who)
    f=t['full'];xs=vals(f,'guard','x')
    # The first DOM sample can precede processing the tap. Inspect from departure.
    f=f[next(i for i,x in enumerate(xs) if x>48):]
    xs=vals(f,'guard','x');earth=vals(f,'earth')
    switch=next(i for i,a in enumerate(earth) if a!=earth[0])
    assert switch>=8 and 144<=xs[switch]<=160, ('wrong first inspection', switch,xs[switch])
    frozen(f[:switch],'earth');moving(f[:switch],'planet')
    last=max(i for i,x in enumerate(xs) if x>48)
    frozen(f[switch+2:last],'planet');moving(f[switch+2:last],'earth')
    assert max(xs)==336 and xs[-1]==48
    for who in ['earth','planet']:moving(f[-20:],who)

for suite in [T,T['individual']]:
    m1=suite['m1']['running'] if isinstance(suite['m1'],dict) else suite['m1']
    moving(m1,'earth');frozen(m1,'planet')
    for who in ['earth','planet']:
        moving(suite['m2']['before'],who);frozen(suite['m2']['frozen'][3:],who)
    assert suite['m2']['frozen'][-1]['go']=='go on'
    for key in ['m3','creatie']:inspection(suite[key])
    inspection(suite['r1'],sleepy=True);separate(suite['r2'])
inspection(T['reopened'])
separate(T['repeatR2'])
for who in ['earth','planet','guard']:frozen(T['individual']['startAfterFlag'],who)
assert len(T['savedTitles'])==9

manifest=json.loads((ROOT/'muzeu.json').read_text(encoding='utf-8'))
allowed={'Earth.svg','Planet.svg','Father.svg'}
archives={}
for entry in manifest['projects']:
    path=ROOT/'solutii_muzeu'/entry['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256']
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        assert len(z.namelist())==2, 'Unexpected external artwork or sound'
        data=json.loads(z.read('project/data.json'))['json'];archives[entry['key']]=data
    for page_id in data['pages']:
        page=data[page_id];assert page['md5']=='EmptyRoom.svg'
        for sid in page['sprites']:
            sprite=page[sid]
            if sprite['type']=='sprite':
                assert sprite['md5'] in allowed
                assert sprite['sounds']==['pop.mp3']
                if entry['key']=='start':assert sprite['scripts']==[]
for collection,keys in [('lectia_2',['m1','m2','m3','creatie']),('rezerve',['r1','r2'])]:
    for index,key in enumerate(keys,1):
        expected=json.dumps(archives[key]['page1'],sort_keys=True,ensure_ascii=False)
        actual=json.dumps(archives[collection]['page'+str(index)],sort_keys=True,ensure_ascii=False)
        actual=actual.replace('p'+str(index)+'_','p1_').replace('"num": '+str(index),'"num": 1')
        assert expected==actual, ('collection differs from individual',key)
print('PASS: six scenarios in both collections and individual files; reopened hard puzzle; repeated R2 inspection without flag; empty starter; nine saved projects; matching archives; bundled assets only.')

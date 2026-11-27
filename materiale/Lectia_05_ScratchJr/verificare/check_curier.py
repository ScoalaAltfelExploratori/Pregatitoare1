"""Assert delivery contracts against observations collected from the native UI."""
from pathlib import Path
import json,re,zipfile,hashlib
ROOT=Path(__file__).resolve().parents[1]
T=json.loads((ROOT/'capturi_curier/verificare.json').read_text(encoding='utf-8'))
M=json.loads((ROOT/'curier.json').read_text(encoding='utf-8'))
HALF={'robot':(267,110),'fotbal':(48,48),'baschet':(48,48),'gard':(109,61)}
INITIAL={'robot':(144,276),'fotbal':(96,312),'baschet':(48,312),'gard':(240,276)}
DEST={'fotbal':(408,312),'baschet':(456,312)}
def pos(row,key):
    a=next(s for s in row['sprites'] if s['id']=='p1_'+key)
    assert float(a['opacity'])==1,('hidden cargo',key)
    x,y=map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',a['transform']).groups())
    return x+HALF[key][0],y+HALF[key][1]
def check(key,rows):
    assert rows[-1]['go']=='go on',(key,'unfinished')
    if key=='start':
        for row in rows:
            for who in ['robot','fotbal','baschet']:assert pos(row,who)==INITIAL[who]
        return
    balls=['fotbal'] if key in ('m1','m2') else ['fotbal','baschet']
    if key=='r2':balls.reverse()
    previous_finish=-1;return_index=0;loads=[]
    for ball in balls:
        # Sampling every ~60 ms can miss the single frame between loading and
        # departure. Accept the first observed carried position on that route.
        def on_roof(r):
            bx,by=pos(r,ball);rx,ry=pos(r,'robot')
            return 144<=bx<=336 and by<=240 and abs(rx-bx)<=4 and abs(ry-by-36)<=4
        loaded=next(i for i,r in enumerate(rows) if on_roof(r))
        loads.append(rows[loaded]['t']-rows[0]['t'])
        assert loaded>previous_finish,(key,'wrong order')
        for i in range(loaded):
            if pos(rows[i],ball)!=INITIAL[ball]:assert pos(rows[i],'robot')==(144,276),(key,'moved during loading')
        if key=='m1':
            assert pos(rows[-1],ball)==(144,240)
            assert all(pos(row,'robot')==(144,276) for row in rows)
            break
        arrived=next(i for i in range(loaded,len(rows)) if pos(rows[i],'robot')==(336,276))
        assert arrived>loaded and arrived-loaded>4
        for row in rows[loaded:arrived]:
            rx,ry=pos(row,'robot');bx,by=pos(row,ball)
            assert abs(rx-bx)<=4 and abs((ry-by)-36)<=4,(key,ball,'lost cargo',rx,ry,bx,by)
        finished=next(i for i in range(arrived,len(rows)) if pos(rows[i],ball)==DEST[ball])
        assert finished>arrived
        for row in rows[arrived:finished]:assert pos(row,'robot')==(336,276),(key,'left before unloading')
        for row in rows[finished:]:assert pos(row,ball)==DEST[ball],(key,'cargo returned')
        return_index=next(i for i in range(finished,len(rows)) if pos(rows[i],'robot')==(144,276))
        previous_finish=return_index
    assert pos(rows[-1],'robot')==(144,276)
    if key=='creatie':
        for row in rows:
            x,y=pos(row,'robot');gx,gy=pos(row,'gard')
            assert abs(x-gx)>=66.75+26.28 or abs(y-gy)>=27.5+14.76,('fence overlap',x,y)
        # Both outbound and both return journeys use the upper passage.
        above=[pos(row,'robot')[1]<276 for row in rows]
        assert sum(v and (i==0 or not above[i-1]) for i,v in enumerate(above))==4
    if key in ('m3','r1','r2','creatie'):
        active=[(r['t'],b['xy']) for r in rows for b in r['active'] if b['actor']=='p1_robot_scripts']
        final=active[-1][1];start=min(t for t,p in active if p==final)
        assert start>=rows[return_index]['t']-80,(key,'early completion')
    print(key,'PASS',len(rows),'native frames; first load:',loads[0],'ms')
    return loads[0]
loads={k:check(k,v) for k,v in T.items()}
assert loads['r1']>loads['m3']*1.4,'slow loading not observed'
for entry in M['projects']:
    path=ROOT/'solutii_curier'/entry['file'];assert hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256']
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None and len(z.namelist())==2
        d=json.loads(z.read('project/data.json'))['json'];assert len(d['pages'])==1
        p=d['page1'];assert p['md5']=='Gym.svg'
        for sid in p['sprites']:
            a=p[sid]
            if a['type']!='sprite':continue
            assert a['md5'] in ['Car.svg','Soccerball.svg','Basketball.svg','Fence.svg']
            if entry['key']=='start':assert a['scripts']==[]
print('PASS: six native solutions, empty starter, reset/replay, reopening, seven default-asset archives.')

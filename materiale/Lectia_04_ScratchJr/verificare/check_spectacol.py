"""Check observed native-app motion/highlights, plus the distributed archives."""
from pathlib import Path
import json,re,zipfile,hashlib
ROOT=Path(__file__).resolve().parents[1]
T=json.loads((ROOT/'capturi_spectacol/verificare.json').read_text(encoding='utf-8'))
M=json.loads((ROOT/'spectacol.json').read_text(encoding='utf-8'))
EXPECTED={'m1':'aaaaaa','m2':'aabbb','m3':'aabbbaabbb','repeat':'aabbbaabbb',
          'reopened':'aabbbaabbb','creatie':'aaabbaaabb','r1':'aabbaabb',
          'r2':'aabbbaabbbbbbaa','start':'','manual':'aa'}

def xy(s): return tuple(map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',s['transform']).groups()))
def check(key,rows):
    sequence=[];air={'a':False,'b':False};times={'a':[],'b':[]}
    for row in rows:
        moving=[]
        for who,base in [('a',35),('b',13)]:
            actor=next((s for s in row['sprites'] if s['id']=='p1_'+who),None)
            if actor is None:continue
            _,y=xy(actor);active=y<base-.5
            if active:moving.append(who)
            if active and not air[who]:sequence.append(who);times[who].append(row['t'])
            air[who]=active
        assert len(moving)<2,(key,'overlapping artists',row['t'])
    actual=''.join(sequence)
    assert actual==EXPECTED[key],(key,actual,EXPECTED[key])
    assert rows[-1]['go']=='go on',(key,'did not stop')
    assert not any(air.values()),(key,'unfinished jump')
    for s in rows[-1]['sprites']:
        assert xy(s)=={'p1_a':(60,35),'p1_b':(264,13),'p1_dir':(128,67)}[s['id']]
    if key=='m1':
        gaps=[b-a for a,b in zip(times['a'],times['a'][1:])]
        assert gaps[1]>gaps[0]+600 and gaps[3]>gaps[2]+600,('motif pause',gaps)
    if key=='r1':
        a,b=times['a'],times['b']
        assert min(a[1]-a[0],b[1]-b[0],a[3]-a[2],b[3]-b[2])>1500
        assert abs((a[1]-a[0])-(b[1]-b[0]))<350
    if key in ('m3','creatie','r1','r2'):
        # The last conductor block is Say. Its highlight starts after the last jump.
        active=[(row['t'],b['xy']) for row in rows for b in row['active'] if b['actor']=='p1_dir_scripts']
        lastpos=active[-1][1]
        finalstart=min(t for t,pos in active if pos==lastpos)
        assert finalstart>max(times['a']+times['b'])+500,(key,'early final')
    print(key,actual or '(empty)',len(rows),'native frames: PASS')

for key,rows in T.items():check(key,rows)
for entry in M['projects']:
    path=ROOT/'solutii_spectacol'/entry['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256']
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None and len(z.namelist())==2
        d=json.loads(z.read('project/data.json'))['json'];assert len(d['pages'])==1
        page=d['page1'];assert page['md5']=='Theatre.svg'
        for sid in page['sprites']:
            actor=page[sid]
            if actor['type']!='sprite':continue
            assert actor['md5'] in ['TeenGirl1.svg','TeenBoy1.svg','Mother.svg']
            assert actor['sounds']==['pop.mp3']
            if entry['key']=='start':assert not actor['scripts']
print('PASS: all seven native archives; bundled assets and sound; exact turns, pauses, final and replay.')

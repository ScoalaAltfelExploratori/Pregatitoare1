"""Check the saved observations of visible browser elements, not a simulated engine."""
from pathlib import Path
import json,re
L=Path(__file__).resolve().parents[1]
data=json.loads((L/'capturi_stafeta/verificare.json').read_text(encoding='utf-8'))
offset={'a':(108,104),'b':(148,106),'c':(108,104),'minge':(63,64),'gard':(109,61)}
def positions(frame):
    out={}
    for sprite in frame['sprites']:
        key=sprite['id'].split('_',1)[1]
        xy=re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',sprite['transform'])
        ox,oy=offset[key];out[key]=(float(xy[1])+ox,float(xy[2])+oy)
        assert sprite['visibility']=='visible',(key,'hidden')
    return out
checks=[]
for key,frames in data['runs'].items():
    p=[positions(f) for f in frames]
    assert frames[-1]['go']=='go on',(key,'scripts still running')
    b_start=216 if key=='r1' else 264
    a_end=144 if key=='r1' else 192
    b_end=264 if key=='m1' else (288 if key.startswith('r2') else 408)
    ball_end=264 if key=='m1' else 408
    assert p[-1]['a']==(a_end,264),(key,'A final',p[-1])
    assert p[-1]['b']==(b_end,264),(key,'B final',p[-1])
    assert p[-1]['minge']==(ball_end,240),(key,'ball final',p[-1])
    assert any(a['a']==(a_end,264) and a['b']==(b_start,264) and a_end+24<a['minge'][0]<b_start for a in p),(key,'first visible pass')
    for a in p:
        ax,ay=a['a'];bx,by=a['b'];mx,my=a['minge']
        if ax<a_end:assert (mx-ax,my-ay)==(24,-24),(key,'A dropped ball',a)
        if a['b']!=(b_start,264):assert mx>=b_start,(key,'B started early',a)
        if ay<264:assert a['minge']==(408,240),(key,'celebration too early',a)
        if key!='m1' and not key.startswith('r2') and (bx!=b_start or by!=264):
            assert (mx-bx,my-by)==(0,-24),(key,'B dropped ball',a)
        if key in ['m3','creatie'] and 300<bx<372:assert by<=192,(key,'fence crossed',a)
        if key.startswith('r2'):
            cx,cy=a['c']
            if cx>360:assert (mx-cx,my-cy)==(0,-24),(key,'C dropped ball',a)
    if key.startswith('r2'):
        assert p[-1]['c']==(408,264)
        assert any(a['b']==(288,264) and a['c']==(360,264) and 288<a['minge'][0]<360 for a in p),(key,'second visible pass')
    if key!='m1':assert any(a['a'][1]<264 for a in p),(key,'celebration missing')
    checks.append({'example':key,'frames':len(frames),'pass':True,'final':p[-1]})
assert positions(data['r2Reset'][-1])==positions(data['r2Reopened'][-1])
assert positions(data['r2Reset'][-1])=={'a':(96,264),'b':(264,264),'c':(360,264),'minge':(120,240)}
out={'date':data['date'],'checks':checks,'save_reopen':True,'scope':'Complete native examples executed in ScratchJr Desktop Reborn browser. DOM samples and real screenshots. No Android/Windows app retest; audio output not measured.'}
(L/'capturi_stafeta/rezultate.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))

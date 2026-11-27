"""Native, editable ScratchJr factory: parallel assembly and synchronized testing."""
from pathlib import Path
from copy import deepcopy
import importlib.util, base64, hashlib, io, json, zipfile
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('native',ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
n.ROOT=ROOT/'solutii_fabrica'
b,s,rep=n.b,n.script,n.repeat
ART=ROOT/'resurse_fabrica'
TITLES={'start':'de la zero','m1':'1. Șasiul','m2':'2. Roțile în paralel','m3':'3. Roverul complet',
        'creatie':'4. Proba mea','r1':'R1. Montaj pe rând','r2':'R2. Două probe, o plecare'}
REV='v1.0'

def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g id="layer1">{body}</g></svg>'.encode()

def embedded(file,w,h):
    im=Image.open(ART/file)
    box=im.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox() if im.mode=='RGBA' else (0,0,*im.size)
    x,y,r,d=box;fx,fy=w/(r-x),h/(d-y)
    data=base64.b64encode((ART/file).read_bytes()).decode()
    # Original PNG bytes are unchanged. SVG placement maps their visible bounds.
    return f'<image x="{-x*fx:.4f}" y="{-y*fy:.4f}" width="{im.width*fx:.4f}" height="{im.height*fy:.4f}" preserveAspectRatio="none" xlink:href="data:image/png;base64,{data}"/>'

def assets():
    wheel='<circle cx="30" cy="30" r="28" fill="#172337" stroke="#0a1424" stroke-width="3"/><circle cx="30" cy="30" r="21" fill="#394b64" stroke="#8c9bb3" stroke-width="3"/><path d="M30 10V20M30 40V50M10 30H20M40 30H50M16 16L23 23M37 37L44 44M16 44L23 37M37 23L44 16" stroke="#dce5ee" stroke-width="5"/><circle cx="30" cy="30" r="10" fill="#ffb51d" stroke="#614112" stroke-width="2"/><circle cx="30" cy="30" r="4" fill="#526581"/>'
    body=embedded('sasiu-rover.png',192,96)
    raw={'fabrica':(embedded('fabrica.png',480,360),480,360),
         'robot':(embedded('robot-industrial.png',126,116),126,116),
         'sasiu':(body,192,96),'roata':(wheel,60,60),
         'rover':(body+f'<g transform="translate(18 54)">{wheel}</g><g transform="translate(114 54)">{wheel}</g>',192,120),
         'far':('<ellipse cx="18" cy="15" rx="18" ry="14" fill="#fff3a0" opacity="0.35"/><rect x="6" y="7" width="24" height="16" rx="4" fill="#fff6a4" stroke="#ffb800" stroke-width="2"/><rect x="10" y="10" width="16" height="9" rx="2" fill="#fffef0"/>',36,30),
         'banc':('<path d="M8 15V66H24V15M268 15V66H284V15" fill="#254b81" stroke="#14355f" stroke-width="3"/><rect x="1" y="1" width="298" height="15" rx="4" fill="#c5d7e8" stroke="#375980" stroke-width="3"/><path d="M8 12H290" stroke="#e9a52a" stroke-width="4"/>',300,68)}
    folder=ART/'native';folder.mkdir(exist_ok=True);out={}
    for key,(markup,w,h) in raw.items():
        data=svg(w,h,markup);(folder/(key+'.svg')).write_bytes(data)
        out[key]={'md5':hashlib.md5(data).hexdigest()+'.svg','size':[w,h],'data':data}
    return out

def actor(art,id,asset,name,x,y,scripts=(),shown=True):
    a=art[asset]
    return {'id':id,'asset':a['md5'],'name':name,'size':a['size'],'position':[x,y],
            'scale':1,'shown':shown,'scripts':list(scripts)}

def make_projects(art):
    projects={}
    for key in TITLES:
        full=key not in ('start','m1','m2');wheels=key!='m1';sequential=key=='r1'
        master=[b('message','Orange')]
        if wheels:master+=[b('message','Blue')]
        if sequential:master+=[b('message','Purple')]
        if full:master+=[b('message','Yellow'),b('message','Green'),b('message','Red')]
        master+=[b('say','Gata!' if full else 'Șasiu montat!' if key=='m1' else 'Roți montate!')]
        chassis=[s('onflag',b('home'),b('show')),s('onmessage',b('down',5),color='Orange')]
        if full:chassis.append(s('onmessage',b('hide'),color='Green'))
        left=[s('onflag',b('home'),b('show'))]
        right=[s('onflag',b('home'),b('show'))]
        if wheels:
            left.append(s('onmessage',b('setspeed',1),b('forward',5),b('up',2),color='Blue'))
            right.append(s('onmessage',b('setspeed',0 if full else 1),b('back',3),b('up',2),color='Purple' if sequential else 'Blue'))
        if full:
            left.append(s('onmessage',b('hide'),color='Green'));right.append(s('onmessage',b('hide'),color='Green'))
        pulse=[b('show'),b('wait',5),b('hide'),b('wait',5)]
        if key=='creatie':pulse=[b('playsnd','pop.mp3'),b('show'),b('wait',3),b('hide'),b('wait',7)]
        lamp=[s('onflag',b('hide')),s('onmessage',rep(3 if key=='creatie' else 2,*pulse),color='Yellow')] if full else []
        drive=([rep(2,b('forward',2),b('back',2),b('message','Yellow'))] if key=='r2' else [])+[b('forward',3)]
        rover=[s('onflag',b('home'),b('hide')),s('onmessage',b('show'),color='Green'),s('onmessage',*drive,color='Red')] if full else []
        actors=[actor(art,'banc','banc','Banc de probă',324,314),
                actor(art,'robot','robot','Robot industrial',84,230,[s('onflag',*master)]),
                actor(art,'sasiu','sasiu','Șasiu',288,96,chassis),
                actor(art,'stanga','roata','Roata stângă',120,300,left),
                actor(art,'dreapta','roata','Roata dreaptă',408,300,right),
                actor(art,'rover','rover','Rover complet',288,228,rover,False),
                actor(art,'far','far','Far',376,236,lamp,False)]
        if key=='start':
            for a in actors:a['scripts']=[]
        projects[key]=[{'background':art['fabrica']['md5'],'focus':'robot','sprites':actors,'texts':[]}]
    return projects

def export(key,pages,art):
    title=f'L07 Fabrica de roboți - {TITLES[key]} · {REV}'
    record=n.export({'name':title,'short':'Fabrica','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={k:z.read(k) for k in z.namelist()}
    data=json.loads(entries['project/data.json'])
    for pid in data['json']['pages']:
        for sid in data['json'][pid]['sprites']:
            for i,program in enumerate(data['json'][pid][sid].get('scripts',[])):
                if i==2:
                    for block in program:block[2]+=650;block[3]-=95
    im=Image.new('RGB',(160,120),'#e8eef8');draw=ImageDraw.Draw(im)
    for y,t,size in [(17,'LECȚIA 7',22),(52,'FABRICA',21),(88,key.upper(),14)]:
        draw.text((80,y),t,anchor='mt',fill='#144074',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    buf=io.BytesIO();im.save(buf,format='PNG');png=buf.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5']);data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 18:00:00';data['mtime']='1795780800000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png;entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    for asset_key,a in art.items():entries['project/'+('backgrounds' if asset_key=='fabrica' else 'characters')+'/'+a['md5']]=a['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for k,v in entries.items():
            info=zipfile.ZipInfo(k,(2026,11,27,18,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,v)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'fabrica.json').write_text(json.dumps({'lesson':7,'title':'Fabrica de roboți: construim un rover','duration':60,'revision':REV,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven factory projects with original embedded assets.')

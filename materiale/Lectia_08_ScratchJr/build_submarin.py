"""Native ScratchJr ROV: manual commands, visible cargo, delivery and autopilot."""
from pathlib import Path
import importlib.util, base64, hashlib, io, json, zipfile
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('native',ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
n.ROOT=ROOT/'solutii_submarin'
b,s,rep=n.b,n.script,n.repeat
ART=ROOT/'resurse_submarin';REV='v1.3'
TITLES={'start':'de la zero','m1':'1. Telecomanda','m2':'2. Recuperarea','m3':'3. Misiunea completă','creatie':'4. Pilotaj de precizie','r1':'R1. Transport fragil','r2':'R2. Întoarcere automată'}
DIRS=[('stanga','Stânga','Red','back'),('dreapta','Dreapta','Orange','forward'),('sus','Sus','Yellow','up'),('jos','Jos','Blue','down')]
def svg(w,h,body):return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g id="layer1">{body}</g></svg>'.encode()
def embedded(file,w,h):
    im=Image.open(ART/file);box=im.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox() if im.mode=='RGBA' else (0,0,*im.size)
    x,y,r,d=box;fx,fy=w/(r-x),h/(d-y);data=base64.b64encode((ART/file).read_bytes()).decode()
    return f'<image x="{-x*fx:.4f}" y="{-y*fy:.4f}" width="{im.width*fx:.4f}" height="{im.height*fy:.4f}" preserveAspectRatio="none" xlink:href="data:image/png;base64,{data}"/>'
def assets():
    raw={'fundal':(embedded('fundal-subacvatic.png',480,360),480,360),'robot':(embedded('robot-submarin.png',112,84),112,84),'capsula':(embedded('capsula.png',40,60),40,60),
      'platforma':('<path d="M13 20V43M137 20V43" stroke="#173b58" stroke-width="10"/><rect x="2" y="2" width="146" height="20" rx="5" fill="#dce9ec" stroke="#163952" stroke-width="4"/><path d="M8 16H142" stroke="#f6b72a" stroke-width="4"/><path d="M55 4H95" stroke="#10ac9d" stroke-width="6"/>',150,46),
      'stanca':('<path d="M3 94L11 53L31 43L38 18L66 3L89 17L100 49L114 62L118 94Z" fill="#476b88" stroke="#173d5b" stroke-width="4"/><path d="M38 18L48 48L27 68L11 53M48 48L76 56L89 17M76 56L94 76L118 94M27 68L58 78L45 94" fill="none" stroke="#7496ab" stroke-width="4"/>',120,96)}
    frame='<rect x="2" y="2" width="52" height="42" rx="10" fill="#e5f8ff" stroke="#3b718e" stroke-width="3"/>'
    arrow='<path d="M13 23H41M30 12L41 23L30 34" fill="none" stroke="#123a5e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
    for key,angle in [('dreapta',0),('stanga',180),('sus',270),('jos',90)]:raw[key]=(frame+f'<g transform="rotate({angle} 28 23)">{arrow}</g>',56,46)
    raw['depune']=(frame+'<path d="M28 8V28M20 21L28 29L36 21M12 30V37H44V30" fill="none" stroke="#087e70" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',56,46)
    raw['auto']=(frame+'<path d="M14 17H33Q44 17 44 28Q44 37 33 37H20M14 17L23 8M14 17L23 26" fill="none" stroke="#993678" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',56,46)
    out={}
    for key,(body,w,h) in raw.items():
        data=svg(w,h,body);(ART/'native'/(key+'.svg')).write_bytes(data);out[key]={'md5':hashlib.md5(data).hexdigest()+'.svg','size':[w,h],'data':data}
    return out
def actor(art,id,asset,name,x,y,scripts=(),shown=True):
    return {'id':id,'asset':art[asset]['md5'],'name':name,'size':art[asset]['size'],'position':[x,y],'scale':1,'shown':shown,'scripts':list(scripts)}
def layout(a):
    # Four columns, two rows; all short scripts stay accessible without scrolling.
    a['layout']=[[40+310*(i//2),20+95*(i%2)] for i in range(len(a['scripts']))]
    if a['id']=='auto' and a['scripts']:a['layout']=[[40,20],[650,20],[960,20]]
def make_projects(art):
    out={}
    for key in TITLES:
        pickup=key not in ('start','m1');full=key not in ('start','m1','m2');slow=key=='r1';automatic=key=='r2';precise=key=='creatie'
        move=[s('onmessage',b(kind,1 if precise or kind in ('up','down') else 2),color=color) for _,_,color,kind in DIRS]
        robot=[s('onflag',b('home'),b('show'),b('setspeed',1))]+move
        if slow:robot += [s('onmessage',b('setspeed',0),color='Green'),s('onmessage',b('setspeed',1),color='Purple')]
        cargo=[s('onflag',b('home'),b('hide'),b('setspeed',1))]+move+[s('onmessage',b('show'),*([b('setspeed',0)] if slow else []),color='Green')] if pickup else []
        if full:cargo += [s('onmessage',b('hide'),*([b('setspeed',1)] if slow else []),color='Purple')]
        ground=[s('onflag',b('show'))]+([s('ontouch',b('wait',5),b('hide'),b('message','Green'))] if pickup else [])
        delivered=[s('onflag',b('hide')),s('onmessage',b('show'),color='Purple')] if full else []
        release=[s('onflag',b('hide')),s('onmessage',b('show'),color='Green'),s('onclick',b('hide'),b('message','Purple'))] if full and not automatic else []
        auto=[s('onclick',b('hide'),rep(5,b('message','Yellow')),rep(5,b('message','Red')),b('message','Purple')),s('onflag',b('hide')),s('onmessage',b('show'),color='Green')] if automatic else []
        actors=[actor(art,'platforma','platforma','Platforma',96,172,[s('onflag',b('wait',10),b('forever'))]),actor(art,'stanca','stanca','Stânca',220,226),
                actor(art,'sol','capsula','Capsula de pe fund',360 if precise else 336,240,ground),
                actor(art,'livrata','capsula','Capsula livrată',96,120,delivered,False),
                actor(art,'transport','capsula','Capsula transportată',96,120,cargo,False),
                actor(art,'robot','robot','Robot submarin',96,60,robot)]
        for i,(id,name,color,_) in enumerate(DIRS):
            programs=[s('onclick',b('message',color)),s('onflag',b('show'))]
            if automatic:programs += [s('onmessage',b('hide'),color='Green'),s('onmessage',b('show'),color='Purple')]
            actors.append(actor(art,id,id,'Buton '+name,36+i*64,324,programs))
        actors += [actor(art,'depune','depune','Buton Depune',326,324,release,False),actor(art,'auto','auto','Buton Întoarcere',418,324,auto,False)]
        if key=='start':
            for a in actors:a['scripts']=[]
        for a in actors:layout(a)
        out[key]=[{'background':art['fundal']['md5'],'focus':'robot','sprites':actors,'texts':[]}]
    return out
def translate_program(program,dx,dy):
    for block in program:
        block[2]+=dx;block[3]+=dy
        if block[0]=='repeat':translate_program(block[4],dx,dy)
def export(key,pages,art):
    title=f'L08 Robotul submarin - {TITLES[key]} · {REV}'
    record=n.export({'name':title,'short':'Submarin','path':key+'.sjr','pages':pages});path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={k:z.read(k) for k in z.namelist()}
    data=json.loads(entries['project/data.json'])
    for pi,page in enumerate(pages,1):
        for a in page['sprites']:
            native=data['json'][f'page{pi}'][f'p{pi}_{a["id"]}']
            for i,program in enumerate(native['scripts']):
                x,y=a['layout'][i];translate_program(program,x-40,y-(20+95*i))
    im=Image.new('RGB',(160,120),'#e3f5ff');draw=ImageDraw.Draw(im)
    for y,text,size in [(15,'LECȚIA 8',21),(50,'SUBMARIN',20),(87,key.upper(),15)]:draw.text((80,y),text,anchor='mt',fill='#144974',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    buf=io.BytesIO();im.save(buf,format='PNG');png=buf.getvalue();entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png';data['ctime']='2026-11-27 20:00:00';data['mtime']='1795788000000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png;entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    for k,a in art.items():entries['project/'+('backgrounds' if k=='fundal' else 'characters')+'/'+a['md5']]=a['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for k,v in entries.items():
            info=zipfile.ZipInfo(k,(2026,11,27,20,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,v)
    return {'key':key,'name':title,'file':path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}
if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'submarin.json').write_text(json.dumps({'lesson':8,'title':'Robotul submarin: recuperăm capsula de cercetare','duration':60,'revision':REV,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven ROV projects, with included original assets.')

"""Native editable recycling projects; identical transport commands for robot and load."""
from pathlib import Path
import importlib.util, base64, hashlib, io, json, zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native', ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n = importlib.util.module_from_spec(spec)
spec.loader.exec_module(n)
n.ROOT = ROOT/'solutii_reciclare'
b, s, rep = n.b, n.script, n.repeat
ART = ROOT/'resurse_reciclare'
REV = 'v1.1'
TITLES = {'start':'de la zero', 'm1':'1. Prima sticlă', 'm2':'2. Trei categorii',
          'm3':'3. Lotul amestecat', 'r1':'R1. Compactăm hârtia', 'r2':'R2. Golim recipientele'}
ITEMS = [('sticla1','sticla','Sticla 1','Red','back',7),
         ('doza','doza','Doza','Orange',None,0),
         ('hartie','hartie','Hârtia','Yellow','forward',6),
         ('sticla2','sticla','Sticla 2','Green','back',5)]

def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g id="layer1">{body}</g></svg>'.encode()

def embedded(file,w,h):
    im=Image.open(ART/file)
    box=im.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox() if im.mode=='RGBA' else (0,0,*im.size)
    x,y,r,d=box; fx,fy=w/(r-x),h/(d-y)
    data=base64.b64encode((ART/file).read_bytes()).decode()
    return f'<image x="{-x*fx:.4f}" y="{-y*fy:.4f}" width="{im.width*fx:.4f}" height="{im.height*fy:.4f}" preserveAspectRatio="none" xlink:href="data:image/png;base64,{data}"/>'

def assets():
    bottle='<path d="M14 3H26V12L34 22V49Q34 54 29 54H11Q6 54 6 49V22L14 12Z" fill="#9ee6d9" stroke="#204b52" stroke-width="2.5"/><rect x="13" y="1" width="14" height="7" rx="2" fill="#269c75" stroke="#204b52" stroke-width="2"/><path d="M10 28H30V42H10Z" fill="#faf9e9"/><path d="M13 18L11 25V47" stroke="#e7ffff" stroke-width="3" fill="none"/><path d="M16 33H25M20 30L25 33L20 37" stroke="#299579" stroke-width="2" fill="none"/>'
    can='<rect x="3" y="4" width="36" height="39" rx="7" fill="#b9d0df" stroke="#344d69" stroke-width="2.5"/><path d="M8 7V39M33 7V39" stroke="#eaf8ff" stroke-width="4"/><ellipse cx="21" cy="6" rx="17" ry="5" fill="#ecf5fa" stroke="#344d69" stroke-width="2"/><ellipse cx="21" cy="6" rx="5" ry="2.5" fill="#718ba1"/><path d="M4 17H38V31H4" fill="#dd6a45"/><path d="M13 21H29M13 26H25" stroke="#fff0d1" stroke-width="2"/>'
    paper='<path d="M4 8L53 2L68 12L70 43L18 51L3 38Z" fill="#e8d6ad" stroke="#5f5c4f" stroke-width="2.5"/><path d="M4 8L18 20L68 12M18 20V51M53 2L53 14" fill="none" stroke="#9f8b68" stroke-width="2.5"/><path d="M22 26L59 20M22 33L59 27M22 40L48 35" stroke="#faf6e8" stroke-width="3"/>'
    raw={'fundal':(embedded('fundal-sortare.png',480,360),480,360),
         'robot':(embedded('robot-reciclare.png',112,128),112,128),
         'sticla':(bottle,40,56),'doza':(can,42,48),'hartie':(paper,72,54)}
    # Open transparent-front sorting trays: deposited objects remain visible.
    binbody='''<path d="M5 16L15 2H109L119 16V91H5Z" fill="#bed5d7" stroke="#354e64" stroke-width="3"/><rect x="9" y="15" width="106" height="38" rx="5" fill="#486575"/><path d="M9 18H115M14 49H110" stroke="#91acb4" stroke-width="2"/>'''
    raw['recipient']=(binbody,124,94)
    colors=['#f2ce51','#8ba8bb','#74b4e9']; labels=['PLASTIC','METAL','HÂRTIE']
    for i,(color,label) in enumerate(zip(colors,labels)):
        icon=[bottle,can,paper][i]; iw=[40,42,72][i]; ih=[56,48,54][i]
        k=24/ih
        front=f'<rect x="2" y="2" width="120" height="52" rx="5" fill="{color}" stroke="#354e64" stroke-width="3"/><g transform="translate({62-iw*k/2:.2f} 5) scale({k:.4f})">{icon}</g><text x="62" y="46" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#173b4c">{label}</text>'
        raw['fata'+str(i)]=(front,124,56)
    raw['panou']=('<rect x="2" y="2" width="104" height="24" rx="7" fill="#183e47" stroke="#1d7564" stroke-width="3"/><circle cx="16" cy="14" r="6" fill="#94e86a"/><text x="64" y="18" font-family="Arial" text-anchor="middle" font-size="12" font-weight="bold" fill="white">LOT</text>',108,28)
    raw['golire']=('<rect x="2" y="2" width="100" height="40" rx="9" fill="#e6faf2" stroke="#247763" stroke-width="3"/><path d="M18 10V25M11 20L18 27L25 20M8 30H28" fill="none" stroke="#247763" stroke-width="3"/><text x="65" y="26" font-family="Arial" text-anchor="middle" font-size="13" font-weight="bold" fill="#174c40">GOLIRE</text>',104,44)
    folder=ART/'native';folder.mkdir(parents=True,exist_ok=True);out={}
    for key,(body,w,h) in raw.items():
        data=svg(w,h,body);(folder/(key+'.svg')).write_bytes(data)
        out[key]={'md5':hashlib.md5(data).hexdigest()+'.svg','size':[w,h],'data':data}
    return out

def actor(art,id,asset,name,x,y,scripts=(),shown=True):
    return {'id':id,'asset':art[asset]['md5'],'name':name,'size':art[asset]['size'],
            'position':[x,y],'scale':1,'shown':shown,'scripts':list(scripts)}

def make_projects(art):
    out={}
    for key in TITLES:
        count=1 if key in ('start','m1') else 3 if key=='m2' else 4
        active=ITEMS[:count]
        order=['Red'] if count==1 else ['Red','Orange','Yellow'] if count==3 else ['Red','Yellow','Orange','Green']
        command=[b('wait',10)]
        for color in order:
            if key=='r2' and color=='Green':break
            if key=='r1' and color=='Yellow':command.append(b('message','Blue'))
            command.append(b('message',color))
        command += [b('message','Purple'),b('say','Golim recipientele.')] if key=='r2' else [b('say','Lot terminat!')]
        robot=[s('onflag',b('home'),b('show'),b('setspeed',1))]
        loads=[]
        for id,asset,name,color,direction,distance in ITEMS:
            programs=[]
            if (id,asset,name,color,direction,distance) in active:
                outward=[b(direction,distance)] if direction else []
                inward=[b('forward' if direction=='back' else 'back',distance)] if direction else []
                # Same starting delay and shared motion. Robot waits for the short final drop.
                robot.append(s('onmessage',b('show'),b('wait',5),*outward,b('down',3),b('wait',10),b('up',3),*inward,color=color))
                programs=[s('onflag',b('home'),b('same'),b('hide'),b('setspeed',1)),
                          s('onmessage',b('show'),b('wait',5),*outward,b('down',3),b('down',1),color=color)]
                if key=='r1' and id=='hartie':
                    programs.append(s('onmessage',b('grow',10),b('show'),b('wait',5),rep(2,b('shrink',5),b('wait',5)),color='Blue'))
                if key=='r2':programs.append(s('onmessage',b('hide'),color='Blue'))
            loads.append(actor(art,id,asset,name,240,164,programs,id=='sticla1' and key=='start'))
        actors=[actor(art,'spate'+str(i),'recipient','Recipient '+label,96+144*i,280) for i,label in enumerate(['plastic','metal','hârtie'])]
        actors+=loads
        actors += [actor(art,'fata'+str(i),'fata'+str(i),'Etichetă '+label,96+144*i,304) for i,label in enumerate(['plastic','metal','hârtie'])]
        actors.append(actor(art,'robot','robot','Robotul de reciclare',240,92,robot))
        actors.append(actor(art,'panou','panou','Panoul lotului',240,344,[s('onflag',*command)]))
        button=[s('onflag',b('hide')),s('onmessage',b('show'),color='Purple'),s('onclick',b('hide'),b('message','Blue'),b('message','Green'))] if key=='r2' else []
        actors.append(actor(art,'golire','golire','Buton Golire',416,54,button,False))
        if key=='start':
            for a in actors:a['scripts']=[]
        for a in actors:a['layout']=[[40,20+95*i] for i in range(len(a['scripts']))]
        out[key]=[{'background':art['fundal']['md5'],'focus':'robot','sprites':actors,'texts':[]}]
    return out

def export(key,pages,art):
    title=f'L09 Robotul de reciclare - {TITLES[key]} · {REV}'
    record=n.export({'name':title,'short':'Reciclare','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={k:z.read(k) for k in z.namelist()}
    data=json.loads(entries['project/data.json'])
    im=Image.new('RGB',(160,120),'#e8f5ef');draw=ImageDraw.Draw(im)
    for y,t,size in [(15,'LECȚIA 9',21),(50,'RECICLARE',19),(87,key.upper(),15)]:
        draw.text((80,y),t,anchor='mt',fill='#1b6655',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    buf=io.BytesIO();im.save(buf,format='PNG');png=buf.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 22:00:00';data['mtime']='1795795200000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    for k,a in art.items():entries['project/'+('backgrounds' if k=='fundal' else 'characters')+'/'+a['md5']]=a['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for k,v in entries.items():
            info=zipfile.ZipInfo(k,(2026,11,27,22,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,v)
    return {'key':key,'name':title,'file':path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'reciclare.json').write_text(json.dumps({'lesson':9,'title':'Robotul de reciclare','duration':60,'revision':REV,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built six native recycling projects.')

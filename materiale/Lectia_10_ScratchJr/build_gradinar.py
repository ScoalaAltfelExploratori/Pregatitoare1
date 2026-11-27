"""Native ScratchJr watering projects: one message = one visible portion of water."""
from pathlib import Path
import importlib.util,base64,hashlib,io,json,zipfile
from PIL import Image,ImageDraw,ImageFont

ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('native',ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
n.ROOT=ROOT/'solutii_gradinar';b,s,rep=n.b,n.script,n.repeat
ART=ROOT/'resurse_gradinar';REV='v1.2'
TITLES={'start':'de la zero','m1':'1. Prima plantă','m2':'2. Reumplem rezervorul','m3':'3. Întreaga seră','r1':'R1. Rezervor de patru','r2':'R2. Două treceri'}

def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g id="layer1">{body}</g></svg>'.encode()

def embedded(file,w,h):
    im=Image.open(ART/file)
    box=im.getchannel('A').point(lambda a:255 if a>96 else 0).getbbox() if im.mode=='RGBA' else (0,0,*im.size)
    x,y,r,d=box;fx,fy=w/(r-x),h/(d-y)
    data=base64.b64encode((ART/file).read_bytes()).decode()
    return f'<image x="{-x*fx:.4f}" y="{-y*fy:.4f}" width="{im.width*fx:.4f}" height="{im.height*fy:.4f}" preserveAspectRatio="none" xlink:href="data:image/png;base64,{data}"/>'

def assets():
    raw={'fundal':(embedded('sera.png',480,360),480,360),'robot':(embedded('robot-gradinar.png',140,96),140,96)}
    droplet='<path d="M8 1C6 6 1 10 1 15C1 24 15 24 15 15C15 10 10 5 8 1Z" fill="#1688df" stroke="#14517b" stroke-width="1.5"/><path d="M5 10Q2 16 6 17" fill="none" stroke="#c4f2ff" stroke-width="2"/>'
    raw['indicator']=(droplet,16,23)
    for cap in (3,4):
        nums=''.join(f'<text x="{30+24*i}" y="45" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#15425d">{i}</text>' for i in range(5))
        ticks=''.join(f'<path d="M{30+24*i} 27V31" stroke="#638fa2" stroke-width="1.5"/>' for i in range(5))
        raw['panou'+str(cap)]=(f'<rect x="1.5" y="1.5" width="153" height="47" rx="8" fill="#f6fcff" stroke="#245975" stroke-width="2"/><text x="78" y="13" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#15425d">PORȚII ÎN ROBOT</text><path d="M30 29H126" stroke="#a8c7d4" stroke-width="2"/>'+ticks+nums,156,50)
    raw['statie']=('''<rect x="10" y="4" width="72" height="80" rx="12" fill="#ebf8ff" stroke="#285877" stroke-width="3"/><path d="M13 38H79V70Q79 80 69 80H23Q13 80 13 70Z" fill="#55bdeb"/><path d="M22 44H65" stroke="#b5ecff" stroke-width="3"/><rect x="4" y="82" width="84" height="12" rx="3" fill="#e99c34" stroke="#6e5936" stroke-width="2"/><path d="M43 94V102" stroke="#285877" stroke-width="10"/><path d="M43 94V102" stroke="#aacbd5" stroke-width="5"/><text x="46" y="23" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="11" fill="#214f68">REUMPLERE</text>''',92,104)
    for suffix,color in [('a','#c6503a'),('b','#edb337')]:
        raw['ghiveci'+suffix]=(f'<path d="M10 13H100L89 51H21Z" fill="#db8c58" stroke="#7e4c32" stroke-width="3"/><rect x="3" y="4" width="104" height="13" rx="4" fill="#f5b67d" stroke="#7e4c32" stroke-width="3"/><ellipse cx="55" cy="7" rx="44" ry="4" fill="#67543b"/><rect x="36" y="23" width="38" height="22" rx="5" fill="#fff6db"/><g transform="translate(41 23) scale(.7)">{droplet}</g><g transform="translate(57 23) scale(.7)">{droplet}</g>',110,54)
        stem='<path d="M50 73V31" fill="none" stroke="#306740" stroke-width="6" stroke-linecap="round"/>'
        raw['uscata'+suffix]=(stem+f'<path d="M50 40C27 23 6 34 13 56C20 41 31 44 48 48M52 48C78 26 95 38 88 61C80 44 69 47 52 55" fill="#a0a653" stroke="#66753b" stroke-width="2"/><path d="M50 32Q72 12 76 32" fill="none" stroke="#66753b" stroke-width="5"/><ellipse cx="77" cy="34" rx="11" ry="7" transform="rotate(40 77 34)" fill="{color}" stroke="#836440" stroke-width="2"/>',100,76)
        raw['vie'+suffix]=(stem+f'<path d="M49 52C22 54 13 34 17 22C34 24 47 34 49 52M51 59C75 58 88 42 85 30C66 31 53 42 51 59" fill="#4d9c50" stroke="#286238" stroke-width="2"/><path d="M50 35V17" stroke="#306740" stroke-width="5"/>'+''.join(f'<ellipse cx="50" cy="12" rx="8" ry="12" transform="rotate({i*60} 50 21)" fill="{color}" stroke="#965d36" stroke-width="1.2"/>' for i in range(6))+'<circle cx="50" cy="21" r="7" fill="#ffe78b" stroke="#9c7838" stroke-width="1.5"/>',100,76)
    raw['jet']=('<path d="M2 3Q23 7 39 36M4 1Q29 4 47 31M1 8Q16 18 30 44" fill="none" stroke="#239edd" stroke-width="3.5" stroke-linecap="round"/><path d="M12 9L17 14M24 20L29 25M32 32L36 37" stroke="#b8edff" stroke-width="2"/><ellipse cx="41" cy="43" rx="5" ry="2" fill="#38aae2"/>',50,50)
    raw['remplissage']=('<path d="M3 1V20M8 0V22M13 2V21" fill="none" stroke="#209ddd" stroke-width="3" stroke-linecap="round"/><path d="M5 3V14M10 9V20" stroke="#b8edff" stroke-width="1.5"/>',16,24)
    folder=ART/'native';folder.mkdir(parents=True,exist_ok=True);out={}
    for key,(body,w,h) in raw.items():
        data=svg(w,h,body);(folder/(key+'.svg')).write_bytes(data)
        out[key]={'md5':hashlib.md5(data).hexdigest()+'.svg','size':[w,h],'data':data}
    return out

def actor(art,id,asset,name,x,y,scripts=(),shown=True):
    return {'id':id,'asset':art[asset]['md5'],'name':name,'size':art[asset]['size'],'position':[x,y],'scale':1,'shown':shown,'scripts':list(scripts)}

def make_projects(art):
    out={}
    goa=[b('forward',6),b('up',4)];gob=[b('forward',6),b('down',2)]
    # Home at the station also restores the nozzle/fill-port orientation after moving left.
    reta=[b('down',4),b('back',6),b('home')];retb=[b('up',2),b('back',6),b('home')]
    fill=[b('message','Yellow'),b('message','Blue')]
    for key in TITLES:
        cap=4 if key=='r1' else 3;both=key in ('m3','r1','r2');refill=key in ('m2','m3','r2')
        main=[b('home'),b('show'),b('setspeed',1),b('wait',10),*goa]
        if key=='r2':
            main += [b('message','Red'),b('down',6),b('message','Orange'),b('up',6),b('message','Red'),b('message','Green'),*reta,*fill,*gob,b('message','Orange'),b('message','Purple'),*retb]
        else:
            main += [rep(2,b('message','Red')),b('message','Green')]
            if key=='r1':main += [b('down',6)]
            else:main += reta
            if refill:main += fill
            if both:
                if key!='r1':main += gob
                main += [rep(2,b('message','Orange')),b('message','Purple'),*retb]
        main += [b('say','Sera este gata!' if both else 'Rezervor plin.' if refill else 'Prima plantă este gata.')]
        indicator=[s('onflag',b('home'),b('show'),b('setspeed',1)),s('onmessage',b('back',1),color='Red')]
        if both:indicator.append(s('onmessage',b('back',1),color='Orange'))
        if refill:indicator.append(s('onmessage',b('home'),color='Blue'))
        actors=[actor(art,'statie','statie','Stația de reumplere',75,86)]
        for suffix,color,green,yy in [('a','Red','Green',0),('b','Orange','Purple',144)]:
            active=suffix=='a' or both
            dry=[s('onflag',b('show')),s('onmessage',b('hide'),color=green)] if active else []
            healthy=[s('onflag',b('hide')),s('onmessage',b('show'),color=green)] if active else []
            water=[s('onflag',b('hide')),s('onmessage',b('show'),b('wait',10),b('hide'),b('wait',5),color=color)] if active else []
            actors += [actor(art,'ghiveci'+suffix,'ghiveci'+suffix,'Ghiveciul '+suffix.upper(),360,172+yy),actor(art,'uscata'+suffix,'uscata'+suffix,'Planta '+suffix.upper()+' — ofilită',360,118+yy,dry),actor(art,'vie'+suffix,'vie'+suffix,'Planta '+suffix.upper()+' — udată',360,118+yy,healthy,False),actor(art,'jet'+suffix,'jet','Jetul '+suffix.upper(),334,134+yy,water,False)]
        actors += [actor(art,'robot','robot','Robotul grădinar',96,204,[s('onflag',*main)]),actor(art,'umplere','remplissage','Apa de la stație',72,148,[s('onflag',b('hide')),s('onmessage',b('show'),b('wait',20),b('hide'),color='Yellow')] if refill else [],False),actor(art,'panou','panou'+str(cap),'Scala rezervorului',240,25),actor(art,'indicator','indicator','Indicatorul de apă',192+24*cap,23,indicator)]
        if key=='start':
            for a in actors:a['scripts']=[]
        for a in actors:a['layout']=[[40,30+120*i] for i in range(len(a['scripts']))]
        out[key]=[{'background':art['fundal']['md5'],'focus':'robot','sprites':actors,'texts':[]}]
    return out

def export(key,pages,art):
    title=f'L10 Robotul grădinar - {TITLES[key]} · {REV}'
    record=n.export({'name':title,'short':'Grădinar','path':key+'.sjr','pages':pages});path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={k:z.read(k) for k in z.namelist()}
    data=json.loads(entries['project/data.json'])
    for a in pages[0]['sprites']:
        data['json']['page1']['p1_'+a['id']]['scripts']=[[[sc['trigger']['block'],sc['trigger']['value'],40,30+120*i]]+n.encode(sc['actions'],y=30+120*i) for i,sc in enumerate(a['scripts'])]
    im=Image.new('RGB',(160,120),'#e8f5ef');draw=ImageDraw.Draw(im)
    for y,t,size in [(15,'LECȚIA 10',21),(50,'GRĂDINAR',19),(87,key.upper(),15)]:draw.text((80,y),t,anchor='mt',fill='#285877',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    buf=io.BytesIO();im.save(buf,format='PNG');png=buf.getvalue();entries.pop('project/thumbnails/'+data['thumbnail']['md5']);data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 22:00:00';data['mtime']='1795795200000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png;entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    for k,a in art.items():entries['project/'+('backgrounds' if k=='fundal' else 'characters')+'/'+a['md5']]=a['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for k,v in entries.items():
            info=zipfile.ZipInfo(k,(2026,11,27,22,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,v)
    return {'key':key,'name':title,'file':path.name,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'gradinar.json').write_text(json.dumps({'lesson':10,'title':'Robotul grădinar','duration':60,'revision':REV,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built six native gardening projects.')

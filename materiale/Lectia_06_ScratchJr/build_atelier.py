"""Native ScratchJr workshop: charge, contact cleaning, door handshake, emergency stop."""
from pathlib import Path
from copy import deepcopy
import importlib.util, json, hashlib, zipfile, io
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('inspection',ROOT/'build_inspectie.py')
old=importlib.util.module_from_spec(spec);spec.loader.exec_module(old)
n=old.n;b,s=n.b,n.script
n.ROOT=ROOT/'solutii_atelier'
TITLES={'start':'de la zero','m1':'1. Încărcarea','m2':'2. Curățenia','m3':'3. Deschidem ușa','m4':'4. Atelierul pregătit',
        'creatie':'5. Traseul meu','r1':'R1. Mai puțini pași','r2':'R2. Oprire de urgență'}
REV='v3.1'
def assets():
    raw={key:((ROOT/'resurse_robotica/native'/f'{key}.svg').read_bytes(),*size) for key,size in [('robot',(96,102)),('atelier',(480,360))]}
    # Native vector equipment matches the existing teal/orange visual set.
    charger=old.svg(200,160,'<path d="M8 147L21 18H179L192 147Z" fill="#116b7d" stroke="#213e4d" stroke-width="5"/><rect x="27" y="12" width="146" height="65" rx="8" fill="#173847" stroke="#b0e1df" stroke-width="4"/><rect x="174" y="32" width="9" height="24" rx="2" fill="#b0e1df"/><rect x="38" y="24" width="32" height="40" rx="3" fill="#314b59"/><rect x="84" y="24" width="32" height="40" rx="3" fill="#314b59"/><rect x="130" y="24" width="32" height="40" rx="3" fill="#314b59"/><path d="M99 85L82 111H99L91 135L121 102H105L114 85Z" fill="#ffcb47"/><rect x="0" y="140" width="200" height="17" rx="5" fill="#4b6977" stroke="#203b48" stroke-width="4"/><path d="M2 133H24V107H36" fill="none" stroke="#ffbc36" stroke-width="8"/>')
    bar=old.svg(32,40,'<rect x="1" y="1" width="30" height="38" rx="3" fill="#45e2a3"/><rect x="4" y="4" width="6" height="30" rx="2" fill="#b1ffce"/>')
    debris=old.svg(40,30,'<ellipse cx="21" cy="26" rx="18" ry="3" fill="#829ba8" opacity="0.4"/><path d="M4 14L14 9L20 17L10 23Z" fill="#ffa92b" stroke="#7c572a" stroke-width="2"/><path d="M21 5L32 4L36 15L24 18Z" fill="#bacbd3" stroke="#425968" stroke-width="2"/><path d="M22 20L30 17L35 23L26 27Z" fill="#ffce59" stroke="#7c572a" stroke-width="2"/>')
    switch=old.svg(48,54,'<rect x="3" y="8" width="42" height="43" rx="8" fill="#294b5a" stroke="#173745" stroke-width="3"/><circle cx="24" cy="25" r="15" fill="#48d8ad" stroke="#d0fff0" stroke-width="3"/><path d="M17 27L24 19L31 27M24 20V35" fill="none" stroke="#195369" stroke-width="4"/>')
    frame=old.svg(112,190,'<rect x="6" y="4" width="100" height="182" rx="7" fill="#29434e" stroke="#16333f" stroke-width="4"/><rect x="15" y="20" width="82" height="164" fill="#718e9d"/><path d="M8 182H104" stroke="#ffca41" stroke-width="8"/><path d="M7 28H14M7 58H14M7 88H14M7 118H14M7 148H14M98 28H105M98 58H105M98 88H105M98 118H105M98 148H105" stroke="#ffbc3b" stroke-width="7"/><circle cx="56" cy="12" r="5" fill="#46e6b0"/>')
    door=old.svg(86,142,'<rect x="2" y="2" width="82" height="138" rx="4" fill="#04a5b1" stroke="#153d4b" stroke-width="4"/><path d="M5 28H81M5 54H81M5 80H81M5 106H81" stroke="#197181" stroke-width="5"/><path d="M8 8H78M8 34H78M8 60H78M8 86H78" stroke="#78d3d7" stroke-width="3"/><rect x="6" y="123" width="74" height="12" rx="3" fill="#ffc64b"/><path d="M17 125L24 133M37 125L44 133M57 125L64 133" stroke="#3c5260" stroke-width="5"/>')
    emergency=old.svg(60,60,'<rect x="3" y="5" width="54" height="52" rx="9" fill="#ffcb43" stroke="#42515e" stroke-width="4"/><circle cx="30" cy="29" r="21" fill="#851c28"/><circle cx="30" cy="25" r="19" fill="#ef4850" stroke="#ffd8d5" stroke-width="2"/><rect x="19" y="21" width="22" height="8" rx="2" fill="white"/>')
    raw.update({'incarcator':(charger,200,160),'segment':(bar,32,40),'rest':(debris,40,30),'buton':(switch,48,54),'cadru':(frame,112,190),'usa':(door,86,142),'urgenta':(emergency,60,60)})
    folder=ROOT/'resurse_atelier';folder.mkdir(exist_ok=True);result={}
    for key,(data,w,h) in raw.items():
        (folder/(key+'.svg')).write_bytes(data)
        result[key]={'md5':hashlib.md5(data).hexdigest()+'.svg','size':(w,h),'data':data}
    return result
def a(art,key,asset,x,y,programs=(),shown=True,name=None,scale=1):
    result=old.actor(key,art[asset],x,y,list(programs),scale,name or key)
    result['shown']=shown
    return result
def charge(art,link=False):
    end=[b('gotopage',2)] if link else [b('say','Încărcat!')]
    actors=[a(art,'robot','robot',60,252,[s('onflag',b('home'),b('forward',4),b('message','Orange'),b('back',4),*end)],name='Robot',scale=.85),
            a(art,'incarcator','incarcator',300,216,[s('onmessage',b('message','Yellow'),b('playsnd','pop.mp3'),color='Orange')],name='Încărcător')]
    for i,x in enumerate([254,300,346],1):
        actors.append(a(art,'segment'+str(i),'segment',x,180,[s('onflag',b('hide')),s('onmessage',b('wait',10*i),b('show'),color='Yellow')],shown=False,name=f'Segment {i}'))
    return {'background':art['atelier']['md5'],'focus':'robot','sprites':actors,'texts':[]}
def workshop(art,key):
    clean=True;full=key not in ('m2',);emergency=key=='r2'
    route=[b('forward',4),b('up',3 if key=='r1' else 4),b('forward',4),b('down',3 if key=='r1' else 4)]
    if key=='creatie':route=[b('up',4),b('forward',8),b('down',4)]
    door_route=[b('forward',2),b('message','Blue'),b('forward',5),b('say','Atelier pregătit!')]
    robot=[s('onflag',b('home'),*([*route] if clean else []),*(door_route if full else [b('say','Curat!')]))]
    if emergency:robot.append(s('onmessage',b('stopmine'),b('say','Oprit!'),color='Red'))
    # Frame first keeps it behind the moving shutter and robot.
    actors=[a(art,'cadru','cadru',414,260,name='Cadrul ușii'),
            a(art,'usa','usa',414,272,([s('onflag',b('home')),s('onmessage',b('up',5),color='Purple')]+([s('onmessage',b('stopmine'),color='Red')] if emergency else [])) if full else [],name='Ușă'),
            a(art,'robot','robot',60,300,robot,name='Robot',scale=.85),
            a(art,'buton','buton',324,300,[s('onmessage',b('playsnd','pop.mp3'),b('message','Purple'),color='Blue')] if full else [],name='Buton verde')]
    if clean:
        positions=[(156,300),(156,204),(252,204)] if key!='creatie' else [(156,204),(252,204),(252,300)]
        for i,(x,y) in enumerate(positions,1):
            actors.append(a(art,'rest'+str(i),'rest',x,y,[s('onflag',b('show')),s('ontouch',b('hide'),b('playsnd','pop.mp3'))],name=f'Rest {i}'))
    if emergency:actors.append(a(art,'urgenta','urgenta',60,180,[s('onclick',b('message','Red'))],name='Oprire de urgență'))
    return {'background':art['atelier']['md5'],'focus':'robot','sprites':actors,'texts':[]}
def make_projects(art):
    p={'m1':[charge(art)],'m2':[workshop(art,'m2')],'m3':[workshop(art,'m3')]}
    for key in ('m4','creatie','r1','r2'):p[key]=[charge(art,True),workshop(art,key)]
    starter=deepcopy(p['r2'])
    for page in starter:
        for actor in page['sprites']:actor['scripts']=[]
    p['start']=starter
    return {key:p[key] for key in TITLES}
def export(key,pages,art):
    title=f'L06 Pregătim atelierul - {TITLES[key]} · {REV}'
    record=n.export({'name':title,'short':'Atelierul','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={k:z.read(k) for k in z.namelist()}
    data=json.loads(entries['project/data.json'])
    # Three short scripts use two rows and a third column, all visible in the editor.
    for pid in data['json']['pages']:
        for sid in data['json'][pid]['sprites']:
            for i,program in enumerate(data['json'][pid][sid].get('scripts',[])):
                if i==2:
                    for block in program:block[2]+=650;block[3]-=95
    im=Image.new('RGB',(160,120),'#d9f0ed');draw=ImageDraw.Draw(im)
    for y,t,size in [(18,'LECȚIA 6',22),(53,'ATELIERUL',19),(87,key.upper(),14)]:draw.text((80,y),t,anchor='mt',fill='#14546a',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    buf=io.BytesIO();im.save(buf,format='PNG');png=buf.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5']);data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 15:00:00';data['mtime']='1795780800000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png;entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    used={a['asset'] for page in pages for a in page['sprites']}|{page['background'] for page in pages}
    for k,v in art.items():
        if v['md5'] in used:entries['project/'+('backgrounds' if k=='atelier' else 'characters')+'/'+v['md5']]=v['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for k,v in entries.items():
            info=zipfile.ZipInfo(k,(2026,11,27,15,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,v)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}
if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'atelier.json').write_text(json.dumps({'lesson':6,'title':'Robotul pregătește atelierul','duration':60,'revision':REV,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built eight native workshop projects with embedded assets.')

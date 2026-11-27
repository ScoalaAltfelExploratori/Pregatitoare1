"""Package the original robot artwork and native contact-driven ScratchJr programs."""
from pathlib import Path
from copy import deepcopy
import base64,hashlib,importlib.util,io,json,zipfile
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('native',ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
n.ROOT=ROOT/'solutii_inspectie'
b,s=n.b,n.script
ART=ROOT/'resurse_robotica'
TITLES={'start':'de la zero','m1':'1. Frâna de siguranță','m2':'2. Retragere și ocolire','m3':'3. Inspecția completă',
        'creatie':'4. Ocolul meu','r1':'R1. Robotul merge mai repede','r2':'R2. Două zone închise'}
def svg(w,h,body):return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g id="layer1">{body}</g></svg>'.encode()
def assets():
    # Keep original pixels untouched; SVG placement fits their nontransparent
    # silhouette to the native character canvas, like a camera-image character.
    im=Image.open(ART/'robot-inspectie.png');box=im.getchannel('A').getbbox()
    x,y,right,bottom=box;factor=96/(right-x);height=round((bottom-y)*factor)
    pic=base64.b64encode((ART/'robot-inspectie.png').read_bytes()).decode()
    robot=svg(96,height,f'<image id="robot-image" x="{-x*factor:.4f}" y="{-y*factor:.4f}" width="{im.width*factor:.4f}" height="{im.height*factor:.4f}" xlink:href="data:image/png;base64,{pic}"/>')
    pic=base64.b64encode((ART/'atelier-robotica.png').read_bytes()).decode()
    background=svg(480,360,f'<image id="atelier-image" x="0" y="0" width="480" height="360" xlink:href="data:image/png;base64,{pic}"/>')
    def barrier(w):
        return svg(w,64,f'<rect x="{w/2-3}" y="4" width="6" height="56" rx="2" fill="#3c4b54"/><rect x="2" y="9" width="{w-4}" height="44" rx="3" fill="#f2a42b" stroke="#34434b" stroke-width="2"/><path d="M4 19H{w-4} M4 35H{w-4} M4 49H{w-4}" stroke="#34434b" stroke-width="7"/><rect x="0" y="58" width="{w}" height="6" rx="2" fill="#34434b"/>')
    dock=svg(64,80,'<rect x="9" y="3" width="46" height="67" rx="7" fill="#28545a" stroke="#16363b" stroke-width="3"/><rect x="16" y="11" width="32" height="28" rx="3" fill="#b7e5df"/><path d="M23 24L30 31L42 18" fill="none" stroke="#247860" stroke-width="4"/><rect x="19" y="46" width="26" height="7" rx="3" fill="#f2a42b"/><rect x="0" y="68" width="64" height="11" rx="3" fill="#748b8e" stroke="#34434b" stroke-width="2"/>')
    raw={'robot':(robot,96,height),'atelier':(background,480,360),'bariera':(barrier(24),24,64),'statie':(dock,64,80)}
    result={};folder=ART/'native';folder.mkdir(exist_ok=True)
    for key,(data,w,h) in raw.items():
        md5=hashlib.md5(data).hexdigest()+'.svg';(folder/(key+'.svg')).write_bytes(data)
        result[key]={'md5':md5,'data':data,'size':(w,h)}
    return result
def actor(key,art,x,y,programs,scale,name):
    return {'id':key,'asset':art['md5'],'name':name,'size':list(art['size']),'position':[x,y],'scale':scale,'shown':True,'scripts':programs}
def make_projects(art):
    projects={}
    for key in TITLES:
        complete=key not in ('m1','m2');speed=[b('setspeed',2)] if key=='r1' else []
        robot=[s('onflag',*speed,b('forward',20))]
        reaction=[b('stopmine'),b('back',1)]
        if key!='m1':reaction += [b('playsnd','pop.mp3'),b('up',4 if key=='creatie' else 3),b('forward',5),b('down',4 if key=='creatie' else 3)]
        if key=='m2':reaction += [b('say','Cale liberă!')]
        if complete:reaction += [b('forward',20)]
        robot += [s('onmessage',*reaction,color='Orange')]
        if complete:robot += [s('onmessage',b('stopmine'),b('back',1),b('say','Inspecție gata!'),color='Blue')]
        actors=[actor('robot',art['robot'],72,272,robot,.6,'Robot de inspecție'),
                actor('bariera',art['bariera'],180 if key=='r2' else 204 if key=='creatie' else 228,272,[s('ontouch',b('message','Orange'))],.75,'Barieră')]
        actors += [actor('statie',art['statie'],444,272,[s('ontouch',b('message','Blue'))] if complete else [],.75,'Stație de control')]
        actors += [actor('bariera2',art['bariera'],324 if key=='r2' else 72,272 if key=='r2' else 128,[s('ontouch',b('message','Orange'))] if key=='r2' else [],.75,'Bariera 2')]
        if key=='start':
            for a in actors:a['scripts']=[]
        projects[key]=[{'background':art['atelier']['md5'],'focus':'robot','sprites':actors,'texts':[]}]
    return projects
def export(key,pages,art):
    title='L06 Robotul de inspecție - '+TITLES[key]+' · 60 min'
    record=n.export({'name':title,'short':'Inspecție','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={name:z.read(name) for name in z.namelist()}
    data=json.loads(entries['project/data.json'])
    for pageid in data['json']['pages']:
        page=data['json'][pageid]
        for sid in page['sprites']:
            for i,program in enumerate(page[sid].get('scripts',[])):
                if i==2:
                    for block in program:block[2]+=720;block[3]-=95
    thumb=Image.new('RGB',(160,120),'#dceced');d=ImageDraw.Draw(thumb)
    for y,text,size in [(20,'LECȚIA 6',23),(65,'INSPECȚIE',21)]:d.text((80,y),text,anchor='mt',fill='#14546a',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    stream=io.BytesIO();thumb.save(stream,format='PNG');png=stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5']);data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 12:00:00';data['mtime']='1795780800000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    used={a['asset'] for a in pages[0]['sprites']}|{pages[0]['background']}
    for k,a in art.items():
        if a['md5'] in used:entries['project/'+('backgrounds' if k=='atelier' else 'characters')+'/'+a['md5']]=a['data']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for name,content in entries.items():
            info=zipfile.ZipInfo(name,(2026,11,27,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,content)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}
if __name__=='__main__':
    art=assets();records=[export(k,p,art) for k,p in make_projects(art).items()]
    (ROOT/'inspectie.json').write_text(json.dumps({'lesson':6,'title':'Robotul de inspecție','duration':60,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven native projects, with embedded original artwork and contact-driven programs.')

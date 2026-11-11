"""Build native, editable ScratchJr projects using the bundled asset library."""
from pathlib import Path
from copy import deepcopy
import json, zipfile, hashlib, io, re
from urllib.parse import urljoin
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
ASSETS = {'Rabbit': (217,208), 'Dog': (296,213), 'Ball': (126,129), 'Butterfly': (128,97)}
def b(kind, value='null'): return {'block':kind, 'value':value}
def repeat(n, *body): return {'repeat':n, 'body':list(body)}
def script(trigger, *actions, color='null'): return {'trigger':b(trigger,color),'actions':list(actions)}
def actor(key, asset, x, y, *scripts, scale=.4, shown=True, name=None):
    return {'id':key,'asset':asset+'.svg','name':name or asset,'size':ASSETS[asset],
            'position':[x,y],'scale':scale,'shown':shown,'scripts':list(scripts)}
def label(text,x,y,size=24,color='#1b2a34'):
    return {'text':text,'position':[x,y],'size':size,'color':color}
def guide(page, channel, next_page, ending=False):
    page['sprites'].append(actor('ghid','Butterfly',420,300,
        script('onflag',b('hide')),script('onmessage',b('show'),color=channel),
        script('onclick',b('gotopage',next_page)),scale=.65,shown=False,name='Inca o data' if ending else 'Ghid spre scena urmatoare'))
    page['texts'].append(label('Inca o data' if ending else 'Urmeaza fluturele',390,343,16,
                               '#f2f3f2' if page['background']=='Theatre.svg' else '#1b2a34'))

def pages():
    p1={'background':'Park.svg','sprites':[
        actor('iepuras','Rabbit',144,165,script('onclick',b('home'),b('forward',2),b('message','Orange')),scale=.32,name='Iepurasul organizator'),
        actor('prieten','Dog',365,195,scale=.3,name='Prietenul din parc')],
        'texts':[label('1. Drumul spre parc',240,28),label('Plecam de la 3. Intrarea este la 5.',240,65,24),
                 label('PARC',192,260,16,'#287f46')]}
    p1['texts'] += [label(str(i),72+24*i,225,24 if i==5 else 16,'#287f46' if i==5 else '#1b2a34') for i in range(11)]
    guide(p1,'Orange',2)
    p2={'background':'Theatre.svg','sprites':[
        actor('organizator','Rabbit',80,230,script('onclick',b('message','Orange')),scale=.35,name='Iepurasul organizator'),
        actor('magician','Dog',325,230,script('onmessage',repeat(2,b('grow',2),b('wait',5),b('shrink',2)),b('message','Blue'),color='Orange'),scale=.28,name='Magicianul')],
        'texts':[label('2. Pregatim scena',240,28,24,'#f2f3f2'),label('4 artisti, cate o minge. Avem 7 mingi.',240,65,24)]}
    for i in range(7):
        actions=[script('onflag',b('show'))]
        if i>=4: actions.append(script('onmessage',b('hide'),color='Orange'))
        p2['sprites'].append(actor('minge'+str(i+1),'Ball',60+i*60,135,*actions,scale=.28,name='Minge '+str(i+1)))
    guide(p2,'Blue',3)
    p3={'background':'Park.svg','sprites':[
        actor('iepuras','Rabbit',140,180,script('onclick',repeat(2,b('playsnd','pop.mp3'),b('wait',3)),b('wait',10),b('message','Orange')),scale=.4,name='Doua sunete'),
        actor('caine','Dog',340,180,script('onmessage',repeat(3,b('playsnd','pop.mp3'),b('wait',3)),b('message','Blue'),color='Orange'),scale=.32,name='Completeaza semnalul')],
        'texts':[label('3. Chemam publicul',240,28),label('Semnalul are 5 batai. Iepurasul face 2.',240,65,24),
                 label('Catelul completeaza.',240,235,24)]}
    guide(p3,'Blue',4)
    p4={'background':'Theatre.svg','sprites':[
        actor('regizor','Butterfly',55,300,script('onclick',b('message','Orange'),b('wait',10),b('message','Blue'),b('wait',10),b('playsnd','pop.mp3'),b('message','Purple')),scale=.55,name='Dirijorul spectacolului')],
        'texts':[label('4. Incepe spectacolul!',240,28,24,'#f2f3f2'),label('4 artisti. Vin 3 prieteni; 2 ies la culise.',240,65,24),
                 label('Cati artisti raman pentru salut?',240,265,24,'#f2f3f2')]}
    for i in range(4):
        scripts=[script('onflag',b('show'))]
        if i<2:scripts.append(script('onmessage',b('hide'),color='Blue'))
        p4['sprites'].append(actor('iepuras'+str(i+1),'Rabbit',90+100*i,145,*scripts,scale=.28,name='Iepuras '+str(i+1)))
    for i in range(3):
        p4['sprites'].append(actor('caine'+str(i+1),'Dog',120+120*i,210,script('onflag',b('hide')),script('onmessage',b('show'),color='Orange'),scale=.25,shown=False,name='Catel '+str(i+1)))
    guide(p4,'Purple',1,True)
    return [p1,p2,p3,p4]

def encode(cmds,x=113,y=60):
    result=[]
    for c in cmds:
        if 'repeat' in c:
            result.append(['repeat',c['repeat'],x,y-15.6,encode(c['body'],x+35,y)]);x+=64+65*len(c['body'])
        else:result.append([c['block'],c['value'],x,y]);x+=65
    return result

def export(entry):
    thumb_image=Image.new('RGB',(160,120),'#e6f3e9');draw=ImageDraw.Draw(thumb_image)
    font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',26)
    draw.text((80,28),'LECTIA 0',font=font,fill='#173e3a',anchor='mt')
    draw.text((80,72),entry['short'],font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18),fill='#173e3a',anchor='mt')
    stream=io.BytesIO();thumb_image.save(stream,format='PNG');png=stream.getvalue();thumb=hashlib.md5(png).hexdigest()+'.png'
    pages={}
    for number,spec in enumerate(entry['pages'],1):
        prefix='p'+str(number)+'_'
        ids=[prefix+s['id'] for s in spec['sprites']];page={'textstartat':36,'sprites':ids.copy(),'md5':spec['background'],'num':number,'lastSprite':ids[0],'layers':ids.copy()}
        for s in spec['sprites']:
            w,h=s['size'];x,y=s['position'];scale=s.get('scale',.5);shown=s.get('shown',True)
            programs=[]
            for i,sc in enumerate(s['scripts']):
                row=20+95*i;trigger=sc['trigger']
                programs.append([[trigger['block'],trigger['value'],40,row]]+encode(sc['actions'],y=row))
            page[prefix+s['id']]={'shown':shown,'type':'sprite','md5':s['asset'],'id':prefix+s['id'],'flip':False,'name':s['name'],
                'angle':0,'scale':scale,'speed':2,'defaultScale':scale,'sounds':['pop.mp3'],'xcoor':x,'ycoor':y,
                'cx':w/2,'cy':h/2,'w':w,'h':h,'homex':x,'homey':y,'homescale':scale,'homeshown':shown,'homeflip':False,'scripts':programs}
        for i,t in enumerate(spec.get('texts',[])):
            key=prefix+'Text'+str(i+1);x,y=t['position'];size=t['size']
            font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',size);width=font.getlength(t['text'])+8;height=size*1.35
            page[key]={'shown':True,'type':'text','id':key,'scale':1,'defaultScale':1,'speed':2,'dirx':1,'diry':1,'angle':0,
                       'homex':x,'homey':y,'xcoor':x,'ycoor':y,'str':t['text'],'color':t['color'],'fontsize':size,'cx':width/2,'cy':height/2,'w':width,'h':height}
            page['sprites'].append(key);page['layers'].append(key)
        pages['page'+str(number)]=page
    project={'pages':list(pages),'currentPage':'page1',**pages}
    bag={'name':entry['name'],'version':'iOSv01','mtime':'1794400000000','ctime':'2026-11-11 13:00:00','deleted':'NO','isgift':'1','thumbnail':{'pagecount':len(pages),'md5':thumb},'json':project}
    dest=ROOT/entry['path'];dest.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
        for path,data in [('project/data.json',json.dumps(bag,ensure_ascii=False).encode()),('project/thumbnails/'+thumb,png)]:
            info=zipfile.ZipInfo(path,(2026,11,11,13,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
    with zipfile.ZipFile(dest) as z:
        assert z.testzip() is None
        restored=json.loads(z.read('project/data.json'))['json']
        assert restored==project
        seen=set()
        for page_id in restored['pages']:
            page=restored[page_id]
            for sprite_id in page['sprites']:
                assert sprite_id not in seen,sprite_id
                seen.add(sprite_id)
                assert sprite_id in page and page[sprite_id]['id']==sprite_id
    return {'path':entry['path'],'name':entry['name'],'pages':entry['pages'],'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}

def build():
    full=pages();starter=deepcopy(full)
    for page,key in zip(starter,['iepuras','organizator','iepuras','regizor']):
        next(s for s in page['sprites'] if s['id']==key)['scripts']=[script('onclick')]
    projects=[{'name':'L00 Spectacolul din parc','short':'Povestea','path':'proiecte/00_Laboratorul_ScratchJr.sjr','pages':full},
              {'name':'L00 Construim spectacolul','short':'Construim','path':'proiecte/01_Construim_impreuna.sjr','pages':starter}]
    for lesson,oldpath,name,short,newpath in [
        (6,'04_Rezerva_Comoara.sjr','L00 Rezerva Contact','Contact','02_Rezerva_Contact.sjr'),
        (8,'03_Regizorul_statuilor.sjr','L00 Rezerva Statui','Statui','03_Rezerva_Statui.sjr')]:
        source=json.loads((ROOT.parent/f'Lectia_{lesson:02d}_ScratchJr/lesson.json').read_text(encoding='utf-8-sig'))
        model=next(p for p in source['projects'] if p['path'].endswith(oldpath))
        projects.append({'name':name,'short':short,'path':'proiecte/'+newpath,'pages':deepcopy(model['pages'])})
    records=[export(p) for p in projects]
    (ROOT/'lesson.json').write_text(json.dumps({'lesson':0,'title':'Pregatim spectacolul din parc','duration':50,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built',len(records),'native ScratchJr projects.')

def package():
    public='https://scoalaaltfelexploratori.github.io/Pregatitoare1/materiale/Lectia_00_ScratchJr/'
    with zipfile.ZipFile(ROOT.with_suffix('.zip'),'w',zipfile.ZIP_DEFLATED) as z:
        for source in sorted(ROOT.rglob('*')):
            if not source.is_file() or '__pycache__' in source.parts:continue
            rel=source.relative_to(ROOT).as_posix()
            data=source.read_bytes()
            if source.suffix=='.md':
                text=data.decode('utf-8')
                text=re.sub(r'\]\((\.\./\.\./[^)]+)\)',lambda m:']('+urljoin(public+rel,m[1])+')',text)
                data=text.encode('utf-8')
            z.writestr(ROOT.name+'/'+rel,data)
    print('Packaged teacher download.')

if __name__=='__main__':
    import sys
    if '--package-only' not in sys.argv:build()
    package()

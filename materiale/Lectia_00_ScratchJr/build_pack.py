"""Build native, editable ScratchJr projects using the bundled asset library."""
from pathlib import Path
from copy import deepcopy
import json, zipfile, hashlib, io, re
from urllib.parse import urljoin
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
ASSETS = {'Rabbit': (217,208), 'Dog': (296,213), 'Ball': (126,129), 'Butterfly': (128,97), 'Chicken':(142,148), 'House3':(286,323), 'Fence':(219,123), 'Table':(399,248), 'Tree1':(284,348), 'Apple':(112,132), 'Duck':(155,116), 'Bird':(146,210), 'Thundercloud':(344,270), 'Sun':(176,176)}
def b(kind, value='null'): return {'block':kind, 'value':value}
def repeat(n, *body): return {'repeat':n, 'body':list(body)}
def script(trigger, *actions, color='null'): return {'trigger':b(trigger,color),'actions':list(actions)}
def actor(key, asset, x, y, *scripts, scale=.4, shown=True, name=None):
    return {'id':key,'asset':asset+'.svg','name':name or asset,'size':ASSETS[asset],
            'position':[x,y],'scale':scale,'shown':shown,'scripts':list(scripts)}
def label(text,x,y,size=24,color='#1b2a34'):
    return {'text':text,'position':[x,y],'size':size,'color':color}
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
        ids=[prefix+s['id'] for s in spec['sprites']];page={'textstartat':36,'sprites':ids.copy(),'md5':spec['background'],'num':number,'lastSprite':prefix+spec.get('focus',spec['sprites'][0]['id']),'layers':ids.copy()}
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
    bag={'name':entry['name'],'version':'iOSv01','mtime':'1794400000000','ctime':'2026-11-12 12:00:00','deleted':'NO','isgift':'1','thumbnail':{'pagecount':len(pages),'md5':thumb},'json':project}
    dest=ROOT/entry['path'];dest.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
        for path,data in [('project/data.json',json.dumps(bag,ensure_ascii=False).encode()),('project/thumbnails/'+thumb,png)]:
            info=zipfile.ZipInfo(path,(2026,11,12,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
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
    from story import make_story
    from bonus import make_bonus
    full,shortcut,dance=make_story(actor,script,b,label,repeat)
    starter=deepcopy(full)
    for page in starter:
        for key,index in page["build"]:
            next(s for s in page["sprites"] if s["id"]==key)["scripts"][index]["actions"]=[]
    projects=[{"name":"L00 Picnicul intrerupt de ploaie","short":"Picnicul","path":"proiecte/00_Laboratorul_ScratchJr.sjr","pages":full},
              {"name":"L00 Construim picnicul","short":"Construim","path":"proiecte/01_Construim_impreuna.sjr","pages":starter},
              {"name":"L00 Rezerva Ocolul cu Repeat","short":"Ocolul","path":"proiecte/02_Rezerva_Contact.sjr","pages":[shortcut]},
              {"name":"L00 Rezerva Dans si statui","short":"Dansul","path":"proiecte/03_Rezerva_Statui.sjr","pages":[dance]}]
    projects.extend(make_bonus(full,script,b,label))
    records=[export(p) for p in projects]
    (ROOT/'lesson.json').write_text(json.dumps({'lesson':0,'title':'Picnicul întrerupt de ploaie','duration':50,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
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
    from render_guides import render_all
    if '--package-only' not in sys.argv:build()
    render_all()
    package()

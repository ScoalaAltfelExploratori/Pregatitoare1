"""Native ScratchJr bus journeys using only the bundled asset catalogue."""
from pathlib import Path
from copy import deepcopy
import importlib.util
import json, zipfile, hashlib, io
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native', ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n = importlib.util.module_from_spec(spec); spec.loader.exec_module(n)
n.ROOT = ROOT/'solutii_autobuz'
n.ASSETS.update({'Bus':(600,319),'Girl1':(133,318),'Boy2':(156,309),'Girl3':(145,298)})
b,s = n.b,n.script
KIDS = [('ana','Girl1','Ana',144,10),('dan','Boy2','Dan',192,8),('mara','Girl3','Mara',240,6)]
TITLES = {'m1':'1. Primul pasager','m2':'2. Prima cursă','m3':'3. Nimeni nu rămâne în urmă',
          'creatie':'4. Excursia mea','r1':'R1. Pasagerul mai lent','r2':'R2. Două opriri'}

def departure(key):
    kids = KIDS[:1] if key in ('m1','m2') else KIDS
    go = [b('message','Orange')]
    if key != 'm1': go += [b('forward',4),b('gotopage',2)]
    sprites = [n.actor('bus','Bus',348,264,s('onflag',b('home')),s('onclick',*go),scale=.28,name='Autobuz')]
    for ident,asset,name,x,steps in kids:
        actions = ([b('setspeed',0)] if key=='r1' and ident=='mara' else [])
        actions += [b('forward',steps),b('hide')]
        sprites.append(n.actor(ident,asset,x,264,s('onflag',b('home'),b('show')),
                              s('onmessage',*actions,color='Orange'),scale=.25,name=name))
    return {'background':'Suburbs.svg','focus':'bus','sprites':sprites,
            'texts':[n.label('1. Urcăm în autobuz',240,25,20)]}

def arrival(kids,background='BeachDay.svg',next_page=None,leaving=None,creative=False):
    leaving = set(leaving or [k[0] for k in kids])
    actions = [b('home'),b('message','Orange'),b('forward',4),b('message','Blue')]
    if next_page: actions += [b('forward',8),b('gotopage',next_page)]
    sprites = [n.actor('bus','Bus',84,264,s('onflag',*actions),scale=.28,name='Autobuz')]
    for i,(ident,asset,name,_,_) in enumerate(kids):
        programs = [s('onmessage',b('hide'),b('home'),color='Orange')]
        if ident in leaving:
            steps={'ana':2,'dan':4,'mara':6}[ident]
            route=[b('show'),b('forward',steps)]
            if ident=='ana': route += [b('up',2)]
            if ident=='mara': route += [b('down',2)]
            if creative: route += [b('up',1)]
            programs += [s('onmessage',*route,color='Blue')]
        sprites.append(n.actor(ident,asset,216,264,*programs,scale=.25,shown=False,name=name))
    return {'background':background,'focus':'bus','sprites':sprites,
            'texts':[n.label('Oprire în parc' if background=='Park.svg' else 'Am ajuns la plajă',240,25,20)]}

def make_projects():
    projects={}
    for key in TITLES:
        pages=[departure(key)]
        if key=='m2':pages.append(arrival(KIDS[:1]))
        elif key in ('m3','r1'):pages.append(arrival(KIDS))
        elif key=='creatie':pages.append(arrival(KIDS,'Park.svg',creative=True))
        elif key=='r2':pages += [arrival(KIDS,'Park.svg',3,['ana']),arrival(KIDS[1:])]
        projects[key]=pages
    starter=deepcopy(projects['m2'])
    for page in starter:
        for actor in page['sprites']:actor['scripts']=[];actor['shown']=True
    projects['start']=starter
    return projects

def export(key,pages):
    title='L03 Autobuzul - '+TITLES.get(key,'de la zero')+' · 60 min'
    record=n.export({'name':title,'short':'Autobuzul','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={name:z.read(name) for name in z.namelist()}
    data=json.loads(entries['project/data.json'])
    thumb=Image.new('RGB',(160,120),'#eaf4f7');draw=ImageDraw.Draw(thumb)
    for y,text,size in [(20,'LECȚIA 3',23),(65,'AUTOBUZUL',19)]:
        draw.text((80,y),text,anchor='mt',fill='#14546a',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    stream=io.BytesIO();thumb.save(stream,format='PNG');png=stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-18 10:00:00';data['mtime']='1794996000000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for name,contents in entries.items():
            info=zipfile.ZipInfo(name,(2026,11,18,10,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,contents)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    records=[export(key,pages) for key,pages in make_projects().items()]
    (ROOT/'autobuz.json').write_text(json.dumps({'lesson':3,'title':'Autobuzul spre plajă','duration':60,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven editable projects with bundled assets only.')

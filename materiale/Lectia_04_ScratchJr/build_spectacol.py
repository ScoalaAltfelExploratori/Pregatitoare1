"""Editable native ScratchJr rehearsals; only bundled characters, Theatre and Pop."""
from pathlib import Path
from copy import deepcopy
import importlib.util
import json, zipfile, hashlib, io
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native', ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n = importlib.util.module_from_spec(spec); spec.loader.exec_module(n)
n.ROOT = ROOT/'solutii_spectacol'
n.ASSETS.update({'TeenGirl1':(168,363),'TeenBoy1':(144,407),'Mother':(224,418)})
b,s,r = n.b,n.script,n.repeat
TITLES={'m1':'1. Ritmul primului artist','m2':'2. Răspunsul colegului',
        'm3':'3. Două runde, un singur start','creatie':'4. Spectacolul meu',
        'r1':'R1. Ecoul fidel','r2':'R2. Bis în ordine inversă'}

def beat(): return [b('playsnd','pop.mp3'),b('hop',1)]

def make_projects():
    projects={}
    for key in TITLES:
        if key=='m1':
            a=[s('onflag',r(3,*beat(),*beat(),b('wait',10)))]; c=[]
        elif key=='m2':
            a=[s('onflag',r(2,*beat()),b('message','Blue'))]; c=[]
        else:
            a=[s('onmessage',r(3 if key=='creatie' else 2,*beat()),color='Orange')]
            ending=([b('message','Blue'),b('message','Orange')] if key=='r2' else [])
            c=[s('onclick',r(2,b('message','Orange'),b('message','Blue')),*ending,b('say','Gata!'))]
        bb=[s('onmessage',r(2 if key=='creatie' else 3,*beat()),color='Blue')]
        if key=='r1':
            motif=[*beat(),b('wait',10),*beat()]
            a=[s('onmessage',*motif,color='Orange')]
            bb=[s('onmessage',*deepcopy(motif),color='Blue')]
        if key=='creatie':
            bb=[s('onmessage',r(2,*beat(),b('wait',5)),color='Blue')]
        sprites=[n.actor('a','TeenGirl1',144,216,*a,scale=.32,name='Mira - A')]
        if key!='m1':sprites.append(n.actor('b','TeenBoy1',336,216,*bb,scale=.29,name='Radu - B'))
        if c:sprites.append(n.actor('dir','Mother',240,276,*c,scale=.24,name='Dirijoare'))
        projects[key]=[{'background':'Theatre.svg','focus':'a' if key in ('m1','m2') else 'dir','sprites':sprites,
                        'texts':[n.label('Repetiția pentru spectacol',240,24,20)]}]
    projects['start']=deepcopy(projects['m3'])
    for actor in projects['start'][0]['sprites']:actor['scripts']=[]
    return projects

def export(key,pages):
    title='L04 Repetiția - '+TITLES.get(key,'de la zero')+' · 60 min'
    record=n.export({'name':title,'short':'Repetiția','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={name:z.read(name) for name in z.namelist()}
    data=json.loads(entries['project/data.json'])
    thumb=Image.new('RGB',(160,120),'#eaf4f7');draw=ImageDraw.Draw(thumb)
    for y,text,size in [(20,'LECȚIA 4',23),(65,'REPETIȚIA',19)]:
        draw.text((80,y),text,anchor='mt',fill='#14546a',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    stream=io.BytesIO();thumb.save(stream,format='PNG');png=stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 10:00:00';data['mtime']='1795773600000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for name,contents in entries.items():
            info=zipfile.ZipInfo(name,(2026,11,27,10,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,contents)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    records=[export(key,pages) for key,pages in make_projects().items()]
    (ROOT/'spectacol.json').write_text(json.dumps({'lesson':4,'title':'Repetiția pentru spectacol','duration':60,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven native projects using bundled assets only.')

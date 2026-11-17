"""Native ScratchJr reference projects. All stage assets come from its library."""
from pathlib import Path
from copy import deepcopy
import importlib.util
import json
import zipfile
import io
import hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native', ROOT.parent / 'Lectia_00_ScratchJr/build_pack.py')
n = importlib.util.module_from_spec(spec)
spec.loader.exec_module(n)
n.ROOT = ROOT / 'solutii_stafeta'
b, s = n.b, n.script

def page(title, first=4, second=6, obstacle=False, complete=True, third=False):
    bx = 120 + (first + 2) * 24
    path = [b('up', 3), b('forward', second), b('down', 3)] if obstacle else [b('forward', second)]
    a = [s('onflag', b('forward', first))]
    ball = [s('onflag', b('forward', first), b('forward', 2))]
    dog = []
    if complete:
        a.append(s('onmessage', b('hop', 2), b('playsnd', 'pop.mp3'), color='Blue'))
        ball[0]['actions'].append(b('message', 'Orange'))
        ball.append(s('onmessage', *deepcopy(path), *([b('forward',3)] if third else []), b('message', 'Green' if third else 'Blue'), color='Orange'))
        dog = [s('onmessage', *deepcopy(path), color='Orange')]
    actors = [n.actor('a', 'Rabbit', 96, 264, *a, scale=.28, name='A'),
              n.actor('b', 'Dog', bx, 264, *dog, scale=.25, name='B')]
    if third:
        actors.append(n.actor('c', 'Rabbit', bx+(second+3)*24, 264,
                      s('onmessage', b('forward', 2), color='Green'), scale=.28, name='C'))
        ball.append(s('onmessage', b('forward', 2), b('message', 'Blue'), color='Green'))
    if obstacle:
        actors.append(n.actor('gard', 'Fence', 336, 264, scale=.27, name='Gard'))
    actors.append(n.actor('minge', 'Ball', 120, 240, *ball, scale=.22, name='Minge'))
    return {'background':'Park.svg', 'focus':'a', 'sprites':actors,
            'texts':[n.label(title,240,25,22),n.label('START',96,318,16),n.label('SOSIRE',408,318,16)]}

def make_pages():
    m1=page('1. Prima predare',complete=False)
    m2=page('2. Cursa completă')
    m3=page('3. Ocolim gardul',obstacle=True)
    own=page('4. Traseul echipei',obstacle=True)
    for actor in own['sprites']:
        if actor['id'] in ['b','minge']:
            for program in actor['scripts']:
                for action in program['actions']:
                    if action.get('block') in ['up','down']: action['value']=4
    r1=page('R1. Alt loc de schimb',first=2,second=8)
    r2=page('R2. Trei alergători',second=1,third=True)
    return dict(m1=m1,m2=m2,m3=m3,creatie=own,r1=r1,r2=r2)

def export(key, pages, title):
    record=n.export({'name':title,'short':'Ștafeta','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z: entries={x:z.read(x) for x in z.namelist()}
    data=json.loads(entries['project/data.json'])
    # Keep a third independent script visible in the standard laptop editor.
    for page_id in data['json']['pages']:
        p=data['json'][page_id]
        for sprite_id in p['sprites']:
            for i,program in enumerate(p[sprite_id].get('scripts',[])):
                if i==2:
                    for block in program: block[2]+=480;block[3]-=190
    thumb=Image.new('RGB',(160,120),'#eaf5f1');d=ImageDraw.Draw(thumb)
    for y,text,size in [(20,'LECȚIA 1',23),(61,'ȘTAFETA',24)]:
        d.text((80,y),text,anchor='mt',fill='#172d3e',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    stream=io.BytesIO();thumb.save(stream,format='PNG');png=stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-17 12:00:00';data['mtime']='1794916800000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for name,contents in entries.items(): z.writestr(name,contents)
    return {'key':key,'file':record['path'],'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}

if __name__=='__main__':
    pages=make_pages()
    records=[export(k,[p],'L01 Ștafeta - '+p['texts'][0]['text']) for k,p in pages.items()]
    starter=deepcopy(pages['m1']);starter['texts'][0]['text']='Ștafeta - construim împreună'
    for actor in starter['sprites']: actor['scripts']=[]
    records.append(export('start',[starter],'L01 Ștafeta - de la zero'))
    export('lectia_1',[pages[k] for k in ['m1','m2','m3','creatie']],'L01 Ștafeta - cele 4 etape')
    export('rezerve',[pages[k] for k in ['r1','r2']],'L01 Ștafeta - cele 2 rezerve')
    (ROOT/'stafeta.json').write_text(json.dumps({'lesson':1,'title':'Cursa cu ștafetă','duration':60,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built 7 individual references and 2 browser-test collections.')

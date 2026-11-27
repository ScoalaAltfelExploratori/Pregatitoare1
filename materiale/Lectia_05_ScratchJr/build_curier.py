"""Native ScratchJr courier: visible loading, shared motion and separate deliveries."""
from pathlib import Path
from copy import deepcopy
import importlib.util
import json,zipfile,hashlib,io
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('native',ROOT.parent/'Lectia_00_ScratchJr/build_pack.py')
n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
n.ROOT=ROOT/'solutii_curier'
n.ASSETS.update({'Car':(534,220),'Soccerball':(96,96),'Basketball':(96,96)})
b,s=n.b,n.script
TITLES={'m1':'1. Încărcarea corectă','m2':'2. Livrare și întoarcere','m3':'3. Două livrări autonome',
        'creatie':'4. Ocolim în ambele sensuri','r1':'R1. Încărcare lentă','r2':'R2. Comanda urgentă'}
def make_projects():
    projects={}
    for key,title in TITLES.items():
        two=key not in ('m1','m2');order=['Green','Orange'] if key=='r2' else ['Orange','Green']
        drive=[b('up',3),b('forward',8),b('down',3)] if key=='creatie' else [b('forward',8)]
        back=[b('up',3),b('back',8),b('down',3)] if key=='creatie' else [b('back',8)]
        start=[b('message',order[0])]
        if key!='m1':start+=deepcopy(back)
        if two:start+=[b('message',order[1]),*deepcopy(back)]
        if key!='m1':start+=[b('say','Livrate!' if two else 'Livrat!')]
        robot=[s('onclick',*start)]
        if key!='m1':robot+=[s('onmessage',*deepcopy(drive),color='Blue')]
        if two:robot+=[s('onmessage',*deepcopy(drive),color='Purple')]
        actors=[n.actor('robot','Car',144,276,*robot,scale=.25,name='Robot curier')]
        for ident,asset,name,x,load,go,loading,unloading in [
            ('fotbal','Soccerball','Minge fotbal',96,'Orange','Blue',2,3),
            ('baschet','Basketball','Minge baschet',48,'Green','Purple',4,5)][:2 if two else 1]:
            actions=([b('setspeed',0)] if key=='r1' and ident=='fotbal' else [])
            actions+=[b('up',3),b('forward',loading)]
            if key=='r1' and ident=='fotbal':actions+=[b('setspeed',1)]
            if key!='m1':actions+=[b('message',go),b('forward',unloading),b('down',3)]
            programs=[s('onmessage',*actions,color=load)]
            if key!='m1':programs+=[s('onmessage',*deepcopy(drive),color=go)]
            actors.append(n.actor(ident,asset,x,312,*programs,scale=.25,name=name))
        if key=='creatie':actors.append(n.actor('gard','Fence',240,276,scale=.24,name='Zonă închisă'))
        projects[key]=[{'background':'Gym.svg','focus':'robot','sprites':actors,
                       'texts':[n.label('Robotul curier',240,22,22),n.label('MAGAZIE',72,344,14),n.label('ANTRENAMENT',408,344,14)]}]
    projects['start']=deepcopy(projects['m3'])
    for actor in projects['start'][0]['sprites']:actor['scripts']=[]
    return projects
def export(key,pages):
    title='L05 Curier - '+TITLES.get(key,'de la zero')+' · 60 min'
    record=n.export({'name':title,'short':'Curierul','path':key+'.sjr','pages':pages})
    path=n.ROOT/record['path']
    with zipfile.ZipFile(path) as z:entries={name:z.read(name) for name in z.namelist()}
    data=json.loads(entries['project/data.json'])
    # Native editor has room for two rows; put the third robot receiver on the right.
    for pageid in data['json']['pages']:
        page=data['json'][pageid]
        for sid in page['sprites']:
            for i,program in enumerate(page[sid].get('scripts',[])):
                if i==2:
                    for block in program:block[2]+=600;block[3]-=95
    thumb=Image.new('RGB',(160,120),'#eaf4f7');draw=ImageDraw.Draw(thumb)
    for y,text,size in [(20,'LECȚIA 5',23),(65,'CURIERUL',21)]:
        draw.text((80,y),text,anchor='mt',fill='#14546a',font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',size))
    stream=io.BytesIO();thumb.save(stream,format='PNG');png=stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5']);data['thumbnail']['md5']=hashlib.md5(png).hexdigest()+'.png'
    data['ctime']='2026-11-27 12:00:00';data['mtime']='1795780800000'
    entries['project/thumbnails/'+data['thumbnail']['md5']]=png
    entries['project/data.json']=json.dumps(data,ensure_ascii=False).encode()
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        for name,contents in entries.items():
            info=zipfile.ZipInfo(name,(2026,11,27,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,contents)
    return {'key':key,'file':path.name,'name':title,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':pages}
if __name__=='__main__':
    records=[export(k,p) for k,p in make_projects().items()]
    (ROOT/'curier.json').write_text(json.dumps({'lesson':5,'title':'Robotul curier','duration':60,'projects':records},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Built seven native courier projects.')

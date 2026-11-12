"""Native ScratchJr scenes: visible destinations, objects and consequences."""
from copy import deepcopy

def make_story(actor,script,b,label,repeat):
    def a(key,asset,x,y,*scripts,scale=.25,name=None):
        return actor(key,asset,x,y,*scripts,scale=scale,name=name)
    def header(text):return [label(text,240,28,24)]
    cast=[('iepuras','Rabbit',.24),('pui','Chicken',.24),('catel','Dog',.20),('rata','Duck',.32),('pasare','Bird',.28)]

    invitation={'background':'Park.svg','focus':'iepuras','build':[['iepuras',0]],'texts':header('1. Îl chemăm pe cățel'),'sprites':[
        a('casa','House3',380,140,scale=.5,name='Casa cățelului'),
        a('gard','Fence',240,288,script('ontouch',b('message','Red')),scale=.65,name='Gardul de ocolit'),
        a('iepuras','Rabbit',120,288,
          script('onflag',b('home'),b('up',3),b('forward',10),b('down',3)),
          script('onmessage',b('stopmine'),b('home'),b('say','Ocolesc gardul!'),color='Red'),scale=.22,name='Iepurașul'),
        a('catel','Dog',360,288,script('ontouch',b('playsnd','pop.mp3'),b('say','Vin la picnic!'),b('wait',10),b('gotopage',2)),scale=.24,name='Cățelul')
    ]}

    orchard={'background':'Park.svg','focus':'mar3','build':[['mar3',0],['mar4',0],['mar5',0]],'texts':header('2. Mere pentru fiecare'),'sprites':[
        a('pom','Tree1',240,160,scale=.65,name='Mărul'),
        a('masa','Table',240,274,scale=.6,name='Masa de picnic'),
        a('mar1','Apple',144,190,scale=.25,name='Măr pe masă 1'),
        a('mar2','Apple',336,190,scale=.25,name='Măr pe masă 2'),
        a('mar3','Apple',192,94,script('onclick',b('home'),b('down',4),b('playsnd','pop.mp3')),scale=.25,name='Mărul de pe ramura stângă'),
        a('mar4','Apple',240,118,script('onclick',b('home'),b('down',3),b('playsnd','pop.mp3')),scale=.25,name='Mărul de pe ramura joasă'),
        a('mar5','Apple',288,94,script('onclick',b('home'),b('down',4),b('playsnd','pop.mp3')),scale=.25,name='Mărul de pe ramura dreaptă')
    ]}
    for (key,asset,scale),(x,y) in zip(cast,[(72,270),(135,325),(408,270),(240,325),(345,325)]):
        orchard['sprites'].append(a(key,asset,x,y,scale=scale,name=key.capitalize()))

    picnic={'background':'Park.svg','focus':'iepuras','build':[['iepuras',0],['catel',0]],'texts':header('3. Poftiți la masă!'),'sprites':[
        a('masa','Table',240,274,script('onflag',b('wait',10),b('forever')),scale=.6,name='Masa de picnic')
    ]}
    xs=[144,192,240,288,336]
    for i,x in enumerate(xs):
        picnic['sprites'].append(a('mar'+str(i+1),'Apple',x,190,
            script('ontouch',b('playsnd','pop.mp3'),b('hide')),scale=.25,name='Măr pentru un prieten'))
    for i,((key,asset,scale),x) in enumerate(zip(cast,xs)):
        programs=[]
        if key=='iepuras':programs.append(script('onclick',b('message','Red')))
        if key=='catel':programs.append(script('onclick',b('message','Blue')))
        programs.append(script('onmessage',b('up',4),b('wait',5),b('down',4),color='Red' if i<2 else 'Blue'))
        picnic['sprites'].append(a(key,asset,x,286,*programs,scale=scale*.85,name=key.capitalize()))

    rain={'background':'Park.svg','focus':'iepuras','build':[['iepuras',0]],'texts':header('4. Toți la adăpost!'),'sprites':[
        a('casa','House3',360,128,script('onmessage',b('playsnd','pop.mp3'),color='Purple'),scale=.6,name='Adăpostul'),
        a('soare','Sun',80,68,script('onmessage',b('hide'),color='Red'),script('onmessage',b('wait',5),b('show'),color='Purple'),scale=.4,name='Soarele'),
        a('nor','Thundercloud',72,122,
          script('onclick',b('home'),b('forward',4),b('message','Red')),
          script('onmessage',b('back',4),b('hide'),color='Purple'),scale=.4,name='Norul de ploaie')
    ]}
    for i,(key,asset,scale) in enumerate(cast):
        x=168+48*i
        moves=([b('forward',8-2*i)] if i<4 else [])+[b('up',4),b('hide')]
        if i==0:moves += [b('wait',10),b('message','Blue')]
        if i==2:moves += [b('message','Purple')]
        rain['sprites'].append(a(key,asset,x,312,script('onmessage',*moves,color='Red' if i<2 else 'Blue'),scale=scale*.85,name=key.capitalize()))

    shortcut=deepcopy(invitation)
    shortcut['texts']=header('Rezervă: ocolul cu Repetă')
    cat=next(s for s in shortcut['sprites'] if s['id']=='iepuras')
    cat['scripts'][0]=script('onflag',b('home'),b('up',3),repeat(2,b('forward',5)),b('down',3))
    dog=next(s for s in shortcut['sprites'] if s['id']=='catel')
    dog['scripts'][0]=script('ontouch',b('playsnd','pop.mp3'),b('say','Ai găsit drumul!'),b('hop',1),b('forward',3))

    dance={'background':'Park.svg','focus':'iepuras','build':[], 'texts':header('Rezervă: dansăm și înghețăm'),'sprites':[]}
    for i,(key,asset,scale) in enumerate(cast):
        programs=[]
        if i==0:programs.append(script('onclick',b('message','Red')))
        if i==4:programs.append(script('onclick',b('message','Blue')))
        programs.append(script('onmessage',b('hop',1),b('wait',5),b('forever'),color='Red'))
        if i<2:programs.append(script('onmessage',b('stopmine'),color='Blue'))
        dance['sprites'].append(a(key,asset,72+84*i,245,*programs,scale=scale*1.3,name=key.capitalize()))
    return [invitation,orchard,picnic,rain],shortcut,dance

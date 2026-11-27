"""Native editor captures for every inspection mission and character."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_06_ScratchJr/capturi_inspectie'
DATA=json.loads((ROOT/'Lectia_06_ScratchJr/inspectie.json').read_text(encoding='utf-8'))
W,H=A4;TEAL=colors.HexColor('#14546a')
N={'onflag':'Steag','ontouch':'La ciocnire','onmessage':'Primește','message':'Trimite','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','say':'Spune','setspeed':'Viteză','stopmine':'Stop','playsnd':'Sunet'}
C={'Orange':'portocaliu','Blue':'albastru','null':'','pop.mp3':'Pop'}
def code(b):
    v=C.get(str(b['value']),b['value']);v='' if v is None else v
    if b['block']=='setspeed':v={'0':'lentă','1':'normală','2':'rapidă'}[str(v)]
    return N[b['block']]+(' '+str(v) if str(v) else '')
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(TEAL);c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 06 / AJUTOR VIZUAL');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,21,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
'm1':('Steagul pornește mersul; contactul cu bariera îl întrerupe. Robotul se retrage un pas și rămâne pe loc.',
      'Stop este la robot: oprește celălalt fir al robotului. Stânga 1 eliberează contactul. Mută bariera două pătrățele spre stânga și probează același cod; frânarea trebuie să apară mai devreme. Apoi readu bariera la loc.'),
'm2':('Un contact, o retragere și un ocol. La final robotul stă de cealaltă parte a barierei.',
      'Sus 3 și Jos 3 readuc robotul pe aceeași linie. Dreapta 5 lasă loc pentru întregul robot. Păstrează mărimile din starter; după redimensionare trebuie recalibrat ocolul.'),
'm3':('Un steag: contact cu bariera, ocol, continuare, contact cu stația și oprire definitivă.',
      'Înlocuiește replica din M2 cu Dreapta 20. Albastru oprește inclusiv mersul din firul portocaliu. Nu trimite aceeași culoare de la barieră și de la stație: reacțiile au scopuri diferite.'),
'creatie':('Exemplu propriu: bariera este cu un pătrățel mai la stânga; ocolul urcă și coboară câte 4 pași.',
      'Alege înălțimea ocolului și locul barierei. Sus și Jos trebuie schimbate împreună. Păstrează loc pentru retragere, coborâre și sosirea la stație. Ai 10 minute pentru propria variantă.'),
'r1':('Pornire la viteză rapidă. Robotul păstrează ocolul și oprirea finală la stație.',
      'Viteza se păstrează și în firele de reacție. Compară durata, nu pixelul exact al opririi. Pentru a reveni la M3 selectează explicit viteza normală; scoaterea blocului rapid nu este suficientă.'),
'r2':('Două bariere pe traseu: robotul refolosește de două ori același fir portocaliu.',
      'Mută prima barieră două pătrățele la stânga și adu Bariera 2 de sus pe traseu, la 6 pătrățele spre dreapta de prima. Ambele trimit portocaliu. Viteză normală; două ocoluri, apoi stația.')}
def scripts(c,key,actors,y):
    for a in actors:
        y=para(c,a['name'],34,y,W-68,11,bold=True)-4
        if not a['scripts']:
            y=para(c,'Fără program; rămâne deoparte în această etapă.',34,y,W-68,9)-11
        for i,s in enumerate(a['scripts']):
            x=750 if i==2 else 30;sy=548 if i==0 else 643
            sw=95+65*len(s['actions'])
            y=photo(c,key+'_'+a['id'],34,y,min(W-68,sw*.78),(x,sy,sw,100))-3
            y=para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),34,y,W-68,9)-10
    return y
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);out=[];num=start_page
    def begin(title,tag):out.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Deschidem atelierul, construim codul','0-8 MINUTE')
    y=para(c,'Robotul trebuie să ajungă la stația de control. O barieră închide o zonă de lucru: la contact, robotul se retrage și ocolește. La stație se oprește.',34,y,W-68,11)-10
    y=photo(c,'start_grid',34,y,300,(401,75,478,358))-12
    for title,text in [
      ('Înainte de oră: un singur import','Importă start.sjr pe fiecare tabletă. Conține robotul, atelierul, stația și două bariere, fără cod. Sunt resurse noi, nu din biblioteca standard. Nu trebuie copiate imagini separat. Verifică importul pe Lenovo înainte de clasă.'),
      ('Citim scena','Jos: robotul în stânga, bariera la mijloc, stația cu bifă în dreapta. Bariera 2, sus în stânga, rămâne fără cod până la R2. Păstrează mărimile și pozițiile pregătite. Un pas = un pătrățel.'),
      ('Contact, nu atingere cu degetul','Blocul standard La ciocnire are două siluete, fără selector. Reacționează la orice personaj atins, nu la decor. Simulăm un senzor de contact; camerele desenate pe robot nu detectează nimic.'),
      ('Două semnale, două reacții','Bariera trimite portocaliu: robotul oprește, se retrage și ocolește. Stația trimite albastru: robotul oprește și încheie. Plic închis = Trimite; plic deschis = Primește. Culoarea se alege din săgeată.'),
      ('Înainte de FIECARE probă','Stop dacă rulează, Reset Characters sus, apoi un singur steag. Nu mișca personajele în timpul rulării. Stop cu mâna oprește celelalte fire ale aceluiași personaj; firul care l-a executat continuă.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-10
    assert y>40,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        actors=entry['pages'][0]['sprites']
        groups=[actors] if key in ('m1','m2') else [actors[:1],actors[1:]]
        title=entry['name'].split(' - ',1)[1].split(' · ')[0]
        for gi,group in enumerate(groups):
            suffix='' if len(groups)==1 else (' / robotul' if gi==0 else ' / barierele și stația')
            y=begin(title+suffix,'REZERVĂ' if key.startswith('r') else 'BAZĂ / SOLUȚIE COMPLETĂ')
            if gi==0:
                top=y;photo(c,key+'_robot',34,top,200,(401,75,478,358))
                ny=para(c,NOTES[key][0],252,top,W-286,11)-10
                ny=para(c,'START: Reset Characters, apoi un steag.',252,ny,W-286,10,bold=True)
                y=min(top-155,ny)-12
            else:y=para(c,'Toate programele celorlalte personaje, inclusiv cele păstrate din etapa anterioară.',34,y,W-68,11)-12
            y=scripts(c,key,group,y)
            y=para(c,NOTES[key][1],34,y-1,W-68,10)-12
            if gi==1 and key in ('m3','r2'):
                y=photo(c,key+'_final',34,y,200,(401,75,478,358))-7
                y=para(c,'Rezultat: robotul a ocolit barierele și stă lângă stație. Nu repornește singur.',34,y,W-68,9)
            assert y>40,(key,gi,y)
            c.showPage();num+=1
    c.save();return out

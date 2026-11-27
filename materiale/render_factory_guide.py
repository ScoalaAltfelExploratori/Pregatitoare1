"""Factory lesson: native screenshots and every script at each construction stage."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_07_ScratchJr/capturi_fabrica'
DATA=json.loads((ROOT/'Lectia_07_ScratchJr/fabrica.json').read_text(encoding='utf-8'))
W,H=A4
N={'onflag':'Steag','onmessage':'Primește','message':'Trimite','home':'La poziția inițială','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','say':'Spune','wait':'Așteaptă','show':'Arată','hide':'Ascunde','playsnd':'Sunet','setspeed':'Viteză'}
C={'Orange':'portocaliu','Yellow':'galben','Blue':'albastru','Purple':'mov','Red':'roșu','Green':'verde','null':'','pop.mp3':'Pop'}
def code(b):
    if 'repeat' in b:return 'Repetă '+str(b['repeat'])+' { '+' → '.join(code(x) for x in b['body'])+' }'
    v=C.get(str(b['value']),b['value']);v='' if v is None else v
    if b['block']=='setspeed':v={0:'lentă',1:'normală',2:'rapidă'}[v]
    return N[b['block']]+(' '+str(v) if str(v) else '')
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(colors.HexColor('#144074'));c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 07 / PROGRAME ȘI CAPTURI');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,20,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Coborâm șasiul pe banc. Roțile rămân la locurile lor.','Portocaliul comandă șasiul. Robotul anunță montajul numai după coborâre. La roți pregătim doar resetarea; roverul complet și farul rămân ascunse, fără programe.'),
 'm2':('Șasiul coboară; abia apoi cele două roți pornesc împreună și ajung la butuci.','Albastrul pornește AMBELE roți. Viteză normală la amândouă. Stânga: Dreapta 5, Sus 2. Dreapta: Stânga 3, Sus 2. Au drumuri diferite și pot termina în momente diferite.'),
 'm3':('Un singur steag: șasiu, roți, două clipiri, rover complet și plecare 3 pași.','Roata dreaptă are viteză lentă. Farul așteaptă ambele roți. Verde ascunde cele trei piese și arată imaginea completă în aceeași poziție. Roșu pornește roverul. Nu introducem o pauză ghicită între operații.'),
 'creatie':('Exemplu: trei clipiri scurte, cu Pop la fiecare. Montajul și plecarea rămân corecte.','Schimbăm numai proba farului: Repetă 3 { Pop, Arată, Așteaptă 3, Ascunde, Așteaptă 7 }. Copilul poate inventa alt ritm finit. Păstrăm farul stins la final și plecarea după probă.'),
 'r1':('Montăm mai întâi roata stângă, apoi pe cea dreaptă. Aceeași poziție finală.','Dreapta primește MOV în loc de albastru. Robotul trimite albastru, apoi mov. Farul, schimbarea imaginii și plecarea rămân după ambele operații. Comparăm montajul pe rând cu cel în paralel.'),
 'r2':('Două probe: Dreapta 2, Stânga 2, farul clipește de două ori. Abia apoi plecarea finală.','La rover: Repetă 2 cuprinde dusul, întorsul și mesajul galben. Dreapta 3 stă DUPĂ ramă. Vedem șase clipiri în total: două după montaj și câte două după fiecare întoarcere.')}
def groups(key,page):
    by={a['id']:a for a in page['sprites']}
    ids=[['robot','sasiu','banc'],['stanga','dreapta','rover','far']] if key in ('m1','m2') else [['robot','sasiu','banc'],['stanga','dreapta'],['rover','far']]
    return [[by[id] for id in g] for g in ids]
def blockwidth(b):return 130+sum(blockwidth(x) for x in b['body']) if 'repeat' in b else 65
def scripts(c,key,actors,y):
    for a in actors:
        y=para(c,a['name'],34,y,W-68,10.5,bold=True)-3
        if not a['scripts']:y=para(c,'Fără program în această etapă.'+(' Rămâne ascuns.' if a['id'] in ('rover','far') else ''),34,y,W-68,9)-8
        for i,s in enumerate(a['scripts']):
            x=680 if i==2 else 30;sy=548 if i==0 else 630
            sh=(100 if any(b.get('block')=='message' for b in s['actions']) else 84) if i==0 else 120
            sw=95+sum(blockwidth(b) for b in s['actions'])
            y=photo(c,f'{key}_{a["id"]}',34,y,min(W-68,sw*.63),(x,sy,sw,sh))-3
            y=para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),34,y,W-68,9)-7
    return y
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);outline=[];num=start_page
    def begin(title,tag):outline.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Pregătim fabrica','0-6 MINUTE')
    y=para(c,'Fabrica are o comandă: un rover pentru transportul pieselor. Celula robotizată trebuie să monteze șasiul și roțile, să verifice farul și să trimită roverul la lucru. Nicio plecare înainte de terminarea montajului.',34,y,W-68,11)-10
    top=y;photo(c,'start_grila',34,top,250,(401,75,478,358));photo(c,'m3_final',310,top,250,(401,75,478,358));y=top-198
    for title,text in [
      ('Un singur import','Importă start.sjr înaintea orei. Cardul: L07 Fabrica de roboți - de la zero · v1.0. Toate cele șapte personaje sunt fără cod. Rover complet și Far pornesc ascunse; le selectăm din lista personajelor.'),
      ('Construim în același proiect','Păstrează pozițiile și mărimile. Un pas este un pătrățel. M1, M2 și M3 se adaugă treptat; soluțiile separate sunt repere pentru profesor. Banc de probă nu are cod.'),
      ('Pregătire și pornire','Stop dacă rulează, Reset Characters, un steag. La poziția inițială este blocul albastru cu săgeată curbată și X. Arată și Ascunde sunt în categoria mov.'),
      ('Cinci comenzi','Portocaliu: șasiu. Albastru: ambele roți. Galben: far. Verde: înlocuirea pieselor cu roverul complet. Roșu: deplasarea roverului. Mov apare numai în R1, pentru roata dreaptă.'),
      ('Ce simulăm','Robotul industrial comandă instalația; brațul lui nu se mișcă. Piesele se deplasează după programele lor. Nu se lipesc automat: la verde le ascundem și arătăm desenul complet, suprapus exact. Pozițiile se verifică vizual.'),
      ('Așteptarea corectă','Trimite așteaptă terminarea tuturor programelor pornite de acel mesaj. De aceea galbenul urmează montajul ambelor roți, chiar când una este lentă. Așteaptă 5 înseamnă aproximativ o jumătate de secundă.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-9
    assert y>40,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        page=entry['pages'][0]
        for gi,group in enumerate(groups(key,page)):
            title=entry['name'].split(' - ',1)[1].split(' · ')[0]
            if gi:title+=' / '+('roți și continuare' if key in ('m1','m2') else 'roțile' if gi==1 else 'roverul și farul')
            y=begin(title,'REZERVĂ' if key.startswith('r') else 'BAZĂ / TOATE PROGRAMELE')
            if gi==0:
                top=y;photo(c,key+'_final',34,top,185,(401,75,478,358))
                ny=para(c,NOTES[key][0],239,top,W-273,10.5)-10
                ny=para(c,'Reset Characters, apoi un steag.',239,ny,W-273,9.5,bold=True)
                y=min(top-147,ny)-9
            else:y=para(c,'Toate firele de mai jos sunt necesare, inclusiv cele păstrate din etapa anterioară.',34,y,W-68,10)-10
            y=scripts(c,key,group,y)
            y=para(c,NOTES[key][1],34,y,W-68,9.5)-8
            assert y>40,(key,gi,y)
            c.showPage();num+=1
    c.save();return outline

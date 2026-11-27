"""Illustrated, complete native ScratchJr programs for every workshop stage."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_06_ScratchJr/capturi_atelier'
DATA=json.loads((ROOT/'Lectia_06_ScratchJr/atelier.json').read_text(encoding='utf-8'))
W,H=A4
N={'onflag':'Steag','ontouch':'La ciocnire','onclick':'La atingere','onmessage':'Primește','message':'Trimite','home':'La poziția inițială','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','say':'Spune','wait':'Așteaptă','show':'Arată','hide':'Ascunde','stopmine':'Stop','playsnd':'Sunet','gotopage':'Pagina'}
C={'Orange':'portocaliu','Yellow':'galben','Blue':'albastru','Purple':'mov','Red':'roșu','null':'','pop.mp3':'Pop'}
def code(b):
    v=C.get(str(b['value']),b['value']);v='' if v is None else v
    return N[b['block']]+(' '+str(v) if str(v) else '')
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(colors.HexColor('#14546a'));c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 06 / PROGRAME ȘI CAPTURI');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,20,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Robotul se conectează, bateria se umple pe rând, apoi robotul revine la plecare.','Robotul așteaptă mesajul portocaliu; încărcătorul așteaptă toate firele galbene. Așteaptă 10 = 1 secundă; 20 = 2 secunde; 30 = 3 secunde. Segmentele pornesc ascunse.'),
 'm2':('Trei resturi trebuie să dispară numai când robotul le atinge. Ușa rămâne închisă.','Construiește cele două fire la FIECARE rest. Numai robotul are traseu. La ciocnire are două siluete; La atingere are un deget. Un rest mutat în afara traseului trebuie să rămână vizibil.'),
 'm3':('După curățenie, robotul apasă butonul verde, așteaptă ridicarea completă a ușii și intră.','Înlocuiește replica Curat! din M2 cu Dreapta 2, Trimite albastru, Dreapta 5, replica finală. Albastru ajunge la buton; mov ajunge la ușă. Nu este necesară o pauză ghicită.'),
 'm4':('Un singur steag: încărcare, curățenie, deschiderea ușii și intrare.','În scena 1 înlocuiește replica Încărcat! cu blocul roșu Pagina 2. Scena 2 păstrează toate programele din M3. La schimbarea paginii pornesc automat firele cu Steag.'),
 'creatie':('Exemplu propriu: două resturi sunt sus și al treilea este jos, în dreapta.','În scena 2 mutăm resturile și schimbăm numai ruta robotului: Sus 4, Dreapta 8, Jos 4. Păstrăm încărcarea, reacțiile resturilor și așteptarea ușii. Copiii au 10 minute pentru propriul traseu.'),
 'r1':('Aceleași trei resturi, dar curățenia folosește 14 pași în loc de 16.','În scena 2 înlocuiește Sus 4 / Jos 4 cu Sus 3 / Jos 3. Robotul are lățime și înălțime: poate atinge restul fără ca centrele lor să coincidă. Verifică toate cele trei resturi; nu cerem un minim absolut.'),
 'r2':('Butonul roșu oprește robotul și ușa, inclusiv când ușa se ridică.','Atinge butonul roșu pe SCENĂ. Trimite roșu; robotul și ușa primesc roșu și execută Stop. Stop oprește celelalte fire ale aceluiași personaj. Reluare de la început: Stop sus, Pagina 1, Reset Characters, un steag.')}
def actor_groups(key,page):
    by={a['id']:a for a in page['sprites']}
    if 'incarcator' in by:ids=[['robot','incarcator'],['segment1','segment2','segment3']]
    elif key=='m2':ids=[['robot','usa','buton','cadru'],['rest1','rest2','rest3']]
    elif key=='r2':ids=[['robot','buton'],['usa','urgenta'],['rest1','rest2','rest3','cadru']]
    else:ids=[['robot','buton','usa'],['rest1','rest2','rest3','cadru']]
    return [[by[id] for id in group] for group in ids]
def scripts(c,key,pi,actors,y):
    for a in actors:
        y=para(c,a['name'],34,y,W-68,10.5,bold=True)-3
        if not a['scripts']:y=para(c,'Fără program în această etapă.',34,y,W-68,9)-9
        for i,s in enumerate(a['scripts']):
            x=680 if i==2 else 30;sy=548 if i==0 else 643;sw=95+65*len(s['actions'])
            y=photo(c,f'{key}_p{pi}_{a["id"]}',34,y,min(W-68,sw*.72),(x,sy,sw,100))-3
            y=para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),34,y,W-68,9)-7
    return y
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);outline=[];num=start_page
    def begin(title,tag):outline.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Două scene, un robot, trei activități','0-5 MINUTE')
    y=para(c,'Dimineața, robotul pregătește atelierul: se încarcă, adună resturile de pe podea și deschide accesul. În misiunea finală, după steag doar urmărim ce a programat copilul.',34,y,W-68,11)-10
    top=y
    photo(c,'start_p1_grila',34,top,250,(401,75,478,358));photo(c,'start_p2_grila',310,top,250,(401,75,478,358))
    y=top-200
    para(c,'Scena 1: încărcătorul și cele trei segmente.',34,y,250,9,bold=True)
    y=para(c,'Scena 2: resturile, butonul verde și ușa.',310,y,250,9,bold=True)-15
    for title,text in [
      ('Înainte de oră','Importă start.sjr pe fiecare tabletă. Alege proiectul Pregătim atelierul, v3.1. Are toate obiectele, fără cod; segmentele sunt ascunse, dar apar în lista personajelor. Butonul roșu rămâne fără cod până la rezerva 2. Verifică importul pe Lenovo înaintea clasei.'),
      ('Lucrăm în același proiect','M1: scena 1. M2 și M3: scena 2. La M4 legăm scenele cu Pagina 2. Soluțiile separate sunt repere pentru profesor; copiii construiesc în starter.'),
      ('Pregătire și rulare','Păstrează mărimile. Activează grila: un pas = un pătrățel. Înainte de probă: Stop dacă rulează, selectează scena, Reset Characters, apoi un steag. Pentru misiunea completă pornește din scena 1.'),
      ('Mesajele dau ordinea','Portocaliu: încărcător. Galben: segmente. Albastru: buton verde. Mov: ușă. Roșu: oprirea de urgență. Trimite așteaptă terminarea programelor pornite de acel mesaj.'),
      ('Ce trebuie să se vadă','Robotul stă până sunt aprinse toate segmentele. Resturile dispar la contact. Ușa se ridică complet înainte de traversare. Bateria este o animație programată; curățenia folosește contactul dintre personaje.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-9
    assert y>40,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        for pi,page in enumerate(entry['pages'],1):
            charge='incarcator' in {a['id'] for a in page['sprites']}
            groups=actor_groups(key,page)
            for gi,group in enumerate(groups):
                name=entry['name'].split(' - ',1)[1].split(' · ')[0]
                label=('încărcare' if charge else 'atelier') if len(entry['pages'])>1 else ('segmentele' if charge and gi else '')
                suffix=' / '+label if label else ''
                if gi:suffix+=' / '+('resturile' if any(a['id']=='rest1' for a in group) else 'continuare')
                y=begin(name+suffix,'REZERVĂ' if key.startswith('r') else 'BAZĂ / TOATE PROGRAMELE')
                if gi==0:
                    top=y;photo(c,f'{key}_p{pi}_robot',34,top,240,(401,75,478,358))
                    desc=('Scena 1: încărcarea rămâne completă. Cele trei segmente se aprind înainte ca robotul să treacă în atelier.' if charge and key!='m1' else NOTES[key][0])
                    ny=para(c,desc,292,top,W-326,10.5)-9
                    ny=para(c,('Scena 1, Reset Characters, un steag.' if len(entry['pages'])>1 else 'Reset Characters, apoi un steag.'),292,ny,W-326,9.5,bold=True)
                    y=min(top-185,ny)-10
                else:y=para(c,'Toate firele personajelor de mai jos. Și programele neschimbate sunt incluse.',34,y,W-68,10)-10
                y=scripts(c,key,pi,group,y)
                note=NOTES['m1'][1] if charge else NOTES[key][1]
                y=para(c,note,34,y,W-68,9.5)-8
                assert y>40,(key,pi,gi,y)
                c.showPage();num+=1
    c.save();return outline

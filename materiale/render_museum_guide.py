"""Twelve museum reference pages, with real screenshots clipped only in PDF layout."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_02_ScratchJr/capturi_muzeu'
W,H=A4
BLUE=colors.HexColor('#304e86');MUTED=colors.HexColor('#52636f')

def photo(c,name,x,y,w,clip=None):
    sx,sy,sw,sh=clip or (0,0,1280,800)
    scale=w/sw;h=sh*scale
    c.saveState();path=c.beginPath();path.rect(x,y-h,w,h);c.clipPath(path,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,
                width=1280*scale,height=800*scale)
    c.restoreState();return y-h

def frame(c,number,title,tag):
    c.setFillColor(BLUE);c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 02 / AJUTOR VIZUAL')
    c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,23,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.setFillColor(MUTED)
    c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 17 noiembrie 2026')
    c.drawRightString(W-34,19,str(number));return y-12

def program(c,name,row,x,y,width=250,source_width=300):
    return photo(c,name,x,y,width,(630 if row==2 else 30,548 if row!=1 else 643,source_width,100))

EXAMPLES=[
 dict(key='m2',title='2. Încremenim la semnal',time='20-33 MINUTE',
  target='Ambele exponate se rotesc. O atingere a paznicului le oprește pe amândouă, fără să dispară.',
  rows=['La steag: pornește rotația continuă.','La roșu: oprește propria animație.'],
  guard=['La atingere: trimite roșu.'],
  notes=['Construiește câte două fire separate la fiecare exponat. Firul cu plic nu se lipește de cel cu steag.',
   'Stop este mâna portocalie. Oprește celelalte programe ale personajului selectat, nu ale tuturor personajelor.',
   'Plic deschis = primește; plic închis = trimite. Alege roșu la paznic și la ambele exponate.',
   'Probă: steagul de sus → ambele se rotesc → atinge paznicul pe scenă → ambele rămân nemișcate.']),
 dict(key='m3',title='3. Inspecția completă',time='36-48 MINUTE / DIFICIL',
  target='O singură atingere: exponatele încremenesc, paznicul inspectează și revine. Ambele animații repornesc numai la întoarcerea lui.',
  rows=['La steag: pornește rotația.','La roșu: oprește rotația.','La albastru: reia rotația continuă.'],
  guard=['Atingere → Acasă → roșu → Dreapta 12 → Așteaptă 10 → Stânga 12 → albastru.'],
  notes=['Adaugă firul cu plic albastru separat, la fiecare exponat. Nu înlocui firul de oprire.',
   'Acasă pregătește startul. Întoarcerea este Stânga 12, ca să vedem întregul drum.',
   'Așteaptă 10 este aproximativ o secundă: paznicul privește exponatele. Albastrul este după întoarcere, nu după o pauză ghicită la exponate.',
   'Probă: urmărește ambele exponate pe tot drumul. Trebuie să stea. După revenire, ambele se rotesc. Mai fă o inspecție.']),
 dict(key='creatie',title='4. Muzeul meu',time='48-58 MINUTE / CREAȚIE',
  target='Alege un ritm, un sens sau o rotire diferită. Păstrează regula opririi și reluării. Mai jos este un exemplu posibil, nu o soluție unică.',
  rows=['La steag: rotire, pauză 5, repetare.','La roșu: oprește propria animație.','La albastru: reia același ritm.'],
  guard=['Aceeași inspecție, dar Așteaptă 20 în loc de 10.'],
  notes=['Pământul rotește dreapta 1; planeta rotește stânga 2. Ambele au o pauză 5 între rotiri.',
   'Modifică atât firul Steag, cât și firul Primește albastru. Altfel, ritmul se va schimba după inspecție.',
   'Paznicul așteaptă aproximativ două secunde la capăt. Drumul și mesajele rămân în aceeași ordine.',
   'Explică o alegere proprie, apoi probează o inspecție completă. La final: Stop sus, resetare, galerie și redeschidere.']),
 dict(key='r1',title='R1. Exponatul somnoros',time='REZERVĂ / +5 MINUTE',
  target='După inspecție, Pământul se rotește singur. Planeta cu inele rămâne nemișcată până când o atingi.',
  rows=['La steag: pornește rotația.','La roșu: oprește rotația.','Repornire: albastru la Pământ; atingere la Planetă.'],
  guard=['Paznicul păstrează programul complet din M3.'],
  notes=['Pornește de la M3. Numai planeta își schimbă firul de repornire: Atingere → Stop → Rotire stânga 1 → Repetă mereu.',
   'Stop din acest fir evită două animații simultane ale aceleiași planete. Nu opri Pământul când trezești planeta.',
   'Probă: după inspecție Pământul se mișcă, planeta stă. Atinge planeta: trebuie să înceapă și ea rotația.',
   'Atingem planeta după întoarcerea paznicului. Aceasta este regula jocului; programul nu blochează atingerea în timpul inspecției.']),
 dict(key='r2',title='R2. Inspecție pe rând',time='REZERVĂ / +10 MINUTE',
  target='Întâi încremenește Pământul, iar planeta se rotește. Apoi Pământul reia mișcarea și planeta încremenește. La întoarcere se mișcă ambele.',
  rows=['La steag: ambele se rotesc.','Oprire: roșu la Pământ; albastru la Planetă.','Reluare: albastru la Pământ; verde la Planetă.'],
  guard=['Firul 1: Atingere → Stop → Acasă → roșu → Dreapta 4 → Așteaptă 10 → albastru.',
   'Firul 2: Primește albastru → Dreapta 8 → Așteaptă 10 → Stânga 12 → verde.'],
  notes=['Pornește din M3. Paznicul verifică Pământul la 4 pași de start, apoi planeta la încă 8. Întoarcerea are 12 pași.',
   'Albastrul reia Pământul, oprește planeta și pornește al doilea fir al paznicului. Paznicul primește și propriul mesaj.',
   'Continuarea paznicului trebuie să fie un fir separat: Trimite așteaptă firele pornite, iar animația cu Repetă mereu nu se termină.',
   'Probă: doar Pământul stă la prima inspecție; doar planeta stă la a doua. La intrare se rotesc ambele. Repetă inspecția.'])
]

def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);outline=[];number=start_page
    def begin(title,tag):
        outline.append((title,number-1));return frame(c,number,title,tag)
    y=begin('Pregătește muzeul','0-8 MINUTE')
    y=para(c,'Construim o sală de astronomie cu două machete și un paznic. Toate elementele sunt deja în biblioteca ScratchJr. Copiii pornesc un proiect nou.',34,y,W-68,11)-12
    y=photo(c,'start',34,y,W-68)-12
    for title,text in [
        ('Alege alte personaje decât în ștafetă.','Earth (Pământ), Planet (cu inele) și Father (adultul cu tricou verde). Fundal: Empty Room, camera cu fereastră și covor.'),
        ('Așază personajele pe grilă.','Pământ (7, 9), Planetă (15, 9), Paznic (3, 4). Primul număr este jos; al doilea, în stânga. De la paznic: 4 pași până sub Pământ, 12 până sub Planetă.'),
        ('Potrivește dimensiunile.','Pământul: 3-4 pătrățele lățime; planeta: 4-5; paznicul: 4-5 înălțime. Viteză normală. Titlul și INTRARE sunt texte opționale, fără programe.'),
        ('Construiește și probează.','Selectează personajul din stânga; trage și conectează blocurile jos. Firele cu început diferit rămân separate. Înaintea unei probe complete: Stop sus, Reset Characters, steag.')]:
        y=para(c,title,34,y,W-68,11,BLUE,True)-4;y=para(c,text,34,y,W-68,10.5)-10
    assert y>42,y;c.showPage();number+=1
    y=begin('1. Exponatul prinde viață','8-20 MINUTE')
    y=para(c,'După un singur steag, Pământul se rotește continuu pe loc. Nu mai atingem niciun bloc ca să continue.',34,y,W-68,11.5)-12
    y=photo(c,'m1-earth',98,y,400,(409,75,464,355))-15
    y=para(c,'PĂMÂNT / un singur fir',34,y,W-68,11,BLUE,True)-7
    y=program(c,'m1-earth',0,34,y,300,300)-12
    for text in ['Steag → Rotire dreapta 1 → Repetă mereu.',
                 'Rotirea are săgeată curbă. Repetă mereu este blocul roșu de la sfârșit, cu săgeată circulară.',
                 'PLANETĂ și PAZNIC: încă nu au programe.',
                 'Probă: Pământul rămâne în același loc și se rotește de mai multe ori. Celelalte personaje stau. Oprește din bara de sus.']:
        y=para(c,text,34,y,W-68,11)-10
    assert y>42,y;c.showPage();number+=1
    for e in EXAMPLES:
        y=begin(e['title']+' / Exponatele',e['time'])
        y=para(c,e['target'],34,y,W-68,11)-10
        y=photo(c,e['key']+'-earth',148,y,300,(409,75,464,355))-12
        para(c,'PĂMÂNT',34,y,250,11,BLUE,True);para(c,'PLANETĂ',310,y,250,11,BLUE,True);y-=22
        for row,caption in enumerate(e['rows']):
            bottom=program(c,e['key']+'-earth',row,34,y)
            program(c,e['key']+'-planet',row,310,y)
            y=para(c,caption,34,bottom-3,W-68,9.5,MUTED)-9
        y=para(c,'Fiecare coloană aparține unui personaj. Păstrează toate firele arătate, inclusiv cele care nu s-au schimbat față de etapa anterioară.',34,y,W-68,10.3,BLUE)-6
        assert y>42,(e['key'],y);c.showPage();number+=1
        y=begin(e['title']+' / Paznicul',e['time'])
        y=para(c,'Selectează Paznic în lista din stânga. Inspecția se pornește atingând personajul de pe scenă.',34,y,W-68,11)-12
        for row,caption in enumerate(e['guard']):
            y=program(c,e['key']+'-guard',row,34,y,500,540)-6
            y=para(c,caption,34,y,W-68,10.7,BLUE)-17
        if e['key']=='m3':
            bottom=photo(c,'m3-inspection',34,y,240,(409,75,464,355))
            photo(c,'m3-return',321,y,240,(409,75,464,355))
            para(c,'În timpul inspecției: exponatele stau.',34,bottom-4,240,9.5,MUTED)
            para(c,'La intrare: animațiile se reiau.',321,bottom-4,240,9.5,MUTED);y=bottom-38
        for text in e['notes']:y=para(c,text,34,y,W-68,11)-13
        assert y>42,(e['key'],'guard',y)
        c.showPage();number+=1
    c.save();assert len(outline)==12
    return outline

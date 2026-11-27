"""Actual ScratchJr screenshots, one complete solution per reference page."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_04_ScratchJr/capturi_spectacol'
DATA=json.loads((ROOT/'Lectia_04_ScratchJr/spectacol.json').read_text(encoding='utf-8'))
W,H=A4
TEAL=colors.HexColor('#14546a')
NAMES={'onflag':'Steag','onclick':'Atingere','onmessage':'Primește','message':'Trimite',
       'playsnd':'Pop','hop':'Sari','wait':'Așteaptă','say':'Spune'}
VALUES={'Orange':'portocaliu','Blue':'albastru','null':'','pop.mp3':''}
def code(c):
    if 'repeat' in c:return 'Repetă '+str(c['repeat'])+' { '+' → '.join(code(a) for a in c['body'])+' }'
    value=VALUES.get(c['value'],c['value'])
    return NAMES[c['block']]+(' '+str(value) if value!='' else '')
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(TEAL);c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 04 / AJUTOR VIZUAL');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,21,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Două bătăi, o pauză. Repetă tot motivul de trei ori. La final: șase bătăi și oprire.',
       'În ramă intră ambele perechi Pop + Sari și pauza. Numărul 3 aparține buclei; Sari 1 este înălțimea, nu numărul săriturilor. Pornește cu Steagul sus.'),
 'm2':('Mira face două bătăi; Radu îi răspunde cu trei. Un singur Steag, fără suprapunere.',
       'Mesajul albastru stă după bucla Mirei. Astfel Radu intră numai după a doua bătaie. Mira are un singur fir cu Steag; nu păstrăm și motivul din M1 în paralel.'),
 'm3':('O atingere pe dirijoare: A2, B3, A2, B3, apoi Gata! Două runde, zece bătăi.',
       'Mira primește portocaliu și nu mai trimite albastru. Dirijoarea dă ambele intrări. Trimite așteaptă programul destinatarului; nu adăuga pauze între plicuri. Replica stă după buclă.'),
 'creatie':('Exemplu: A3, B2, A3, B2. Radu face o pauză scurtă după fiecare bătaie. Inventez alt ritm.',
       'Poți schimba numărul bătăilor, pauzele sau înălțimea săriturilor. Păstrează rândul fiecărui artist, două runde și finalul. Exemplul nu este singura soluție.'),
 'r1':('Ecou exact: B reproduce cele două bătăi ale lui A și pauza dintre ele. Două runde.',
       'Ordine: A2, B2, A2, B2. Ambele programe ale artiștilor conțin aceeași pauză în același loc. Dirijoarea păstrează bucla celor două runde.'),
 'r2':('Două runde normale, apoi bis B-A o singură dată. La final: Gata!',
       'Ordine: A2, B3, A2, B3, B3, A2. Plicurile bisului sunt după buclă. B are corect două intervenții consecutive la trecerea dintre ultima rundă și bis.')}
WIDTHS={'m1':{'a':535},'m2':{'a':405,'b':330},'m3':{'a':330,'b':330,'dir':405},
        'creatie':{'a':330,'b':395,'dir':405},'r1':{'a':435,'b':435,'dir':405},
        'r2':{'a':330,'b':330,'dir':535}}

def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);out=[];num=start_page
    def begin(title,tag):
        out.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Pregătește repetiția','0-8 MINUTE')
    y=para(c,'Mira și Radu repetă un număr pentru spectacolul școlii. Fiecare intră la rândul său. Dirijoarea organizează rundele și anunță finalul.',34,y,W-68,11)-10
    y=photo(c,'start_dir',34,y,W-68,(0,0,1280,440))-12
    for title,text in [
      ('Din biblioteca aplicației','Fundal Theatre. Mira: Teen cu bluză roșie și pantaloni albaștri. Radu: Teen cu tricou roșu și pantaloni gri. Dirijoare: Mother. Adăugăm întâi Mira, apoi Radu la M2, dirijoarea la M3. Sunet: numai Pop.'),
      ('Cum pui blocurile în buclă','Conectează Repetă din categoria portocalie după declanșator. Trage acțiunile în golul din interior; rama se lărgește. Apasă numărul de la capătul buclei. Blocurile de după închidere se execută o singură dată.'),
      ('O probă construită prin tragere','În captura de mai jos: Steag → Repetă 2 { Pop → Sari 1 }. Se aud două bătăi și se văd două sărituri. Sari 1 controlează înălțimea unei sărituri; Repetă 2 controlează numărul.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-9
    y=photo(c,'manual_repeat',34,y,300,(80,532,335,110))-12
    y=para(c,'M1-M2: Steag sus. Din M3: atinge dirijoarea pe scenă o singură dată și așteaptă finalul. După o oprire în mijlocul săriturii: Stop, Reset Characters, apoi pornește din nou. Nu sunt necesare fișiere de copiat pe tablete.',34,y,W-68,10)
    assert y>40,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        title=entry['name'].split(' - ',1)[1].split(' · ')[0]
        y=begin(title,'REZERVĂ' if key.startswith('r') else 'SOLUȚIE')
        page=entry['pages'][0];focus=page['focus'];top=y
        photo(c,key+'_'+focus,34,top,210,(401,75,478,358))
        ny=para(c,'ȚINTA',265,top,296,10,bold=True)-5
        ny=para(c,NOTES[key][0],265,ny,296,11)-10
        ny=para(c,'START: '+('Steag sus' if key in ('m1','m2') else 'atinge dirijoarea pe scenă'),265,ny,296,10,bold=True)
        y=min(top-166,ny)-10
        for actor in page['sprites']:
            ident=actor['id'];pr=actor['scripts'][0];width=WIDTHS[key][ident]
            y=para(c,actor['name'],34,y,W-68,11,bold=True)-2
            y=photo(c,key+'_'+ident,34,y,min(W-68,width*.83),(30,535,width,115))-2
            y=para(c,' → '.join(code(cmd) for cmd in [pr['trigger']]+pr['actions']),34,y,W-68,9)-11
        y=para(c,NOTES[key][1],34,y-3,W-68,10)
        if key=='m1':
            y=para(c,'Încearcă întâi singur. Dacă te blochezi: verifică marginea portocalie. Ea trebuie să cuprindă cele două sunete, cele două sărituri și pauza. Urmărește grupurile: 2 + 2 + 2.',34,y-14,W-68,11)
        assert y>40,(key,y)
        c.showPage();num+=1
    c.save();return out

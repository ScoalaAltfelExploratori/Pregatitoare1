"""Bus reference: one real scene and every character's complete programs per page."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_03_ScratchJr/capturi_autobuz'
DATA=json.loads((ROOT/'Lectia_03_ScratchJr/autobuz.json').read_text(encoding='utf-8'))
W,H=A4
TEAL=colors.HexColor('#14546a')
NAMES={'onflag':'Steag','onclick':'Atingere','onmessage':'Primește','message':'Trimite',
       'home':'Acasă','show':'Arată','hide':'Ascunde','forward':'Dreapta','up':'Sus',
       'down':'Jos','gotopage':'Pagina','setspeed':'Viteză'}
VALUES={'Orange':'portocaliu','Blue':'albastru','null':'',0:'lent'}
def code(s):
    return ' → '.join(NAMES[c['block']]+(' '+str(VALUES.get(c['value'],c['value'])) if c['value']!='null' else '') for c in [s['trigger']]+s['actions'])
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(TEAL);c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 03 / AJUTOR VIZUAL');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,22,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 18 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':'Ținta: Ana ajunge la ușă și abia acolo dispare. Autobuzul rămâne pe loc. Înaintea fiecărei probe: pagina 1, Stop dacă rulează, resetare, Steag; apoi o singură atingere pe autobuz.',
 'm2':'Ținta: urcare → plecare → altă scenă → oprire → coborâre. Blocul roșu Pagina 2 se pune ultimul. Schimbarea paginii pornește automat programele cu Steag din noua scenă.',
 'm3':'Puzzle greu: trei pasageri, distanțe diferite. Autobuzul nu are voie să plece cât timp mai este cineva afară. Trimite portocaliu așteaptă terminarea tuturor firelor pornite de mesaj; nu adăuga Așteaptă.',
 'creatie':'Exemplu posibil: excursie în parc, cu alte locuri de întâlnire. Copilul poate alege alt fundal din bibliotecă și alte trasee. Păstrează urcarea la ușă și coborârea după oprire.',
 'r1':'Rezervă: numai Mara merge lent, deși are drumul cel mai scurt. Alege pietonul lent din blocul portocaliu Viteză. Autobuzul trebuie să o aștepte fără să modifici programul său.',
 'r2':'Rezervă: Ana coboară în parc. Dan și Mara rămân ascunși până la plajă. Autobuzul așteaptă ca Ana să termine coborârea înainte să plece din parc. Pe pagina 3 nu mai adăuga Ana.'}
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);out=[];num=start_page
    def begin(title,tag):
        out.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Pregătește călătoria','0-8 MINUTE')
    y=para(c,'Trei copii pleacă la plajă. Ajung din locuri diferite, iar șoferul trebuie să-i aștepte pe toți. La destinație, autobuzul oprește înainte să coboare.',34,y,W-68,11)-10
    y=photo(c,'m3_p1_bus',34,y,W-68,(0,0,1280,800))-12
    for title,text in [
        ('Elemente din aplicație','Bus; trei personaje Child: fata cu fustă mov (Ana), băiatul cu tricou galben (Dan), fata cu rochie roz (Mara). Fundaluri Suburbs și Beach Day; Park la creație și R2. În M1-M2 folosește numai Ana.'),
        ('Mărimi și distanțe','Autobuzul: aproximativ 7 pătrățele lățime; copiii: aproximativ 3 pătrățele înălțime. Așază ușa pe aceeași linie cu pasagerii. De la Ana la ușă sunt 10 pași; de la Dan 8; de la Mara 6. Toți au viteza normală, exceptând R1.'),
        ('Construim direct pe tabletă','Nu sunt necesare imagini, sunete sau fișiere de instalat. Titlurile ABC sunt opționale. Plicurile se aleg din categoria galbenă; Ascunde și Arată din cea mov. Plic deschis = primește; închis = trimite.'),
        ('Regula probei','Pagina 1 → Stop dacă rulează → Reset Characters → Steag sus → atinge autobuzul o singură dată. Steagul pregătește personajele; atingerea autobuzului pornește urcarea. Așteaptă finalul înainte să reiei.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-9
    assert y>40;y=0;c.showPage();num+=1
    y=begin('Cum pregătești scena de sosire','ÎNAINTE DE M2')
    y=photo(c,'start_p2_ana',34,y,W-68,(0,0,1280,800))-12
    for title,text in [
        ('1. Adaugă pagina 2','Apasă + în lista paginilor, alege Beach Day și adaugă din nou Bus și copilul din bibliotecă. Personajele și programele sunt separate pe fiecare pagină.'),
        ('2. Așază locul de coborâre','Pune temporar autobuzul la oprire. Așază copilul chiar în dreptul ușii. Mută numai autobuzul 4 pătrățele spre stânga: de aici va veni. Copilul rămâne în locul viitoarei uși.'),
        ('3. Ascunde pasagerul la început','Trage blocul mov Ascunde în zona albă și atinge-l: copilul dispare. Apoi folosește acel bloc în firul Primește portocaliu → Ascunde → Acasă. Personajul rămâne selectabil în lista din stânga.'),
        ('4. Programează sosirea','Autobuzul: Steag → Acasă → portocaliu → Dreapta 4 → albastru. Copilul: Primește albastru → Arată → traseul de coborâre. Mesajul albastru se trimite după deplasarea autobuzului.'),
        ('5. Probează de pe pagina 1','Nu apăsa un al doilea steag la plajă. Blocul Pagina 2 continuă povestea. Pentru o cursă nouă revino la pagina 1, resetează și pornește ca la pregătire.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-9
    assert y>40;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        for i,page in enumerate(entry['pages'],1):
            title=entry['name'].split(' - ',1)[1].split(' · ')[0]
            y=begin(title,f'SCENA {i} / '+('REZERVĂ' if key.startswith('r') else 'SOLUȚIE'))
            y=para(c,'Suburbs · urcare' if i==1 else ('Park · oprire în parc' if page['background']=='Park.svg' else 'Beach Day · sosire la plajă'),34,y,W-68,11,bold=True)-8
            name=f'{key}_p{i}_bus';top=y
            photo(c,name,34,top,205,(409,75,464,355))
            bus=page['sprites'][0]
            by=para(c,'Autobuz',258,top,303,11,bold=True)-2
            for row,program in enumerate(bus['scripts']):
                width=max(220,120+65*len(program['actions']))
                by=photo(c,name,258,by,min(303,width*.78),(30,548+95*row,width,100))-3
            y=min(top-167,by)-8
            for child in page['sprites'][1:]:
                y=para(c,child['name'],34,y,W-68,11,bold=True)-3
                name=f'{key}_p{i}_{child["id"]}';bottom=y
                for row,program in enumerate(child['scripts']):
                    x=34+277*row
                    bottom=min(bottom,photo(c,name,x,y,250,(30,548+95*row,365,100)))
                    bottom=min(bottom,para(c,code(program),x,y-70,250,8.2))
                if len(child['scripts'])==1:
                    para(c,'Rămâne în autobuz: fără fir albastru.',311,y-12,250,10)
                y=bottom-11
            y=para(c,NOTES[key],34,y-5,W-68,10)-8
            if i>1:y=para(c,'La pregătire, pasagerii sunt ascunși în locul ușii după oprire. Pentru a-i găsi, selectează-i în lista din stânga. Capturile arată toate firele fiecărui personaj.',34,y,W-68,9)
            assert y>40,(key,i,y)
            c.showPage();num+=1
    c.save();return out

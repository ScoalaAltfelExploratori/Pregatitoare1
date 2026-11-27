"""ROV lesson: complete native programs, grouped by actor at every stage."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_08_ScratchJr/verificare/capturi_submarin'
DATA=json.loads((ROOT/'Lectia_08_ScratchJr/submarin.json').read_text(encoding='utf-8'))
W,H=A4
N={'onflag':'Steag','onmessage':'Primește','message':'Trimite','home':'La poziția inițială','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','wait':'Așteaptă','show':'Arată','hide':'Ascunde','setspeed':'Viteză','onclick':'La atingere','ontouch':'La ciocnire','forever':'Repetă mereu'}
C={'Orange':'portocaliu','Yellow':'galben','Blue':'albastru','Purple':'mov','Red':'roșu','Green':'verde','null':''}
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
    c.setFillColor(colors.HexColor('#144974'));c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 08 / PROGRAME ȘI CAPTURI');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,20,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Telecomanda','Construim patru comenzi: stânga/dreapta câte 2 pași, sus/jos câte 1. Un plic al butonului trebuie să aibă aceeași culoare ca receptorul robotului.','m1-final'),
 'm2':('Recuperarea','După 5 apăsări Dreapta și 5 Jos, capsula trece sub clește. Așteptăm să fie complet vizibilă înainte să continuăm. În M2 încă nu o putem depune.','m2-transport-scena'),
 'm3':('Misiunea completă','Dificil, pentru toți: recuperăm, revenim deasupra platformei și depunem. Apoi mutăm robotul gol: capsula rămâne pe platformă.','m3-depunere'),
 'creatie':('Pilotaj de precizie','Exemplu de creație: capsula este cu un pătrățel mai la dreapta. Robotul ȘI copia transportată folosesc acum pași orizontali de 1. Traseu: 11 Dreapta, 5 Jos; apoi 5 Sus, 11 Stânga.','creatie-final'),
 'r1':('Transport fragil','Pornim din M3. La verde, robotul și capsula trec la viteză lentă. La mov, ambele revin la normal. Aceleași distanțe, durată diferită.','r1-recuperare'),
 'r2':('Întoarcere automată','Pornim separat din M3. După recuperare, cele patru săgeți dispar. Un singur buton execută 5 comenzi Sus, 5 Stânga și depunerea.','r2-final')}
def groups(key,page):
    ids=[['platforma','robot','sol']]
    if key=='m1':ids += [['stanga','dreapta','sus','jos']]
    elif key=='m2':ids += [['transport','stanga','dreapta','sus','jos']]
    elif key=='r2':ids += [['transport','livrata','auto'],['stanga','dreapta'],['sus','jos']]
    else:ids += [['transport','livrata','depune'],['stanga','dreapta','sus','jos']]
    by={a['id']:a for a in page['sprites']};return [[by[k] for k in row] for row in ids]
def snippet(c,key,a,i,x,y,width):
    s=a['scripts'][i];wide=any('repeat' in b for b in s['actions'])
    sx,sy=a['layout'][i];sy+=528;sx-=10
    if wide:sy-=16;sw=560;sh=116
    else:sw=95+65*len(s['actions']);sh=100
    scale=min(.58,width/sw)
    end=photo(c,key+'-'+a['id'],x,y,sw*scale,(sx,sy,sw,sh))-2
    return para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),x,end,width,8.5)-8
def scripts(c,key,actors,y):
    col=(W-84)/2
    for a in actors:
        y=para(c,a['name'],34,y,W-68,10.5,bold=True)-3
        ss=a['scripts'];i=0
        while i<len(ss):
            if any('repeat' in b for b in ss[i]['actions']):
                y=snippet(c,key,a,i,34,y,W-68);i+=1
            else:
                ends=[snippet(c,key,a,i,34,y,col)];i+=1
                if i<len(ss) and not any('repeat' in b for b in ss[i]['actions']):ends.append(snippet(c,key,a,i,50+col,y,col));i+=1
                y=min(ends)
        y-=4
    return y
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);outline=[];num=start_page
    def begin(title,tag):outline.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Recuperăm capsula de cercetare','PREGĂTIRE')
    y=para(c,'O capsulă cu măsurători s-a desprins și a ajuns pe fundul mării. Robotul submarin poate coborî acolo unde oamenii nu pot lucra. Îi construim telecomanda, prinderea și transportul până la platforma de recuperare.',34,y,W-68,11)-8
    top=y;photo(c,'start-robot',34,top,250,(401,75,478,358));photo(c,'m3-depunere',310,top,250,(401,75,478,358));y=top-198
    for title,text in [
      ('Pornire','Importă start.sjr o singură dată înaintea orei. Toate cele 12 personaje sunt fără cod. Capsula transportată, Capsula livrată, Depune și Întoarcere sunt ascunse, dar se selectează din listă. Construim în același proiect.'),
      ('Telecomanda rămâne activă','Platforma: Steag → Așteaptă 10 → Repetă mereu. Bucla ține stația pornită în timp ce așteaptă comenzile. Un steag pornește; butonul devine Stop. Pentru o probă nouă: Stop, apoi Steag. Nu apăsăm steagul între două săgeți.'),
      ('Trei imagini, o singură capsulă','Copia de pe fund așteaptă robotul. Copia transportată pornește ascunsă, exact sub poziția inițială a cleștelui; primește aceleași deplasări ca robotul. La verde înlocuiește copia de pe fund. La mov o ascundem și arătăm copia de pe platformă.'),
      ('Rută și aliniere','Misiunea de bază: 5 Dreapta, 5 Jos; așteptăm prinderea, apoi 5 Sus, 5 Stânga și Depune. O apăsare, o mișcare terminată. Stânca este un obstacol vizual: copilul verifică ocolirea. Depune nu verifică automat poziția; îl apăsăm numai când capsula este deasupra marcajului verde.'),
      ('Păstrăm geometria','Robotul și copia transportată păstrează aceeași distanță între ele. Nu mutăm copia ascunsă separat. O săgeată orizontală înseamnă 2 pătrățele, cea verticală 1. Așteaptă 5 la contact oferă timp pentru așezarea cleștelui.'),
      ('Culorile comenzilor','Roșu: Stânga. Portocaliu: Dreapta. Galben: Sus. Albastru: Jos. Verde: capsula prinsă. Mov: capsula depusă. Plicurile dintr-o pereche au aceeași culoare.')]:
        y=para(c,title,34,y,W-68,10,bold=True)-2;y=para(c,text,34,y,W-68,9.5)-8
    assert y>36,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        for gi,group in enumerate(groups(key,entry['pages'][0])):
            title=NOTES[key][0]+(' / continuare '+str(gi+1) if gi else '')
            y=begin(title,'REZERVĂ' if key.startswith('r') else 'BAZĂ / PROGRAME COMPLETE')
            if gi==0:
                top=y;photo(c,NOTES[key][2],34,top,150,(401,75,478,358));ny=para(c,NOTES[key][1],200,top,W-234,10)-8
                ny=para(c,'Stop dacă rulează, apoi Steag. Așteptăm finalul fiecărei mișcări înainte de următoarea apăsare.',200,ny,W-234,9)
                y=min(top-120,ny)-8
            else:y=para(c,'Sunt incluse și firele păstrate din etapa anterioară. Fiecare rând cu declanșator este un program separat.',34,y,W-68,9.5)-8
            y=scripts(c,key,group,y)
            if gi==len(groups(key,entry['pages'][0]))-1:
                empty=[a['name'] for a in entry['pages'][0]['sprites'] if not a['scripts']]
                y=para(c,'Fără programe: '+', '.join(empty)+'.',34,y,W-68,9)-6
                if key=='m1':y=para(c,'Probă: Dreapta, Jos, Stânga, Sus. Robotul revine la punctul de plecare; capsula de pe fund nu se mișcă.',34,y,W-68,9)
                if key=='r2':y=para(c,'Întoarcerea este pentru punctul de recuperare din exemplu. Dacă schimbăm locul capsulei sau mărimea pașilor, recalculăm cele două bucle. Depune manual rămâne ascuns și fără cod.',34,y,W-68,9)
            assert y>36,(key,gi,y)
            c.showPage();num+=1
    c.save();return outline

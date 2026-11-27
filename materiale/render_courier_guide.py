"""Complete native ScratchJr programs, including every hard step and both backups."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_05_ScratchJr/capturi_curier'
DATA=json.loads((ROOT/'Lectia_05_ScratchJr/curier.json').read_text(encoding='utf-8'))
W,H=A4
TEAL=colors.HexColor('#14546a')
NAMES={'onclick':'Atingere','onmessage':'Primește','message':'Trimite','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','say':'Spune','setspeed':'Viteză'}
VALUES={'Orange':'portocaliu','Blue':'albastru','Green':'verde','Purple':'mov','null':''}
def code(b):
    v=VALUES.get(b['value'],b['value'])
    if b['block']=='setspeed':v={'0':'lentă','1':'normală'}[str(v)]
    return NAMES[b['block']]+(' '+str(v) if str(v) else '')
def photo(c,name,x,y,w,clip):
    sx,sy,sw,sh=clip;scale=w/sw;h=sh*scale
    c.saveState();p=c.beginPath();p.rect(x,y-h,w,h);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/(name+'.jpg'))),x-sx*scale,y-(800-sy)*scale,width=1280*scale,height=800*scale)
    c.restoreState();return y-h
def frame(c,num,title,tag):
    c.setFillColor(TEAL);c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 05 / AJUTOR VIZUAL');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,21,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 27 noiembrie 2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Mingea urcă pe plafon, mașina stă. Începem numai cu Car și Soccerball.',
       'Greul face parte din misiune: mingea trebuie să se așeze vizibil pe plafon. Dacă nu ajunge, verifică poziția de pornire și distanțele; nu o muta cu degetul în timpul probei.'),
 'm2':('O livrare completă: încărcare, transport 8 pași, descărcare și retur gol.',
       'Albastru pornește ambele transporturi. Firul portocaliu al mingii continuă cu descărcarea abia după ele. Mașina așteaptă întregul fir portocaliu, apoi revine singură. Nu trebuie Așteaptă.'),
 'm3':('O atingere: fotbal, retur gol, baschet, retur gol, apoi Livrate!',
       'Verdele stă după primul Stânga 8. A doua minge se încarcă numai după întoarcere. Ambele mingi rămân la destinație; replica vine după al doilea retur.'),
 'creatie':('Exemplu de creație: un gard închide drumul drept. Îl ocolim la dus și la întors.',
       'Cele patru fire încărcate au același Sus 3, Dreapta 8, Jos 3. Ambele retururi ale mașinii au Sus 3, Stânga 8, Jos 3. Gardul nu oprește automat mașina; codul evită zona închisă.'),
 'r1':('Fotbalul se încarcă lent. Robotul așteaptă, apoi transportă la viteza normală.',
       'La fotbal: Viteză lentă înainte de încărcare, Viteză normală înainte de albastru. Altfel mingea ar rămâne în urmă. Restul programelor sunt cele de la cele două livrări drepte.'),
 'r2':('Comandă urgentă: baschetul pleacă primul, fotbalul al doilea. Două retururi.',
       'Schimbăm numai ordinea plicurilor din firul Atingere: verde, retur, portocaliu, retur. Fiecare minge păstrează destinația ei. Finalul vine după ambele curse.')}
def scripts(c,key,actors,y):
    for a in actors:
        y=para(c,a['name'],34,y,W-68,11,bold=True)-4
        for i,s in enumerate(a['scripts']):
            x=630 if i==2 else 30;sy=548 if i==0 else 643
            sw=95+65*len(s['actions'])
            y=photo(c,key+'_'+a['id'],34,y,min(W-68,sw*.78),(x,sy,sw,100))-3
            y=para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),34,y,W-68,9)-10
    return y
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);out=[];num=start_page
    def begin(title,tag):out.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Pregătim magazia și robotul','0-8 MINUTE')
    y=para(c,'În sala de sport, un vehicul automat duce mingile la antrenament. Car reprezintă robotul; fiecare minge este un personaj cu propriul program.',34,y,W-68,11)-10
    y=photo(c,'start_grid',34,y,300,(401,75,478,358))-12
    for title,text in [
      ('Numai biblioteca aplicației','Fundal Gym. Car și Soccerball; Basketball la M3, Fence la ocol. Mașina: circa 5½ pătrățele lățime; mingea: un pătrățel diametru. Pentru mărime, apasă blocul Micșorează singur, fără declanșator, apoi scoate-l. ABC este opțional.'),
      ('Poziții care explică numerele','Mașina: jos, mijlocul la circa 6 pătrățele de marginea stângă. Fotbalul pleacă de 3 pătrățele mai jos și 2 la stânga punctului de pe plafon; baschetul de 3 mai jos și 4 la stânga. Spre dreapta: 8 pași de transport și încă 5 pentru descărcare.'),
      ('Culorile au roluri diferite','Portocaliu: întreaga livrare a fotbalului. Albastru: transportul mașinii ȘI fotbalului. Verde: întreaga livrare a baschetului. Mov: transportul mașinii ȘI baschetului. Plic închis = Trimite; plic deschis = Primește.'),
      ('Înainte de FIECARE probă','Stop dacă rulează, Reset Characters sus, apoi atinge mașina pe scenă o singură dată. Așteaptă sfârșitul. Steagul nu pornește aceste proiecte. Resetarea readuce și mingile în magazie.'),
      ('Cum așteaptă robotul','Trimite continuă cu următorul bloc numai după ce se termină programele pornite de acel mesaj. Mișcarea comună vine din coduri identice și viteze egale; mingea nu se atașează automat mașinii.')]:
        y=para(c,title,34,y,W-68,10.5,bold=True)-3;y=para(c,text,34,y,W-68,10)-10
    assert y>40,y;c.showPage();num+=1
    for entry in DATA['projects']:
        key=entry['key']
        if key=='start':continue
        actors=[a for a in entry['pages'][0]['sprites'] if a['scripts']]
        groups=[actors] if key in ('m1','m2') else [actors[:1],actors[1:]]
        title=entry['name'].split(' - ',1)[1].split(' · ')[0]
        for gi,group in enumerate(groups):
            suffix='' if len(groups)==1 else (' / robotul' if gi==0 else ' / ambele mingi')
            y=begin(title+suffix,'REZERVĂ' if key.startswith('r') else 'BAZĂ / SOLUȚIE COMPLETĂ')
            if gi==0:
                top=y
                shot='m1_fotbal' if key=='m1' else key+'_robot'
                photo(c,shot,34,top,200,(401,75,478,358))
                ny=para(c,NOTES[key][0],252,top,W-286,11)-10
                ny=para(c,'START: Reset Characters, apoi o atingere pe mașină.',252,ny,W-286,10,bold=True)
                y=min(top-155,ny)-12
            else:
                y=para(c,NOTES[key][0]+' Mai jos sunt toate firele mingilor, inclusiv cele păstrate din etapa anterioară.',34,y,W-68,11)-12
            y=scripts(c,key,group,y)
            y=para(c,NOTES[key][1],34,y-1,W-68,10)-12
            if key=='creatie' and gi==0:
                y=para(c,'Zonă închisă / Fence: fără program. Pune un gard mic, de circa 2 pătrățele, între bază și destinație. Păstrează loc pentru întreaga lățime a mașinii înainte și după gard.',34,y,W-68,10)-9
            if key=='m3' and gi==1:
                y=photo(c,'m3_final',34,y,200,(401,75,478,358))-8
                y=para(c,'Rezultatul: ambele mingi livrate în dreapta, robotul revenit la magazie în stânga.',34,y,W-68,9)
            if key=='creatie' and gi==1:
                y=para(c,'Alege o variantă proprie: altă magazie, alte destinații sau altă înălțime a ocolului. Actualizează toate firele afectate și verifică dusul, descărcarea și întoarcerea. Ai 10 minute de creație.',34,y,W-68,11)
            assert y>40,(key,gi,y)
            c.showPage();num+=1
    c.save();return out

"""Illustrated recycling reference; crop actual native screenshots using measured DOM bounds."""
from pathlib import Path
import json,re
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from render_snapshot_guide import para
ROOT=Path(__file__).resolve().parent
L=ROOT/'Lectia_09_ScratchJr';SHOTS=L/'verificare/capturi_reciclare'
DATA=json.loads((L/'reciclare.json').read_text(encoding='utf-8'))
# Some re-captures replace a filename; the last metadata record is authoritative.
CAPS=list({c['file']:c for c in json.loads((L/'verificare/capturi.json').read_text(encoding='utf-8')) if c.get('final')}.values())
W,H=A4
N={'onflag':'Steag','onmessage':'Primește','message':'Trimite','home':'La poziția inițială','up':'Sus','down':'Jos','forward':'Dreapta','back':'Stânga','wait':'Așteaptă','show':'Arată','hide':'Ascunde','setspeed':'Viteză','onclick':'La atingere','same':'Mărime inițială','grow':'Mărește','shrink':'Micșorează','say':'Spune'}
C={'Orange':'portocaliu','Yellow':'galben','Blue':'albastru','Purple':'mov','Red':'roșu','Green':'verde','null':''}
def code(b):
    if 'repeat' in b:return 'Repetă '+str(b['repeat'])+' { '+' → '.join(code(x) for x in b['body'])+' }'
    v=C.get(str(b['value']),b['value']);v='' if v is None else v
    if b['block']=='setspeed':v={0:'lentă',1:'normală',2:'rapidă'}[v]
    return N[b['block']]+(' '+str(v) if str(v) else '')
def crop_for(key,actor,index):
    candidates=[]
    wanted=next(a for p in DATA['projects'] if p['key']==key for a in p['pages'][0]['sprites'] if a['id']==actor)['scripts'][index]
    for c in CAPS:
        if '-I' not in c['file']:continue
        source=next(a for p in DATA['projects'] if p['key']==c['key'] for a in p['pages'][0]['sprites'] if a['id']==c['id'])
        matches=[i for i,s in enumerate(source['scripts']) if s==wanted]
        if not matches:continue
        source_index=matches[0]
        blocks=[]
        for b in c['rects']['blocks']:
            xy=re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',b['style'])
            if xy and round((float(xy[2])-20)/95)==source_index:blocks.append(b)
        if not blocks:continue
        x=min(b['x'] for b in blocks);y=min(b['y'] for b in blocks)
        right=max(b['x']+b['w'] for b in blocks);bottom=max(b['y']+b['h'] for b in blocks)
        vp=c['rects']['viewport'];work=c['rects']['workspace']
        # Fractional CSS bounds can extend <1 pixel beyond the raster viewport.
        if x>=0 and y>=work['y'] and right<=vp['w']+1 and bottom<=vp['h']+1:
            candidates.append((c['file'],(max(0,x-3),max(work['y'],y-3),right-x+6,min(vp['h'],bottom+3)-max(work['y'],y-3))))
    assert candidates,(key,actor,index,'missing complete screenshot')
    # Identical programs can reuse the same real capture; equality includes all block values.
    return sorted(candidates,key=lambda x:(x[0].startswith(key+'-'+actor+'-'),'-'+actor+'-' in x[0],x[0]),reverse=True)[0]
def photo(c,file,x,y,width,clip):
    sx,sy,sw,sh=clip;scale=width/sw;height=sh*scale
    iw,ih=Image.open(SHOTS/file).size
    c.saveState();p=c.beginPath();p.rect(x,y-height,width,height);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/file)),x-sx*scale,y-(ih-sy)*scale,width=iw*scale,height=ih*scale)
    c.restoreState();return y-height
def frame(c,num,title,tag):
    c.setFillColor(colors.HexColor('#1b6855'));c.setFont('Bold',8)
    c.drawString(34,H-28,'SCRATCHJR / LECȚIA 09 / PROGRAME ȘI CAPTURI');c.drawRightString(W-34,H-28,tag)
    y=para(c,title,34,H-50,W-68,20,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31)
    c.setFont('Body',7);c.drawString(34,19,'ScratchJr Desktop Reborn / Capturi reutilizate pentru programe identice / 27.11.2026');c.drawRightString(W-34,19,str(num))
    return y-12
NOTES={
 'm1':('Prima sticlă','5–20 min','Programăm un ciclu complet: robotul duce sticla la plastic, o depune și revine gol. Sticla rămâne în recipient.','m1-final.jpg'),
 'm2':('Trei categorii','20–35 min','Adăugăm doza și hârtia. Panoul pornește următorul obiect după ce robotul s-a întors. La final avem câte un obiect în fiecare recipient.','m2-final.jpg'),
 'm3':('Lotul amestecat','35–55 min · dificil','Ordinea este sticlă, hârtie, doză, sticlă. A doua sticlă trebuie să rămână lângă prima, nu peste ea. Nicio intervenție între obiecte.','m3-final.jpg'),
 'r1':('Compactăm hârtia','Rezervă · +5–8 min','Pornim din M3. Hârtia apare mare, apoi se micșorează de două ori înainte de transport. Mesajul albastru pregătește încărcătura; galbenul o transportă.','r1-final.jpg'),
 'r2':('Golim recipientele','Rezervă · +8–10 min','Pornim separat din M3. După primele trei obiecte, robotul așteaptă. Atingem Golire: lotul vechi dispare, apoi este transportată ultima sticlă.','r2-pauza.jpg')}
def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);outline=[];num=start_page;coverage=[]
    def begin(title,tag):outline.append((title,num-1));return frame(c,num,title,tag)
    y=begin('Stația de sortare','PREGĂTIRE')
    y=para(c,'După un eveniment în parc, ambalajele ajung amestecate la stație. Robotul trebuie să așeze fiecare obiect în recipientul potrivit și să lase loc pentru următorul.',34,y,W-68,11)-10
    y=photo(c,'m3-prezentare-final.jpg',34,y,W-68,(106,0,1067,800))-14
    for title,text in [
      ('Un singur import','Deschidem start.sjr înaintea orei. Toate cele 13 personaje sunt fără cod. Robotul, fundalul, ambalajele și recipientele sunt deja așezate. Copiii construiesc M1–M3 în același proiect.'),
      ('Personajele ascunse','Doza, Hârtia, Sticla 2 și Golire sunt ascunse la început. Le alegem din lista din stânga. Cele trei recipiente și cele trei etichete nu primesc programe.'),
      ('Cum pornește o probă','Steag pornește întregul lot. Pentru reluare în timpul mișcării: Stop, apoi Steag. Revenim în galerie pentru salvare. Starterul nu se mișcă până când adăugăm codul.'),
      ('Ce programăm','Mesajele selectează rute cunoscute. Robotul nu recunoaște singur materialele: noi legăm fiecare obiect de comanda potrivită. Etichetele arată categoriile folosite în această stație.')]:
        y=para(c,title,34,y,W-68,10,bold=True)-2;y=para(c,text,34,y,W-68,9.5)-8
    assert y>37,y;c.showPage();num+=1
    for p in DATA['projects']:
        key=p['key']
        if key=='start':continue
        title,tag,note,shot=NOTES[key];by={a['id']:a for a in p['pages'][0]['sprites']}
        # Full programs at every stage, including unchanged initialization and routes.
        groups=[['panou','robot'],['sticla1','doza'],['hartie','sticla2']]
        if key=='m1':groups=[['panou','robot','sticla1']]
        if key=='r2':groups.append(['golire'])
        for gi,ids in enumerate(groups):
            actors=[by[id] for id in ids if by[id]['scripts']]
            if not actors:continue
            y=begin(title+(' / continuare '+str(gi+1) if gi else ''),tag)
            if gi==0:
                # Standard editor scene viewport, measured in the browser.
                photo(c,shot,34,y,145,(401,75,478,358));ny=para(c,note,195,y,W-229,10)
                y=min(y-109,ny)-13
            for a in actors:
                y=para(c,a['name'],34,y,W-68,11,bold=True)-4
                for i,s in enumerate(a['scripts']):
                    file,clip=crop_for(key,a['id'],i);scale=min(.69,(W-68)/clip[2])
                    y=photo(c,file,34,y,clip[2]*scale,clip)-2
                    y=para(c,' → '.join(code(b) for b in [s['trigger']]+s['actions']),34,y,W-68,8.5)-9
                    coverage.append({'key':key,'actor':a['id'],'script':i,'capture':file,'clip':list(clip),'page':num})
                y-=5
            if key=='m1':extra='Fără cod în M1: Doza, Hârtia, Sticla 2, Golire și cele șase piese ale recipientelor.'
            elif key=='m2':extra='Fără cod în M2: Sticla 2, Golire și cele șase piese ale recipientelor.'
            else:extra='Recipientele și etichetele nu au cod. '+('Golire are cod doar în R2.' if key!='r2' else '')
            if gi==len(groups)-1:y=para(c,extra,34,y,W-68,9)-8
            assert y>36,(key,gi,y)
            c.showPage();num+=1
    y=begin('Repere pentru verificare','PROBĂ FINALĂ')
    for title,text in [
      ('Transportul se vede','Robotul și obiectul: Arată, Așteaptă 5, aceeași deplasare orizontală, Jos 3. Apoi obiectul mai coboară 1, iar robotul așteaptă 10 înainte să revină gol. Viteza este normală pentru amândoi.'),
      ('Două sticle, două locuri','Prima sticlă: Stânga 7. A doua: Stânga 5. Robotul revine cu aceeași distanță în sens invers. Ambele obiecte rămân vizibile în recipientul de plastic.'),
      ('Un lot se execută pe rând','Panoul trimite mesajele succesiv. Trimiterea așteaptă programele declanșate înainte să continue; la fiecare culoare răspund robotul și obiectul corespunzător. Nu lansăm toate culorile în fire separate.'),
      ('Compactarea are un scop','În R1, hârtia mare depășește lățimea recipientului. Mărește 10 o pregătește la dublul dimensiunii, iar Repetă 2 { Micșorează 5; Așteaptă 5 } o readuce la dimensiunea care încape. Este o reprezentare prin schimbarea mărimii, fără o presă fizică.'),
      ('Golirea are o comandă clară','R2 așteaptă operatorul după trei obiecte. Mov arată butonul. La atingere: butonul se ascunde, albastru ascunde lotul depus, verde pornește ultima sticlă. Nu există senzor automat de recipient plin.'),
      ('Criterii de reușită','Un singur Steag pentru M3. Patru obiecte, trei categorii, două sticle separate. Robotul revine gol după fiecare. Stop și Steag reiau corect; salvarea și redeschiderea păstrează proiectul.')]:
        y=para(c,title,34,y,W-68,11,bold=True)-3;y=para(c,text,34,y,W-68,10)-13
    y=para(c,'Verificat în browser: importul și redeschiderea celor șase proiecte, mișcarea și ambele rezerve. Un Lenovo fizic nu a fost testat; verifică starterul pe o tabletă a școlii înaintea orei.',34,y,W-68,9)-8
    assert y>36,y;c.showPage();c.save()
    (L/'verificare/pdf-capture-coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return outline

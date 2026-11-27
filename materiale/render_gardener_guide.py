"""Render an illustrated reference from real native-app captures; never draw replacement blocks."""
from pathlib import Path
import importlib.util,json,re
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from xml.sax.saxutils import escape
from render_snapshot_guide import para
from render_recycling_guide import code
ROOT=Path(__file__).resolve().parent;L=ROOT/'Lectia_10_ScratchJr';SHOTS=L/'verificare/capturi_gradinar'
DATA=json.loads((L/'gradinar.json').read_text(encoding='utf-8'))
CAPS=json.loads((L/'verificare/capturi.json').read_text(encoding='utf-8'))
W,H=A4

def xy(block):
    m=re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',block['style'])
    return (round(float(m[1]),1),round(float(m[2]),1)) if m else None

def segments(key,actor,index):
    wanted=next(a for p in DATA['projects'] if p['key']==key for a in p['pages'][0]['sprites'] if a['id']==actor)['scripts'][index]
    candidates=[]
    for c in CAPS:
        source=next(a for p in DATA['projects'] if p['key']==c['key'] for a in p['pages'][0]['sprites'] if a['id']==c['id'])
        for si,sc in enumerate(source['scripts']):
            if sc!=wanted:continue
            allblocks=[b for b in c['rects']['blocks'] if xy(b) and round((xy(b)[1]-30)/120)==si]
            allblocks.sort(key=lambda b:xy(b))
            def count(xs):return sum(1+(count(x['body']) if 'repeat' in x else 0) for x in xs)
            assert len(allblocks)==1+count(wanted['actions']),(key,actor,index,'DOM/source block-count mismatch')
            complete={i:b for i,b in enumerate(allblocks) if b['x']>=-.01 and b['x']+b['w']<=1281 and b['y']>=536 and b['y']+b['h']<=801}
            if complete:candidates.append((c['file'],complete))
    # Expected native coordinates independently derived from the source commands.
    spec=importlib.util.spec_from_file_location('encode10',ROOT/'Lectia_00_ScratchJr/build_pack.py');n=importlib.util.module_from_spec(spec);spec.loader.exec_module(n)
    def flatten(arr):
        out=[]
        for b in arr:
            out.append((round(b[2],1),round(b[3],1)))
            if b[0]=='repeat':out+=flatten(b[4])
        return out
    # The app expands Repeat's width when laying out imported code; compare ordered
    # blocks, not the exporter's provisional coordinates. Count includes Repeat bodies.
    expected=list(range(1+len(flatten(n.encode(wanted['actions'],y=30)))))
    assert expected and all(any(x in bs for _,bs in candidates) for x in expected),(key,actor,index,'missing blocks',[x for x in expected if not any(x in bs for _,bs in candidates)])
    result=[];at=0
    while at<len(expected):
        choices=[]
        for file,bs in candidates:
            if expected[at] not in bs:continue
            end=at
            while end+1<len(expected) and expected[end+1] in bs:
                proposed=[bs[x] for x in expected[at:end+2]]
                if max(b['x']+b['w'] for b in proposed)-min(b['x'] for b in proposed)>730:break
                end+=1
            choices.append((end,file,bs))
        end,file,bs=max(choices,key=lambda z:(z[0],z[1].startswith(key+'-'+actor)))
        selected=[bs[x] for x in expected[at:end+1]]
        x=max(0,min(b['x'] for b in selected)-2);y=max(536,min(b['y'] for b in selected)-2)
        r=min(1280,max(b['x']+b['w'] for b in selected)+2);bottom=min(800,max(b['y']+b['h'] for b in selected)+2)
        result.append({'capture':file,'clip':[x,y,r-x,bottom-y],'native_blocks':expected[at:end+1]})
        at=end+1
    return result

def photo(c,file,x,y,width,clip):
    sx,sy,sw,sh=clip;scale=width/sw;height=sh*scale;iw,ih=Image.open(SHOTS/file).size
    c.saveState();p=c.beginPath();p.rect(x,y-height,width,height);c.clipPath(p,stroke=0)
    c.drawImage(ImageReader(str(SHOTS/file)),x-sx*scale,y-(ih-sy)*scale,width=iw*scale,height=ih*scale)
    c.restoreState();return y-height

NOTES={
 'm1':('Prima plantă','5–20 min','Planta A are nevoie de două porții. Robotul udă numai după ce ajunge lângă ghiveci. La întoarcere mai are o porție.','3 → 2 → 1'),
 'm2':('Reumplem rezervorul','20–35 min','După A, robotul revine sub stație. Apa curge în rezervor; abia apoi indicatorul revine la 3. Planta B încă așteaptă.','3 → 2 → 1 → 3'),
 'm3':('Întreaga seră','35–55 min · dificil','Un singur Steag: două porții la A, reumplere, două porții la B, retur. Jetul se oprește înaintea fiecărei deplasări.','3 → 2 → 1 → 3 → 2 → 1'),
 'r1':('Rezervor de patru','Rezervă · +5–8 min','Pornim separat din M3. Cu grila pornită, tragem indicatorul cu o celulă la dreapta, la 4, pentru noua poziție inițială. Mergem direct de la A la B, fără reumplere.','4 → 3 → 2 → 1 → 0'),
 'r2':('Două treceri','Rezervă · +8–10 min','Pornim separat din M3, cu trei porții. Dăm întâi câte una fiecărei plante. Revenim la A pentru a doua; rezervorul ajunge la zero. Reumplem și terminăm B.','3 → 2 → 1 → 0 → 3 → 2')}

def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4);num=start_page;outline=[];coverage=[]
    def begin(title,tag):
        outline.append((title,num-1));c.setFillColor(colors.HexColor('#245975'));c.setFont('Bold',8)
        c.drawString(34,H-28,'SCRATCHJR / LECȚIA 10 / PROGRAME ȘI CAPTURI');c.drawRightString(W-34,H-28,tag)
        y=para(c,title,34,H-50,W-68,20,bold=True)-12
        c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,W-34,31);c.setFont('Body',7)
        c.drawString(34,19,'Capturi din ScratchJr Desktop Reborn / 27.11.2026');c.drawRightString(W-34,19,str(num));return y
    def end():
        nonlocal num
        c.showPage();num+=1
    y=begin('Sera are nevoie de apă','PREGĂTIRE')
    y=para(c,'Instalația de udare s-a oprit. Două plante sunt ofilite. Fiecare are nevoie de două porții, însă robotul poate duce numai trei. Unde introducem reumplerea ca să terminăm sera?',34,y,W-68,11)-12
    y=photo(c,'start-prezentare.jpg',34,y,W-68,(106,0,1067,800))-14
    for title,text in [('Un import înaintea orei','Deschidem start.sjr: 13 personaje fără cod, toate imaginile incluse. Păstrăm pozițiile și dimensiunile. Construim cele trei etape în același proiect.'),('Personajele ascunse','Planta A/B — udată, Jetul A/B și Apa de la stație se aleg din lista din stânga. Ghivecele, stația și scala sunt decor fără programe.'),('Pornire și salvare','Steag pornește misiunea. Pentru reluare în timpul mișcării: Stop, apoi Steag. Revenirea în galerie salvează proiectul.')]:
        y=para(c,title,34,y,W-68,10,bold=True)-2;y=para(c,text,34,y,W-68,9.5)-8
    assert y>36,y;end()
    y=begin('O porție, două acțiuni','COMENZILE SEREI')
    for title,text in [('Roșu / planta A','Jetul A: Arată, Așteaptă 10, Ascunde, Așteaptă 5. În același timp, indicatorul face Stânga 1. Un mesaj consumă o porție.'),('Portocaliu / planta B','Același lucru pentru Jetul B; indicatorul face din nou Stânga 1.'),('Verde și mov / planta terminată','Verde schimbă planta A ofilită cu cea udată. Mov schimbă planta B. Trimitem aceste mesaje numai după a doua porție.'),('Galben și albastru / reumplere','Galben arată apa stației, așteaptă 20 și o ascunde. Albastru readuce indicatorul la poziția inițială: rezervor plin.'),('Deplasările robotului','Stație → A: Dreapta 6, Sus 4. Stație → B: Dreapta 6, Jos 2. A → B: Jos 6. Returul inversează deplasările. La stație, blocul La poziția inițială aliniază din nou gura rezervorului.'),('Cum citim capturile','Citim de la stânga la dreapta. Fragmentele numerotate sunt continuări ale aceluiași fir, conectate în editor. Un Steag se pune doar la început. Programele identice pot folosi aceeași captură, verificată bloc cu bloc.')]:
        y=para(c,title,34,y,W-68,11,bold=True)-3;y=para(c,text,34,y,W-68,10)-12
    y=para(c,'Acesta este un model programat. Indicatorul nu blochează singur udarea la zero; noi alegem momentul reumplerii. Florile arată că misiunea plantei s-a încheiat.',34,y,W-68,10)-8
    assert y>36,y;end()
    for p in DATA['projects']:
        key=p['key']
        if key=='start':continue
        title,tag,note,trajectory=NOTES[key];y=begin(title,tag)
        photo(c,key+'-final.jpg',34,y,160,(401,75,478,358));ny=para(c,note,208,y,W-242,10)
        y=min(y-120,ny)-12;y=para(c,'Indicatorul: '+trajectory,34,y,W-68,10,bold=True)-12
        by={a['id']:a for a in p['pages'][0]['sprites']}
        for id in ['robot','indicator','jeta','uscataa','viea','umplere','jetb','uscatab','vieb']:
            a=by[id]
            if not a['scripts']:continue
            def text_height(t,size):return Paragraph(escape(t),ParagraphStyle('measure',fontName='Body',fontSize=size,leading=size*1.3)).wrap(W-68,900)[1]
            need=22
            for si,sc in enumerate(a['scripts']):
                pieces=segments(key,id,si)
                need+=sum(seg['clip'][3]*min(.7,(W-68)/seg['clip'][2])+4+(14.05 if len(pieces)>1 else 0) for seg in pieces)
                need+=text_height(' → '.join(code(x) for x in [sc['trigger']]+sc['actions']),8.5)+12
            assert need<700,(key,id,need)
            if y-need<42:end();y=begin(title+' / continuare',tag)
            y=para(c,a['name'],34,y,W-68,12,bold=True)-6
            for i,sc in enumerate(a['scripts']):
                segs=segments(key,id,i)
                for j,seg in enumerate(segs):
                    clip=seg['clip'];width=min(clip[2]*.7,W-68);height=clip[3]*width/clip[2]
                    if len(segs)>1:y=para(c,f'Firul {i+1} · fragment {j+1}/{len(segs)}'+(' · continuă firul de mai sus' if j else ''),34,y,W-68,8.5)-3
                    y=photo(c,seg['capture'],34,y,width,clip)-4
                    coverage.append({'key':key,'actor':id,'script':i,'segment':j,'page':num,**seg})
                text=' → '.join(code(x) for x in [sc['trigger']]+sc['actions'])
                y=para(c,text,34,y,W-68,8.5)-12
        inactive=', '.join(a['name'] for a in p['pages'][0]['sprites'] if not a['scripts'])
        if y<95:end();y=begin(title+' / verificare',tag)
        y=para(c,'Fără cod: '+inactive+'.',34,y,W-68,9)-8
        if key=='m2':
            y-=12;y=photo(c,'m3-reumplere.jpg',34,y,W-68,(401,75,478,358))-8
            y=para(c,'La stație: apa intră în rezervor. Indicatorul rămâne la 1 cât curge jetul; albastru îl readuce la 3 după reumplere.',34,y,W-68,9)-8
        assert y>36,(key,y);end()
    y=begin('Proba finală','VERIFICĂ ȘI SALVEAZĂ')
    for title,text in [('Două porții, fără apă risipită','Numărăm două apariții ale fiecărui jet. Robotul rămâne lângă ghiveci până când jetul dispare. Florile apar după a doua porție.'),('Apa chiar se consumă','La fiecare porție, indicatorul se mută o unitate spre zero. În M3 rămâne 1 după A, revine la 3 la stație și ajunge din nou la 1 după B.'),('R1: patru porții sunt suficiente','Indicatorul pornește de la 4. A primește 2, B primește 2, rămân 0. Robotul revine la stație fără să trimită galben sau albastru.'),('R2: schimbăm ordinea, nu nevoile plantelor','Ordinea porțiilor este A, B, A, reumplere, B. Nu trimitem verde sau mov după prima porție. Acestea confirmă a doua porție a plantei respective.'),('Dacă ceva nu merge','Verificăm plicurile pereche, numerele și personajul selectat. Pentru un nou test complet: Stop, apoi Steag. Dacă apare o pictogramă goală în portul web, alegem din nou aceeași valoare din săgeata blocului.'),('Ce a fost testat','Cele șase proiecte au fost importate și redeschise în browser; cele cinci soluții au fost rulate. Au fost verificate jeturile, nivelul apei, înflorirea, ambele rezerve, oprirea și reluarea M3. Proba pe un Lenovo fizic rămâne de făcut înaintea orei.')]:
        y=para(c,title,34,y,W-68,11,bold=True)-3;y=para(c,text,34,y,W-68,10)-12
    assert y>36,y;end();c.save()
    (L/'verificare/pdf-capture-coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return outline

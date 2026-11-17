"""Append student reference pages made from unaltered ScratchJr screenshots."""
from pathlib import Path
from xml.sax.saxutils import escape
import json
from PIL import Image as PILImage
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader, PdfWriter

ROOT=Path(__file__).resolve().parent
SHOTS=ROOT/'Lectia_01_ScratchJr'/'capturi_stafeta'
INK=colors.HexColor('#172d3e');TEAL=colors.HexColor('#087f75');MUTED=colors.HexColor('#52636f')
WIDTH,HEIGHT=A4

def para(c,text,x,y,w,size=11,color=INK,bold=False):
    st=ParagraphStyle('shottext',fontName='Bold' if bold else 'Body',fontSize=size,leading=size*1.3,textColor=color)
    obj=Paragraph(escape(text),st);_,h=obj.wrap(w,900)
    obj.drawOn(c,x,y-h)
    return y-h

def photo(c,name,x,y,w):
    path=SHOTS/name
    with PILImage.open(path) as im: iw,ih=im.size
    h=w*ih/iw
    c.drawImage(ImageReader(str(path)),x,y-h,width=w,height=h)
    return y-h

def frame(c,page,title,tag):
    c.setFillColor(TEAL);c.setFont('Bold',8)
    c.drawString(34,HEIGHT-28,'SCRATCHJR / LECȚIA 01 / AJUTOR VIZUAL')
    c.drawRightString(WIDTH-34,HEIGHT-28,tag)
    y=para(c,title,34,HEIGHT-50,WIDTH-68,23,bold=True)
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,WIDTH-34,31)
    c.setFont('Body',7);c.setFillColor(MUTED)
    c.drawString(34,19,'Capturi reale din ScratchJr Desktop Reborn / 17 noiembrie 2026')
    c.drawRightString(WIDTH-34,19,str(page))
    return y-12

def render_appendix(dest,start_page=2):
    c=canvas.Canvas(str(dest),pagesize=A4)
    outline=[('Pregătește ștafeta',start_page-1)]
    y=frame(c,start_page,'Pregătește scena','0-7 MINUTE')
    y=para(c,'Echipa voastră trebuie să ducă mingea la sosire. A aleargă primul și îi pasează lui B. B așteaptă mingea, apoi continuă cursa. Programați fiecare etapă ca mingea să ajungă cu echipa la final.',34,y,WIDTH-68)-10
    y=photo(c,'pregatire.jpg',34,y,WIDTH-68)-12
    for title,text in [
        ('1. Alege elementele din bibliotecă.','Park, Rabbit (A), Dog (B), Ball (Minge). Micșorează alergătorii la aproximativ 2-3 pătrățele și mingea la un pătrățel. Viteză normală. Scrie START și SOSIRE cu unealta de text.'),
        ('2. Așază scena cu grila.','A (5, 4), B (12, 4), Minge (6, 5); sosirea în dreptul coloanei 18. Mai important: B este la 7 pași de A, mingea cu 1 la dreapta și 1 în sus față de A.'),
        ('3. Selectează personajul în stânga.','Trage blocurile în spațiul de jos și unește-le. Apasă numerele ca să le schimbi. Pentru plicuri, apasă săgeata mică și alege culoarea.'),
        ('4. Rulează de la început.','Înaintea fiecărei probe: Stop dacă programul rulează, apoi Reset Characters (săgeata rotundă de lângă steag). Apasă steagul de sus. La final resetează, salvează și redeschide din galerie.'),
    ]:
        y=para(c,title,34,y,WIDTH-68,11,bold=True)-3
        y=para(c,text,34,y,WIDTH-68,10.5)-8
    y=para(c,'Mingea are propriile programe. Ca să rămână lângă alergător, folosește aceleași deplasări și aceeași viteză. Când te blochezi, compară programul personajului selectat cu pagina misiunii.',34,y,WIDTH-68,10.5,TEAL)
    assert y>42,y
    c.showPage()
    examples=json.loads((SHOTS/'ghid.json').read_text(encoding='utf-8'))['examples']
    number=start_page+1
    for e in examples:
        outline.append((e['title'],number-1))
        y=frame(c,number,e['title'],e['time'].upper())
        y=para(c,e['target'],34,y,WIDTH-68,11.5)-10
        image_w=171 if e['key']=='r2' else 205
        image_bottom=photo(c,e['scene'],34,y,image_w)
        tx=34+image_w+16;tw=WIDTH-34-tx
        cy=para(c,'Ce construiești',tx,y,tw,10.5,TEAL,True)-5
        cy=para(c,e['change'],tx,cy,tw,10.5)-8
        cy=para(c,e['checkpoint'],tx,cy,tw,10,MUTED)
        y=min(image_bottom,cy)-12
        for pr in e['programs']:
            y=para(c,pr['character'],34,y,WIDTH-68,11,TEAL,True)-3
            if pr.get('empty'):
                y=para(c,'FĂRĂ PROGRAM',44,y-6,WIDTH-88,13,MUTED,True)-9
            else:
                y=photo(c,pr['file'],34,y,440 if e['key']=='r2' else 500)-3
            y=para(c,pr['caption'],34,y,WIDTH-68,10)-11
        tail=('Continuă pe pagina următoare: programele complete ale mingii.' if e.get('ball') else 'Verifică: '+e['check'])
        y=para(c,tail,34,y,WIDTH-68,10.3,TEAL)
        assert y>42,(e['key'],y)
        c.showPage();number+=1
        if e.get('ball'):
            outline.append((e['title']+' - mingea',number-1))
            y=frame(c,number,e['title']+' / Mingea','PROGRAMELE MINGII')
            y=para(c,'Selectează Minge în lista din stânga. Aceste programe se adaugă personajului Minge, separat de programele alergătorilor.',34,y,WIDTH-68,11)-14
            for pr in e['ball']:
                y=para(c,pr['character'],34,y,WIDTH-68,11,TEAL,True)-5
                with PILImage.open(SHOTS/pr['file']) as img: iw=img.width
                y=photo(c,pr['file'],34,y,500*iw/520)-5
                y=para(c,pr['caption'],34,y,WIDTH-68,11)-17
            y=para(c,'Urmărește cursa',34,y,WIDTH-68,12,TEAL,True)-6
            y=para(c,e['check'],34,y,WIDTH-68,11)-12
            if e['key']=='m2':
                y=para(c,'Portocaliul pornește în același timp B și al doilea program al mingii. Mingea primește și mesajul pe care îl trimite ea însăși. Albastrul pornește sărbătorirea lui A.',34,y,WIDTH-68,11)-14
                left=photo(c,'m1-final.jpg',34,y,215)
                right=photo(c,'m2-final.jpg',WIDTH-249,y,215)
                y=min(left,right)-5
                y=para(c,'Predare către B',34,y,215,10,TEAL,True)
                para(c,'Mingea ajunge la sosire',WIDTH-249,min(left,right)-5,215,10,TEAL,True)
            elif e['key']=='m3':
                y=para(c,'Indiciu 1: pe unde poate trece B? Indiciu 2: ce trebuie schimbat și la minge? Indiciu 3: pentru a reveni pe linia cursei, urcarea și coborârea au același număr.',34,y,WIDTH-68,11)
            assert y>42,(e['key'],'ball',y)
            c.showPage();number+=1
    c.save()
    return outline

def append_visual_pages(plan):
    appendix=plan.with_name('referinte-vizuale.tmp.pdf')
    original=PdfReader(str(plan));n=len(original.pages)
    outline=render_appendix(appendix,n+1)
    writer=PdfWriter();writer.append(original);writer.append(PdfReader(str(appendix)))
    writer.add_outline_item('Planul lecției 1 - 60 de minute',0)
    for title,page in outline:writer.add_outline_item(title,page)
    writer.add_metadata({'/Title':'ScratchJr - Planuri de 60 de minute și programe ilustrate','/Author':'Școala altfel'})
    with plan.open('wb') as output:writer.write(output)
    appendix.unlink()
    return n+len(outline)

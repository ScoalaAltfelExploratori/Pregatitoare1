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
SHOTS=ROOT/'Lectia_01_ScratchJr'/'capturi_60min'
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
    y=frame(c,start_page,'Pregătește scena','0-7 MINUTE')
    y=para(c,'A = iepurașul de jos. B = câinele. Mingea este ținta și nu are program. Poți alege alte personaje din bibliotecă.',34,y,WIDTH-68)-12
    y=photo(c,'pregatire-interfata.jpg',34,y,WIDTH-68)-13
    for title,text in [
        ('1. Alege personajul în stânga.','Aici selectezi al cui program construiești. Atingerea personajului pe scenă are alt rol.'),
        ('2. Trage și unește blocurile de jos.','Apasă numărul unui bloc ca să-l schimbi. Pentru mesaje, apasă săgeata mică și alege culoarea din exemplu.'),
        ('3. Folosește grila pentru distanțe.','Lasă 6 pași la dreapta lui A. De la B, pune mingea la 3 pași la dreapta și 2 în sus. Pozițiile exacte din exemplu: A (5, 5), B (11, 8), mingea (14, 10).'),
        ('4. Începe proba din pozițiile inițiale.','Înaintea unei misiuni: Stop, apoi Reset Characters (săgeata rotundă de lângă steag). Pornește cu steagul verde de sus.'),
    ]:
        y=para(c,title,34,y,WIDTH-68,11,bold=True)-3
        y=para(c,text,34,y,WIDTH-68,10.5)-11
    y=para(c,'Pauza de la minutul 30: mimăm semnalele, fără cod nou. La finalul lecției: revino în galerie și redeschide proiectul ca să verifici salvarea.',34,y,WIDTH-68,10.5)-10
    y=para(c,'Când te blochezi: găsește pagina misiunii, selectează personajul și compară blocurile de la stânga la dreapta. Verifică mai ales plicul de pornire, culoarea și numerele.',34,y,WIDTH-68,10.5,TEAL)
    assert y>42,y
    c.showPage()
    examples=json.loads((SHOTS/'ghid.json').read_text(encoding='utf-8'))['examples']
    for number,e in enumerate(examples,start_page+1):
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
                y=photo(c,pr['file'],34,y,480 if e['key']=='r2' else 500)-3
            y=para(c,pr['caption'],34,y,WIDTH-68,10)-11
        y=para(c,'Verifică: '+e['check'],34,y,WIDTH-68,10.3,TEAL)
        assert y>42,(e['key'],y)
        c.showPage()
    c.save()
    return [('Pregătește scena',start_page-1)]+[(e['title'],i) for i,e in enumerate(examples,start_page)]

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

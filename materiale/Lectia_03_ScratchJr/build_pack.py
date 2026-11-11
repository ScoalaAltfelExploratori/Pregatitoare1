"""Regenerate Lesson 3 PDFs and ScratchJr examples from editable sources.
Requires Python 3, reportlab, Pillow and pypdf.
"""
from pathlib import Path
import json, re, hashlib, zipfile, io, html
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import ParagraphStyle
from PIL import Image, ImageDraw
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parent
D=json.loads((ROOT/"lesson.json").read_text(encoding="utf-8-sig"))
FONT_DIR=Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Body",str(FONT_DIR/"arial.ttf")))
pdfmetrics.registerFont(TTFont("Bold",str(FONT_DIR/"arialbd.ttf")))
pdfmetrics.registerFontFamily("Body",normal="Body",bold="Bold",italic="Body",boldItalic="Bold")
INK=colors.HexColor("#173e3a"); TEAL=colors.HexColor("#7650a1"); MUTED=colors.HexColor("#58716b")
BLUE=colors.HexColor("#66b5ed"); YELLOW=colors.HexColor("#ffd35d")
PAPER=colors.HexColor("#fffdf8"); LINE=colors.HexColor("#dce6df"); MINT=colors.HexColor("#eee5f7")
W,H=landscape(A4)

def rabbit(c,x,y,r=25):
    # Schematic rabbit for printable cards; the app uses bundled Rabbit.svg.
    c.setFillColor(colors.HexColor("#b9783e"));c.setStrokeColor(colors.HexColor("#674126"));c.setLineWidth(1.4)
    c.ellipse(x-r*.6,y-r*.65,x+r*.65,y+r*.5,fill=1,stroke=1)
    c.ellipse(x-r*.55,y+r*.25,x-r*.16,y+r*1.4,fill=1,stroke=1)
    c.ellipse(x-r*.04,y+r*.25,x+r*.35,y+r*1.4,fill=1,stroke=1)
    c.circle(x,y+r*.25,r*.57,fill=1,stroke=1)
    c.setFillColor(INK);c.circle(x-r*.18,y+r*.37,r*.055,fill=1,stroke=0);c.circle(x+r*.18,y+r*.37,r*.055,fill=1,stroke=0)
    c.setFillColor(colors.HexColor("#e9a8a1"));c.circle(x,y+r*.14,r*.07,fill=1,stroke=0)

def paragraph(c,text,x,y,width,font="Body",size=15,leading=None,color=INK):
    st=ParagraphStyle("local",fontName=font,fontSize=size,leading=leading or size*1.4,textColor=color)
    p=Paragraph(text,st);pw,ph=p.wrap(width,1000);p.drawOn(c,x,y-ph);return y-ph

def page_header(c,label,title,sub=""):
    c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0);c.setFillColor(TEAL)
    c.setFont("Bold",10);c.drawString(42,H-38,"SCRATCHJR / LECȚIA 3");c.drawRightString(W-42,H-38,label.upper())
    c.setFillColor(INK);c.setFont("Bold",30);c.drawString(42,H-89,title)
    if sub:paragraph(c,sub,42,H-107,W-84,size=16,color=MUTED)
    c.setStrokeColor(LINE);c.line(42,38,W-42,38);c.setFillColor(MUTED);c.setFont("Body",9)
    c.drawString(42,23,"Personaje și stări desenate schematic. Lucrăm în ScratchJr.");c.drawRightString(W-42,23,str(c.getPageNumber()))

def fmt(s):
    s=html.escape(s);s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<link href="\2" color="#087f75">\1</link>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s);s=re.sub(r'\x60([^\x60]+)\x60',r'<b>\1</b>',s)
    return s.replace("–","-").replace("—","-")

def teacher_pdf():
    out=ROOT/"Ghid_profesor_Lectia_03.pdf"
    st={
      "body":ParagraphStyle("body",fontName="Body",fontSize=10.5,leading=14.5,textColor=INK,spaceAfter=7),
      "h1":ParagraphStyle("h1",fontName="Bold",fontSize=25,leading=30,textColor=INK,spaceAfter=15,keepWithNext=True),
      "h2":ParagraphStyle("h2",fontName="Bold",fontSize=16,leading=20,textColor=INK,spaceBefore=14,spaceAfter=8,keepWithNext=True),
      "cell":ParagraphStyle("cell",fontName="Body",fontSize=9.2,leading=12.5,textColor=INK),
      "list":ParagraphStyle("list",fontName="Body",fontSize=10.5,leading=14.5,textColor=INK,leftIndent=10,spaceAfter=6)}
    lines=(ROOT/"Ghid_profesor.md").read_text(encoding="utf-8-sig").splitlines();story=[];i=0
    while i<len(lines):
        line=lines[i].strip()
        if not line:i+=1;continue
        if line == "<!-- pagebreak -->":
            story.append(PageBreak());i+=1;continue
        if line.startswith("|"):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith("|"):
                cells=[x.strip() for x in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"[-: ]+",x) for x in cells):rows.append(cells)
                i+=1
            n=len(rows[0]);widths=[135,380] if n==2 else [53,103,359]
            t=Table([[Paragraph(fmt(v),st["cell"]) for v in r] for r in rows],colWidths=widths,repeatRows=1,hAlign="LEFT")
            t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),MINT),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),("LINEBELOW",(0,0),(-1,-1),.4,LINE)]))
            story.extend([t,Spacer(1,10)]);continue
        if line.startswith("# "):story.append(Paragraph(fmt(line[2:]),st["h1"]))
        elif line.startswith("## "):
            story.append(Paragraph(fmt(line[3:]),st["h2"]))
        elif line.startswith("- "):story.append(Paragraph("• "+fmt(line[2:]),st["list"]))
        elif re.match(r"^\d+\. ",line):story.append(Paragraph(fmt(line),st["list"]))
        else:story.append(Paragraph(fmt(line),st["body"]))
        i+=1
    def decorate(c,doc):
        pw,ph=A4;c.saveState();c.setFont("Body",8);c.setFillColor(MUTED)
        c.drawString(40,ph-26,"SCRATCHJR / LECȚIA 3 / GHID PENTRU PROFESOR")
        c.setStrokeColor(LINE);c.line(40,36,pw-40,36)
        c.drawString(40,23,"50 de minute · 6-7 ani · Versiune pentru probă");c.drawRightString(pw-40,23,str(doc.page));c.restoreState()
    SimpleDocTemplate(str(out),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=48,bottomMargin=49,title="Lecția 3 ScratchJr - Ghidul profesorului").build(story,onFirstPage=decorate,onLaterPages=decorate)
    reader=PdfReader(str(out));extracted="\n".join(p.extract_text() for p in reader.pages)
    assert len(reader.pages)==4, f"Guide overflow: {len(reader.pages)} pages"
    for phrase in ["Misiunea 1","Misiunea 2","Dificultăți și sprijin","50 de minute"]:assert phrase in extracted,phrase
    return len(reader.pages)



def dog(c,x,y,r=22):
    c.setFillColor(colors.HexColor('#fffaf0'));c.setStrokeColor(INK);c.setLineWidth(1.2)
    c.ellipse(x-r*.8,y-r*.7,x+r*.8,y+r*.9,fill=1,stroke=1)
    c.setFillColor(colors.HexColor('#965a2e'))
    for dx in [-1,1]:c.ellipse(x+dx*r*.75-r*.35,y-r*.35,x+dx*r*.75+r*.35,y+r*.95,fill=1,stroke=1)
    c.setFillColor(INK)
    for dx in [-.3,.3]:c.circle(x+r*dx,y+r*.35,r*.07,fill=1,stroke=0)
    c.circle(x,y-r*.05,r*.12,fill=1,stroke=0)


def butterfly(c,x,y,r=22):
    c.setStrokeColor(INK);c.setLineWidth(1.2);c.setFillColor(colors.HexColor('#ed96c2'))
    for dx in [-1,1]:
        c.ellipse(x+dx*r*.65-r*.6,y-r*.1,x+dx*r*.65+r*.6,y+r,fill=1,stroke=1)
        c.ellipse(x+dx*r*.5-r*.45,y-r*.7,x+dx*r*.5+r*.45,y+r*.15,fill=1,stroke=1)
    c.setStrokeColor(INK);c.setLineWidth(3);c.line(x,y-r*.6,x,y+r*.6)

def hidden(c,x,y,r=25):
    c.setStrokeColor(TEAL);c.setLineWidth(2);c.setDash(4,3);c.circle(x,y,r,fill=0,stroke=1);c.setDash()

def magic_diagram(c,kind):
    c.setFillColor(MINT);c.roundRect(42,225,355,188,15,fill=1,stroke=0)
    c.setFillColor(INK);c.setFont('Bold',13);c.drawCentredString(219,385,'Atinge o singură dată')
    if kind=='sizes':
        rabbit(c,132,302,35);dog(c,308,302,19)
        labels=[(132,'mai mare'),(308,'mai mic')]
    elif kind in ['vanish','complete']:
        rabbit(c,102,304,33 if kind=='complete' else 22);hidden(c,219,309,25);rabbit(c,336,304,22)
        labels=[(102,'mare' if kind=='complete' else 'vizibil'),(219,'ascuns'),(336,'normal')]
    elif kind=='third':
        rabbit(c,99,302,24);butterfly(c,219,310,25);dog(c,339,302,24)
        labels=[(99,'neschimbat'),(219,'de 2 ori'),(339,'neschimbat')]
    else:
        for i in range(5):
            x=69+i*61;c.setFillColor(colors.white);c.setStrokeColor(TEAL);c.roundRect(x,289,49,50,9,fill=1,stroke=1)
            c.setFillColor(TEAL);c.setFont('Bold',22);c.drawCentredString(x+24.5,304,'?')
        labels=[(219,'Cel mult 5 acțiuni')]
    c.setFillColor(INK);c.setFont('Bold',11)
    for x,t in labels:c.drawCentredString(x,251,t)
    captions={'sizes':'Personajele rămân pe loc. Un program pentru fiecare.',
              'vanish':'Nu atingem un personaj ascuns. El trebuie să revină prin program.',
              'complete':'Trucul se termină normal și vizibil. Îl poți porni din nou.',
              'third':'Un personaj nou din bibliotecă. Trei programe independente.',
              'five':'Blocul galben nu se numără. Așteptările se numără. Fără Repeat.'}
    paragraph(c,captions[kind],47,201,345,size=15,color=MUTED)

def cards():
    out=ROOT/'Cartonase_Lectia_03.pdf';c=canvas.Canvas(str(out),pagesize=(W,H))
    c.setTitle('Lecția 3 - Atelierul de magie - Trei misiuni și două rezerve')
    for m in D['missions']:
        page_header(c,m['label'],m['title'],m['subtitle']);magic_diagram(c,m['diagram'])
        y=410
        for n,t in enumerate(m['steps'],1):
            c.setFillColor(TEAL);c.circle(440,y-11,12,fill=1,stroke=0)
            c.setFillColor(colors.white);c.setFont('Bold',12);c.drawCentredString(440,y-15,str(n))
            y=paragraph(c,t,464,y,325,size=16)-21
        assert y>125,(m['title'],y)
        c.setFillColor(MINT);c.roundRect(42,65,W-84,57,13,fill=1,stroke=0)
        paragraph(c,m['success'],59,104,W-118,font='Bold',size=13)
        c.showPage()
    c.save();assert len(PdfReader(str(out)).pages)==5

def encode(cmds,x=113,y=60):
    result=[]
    for c in cmds:
        if 'repeat' in c:
            result.append(['repeat',c['repeat'],x,y-15.6,encode(c['body'],x+35,y)]);x+=64+65*len(c['body'])
        else:result.append([c['block'],c['value'],x,y]);x+=65
    return result

def expand(cmds):
    for c in cmds:
        if 'repeat' in c:
            for _ in range(c['repeat']):yield from expand(c['body'])
        else:yield c

def thumbnail():
    from PIL import ImageFont
    im=Image.new('RGB',(160,120),'#fffdf8');d=ImageDraw.Draw(im)
    d.rounded_rectangle((7,7,153,113),radius=14,fill='#eee5f7')
    d.text((80,28),'L03',font=ImageFont.truetype(str(FONT_DIR/'arialbd.ttf'),32),fill='#523473',anchor='mt')
    d.text((80,74),'Magie',font=ImageFont.truetype(str(FONT_DIR/'arial.ttf'),17),fill='#523473',anchor='mt')
    stream=io.BytesIO();im.save(stream,format='PNG');return stream.getvalue()

def projects():
    png=thumbnail();thumb=hashlib.md5(png).hexdigest()+'.png'
    for e in D['projects']:
        ids=[v['id'] for v in e['sprites']]
        page={'textstartat':36,'sprites':ids,'md5':'Park.svg','num':1,'lastSprite':ids[0],'layers':ids}
        for entry in e['sprites']:
            key=entry['id'];w,h=entry['size'];x,y=entry['position'];cmds=entry['program']
            blocks=[['onclick','null',40,60]]+encode(cmds) if cmds else []
            page[key]={'shown':True,'type':'sprite','md5':entry['asset'],'id':key,'flip':False,'name':entry['name'],
                'angle':0,'scale':.5,'speed':2,'defaultScale':.5,'sounds':['pop.mp3'],
                'xcoor':x,'ycoor':y,'cx':w/2,'cy':h/2,'w':w,'h':h,'homex':x,'homey':y,
                'homescale':.5,'homeshown':True,'homeflip':False,'scripts':[blocks] if blocks else []}
            scale=low=high=.5;shown=True;hides=0
            for c in expand(cmds):
                b=c['block'];assert b in ['grow','shrink','same','hide','show','wait']
                if b=='grow':scale=round(scale+.05*c['value'],3)
                if b=='shrink':scale=round(scale-.05*c['value'],3)
                if b=='same':scale=.5
                if b=='hide':hides+=1;shown=False
                if b=='show':shown=True
                low=min(low,scale);high=max(high,scale);assert .1<=scale<=1.5
            expect=entry['expected']
            assert [scale,low,high,hides,shown]==[expect['final_scale'],expect['min_scale'],expect['max_scale'],expect['hidden_intervals'],expect['final_visible']]
        if '05_Rezerva' in e['path']:assert len(e['sprites'][0]['program'])==5 and all('repeat' not in c for c in e['sprites'][0]['program'])
        bag={'name':e['name'],'version':'iOSv01','mtime':'1794312000000','ctime':'2026-11-10 12:00:00',
             'deleted':'NO','isgift':'1','thumbnail':{'pagecount':1,'md5':thumb},
             'json':{'pages':['page1'],'currentPage':'page1','page1':page}}
        target=ROOT/e['path'];target.parent.mkdir(parents=True,exist_ok=True)
        with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
            for name,data in [('project/data.json',json.dumps(bag,ensure_ascii=False,separators=(',',':')).encode()),('project/thumbnails/'+thumb,png)]:
                info=zipfile.ZipInfo(name,(2026,11,10,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
        with zipfile.ZipFile(target) as z:
            assert z.testzip() is None and len(z.namelist())==2
            assert json.loads(z.read('project/data.json'))['json']['page1']==page
        print(e['path'],'sprites:',len(ids))

if __name__=='__main__':
    import sys
    if '--projects-only' not in sys.argv:
        cards();print('Teacher pages:',teacher_pdf())
    projects()

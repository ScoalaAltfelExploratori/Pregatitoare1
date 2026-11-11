"""Regenerate Lesson 4 PDFs and ScratchJr examples from editable sources.
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
INK=colors.HexColor("#173e3a"); TEAL=colors.HexColor("#266c9e"); MUTED=colors.HexColor("#58716b")
BLUE=colors.HexColor("#66b5ed"); YELLOW=colors.HexColor("#ffd35d")
PAPER=colors.HexColor("#fffdf8"); LINE=colors.HexColor("#dce6df"); MINT=colors.HexColor("#e6f2fb")
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
    c.setFont("Bold",10);c.drawString(42,H-38,"SCRATCHJR / LECȚIA 4");c.drawRightString(W-42,H-38,label.upper())
    c.setFillColor(INK);c.setFont("Bold",30);c.drawString(42,H-89,title)
    if sub:paragraph(c,sub,42,H-107,W-84,size=16,color=MUTED)
    c.setStrokeColor(LINE);c.line(42,38,W-42,38);c.setFillColor(MUTED);c.setFont("Body",9)
    c.drawString(42,23,"Personaje și stări desenate schematic. Lucrăm în ScratchJr.");c.drawRightString(W-42,23,str(c.getPageNumber()))

def fmt(s):
    s=html.escape(s);s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<link href="\2" color="#087f75">\1</link>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s);s=re.sub(r'\x60([^\x60]+)\x60',r'<b>\1</b>',s)
    return s.replace("–","-").replace("—","-")

def teacher_pdf():
    out=ROOT/"Ghid_profesor_Lectia_04.pdf"
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
        c.drawString(40,ph-26,"SCRATCHJR / LECȚIA 4 / GHID PENTRU PROFESOR")
        c.setStrokeColor(LINE);c.line(40,36,pw-40,36)
        c.drawString(40,23,"50 de minute · 6-7 ani · Versiune pentru probă");c.drawRightString(pw-40,23,str(doc.page));c.restoreState()
    SimpleDocTemplate(str(out),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=48,bottomMargin=49,title="Lecția 4 ScratchJr - Ghidul profesorului").build(story,onFirstPage=decorate,onLaterPages=decorate)
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

def arrow(c,x1,y1,x2,y2,color=TEAL):
    import math
    c.setStrokeColor(color);c.setFillColor(color);c.setLineWidth(3);c.line(x1,y1,x2,y2)
    angle=math.atan2(y2-y1,x2-x1);p=c.beginPath();p.moveTo(x2,y2)
    for d in [-.5,.5]:p.lineTo(x2-11*math.cos(angle+d),y2-11*math.sin(angle+d))
    p.close();c.drawPath(p,fill=1,stroke=0)

def magic_diagram(c,kind):
    orange=colors.HexColor('#c77b13');blue=colors.HexColor('#2379b8')
    c.setFillColor(MINT);c.roundRect(42,225,355,188,15,fill=1,stroke=0)
    c.setFillColor(TEAL);c.setFont('Bold',13);c.drawCentredString(219,385,'Cine dă comanda? Cine reacționează?')
    if kind=='remote':
        rabbit(c,100,301,26);dog(c,333,301,30);arrow(c,151,310,278,310,orange)
        c.setFillColor(INK);c.setFont('Bold',12);c.drawCentredString(100,251,'atinge');c.drawCentredString(330,251,'trucul')
    elif kind in ['two','hide_seek']:
        rabbit(c,94,324,22);butterfly(c,94,263,23);dog(c,330,302,28)
        arrow(c,141,339,278,319,orange);arrow(c,141,276,278,293,blue)
        c.setFillColor(INK);c.setFont('Bold',11)
        c.drawCentredString(211,348,'mărește' if kind=='two' else 'ascunde')
        c.drawCentredString(211,257,'dispare și revine' if kind=='two' else 'arată')
    elif kind=='chain':
        rabbit(c,96,301,23);dog(c,219,301,23);butterfly(c,340,303,23)
        arrow(c,130,312,181,312,orange);arrow(c,253,312,302,312,blue)
        c.setFillColor(INK);c.setFont('Bold',12)
        for x,t in [(96,'1. iepure'),(219,'2. câine'),(340,'3. fluture')]:c.drawCentredString(x,251,t)
    else:
        rabbit(c,99,300,24);dog(c,330,339,23);butterfly(c,330,265,23)
        arrow(c,145,317,284,343,orange);arrow(c,145,298,284,276,orange)
        c.setFillColor(INK);c.setFont('Bold',11);c.drawCentredString(213,250,'aceeași culoare')
    captions={'remote':'Un program trimite semnalul. Alt program execută trucul.',
      'two':'Două culori, două programe separate la câine.',
      'chain':'Următorul artist începe după terminarea celui dinainte.',
      'broadcast':'Același semnal poate porni mai multe personaje.',
      'hide_seek':'Comenzile ajung la câine chiar și când este ascuns.'}
    paragraph(c,captions[kind],47,201,345,size=15,color=MUTED)


def cards():
    out=ROOT/'Cartonase_Lectia_04.pdf';c=canvas.Canvas(str(out),pagesize=(W,H))
    c.setTitle('Lecția 4 - Telecomanda fermecată - Trei misiuni și două rezerve')
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
    d.rounded_rectangle((7,7,153,113),radius=14,fill='#e6f2fb')
    d.text((80,28),'L04',font=ImageFont.truetype(str(FONT_DIR/'arialbd.ttf'),32),fill='#523473',anchor='mt')
    d.text((80,74),'Telecomanda',font=ImageFont.truetype(str(FONT_DIR/'arial.ttf'),17),fill='#523473',anchor='mt')
    stream=io.BytesIO();im.save(stream,format='PNG');return stream.getvalue()

def projects():
    png=thumbnail();thumb=hashlib.md5(png).hexdigest()+'.png'
    allowed={'onclick','onmessage','message','grow','shrink','same','hide','show','wait'}
    for e in D['projects']:
        ids=[v['id'] for v in e['sprites']]
        page={'textstartat':36,'sprites':ids,'md5':'Park.svg','num':1,'lastSprite':ids[0],'layers':ids}
        sent=set();received=set();edges={}
        for entry in e['sprites']:
            key=entry['id'];w,h=entry['size'];x,y=entry['position'];scripts=[]
            for i,script in enumerate(entry['scripts']):
                trigger=script['trigger'];cmds=script['actions'];row=60 if len(entry['scripts'])==1 else 20+95*i
                assert trigger['block'] in ['onclick','onmessage']
                assert all(c['block'] in allowed for c in cmds)
                scripts.append([[trigger['block'],trigger['value'],40,row]]+encode(cmds,y=row))
                if trigger['block']=='onmessage':received.add(trigger['value'])
                for c in cmds:
                    if c['block']=='message':
                        assert c['value'] in D['message_colors'];sent.add(c['value'])
                        if trigger['block']=='onmessage':edges.setdefault(trigger['value'],set()).add(c['value'])
            page[key]={'shown':True,'type':'sprite','md5':entry['asset'],'id':key,'flip':False,'name':entry['name'],
                'angle':0,'scale':.5,'speed':2,'defaultScale':.5,'sounds':['pop.mp3'],
                'xcoor':x,'ycoor':y,'cx':w/2,'cy':h/2,'w':w,'h':h,'homex':x,'homey':y,
                'homescale':.5,'homeshown':True,'homeflip':False,'scripts':scripts}
        assert sent==received,(e['name'],sent,received)
        def visit(color,stack):
            assert color not in stack,'Unintended message cycle'
            for nxt in edges.get(color,[]):visit(nxt,stack+[color])
        for color in sent:visit(color,[])
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

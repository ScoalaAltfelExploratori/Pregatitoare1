"""Regenerate Lesson 2 PDFs and ScratchJr examples from editable sources.
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
INK=colors.HexColor("#173e3a"); TEAL=colors.HexColor("#087f75"); MUTED=colors.HexColor("#58716b")
BLUE=colors.HexColor("#66b5ed"); YELLOW=colors.HexColor("#ffd35d")
PAPER=colors.HexColor("#fffdf8"); LINE=colors.HexColor("#dce6df"); MINT=colors.HexColor("#def2e9")
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
    c.setFont("Bold",10);c.drawString(42,H-38,"SCRATCHJR / LECȚIA 2");c.drawRightString(W-42,H-38,label.upper())
    c.setFillColor(INK);c.setFont("Bold",30);c.drawString(42,H-89,title)
    if sub:paragraph(c,sub,42,H-107,W-84,size=16,color=MUTED)
    c.setStrokeColor(LINE);c.line(42,38,W-42,38);c.setFillColor(MUTED);c.setFont("Body",9)
    c.drawString(42,23,"Blocuri și trasee desenate schematic. Lucrăm în aplicația ScratchJr.");c.drawRightString(W-42,23,str(c.getPageNumber()))

def fmt(s):
    s=html.escape(s);s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<link href="\2" color="#087f75">\1</link>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s);s=re.sub(r'\x60([^\x60]+)\x60',r'<b>\1</b>',s)
    return s.replace("–","-").replace("—","-")

def teacher_pdf():
    out=ROOT/"Ghid_profesor_Lectia_02.pdf"
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
        c.drawString(40,ph-26,"SCRATCHJR / LECȚIA 2 / GHID PENTRU PROFESOR")
        c.setStrokeColor(LINE);c.line(40,36,pw-40,36)
        c.drawString(40,23,"50 de minute · 6-7 ani · Versiune pentru probă");c.drawRightString(pw-40,23,str(doc.page));c.restoreState()
    SimpleDocTemplate(str(out),pagesize=A4,leftMargin=40,rightMargin=40,topMargin=48,bottomMargin=49,title="Lecția 2 ScratchJr - Ghidul profesorului").build(story,onFirstPage=decorate,onLaterPages=decorate)
    reader=PdfReader(str(out));extracted="\n".join(p.extract_text() for p in reader.pages)
    for phrase in ["Misiunea 1","Misiunea 2","Dificultăți și sprijin","50 de minute"]:assert phrase in extracted,phrase
    return len(reader.pages)


def ball(c,x,y,r=16):
    c.setFillColor(colors.HexColor('#ec70a5'));c.setStrokeColor(INK)
    c.circle(x,y,r,fill=1,stroke=1)
    c.setStrokeColor(colors.HexColor('#59c1e4'));c.setLineWidth(r*.3)
    c.line(x-r*.75,y+r*.4,x+r*.75,y-r*.1)
    c.line(x-r*.7,y-r*.15,x+r*.55,y-r*.6)


def route(c,x,y,width,distance,returning=False):
    """Show the target distance without supplying the repeat-loop solution."""
    cell=width/10
    c.setFillColor(colors.white);c.setStrokeColor(LINE);c.setLineWidth(1)
    c.roundRect(x-12,y-70,width+24,190,12,fill=1,stroke=1)
    for i in range(11):
        c.setStrokeColor(LINE);c.line(x+i*cell,y-20,x+i*cell,y+55)
    c.setStrokeColor(TEAL);c.setLineWidth(2)
    c.line(x,y+10,x+distance*cell,y+10)
    c.line(x+distance*cell,y+10,x+distance*cell-8,y+16)
    c.line(x+distance*cell,y+10,x+distance*cell-8,y+4)
    rabbit(c,x,y+53,20)
    ball(c,x+distance*cell,y-39,16)
    c.setDash(3,3);c.setLineWidth(1);c.line(x+distance*cell,y-20,x+distance*cell,y+54);c.setDash()
    c.setFillColor(INK);c.setFont('Bold',10);c.drawCentredString(x,y-10,'START')
    c.drawCentredString(x+distance*cell,y-65,'ȚINTĂ')
    c.setFont('Body',10)
    for i in range(1,distance+1):c.drawCentredString(x+(i-.5)*cell,y+30,str(i))
    if returning:
        c.setStrokeColor(colors.HexColor('#b16a22'));c.setLineWidth(2)
        c.line(x+distance*cell,y-7,x+20,y-7)
        c.line(x+20,y-7,x+28,y-1);c.line(x+20,y-7,x+28,y-13)


def cards():
    out=ROOT/'Cartonase_Lectia_02.pdf';c=canvas.Canvas(str(out),pagesize=(W,H))
    c.setTitle('Lecția 2 - Trei misiuni de construire')
    for m in D['missions']:
        page_header(c,'Misiunea '+str(m['number']),m['title'],m['intro'])
        if m['number']==1:
            c.setFillColor(MINT);c.roundRect(42,245,355,165,15,fill=1,stroke=0)
            rabbit(c,97,315,28)
            c.setFillColor(INK);c.setFont('Bold',17)
            c.drawString(152,362,'Mergi → sari → revino')
            c.drawString(152,329,'Același grup, de 3 ori')
            c.setFillColor(TEAL);c.setFont('Bold',37);c.drawString(182,272,'1   2   3')
            paragraph(c,'Un singur cadru Repeat.<br/>Același loc la fiecare revenire.',48,220,345,size=16,color=MUTED)
        else:
            route(c,67,313,303,m['distance'],returning=m['number']==3)
            paragraph(c,'Numără spațiile de la start până la coloana mingii. Mingea stă mai jos, ca reper.',47,214,345,size=15,color=MUTED)
        y=410
        for n,t in enumerate(m['steps'],1):
            c.setFillColor(TEAL);c.circle(440,y-11,12,fill=1,stroke=0)
            c.setFillColor(colors.white);c.setFont('Bold',12);c.drawCentredString(440,y-15,str(n))
            y=paragraph(c,t,464,y,325,size=17)-24
        c.setFillColor(MINT);c.roundRect(42,65,W-84,57,13,fill=1,stroke=0)
        paragraph(c,m['success'],59,104,W-118,font='Bold',size=14)
        c.showPage()
    c.save();assert len(PdfReader(str(out)).pages)==3


def encode(commands,x=113,y=60):
    result=[]
    for cmd in commands:
        if 'repeat' in cmd:
            result.append(['repeat',cmd['repeat'],x,y-15.6,encode(cmd['body'],x+35,y)])
            x+=64+65*len(cmd['body'])
        else:
            result.append([cmd['block'],cmd['value'],x,y]);x+=65
    return result


def expand(commands):
    for cmd in commands:
        if 'repeat' in cmd:
            for _ in range(cmd['repeat']):yield from expand(cmd['body'])
        else:yield cmd


def thumbnail():
    from PIL import ImageFont
    im=Image.new('RGB',(160,120),'#e9f6f5');d=ImageDraw.Draw(im)
    d.rounded_rectangle((7,7,153,113),radius=14,fill='#d0e8bb')
    d.text((80,28),'L02',font=ImageFont.truetype(str(FONT_DIR/'arialbd.ttf'),32),fill='#173e3a',anchor='mt')
    d.text((80,74),'Repeat',font=ImageFont.truetype(str(FONT_DIR/'arial.ttf'),17),fill='#173e3a',anchor='mt')
    stream=io.BytesIO();im.save(stream,format='PNG');return stream.getvalue()


def projects():
    png=thumbnail();thumb=hashlib.md5(png).hexdigest()+'.png'
    for e in D['projects']:
        page={'textstartat':36,'sprites':['iepuras1','minge1'],'md5':'Park.svg','num':1,
              'lastSprite':'iepuras1','layers':['iepuras1','minge1']}
        for key,name,x,y,w,h in [('iepuras1','Rabbit',D['start']['x'],D['start']['y'],217,208),
                               ('minge1','Ball',e['ball_x'],D['ball_y'],126,129)]:
            script=[['onflag','null',40,60]]+encode(e['program']) if key=='iepuras1' and e['program'] else []
            page[key]={'shown':True,'type':'sprite','md5':name+'.svg','id':key,'flip':False,'name':name,
                'angle':0,'scale':.5,'speed':2,'defaultScale':.5,'sounds':['pop.mp3'],
                'xcoor':x,'ycoor':y,'cx':w/2,'cy':h/2,'w':w,'h':h,'homex':x,'homey':y,
                'homescale':.5,'homeshown':True,'homeflip':False,'scripts':[script] if script else []}
        bag={'name':e['name'],'version':'iOSv01','mtime':'1794225600000','ctime':'2026-11-09 12:00:00',
             'deleted':'NO','isgift':'1','thumbnail':{'pagecount':1,'md5':thumb},
             'json':{'pages':['page1'],'currentPage':'page1','page1':page}}
        target=ROOT/e['path'];target.parent.mkdir(parents=True,exist_ok=True)
        # Fixed timestamps make regenerated archives byte-identical to tested files.
        with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
            for name,data in [('project/data.json',json.dumps(bag,ensure_ascii=False,separators=(',',':')).encode()),
                              ('project/thumbnails/'+thumb,png)]:
                info=zipfile.ZipInfo(name,(2026,11,9,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
        x=D['start']['x'];max_x=x;hops=0
        for cmd in expand(e['program']):
            assert cmd['block'] in ['forward','back','hop']
            if cmd['block']=='hop':hops+=1
            else:x+=(1 if cmd['block']=='forward' else -1)*cmd['value']*24
            max_x=max(max_x,x);assert 54<=x<=426
        assert {'end_x':x,'max_x':max_x,'hops':hops}==e['expected']
        with zipfile.ZipFile(target) as z:
            assert z.testzip() is None and len(z.namelist())==2
            saved=json.loads(z.read('project/data.json'))['json']['page1']
            assert saved['minge1']['scripts']==[]
            assert saved['iepuras1']['scripts']==page['iepuras1']['scripts']
        print(e['path'],e['expected'])


if __name__=='__main__':
    import sys
    if '--projects-only' not in sys.argv:
        cards();print('Teacher pages:',teacher_pdf())
    projects()


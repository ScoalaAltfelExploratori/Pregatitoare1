"""Regenerate Lesson 6 PDFs and ScratchJr examples from editable sources.
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
INK=colors.HexColor("#173e3a"); TEAL=colors.HexColor("#187651"); MUTED=colors.HexColor("#58716b")
BLUE=colors.HexColor("#66b5ed"); YELLOW=colors.HexColor("#ffd35d")
PAPER=colors.HexColor("#fffdf8"); LINE=colors.HexColor("#dce6df"); MINT=colors.HexColor("#e6f3e9")
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
    c.setFont("Bold",10);c.drawString(42,H-38,"SCRATCHJR / LECȚIA 6");c.drawRightString(W-42,H-38,label.upper())
    c.setFillColor(INK);c.setFont("Bold",30);c.drawString(42,H-89,title)
    if sub:paragraph(c,sub,42,H-107,W-84,size=16,color=MUTED)
    c.setStrokeColor(LINE);c.line(42,38,W-42,38);c.setFillColor(MUTED);c.setFont("Body",9)
    c.drawString(42,23,"Personaje și stări desenate schematic. Lucrăm în ScratchJr.");c.drawRightString(W-42,23,str(c.getPageNumber()))

def fmt(s):
    s=html.escape(s);s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<link href="\2" color="#087f75">\1</link>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s);s=re.sub(r'\x60([^\x60]+)\x60',r'<b>\1</b>',s)
    return s.replace("–","-").replace("—","-")

def teacher_pdf():
    import importlib.util
    spec = importlib.util.spec_from_file_location("course_guides", ROOT.parent / "render_teacher_guides.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.teacher_html(ROOT)
    return module.teacher_pdf(ROOT)


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

def dots(c,x,y,gaps,r=8):
    c.setFillColor(TEAL)
    for gap in [0]+gaps:
        x+=gap;c.circle(x,y,r,fill=1,stroke=0)

def ball(c,x,y,r=18):
    c.setFillColor(YELLOW);c.setStrokeColor(INK);c.setLineWidth(1.4);c.circle(x,y,r,fill=1,stroke=1)
    c.setStrokeColor(colors.HexColor('#dd745a'));c.line(x-r,y,x+r,y);c.line(x,y-r,x,y+r)

def magic_diagram(c,kind):
    c.setFillColor(MINT);c.roundRect(42,225,355,188,15,fill=1,stroke=0)
    c.setFillColor(TEAL);c.setFont('Bold',13);c.drawCentredString(219,386,'Întâlniri pe scenă')
    rabbit(c,86,294,20);arrow(c,113,309,158,309)
    if kind=='treasure':
        ball(c,192,309);arrow(c,224,309,275,309);hidden(c,326,309,22)
    else:
        dog(c,192,304,22)
        if kind in ['guard','visits','alarm']:arrow(c,192,334,192,366)
        if kind in ['visits','chain']:
            arrow(c,231,309,282,309);butterfly(c,332,304,20);arrow(c,332,334,332,365)
        if kind=='chain':arrow(c,236,294,236,256)
        if kind=='alarm':
            butterfly(c,330,347,24);arrow(c,224,350,281,350)
            c.setFillColor(YELLOW);c.roundRect(233,338,38,24,4,fill=1,stroke=0)
            c.setStrokeColor(INK);c.line(233,362,252,347);c.line(252,347,271,362)
    caption={'guard':'Câinele eliberează drumul după contact.',
      'visits':'Mai întâi câinele. Apoi fluturele.',
      'chain':'Câinele duce mai departe reacția și se separă.',
      'treasure':'Comoara apare din nou după Reset.',
      'alarm':'Fluturele primește mesajul de la distanță.'}[kind]
    paragraph(c,caption,47,201,345,size=15,color=MUTED)

def cards():
    out=ROOT/'Cartonase_Lectia_06.pdf';c=canvas.Canvas(str(out),pagesize=(W,H))
    c.setTitle('Lecția 6 - Parcul cu surprize - Trei misiuni și două rezerve')
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
    d.rounded_rectangle((7,7,153,113),radius=14,fill='#e6f3e9')
    d.text((80,28),'L06',font=ImageFont.truetype(str(FONT_DIR/'arialbd.ttf'),32),fill='#523473',anchor='mt')
    d.text((80,74),'Contact',font=ImageFont.truetype(str(FONT_DIR/'arial.ttf'),17),fill='#523473',anchor='mt')
    stream=io.BytesIO();im.save(stream,format='PNG');return stream.getvalue()

def projects():
    png=thumbnail();thumb=hashlib.md5(png).hexdigest()+'.png'
    for e in D['projects']:
        pages={};count=len(e['pages'])
        for number,spec in enumerate(e['pages'],1):
            ids=[v['id'] for v in spec['sprites']]
            page={'textstartat':36,'sprites':ids,'md5':spec['background'],'num':number,'lastSprite':ids[0],'layers':ids}
            for entry in spec['sprites']:
                key=entry['id'];w,h=entry['size'];x,y=entry['position'];scripts=[]
                for i,script in enumerate(entry['scripts']):
                    trigger=script['trigger'];cmds=script['actions'];row=60 if len(entry['scripts'])==1 else 20+95*i
                    assert trigger['block'] in ['onclick','onflag','onmessage','ontouch']
                    for c in expand(cmds):
                        assert c['block'] in ['forward','back','up','down','hop','grow','same','wait','hide','show','playsnd','message','gotopage']
                        if c['block']=='gotopage':assert 1<=c['value']<=count and c is cmds[-1]
                    scripts.append([[trigger['block'],trigger['value'],40,row]]+encode(cmds,y=row))
                page[key]={'shown':True,'type':'sprite','md5':entry['asset'],'id':key,'flip':False,'name':entry['name'],
                    'angle':0,'scale':.5,'speed':2,'defaultScale':.5,'sounds':['pop.mp3'],
                    'xcoor':x,'ycoor':y,'cx':w/2,'cy':h/2,'w':w,'h':h,'homex':x,'homey':y,
                    'homescale':.5,'homeshown':True,'homeflip':False,'scripts':scripts}
            pages['page'+str(number)]=page
        project={'pages':list(pages),'currentPage':'page1',**pages}
        bag={'name':e['name'],'version':'iOSv01','mtime':'1794312000000','ctime':'2026-11-10 12:00:00',
             'deleted':'NO','isgift':'1','thumbnail':{'pagecount':count,'md5':thumb},'json':project}
        target=ROOT/e['path'];target.parent.mkdir(parents=True,exist_ok=True)
        with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
            for name,data in [('project/data.json',json.dumps(bag,ensure_ascii=False,separators=(',',':')).encode()),('project/thumbnails/'+thumb,png)]:
                info=zipfile.ZipInfo(name,(2026,11,10,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
        with zipfile.ZipFile(target) as z:
            assert z.testzip() is None and json.loads(z.read('project/data.json'))['json']==project
        print(e['path'],'pages:',count)

if __name__=='__main__':
    import sys
    if '--projects-only' not in sys.argv:
        cards();print('Teacher pages:',teacher_pdf())
    projects()

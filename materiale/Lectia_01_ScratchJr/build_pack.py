"""Regenerate Lesson 1 PDFs and ScratchJr examples from editable sources.
Requires Python 3, reportlab, Pillow and pypdf.
"""
from pathlib import Path
import json, re, hashlib, zipfile, io, html, sqlite3, base64
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

def arrow(c,x,y,d,size=19):
    dx,dy={"R":(1,0),"L":(-1,0),"U":(0,1),"D":(0,-1)}[d]
    c.setStrokeColor(colors.white);c.setLineWidth(max(2,size*.19));c.setLineCap(1)
    x1,y1=x-dx*size*.65,y-dy*size*.65;x2,y2=x+dx*size*.65,y+dy*size*.65
    c.line(x1,y1,x2,y2)
    for k in [-1,1]:c.line(x2,y2,x2-dx*size*.55-dy*size*.4*k,y2-dy*size*.55+dx*size*.4*k)

def block(c,x,y,d,s=1,value=1):
    c.saveState();c.translate(x,y);c.scale(s,s);c.setFillColor(YELLOW if d=="F" else BLUE)
    c.setStrokeColor(colors.HexColor("#c99d30" if d=="F" else "#2b80bd"));c.setLineWidth(1.5)
    p=c.beginPath();pts=[(8,0),(66,0),(66,25),(77,31),(77,43),(66,49),(66,72),(8,72),(8,49),(18,43),(18,31),(8,25)]
    p.moveTo(*pts[0])
    for pt in pts[1:]:p.lineTo(*pt)
    p.close();c.drawPath(p,fill=1,stroke=1)
    if d=="F":
        c.setStrokeColor(colors.HexColor("#1d5b3a"));c.setLineWidth(2.5);c.line(29,19,29,55)
        c.setFillColor(colors.HexColor("#21834d"));p=c.beginPath();p.moveTo(29,54)
        p.curveTo(39,64,46,49,56,57);p.lineTo(56,36);p.curveTo(45,28,39,44,29,34);p.close();c.drawPath(p,fill=1,stroke=1)
    else:
        if d=="H":
            c.setStrokeColor(colors.white);c.setLineWidth(3)
            q=c.beginPath();q.moveTo(23,32);q.curveTo(25,65,53,65,55,32);c.drawPath(q)
            c.line(55,32,48,39);c.line(55,32,61,40)
        else:arrow(c,39,43,d,21)
        c.setFillColor(colors.white);c.setStrokeColor(colors.HexColor("#2b80bd"))
        c.roundRect(25,-3,29,24,7,fill=1,stroke=1);c.setFillColor(INK)
        c.setFont("Bold",16);c.drawCentredString(39,3,str(value))
    c.restoreState()

def program(c,seq,x,y,s=1):
    for i,b in enumerate([{"dir":"F","value":1}]+seq):block(c,x+i*73*s,y,b["dir"],s,b.get("value",1))

def paragraph(c,text,x,y,width,font="Body",size=15,leading=None,color=INK):
    st=ParagraphStyle("local",fontName=font,fontSize=size,leading=leading or size*1.4,textColor=color)
    p=Paragraph(text,st);pw,ph=p.wrap(width,1000);p.drawOn(c,x,y-ph);return y-ph

def page_header(c,label,title,sub=""):
    c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0);c.setFillColor(TEAL)
    c.setFont("Bold",10);c.drawString(42,H-38,"SCRATCHJR / LECȚIA 1");c.drawRightString(W-42,H-38,label.upper())
    c.setFillColor(INK);c.setFont("Bold",30);c.drawString(42,H-89,title)
    if sub:paragraph(c,sub,42,H-107,W-84,size=16,color=MUTED)
    c.setStrokeColor(LINE);c.line(42,38,W-42,38);c.setFillColor(MUTED);c.setFont("Body",9)
    c.drawString(42,23,"Blocuri și trasee desenate schematic. Lucrăm în aplicația ScratchJr.");c.drawRightString(W-42,23,str(c.getPageNumber()))

def board(c,x,y,side,goal):
    cell=side/5;c.setFillColor(colors.white);c.setStrokeColor(LINE);c.setLineWidth(1)
    c.roundRect(x,y,side,side,10,fill=1,stroke=1)
    for i in range(1,5):
        c.line(x+i*cell,y,x+i*cell,y+side);c.line(x,y+i*cell,x+side,y+i*cell)
    start=(x+1.5*cell,y+1.5*cell);rabbit(c,*start,r=cell*.37)
    c.setFont("Bold",9);c.setFillColor(INK);c.drawCentredString(start[0],y+cell*.74,"START")
    if goal:
        gx,gy=1,3
        for d in goal:gx+=D["directions"][d]["dx"];gy+=D["directions"][d]["dy"]
        c.setStrokeColor(TEAL);c.setLineWidth(2);c.setDash(4,3)
        c.circle(x+(gx+.5)*cell,y+(4-gy+.5)*cell,cell*.29,fill=0,stroke=1)
        c.setDash();c.setFont("Bold",8);c.setFillColor(TEAL)
        c.drawCentredString(x+(gx+.5)*cell,y+(4-gy+.5)*cell+cell*.38,"AICI")

def ball(c,x,y,r=24):
    c.setFillColor(colors.HexColor("#72c9e7"));c.setStrokeColor(colors.HexColor("#28759a"));c.setLineWidth(1.5)
    c.circle(x,y,r,fill=1,stroke=1);c.setFillColor(INK)
    c.circle(x-r*.23,y+r*.1,r*.06,fill=1,stroke=0);c.circle(x+r*.23,y+r*.1,r*.06,fill=1,stroke=0)
    c.setStrokeColor(INK);c.arc(x-r*.2,y-r*.3,x+r*.2,y-r*.05,180,180)

def meeting_scene(c,x,y,width=345,height=185):
    c.setFillColor(colors.HexColor("#e9f6f5"));c.roundRect(x,y,width,height,18,fill=1,stroke=0)
    c.setFillColor(colors.HexColor("#d0e8bb"));c.roundRect(x,y,width,45,18,fill=1,stroke=0)
    rabbit(c,x+58,y+72,27);ball(c,x+width-58,y+72,24)
    c.setFillColor(INK);c.setFont("Bold",11);c.drawCentredString(x+58,y+26,"Iepurașul");c.drawCentredString(x+width-58,y+26,"Mingea")
    c.setStrokeColor(TEAL);c.setLineWidth(3)
    c.line(x+100,y+78,x+145,y+78);c.line(x+145,y+78,x+135,y+85);c.line(x+145,y+78,x+135,y+71)
    c.line(x+width-100,y+78,x+width-145,y+78);c.line(x+width-145,y+78,x+width-135,y+85);c.line(x+width-145,y+78,x+width-135,y+71)
    c.setFillColor(MUTED);c.setFont("Body",11);c.drawCentredString(x+width/2,y+height-25,"La un singur steag verde")

def return_scene(c,x,y,width=355,height=204):
    c.setFillColor(MINT);c.roundRect(x,y,width,height,18,fill=1,stroke=0)
    c.setFillColor(INK);c.setFont("Bold",13);c.drawCentredString(x+width/2,y+height-25,"Întâlnire + săritură + ...?")
    rabbit(c,x+129,y+100,27);ball(c,x+226,y+100,24)
    c.setStrokeColor(TEAL);c.setLineWidth(2);c.setDash(4,3)
    for xx in [x+39,x+width-39]:c.circle(xx,y+100,24,fill=0,stroke=1)
    c.setDash();c.setFont("Bold",10);c.setFillColor(TEAL)
    c.drawCentredString(x+39,y+58,"START");c.drawCentredString(x+width-39,y+58,"START")
    c.setFont("Bold",22);c.drawCentredString(x+78,y+98,"?");c.drawCentredString(x+width-78,y+98,"?")
    c.setFont("Body",12);c.setFillColor(INK);c.drawCentredString(x+width/2,y+26,"Câte o săgeată nouă pentru fiecare")

def cards():
    out=ROOT/"Cartonase_Lectia_01.pdf";c=canvas.Canvas(str(out),pagesize=(W,H))
    c.setTitle("Lecția 1 ScratchJr - Provocări în aplicație")
    for i,e in enumerate(D["exercises"]):
        title=["Fă-i să se întâlnească","Două blocuri până acasă","Inventează finalul întâlnirii"][i]
        page_header(c,"Misiunea "+str(i+1),title,e["intro"])
        if i<2:
            if i==0:meeting_scene(c,42,211,355,204)
            else:return_scene(c,42,211)
            paragraph(c,"Porniți din două locuri. Aproape, fără să vă acoperiți." if i==0 else "Fără blocul Acasă sau Repeat.<br/>Mai greu: numere diferite, mai mari ca 0.",47,188,345,size=15,color=MUTED)
        else:
            rabbit(c,135,330,r=52);ball(c,285,330,r=47)
            paragraph(c,"Mai sar o dată? Dansează?<br/>Fac o mișcare nouă?",58,234,340,font="Bold",size=22)
        y=410
        for n,t in enumerate(e["steps"],1):
            c.setFillColor(TEAL);c.circle(440,y-11,12,fill=1,stroke=0);c.setFillColor(colors.white);c.setFont("Bold",12);c.drawCentredString(440,y-15,str(n))
            y=paragraph(c,t,464,y,325,size=17)-24
        c.setFillColor(MINT);c.roundRect(42,65,W-84,57,13,fill=1,stroke=0)
        paragraph(c,e["check"],59,104,W-118,font="Bold",size=14)
        c.showPage()
    c.save();assert len(PdfReader(str(out)).pages)==3


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


def thumbnail():
    im=Image.new("RGB",(160,120),"#e9f6f5");d=ImageDraw.Draw(im)
    from PIL import ImageFont
    title=ImageFont.truetype(str(FONT_DIR/"arialbd.ttf"),32)
    small=ImageFont.truetype(str(FONT_DIR/"arial.ttf"),16)
    d.rounded_rectangle((7,7,153,113),radius=14,fill="#d0e8bb")
    d.text((80,31),"L01",font=title,fill="#173e3a",anchor="mt")
    d.text((80,76),"ScratchJr",font=small,fill="#173e3a",anchor="mt")
    stream=io.BytesIO();im.save(stream,format="PNG");return stream.getvalue()

def native_projects():
    # Names and native dimensions from ScratchJr's bundled media.json.
    # These are library references, not custom artwork that pupils must import.
    stock=[("iepuras1","Rabbit",96,"Rabbit.svg",217,208),
           ("biluta1","Ball",360,"Ball.svg",126,129)]
    targets=[(ROOT/"proiecte",entry) for entry in D["projects"]]
    targets += [(ROOT/"solutii"/"lectia_01",entry) for entry in D.get("solutions",[])]
    for folder,entry in targets:
        folder.mkdir(parents=True,exist_ok=True)
        page={"textstartat":36,"sprites":["iepuras1","biluta1"],"md5":"Park.svg","num":1,"lastSprite":"iepuras1","layers":["iepuras1","biluta1"]}
        for index,(key,label,x,md5,w,h) in enumerate(stock):
            commands=entry["scripts"][index]
            script=[["onflag","null",40,60]]+[[D["directions"][b["dir"]]["native"],b["value"],113+i*73,60] for i,b in enumerate(commands)]
            page[key]={"shown":True,"type":"sprite","md5":md5,"id":key,"flip":False,"name":label,"angle":0,"scale":0.5,"speed":2,"defaultScale":0.5,"sounds":["pop.mp3"],"xcoor":x,"ycoor":240,"cx":w/2,"cy":h/2,"w":w,"h":h,"homex":x,"homey":240,"homescale":0.5,"homeshown":True,"homeflip":False,"scripts":[script] if commands else []}
        png=thumbnail();thumb=hashlib.md5(png).hexdigest()+".png"
        bag={"name":entry["name"],"version":"iOSv01","mtime":"1794182400000","ctime":"2026-11-09 00:00:00","deleted":"NO","isgift":"1","thumbnail":{"pagecount":1,"md5":thumb},"json":{"pages":["page1"],"currentPage":"page1","page1":page}}
        target=folder/entry["file"]
        contents={"project/data.json":json.dumps(bag,ensure_ascii=False,separators=(",",":")).encode("utf-8"),
                  "project/thumbnails/"+thumb:png}
        # Keep verified files byte-for-byte when their payload has not changed.
        unchanged=False
        if target.exists():
            with zipfile.ZipFile(target) as z:
                unchanged=set(z.namelist())==set(contents) and all(z.read(k)==v for k,v in contents.items())
        if not unchanged:
            with zipfile.ZipFile(target,"w",zipfile.ZIP_DEFLATED) as z:
                for name,payload in contents.items():
                    info=zipfile.ZipInfo(name,date_time=(2026,11,9,12,0,0));info.compress_type=zipfile.ZIP_DEFLATED
                    z.writestr(info,payload)
        with zipfile.ZipFile(target) as z:
            assert z.testzip() is None
            obj=json.loads(z.read("project/data.json"));saved=obj["json"]["page1"]
            assert len(saved["sprites"])==2
            for i,key in enumerate(saved["sprites"]):
                sprite=saved[key];assert sprite["md5"]==stock[i][3]
                expected=entry["scripts"][i]
                actual=sprite["scripts"]
                expected_blocks=[["onflag","null"]]+[[D["directions"][b["dir"]]["native"],b["value"]] for b in expected]
                assert [b[:2] for b in actual[0]]==expected_blocks if expected else actual==[]
                x=sprite["homex"]
                for b in expected:x+=D["directions"][b["dir"]]["dx"]*b["value"]*24
                assert 0<x<480
            assert saved["md5"]=="Park.svg"
            assert "project/thumbnails/"+obj["thumbnail"]["md5"] in z.namelist()
    meeting=D["projects"][1]["scripts"];puzzle=D["projects"][2]["scripts"]
    assert puzzle==meeting
    returning=D["projects"][3]["scripts"]
    assert returning==D["solutions"][1]["scripts"]
    for before,after in zip(meeting,returning):
        assert after[:-1]==before and len(after)==len(before)+1
        assert after[-1]["dir"] in ("L","R")
        assert sum(D["directions"][b["dir"]]["dx"]*b["value"] for b in after)==0
    print("Native scene endpoints: meeting 168 and 288; return puzzle 96 and 360. Built-in Rabbit, Ball and Park; one new arrow per character.")

def desktop_bundle():
    """Optional teacher bundle for Desktop 1.3.2's documented Restore projects feature.

    Writes only a new output file in this lesson folder; never edits an installed
    app database. Children create projects in the app and do not need this file.
    """
    folder=ROOT/"profesor_pc";folder.mkdir(exist_ok=True)
    target=folder/"scratchjr.sqllite.restore"
    db=sqlite3.connect(":memory:")
    db.executescript('''
    CREATE TABLE PROJECTS (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MTIME DATETIME, ALTMD5 TEXT, POS INTEGER, NAME TEXT, JSON TEXT, THUMBNAIL TEXT, OWNER TEXT, GALLERY TEXT, DELETED TEXT, VERSION TEXT, ISGIFT INTEGER DEFAULT 0);
    CREATE TABLE USERSHAPES (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MD5 TEXT, ALTMD5 TEXT, WIDTH TEXT, HEIGHT TEXT, EXT TEXT, NAME TEXT, OWNER TEXT, SCALE TEXT, VERSION TEXT);
    CREATE TABLE USERBKGS (ID INTEGER PRIMARY KEY AUTOINCREMENT, CTIME DATETIME DEFAULT CURRENT_TIMESTAMP, MD5 TEXT, ALTMD5 TEXT, WIDTH TEXT, HEIGHT TEXT, EXT TEXT, OWNER TEXT, VERSION TEXT);
    CREATE TABLE PROJECTFILES (MD5 TEXT PRIMARY KEY, CONTENTS TEXT);
    ''')
    paths=[ROOT/"proiecte"/e["file"] for e in D["projects"]]+[ROOT/"solutii"/"lectia_01"/e["file"] for e in D["solutions"]]
    for path in sorted(paths):
        with zipfile.ZipFile(path) as z:
            project=json.loads(z.read("project/data.json"))
            db.execute("INSERT INTO PROJECTS (NAME,JSON,THUMBNAIL,DELETED,VERSION,MTIME,ISGIFT) VALUES (?,?,?,?,?,?,?)",
                       (project["name"],json.dumps(project["json"],ensure_ascii=False),json.dumps(project["thumbnail"]),"NO","iOSv01",project["mtime"],0))
            for name in z.namelist():
                if name!="project/data.json":
                    db.execute("INSERT OR IGNORE INTO PROJECTFILES VALUES (?,?)",(Path(name).name,base64.b64encode(z.read(name)).decode()))
    assert db.execute("SELECT count(*) FROM PROJECTS").fetchone()[0]==7
    db.commit()
    # VACUUM INTO refuses an existing file, so serialize the fresh in-memory DB.
    target.write_bytes(db.serialize())
    db.close()

if __name__=="__main__":
    import sys
    pages=None
    if "--projects-only" not in sys.argv:
        cards();pages=teacher_pdf()
    native_projects()
    desktop_bundle()
    print(json.dumps({"teacherPagesGenerated":pages,"nativeProjects":len(D["projects"]),"missionSolutions":len(D.get("solutions",[])),"status":"generated and structurally verified","androidImport":"requires a real-device check"},ensure_ascii=False))

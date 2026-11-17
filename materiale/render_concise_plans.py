"""Build concise lesson plans followed by illustrated student references."""
from pathlib import Path
import json
import shutil
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
DATA = json.loads((ROOT / 'Plan_lectii_ScratchJr_60min.json').read_text(encoding='utf-8'))
OUT = ROOT.parent / 'output' / 'pdf' / 'Plan_lectii_ScratchJr_60min.pdf'
INK, TEAL, MUTED = map(colors.HexColor, ['#172d3e', '#087f75', '#52636f'])
for name, file in [('Body', 'arial.ttf'), ('Bold', 'arialbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(Path('C:/Windows/Fonts') / file)))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')
styles = {
    'title': ParagraphStyle('title', fontName='Bold', fontSize=25, leading=28, textColor=INK, spaceAfter=5),
    'sub': ParagraphStyle('sub', fontName='Body', fontSize=11, leading=14, textColor=MUTED, spaceAfter=9),
    'body': ParagraphStyle('body', fontName='Body', fontSize=9.3, leading=12.2, textColor=INK, spaceAfter=6),
    'head': ParagraphStyle('head', fontName='Bold', fontSize=10, leading=13, textColor=TEAL, spaceBefore=6, spaceAfter=4),
    'cell': ParagraphStyle('cell', fontName='Body', fontSize=9.3, leading=12.2, textColor=INK),
    'small': ParagraphStyle('small', fontName='Body', fontSize=8.7, leading=11.4, textColor=MUTED, spaceAfter=4),
}
def p(text, style='body'): return Paragraph(text, styles[style])
story=[]
for i, lesson in enumerate(DATA['lessons']):
    assert sum(int(x['minutes'].split('-')[1])-int(x['minutes'].split('-')[0]) for x in lesson['schedule'])==60
    if i: story.append(PageBreak())
    story += [p(escape(lesson['title']), 'title'), p(escape(lesson['subtitle']), 'sub'),
              p('<b>Obiectiv.</b> '+escape(lesson['goal'])), p('<b>Scena.</b> '+escape(lesson['setup']))]
    rows=[]
    for row in lesson['schedule']:
        rows.append([p('<b>'+escape(row['minutes'])+'</b><br/>min', 'cell'),p('<b>'+escape(row['title'])+'</b><br/>'+escape(row['text']), 'cell')])
    table=Table(rows, colWidths=[43, 484], hAlign='LEFT')
    table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),('LINEBELOW',(0,0),(-1,-1),.35,colors.HexColor('#d9e2e8')),('BACKGROUND',(0,4),(-1,4),colors.HexColor('#eef5f4'))]))
    story += [Spacer(1,3),table,p('REPERE PENTRU PROFESOR', 'head')]
    for line in lesson['solutions']: story.append(p(escape(line)))
    story.append(p(escape(lesson['hint']), 'small'))
    story.append(p('DOUĂ PROVOCĂRI DE REZERVĂ', 'head'))
    for item in lesson['backups']: story.append(p('<b>'+escape(item['title'])+'</b> '+escape(item['text'])))
    story.append(p(escape(lesson['teacher_note']), 'small'))
    if lesson.get('student_reference'):
        story.append(p(escape(lesson['student_reference']), 'small'))

def decorate(c, doc):
    lesson=DATA['lessons'][min(doc.page-1,len(DATA['lessons'])-1)]
    c.saveState();c.setFont('Bold',8);c.setFillColor(TEAL)
    c.drawString(34,A4[1]-29,f'SCRATCHJR / LECȚIA {lesson["number"]:02} / PLAN CONCIS')
    c.drawRightString(A4[0]-34,A4[1]-29,'60 MINUTE / 6-7 ANI')
    c.setStrokeColor(colors.HexColor('#d9e2e8'));c.line(34,31,A4[0]-34,31)
    c.setFont('Body',7.5);c.setFillColor(MUTED)
    c.drawString(34,19,'Biblioteca ScratchJr / Construim pe tabletă / '+DATA['revision'])
    c.drawRightString(A4[0]-34,19,str(doc.page));c.restoreState()

OUT.parent.mkdir(parents=True,exist_ok=True)
SimpleDocTemplate(str(OUT),pagesize=A4,leftMargin=34,rightMargin=34,topMargin=45,bottomMargin=42,title='ScratchJr - Planuri concise de 60 de minute',author='Școala altfel').build(story,onFirstPage=decorate,onLaterPages=decorate)
reader=PdfReader(str(OUT))
assert len(reader.pages)==len(DATA['lessons']), f'Expected one page per lesson; got {len(reader.pages)}'
assert all(page.extract_text().strip() for page in reader.pages)
from render_snapshot_guide import append_visual_pages
total=append_visual_pages(OUT)
assert len(PdfReader(str(OUT)).pages)==total
shutil.copyfile(OUT,ROOT/OUT.name)
print(f'Created {len(reader.pages)} plan page(s), {total} total pages: {OUT}')

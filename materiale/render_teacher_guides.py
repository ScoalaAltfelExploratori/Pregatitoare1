"""Render the editable Romanian teacher guides to HTML and printable PDF.

Run with Python + reportlab + pypdf. Native ScratchJr projects are not rebuilt.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent


def inline(text, pdf=False):
    text = html.escape(text)
    tag = 'link' if pdf else 'a'
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', lambda m: f'<{tag} href="{m[2]}">{m[1]}</{tag}>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    return re.sub(r'`([^`]+)`', r'<b>\1</b>' if pdf else r'<code>\1</code>', text)


def blocks(source):
    lines = source.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line or line.startswith('<!--'):
            i += 1
            continue
        if line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                cells = [x.strip() for x in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r'[-: ]+', x) for x in cells):
                    rows.append(cells)
                i += 1
            yield 'table', rows
            continue
        heading = re.match(r'^(#{1,3}) (.+)', line)
        if heading:
            yield 'h' + str(len(heading[1])), heading[2]
        elif line.startswith('- '):
            yield 'li', line[2:]
        elif re.match(r'^\d+\. ', line):
            yield 'step', line
        else:
            yield 'p', line
        i += 1


def teacher_html(folder):
    parts = list(blocks((folder / 'Ghid_profesor.md').read_text(encoding='utf-8-sig')))
    title = next(v for k, v in parts if k == 'h1')
    n = int(folder.name.split('_')[1])
    rendered, toc = [], []
    for kind, value in parts:
        if kind == 'table':
            rows = []
            for i, row in enumerate(value):
                tag = 'th' if i == 0 else 'td'
                rows.append('<tr>' + ''.join(f'<{tag}>{inline(c)}</{tag}>' for c in row) + '</tr>')
            rendered.append('<div class="table-wrap"><table>' + ''.join(rows) + '</table></div>')
        elif kind.startswith('h'):
            ident = 'titlu' if kind == 'h1' else f'section-{len(toc)}'
            if kind != 'h1':
                toc.append((ident, value))
            rendered.append(f'<{kind} id="{ident}">{inline(value)}</{kind}>')
        elif kind in ('li', 'step'):
            rendered.append(f'<p class="step">{("• " if kind == "li" else "")}{inline(value)}</p>')
        else:
            rendered.append('<p>' + inline(value) + '</p>')
    pdf = f'Ghid_profesor_Lectia_{n:02}.pdf'
    page = f'''<!doctype html>
<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)} · Ghidul profesorului</title>
<link rel="stylesheet" href="../../site-navigation.css"><link rel="stylesheet" href="../teacher-guides.css"></head>
<body><a class="skip-link" href="#continut">Sari la ghid</a>
<div class="site-navigation"><nav aria-label="Secțiunile siteului"><a class="site-home" href="../../index.html">Școala altfel</a><a href="../../scratchjr/index.html">ScratchJr · 10 lecții</a><a href="../../robo/index.html">Robo · exerciții</a></nav></div>
<main id="continut"><p class="eyebrow">Ghid pentru profesor · 50 de minute · 6–7 ani</p>
<nav class="guide-actions" aria-label="Materialele lecției"><a href="index.html">← Lecția {n}</a><a href="{pdf}">Descarcă ghidul PDF</a><a href="Ghid_profesor.md">Text editabil</a></nav>
<details class="guide-toc"><summary>Cuprinsul ghidului</summary><ol>{''.join(f'<li><a href="#{i}">{html.escape(t)}</a></li>' for i,t in toc)}</ol></details>
{''.join(rendered)}
</main><footer>Școala altfel · <a href="../../scratchjr/index.html">Toate lecțiile ScratchJr</a></footer></body></html>'''
    (folder / 'ghid-profesor.html').write_text(page, encoding='utf-8')


def teacher_pdf(folder):
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.styles import ParagraphStyle
    from pypdf import PdfReader
    fonts = Path('C:/Windows/Fonts')
    pdfmetrics.registerFont(TTFont('GuideBody', str(fonts / 'arial.ttf')))
    pdfmetrics.registerFont(TTFont('GuideBold', str(fonts / 'arialbd.ttf')))
    pdfmetrics.registerFontFamily('GuideBody', normal='GuideBody', bold='GuideBold', italic='GuideBody', boldItalic='GuideBold')
    ink, muted = colors.HexColor('#173e3a'), colors.HexColor('#58716b')
    styles = {
        'p': ParagraphStyle('body', fontName='GuideBody', fontSize=10.5, leading=14.5, spaceAfter=7, textColor=ink),
        'h1': ParagraphStyle('title', fontName='GuideBold', fontSize=24, leading=29, spaceAfter=15, textColor=ink, keepWithNext=True),
        'h2': ParagraphStyle('heading', fontName='GuideBold', fontSize=15, leading=19, spaceBefore=13, spaceAfter=7, textColor=ink, keepWithNext=True),
        'h3': ParagraphStyle('small-heading', fontName='GuideBold', fontSize=12, leading=16, spaceBefore=10, spaceAfter=7, textColor=ink, keepWithNext=True),
        'cell': ParagraphStyle('cell', fontName='GuideBody', fontSize=9.2, leading=12.5, textColor=ink),
    }
    n = int(folder.name.split('_')[1])
    story = []
    for kind, value in blocks((folder / 'Ghid_profesor.md').read_text(encoding='utf-8-sig')):
        if kind == 'table':
            widths = [65, 125, 325] if len(value[0]) == 3 else [165, 350]
            table = Table([[Paragraph(inline(v, True), styles['cell']) for v in row] for row in value], colWidths=widths, repeatRows=1, hAlign='LEFT')
            table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e6f2eb')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,-1),.3,colors.HexColor('#dce6df'))]))
            story.extend([table, Spacer(1, 9)])
        else:
            prefix = '• ' if kind == 'li' else ''
            story.append(Paragraph(prefix + inline(value, True), styles.get(kind, styles['p'])))
    def decorate(c, doc):
        w, h = A4
        c.saveState()
        c.setFillColor(muted)
        c.setFont('GuideBody', 8)
        c.drawString(40, h - 26, f'SCRATCHJR / LECȚIA {n} / GHID PENTRU PROFESOR')
        c.drawString(40, 24, '50 de minute · Puzzle-uri și creație personală · 12 noiembrie 2026')
        c.drawRightString(w - 40, 24, str(doc.page))
        c.restoreState()
    out = folder / f'Ghid_profesor_Lectia_{n:02}.pdf'
    SimpleDocTemplate(str(out), pagesize=A4, leftMargin=40, rightMargin=40, topMargin=48, bottomMargin=48, title=f'Lecția {n} ScratchJr - Ghidul profesorului').build(story, onFirstPage=decorate, onLaterPages=decorate)
    reader = PdfReader(str(out))
    assert all(p.extract_text().strip() for p in reader.pages)
    return len(reader.pages)


def package_lessons():
    import zipfile
    shared = ['render_teacher_guides.py', 'teacher-guides.css', 'Surse_oficiale_ScratchJr.md', 'atelier_creativ.json']
    for number in range(1, 11):
        directory = ROOT / f'Lectia_{number:02}_ScratchJr'
        target = ROOT / f'{directory.name}.zip'
        files = sorted(p for p in directory.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.suffix != '.pyc')
        files += [ROOT / name for name in shared]
        with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
            for path in files:
                archive.write(path, path.relative_to(ROOT).as_posix())
        with zipfile.ZipFile(target) as archive:
            assert archive.testzip() is None
            for path in files:
                assert archive.read(path.relative_to(ROOT).as_posix()) == path.read_bytes()
        print(f'L{number:02}: packaged and verified {len(files)} files')


if __name__ == '__main__':
    import sys
    if '--package-only' not in sys.argv:
        for number in range(1, 11):
            directory = ROOT / f'Lectia_{number:02}_ScratchJr'
            teacher_html(directory)
            print(f'L{number:02}: {teacher_pdf(directory)} pages')
    package_lessons()

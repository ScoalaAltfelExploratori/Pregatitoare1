"""Render the two repository guides as readable, printable website pages."""
from pathlib import Path
import html
import re

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[1] / 'scratchjr' / 'lectia-0'
MATERIALS = '../../materiale/Lectia_00_ScratchJr/'

def inline(text):
    text = html.escape(text)
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    def link(match):
        label, href = match[1], match[2]
        if href.startswith(('proiecte/', 'solutii/', 'verificare/')):
            href = MATERIALS + href
        elif href == 'Ghid_profesor.md':
            href = 'ghid-profesor.html'
        elif href == 'README.md':
            href = 'index.html'
        download = ' download' if href.endswith('.sjr') else ''
        return f'<a href="{href}"{download}>{label}</a>'
    return re.sub(r'\[(.*?)\]\((.*?)\)', link, text)

def body(markdown):
    result, listing = [], None
    for line in markdown.splitlines():
        if not line.strip():
            if listing:
                result.append(f'</{listing}>')
                listing = None
            continue
        if line.startswith('# '):
            continue
        heading = re.match(r'^(#{2,3}) (.*)', line)
        item = re.match(r'^(?:\d+\. |\- )(.*)', line)
        if heading:
            level = len(heading[1])
            result.append(f'<h{level}>{inline(heading[2])}</h{level}>')
        elif item:
            kind = 'ul' if line.startswith('-') else 'ol'
            if listing != kind:
                if listing:
                    result.append(f'</{listing}>')
                result.append(f'<{kind}>')
                listing = kind
            result.append(f'<li>{inline(item[1])}</li>')
        else:
            result.append(f'<p>{inline(line)}</p>')
    if listing:
        result.append(f'</{listing}>')
    return '\n'.join(result)

def render(source, destination, title, photo=False):
    header = f'''<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lecția 0 · {title}</title><link rel="stylesheet" href="../../site.css"><style>main{{max-width:1000px}}h2{{margin-top:36px}}h3{{margin-top:30px;color:#175a48}}li{{margin:10px 0}}p,li{{line-height:1.65}}.downloads{{display:flex;gap:14px;flex-wrap:wrap;margin:24px 0}}nav{{margin-bottom:28px}}figure img{{width:100%;height:auto;border-radius:16px}}@media print{{nav,.downloads,figure{{display:none}}body{{font-size:11pt}}h2,h3{{break-after:avoid}}}}</style></head><body><main><nav><a href="../index.html">← Toate lecțiile ScratchJr</a> · <a href="index.html">Lecția 0</a> · <a href="../../index.html">Meniul siteului</a></nav><p class="eyebrow">Lecția 0 · Poveste și programare</p><h1>{title}</h1><div class="downloads"><a class="action" href="{MATERIALS}proiecte/01_Construim_impreuna.sjr" download>Construim împreună ↓</a><a class="action secondary" href="ghid-profesor.html">Ghidul profesorului →</a><a class="action secondary" href="https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/" target="_blank" rel="noopener">Deschide ScratchJr ↗</a></div>'''
    if photo:
        header += f'<figure><img src="{MATERIALS}verificare/picnicul-scratchjr.png" alt="Proiectul editabil în ScratchJr: cinci prieteni, două mere pe masă și trei în copac"><figcaption>Scenă din proiectul ScratchJr: culegem mere pentru fiecare prieten.</figcaption></figure>'
    footer = f'<p><a href="../../materiale/Lectia_00_ScratchJr.zip" download>Tot pachetul ZIP</a> · <a href="{MATERIALS}{source}" download>Descarcă instrucțiunile text</a> · <a href="{MATERIALS}verificare/README.md">Verificarea proiectelor</a></p></main></body></html>\n'
    (SITE / destination).write_text(header + body((HERE / source).read_text(encoding='utf8')) + footer, encoding='utf8')

def render_all():
    render('README.md', 'index.html', 'Picnicul întrerupt de ploaie', photo=True)
    render('Ghid_profesor.md', 'ghid-profesor.html', 'Ghidul profesorului')

if __name__ == '__main__':
    render_all()

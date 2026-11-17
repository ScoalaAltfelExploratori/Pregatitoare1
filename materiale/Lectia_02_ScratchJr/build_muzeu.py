"""Build the 60-minute museum lesson with unmodified, bundled ScratchJr assets."""
from pathlib import Path
from copy import deepcopy
import importlib.util
import json
import zipfile
import io
import hashlib
import sys
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native', ROOT.parent / 'Lectia_00_ScratchJr/build_pack.py')
n = importlib.util.module_from_spec(spec)
spec.loader.exec_module(n)
n.ROOT = ROOT / 'solutii_muzeu'
n.ASSETS.update({'Earth': (220, 220), 'Planet': (393, 271), 'Father': (210, 446)})
b, s = n.b, n.script

def motion(direction, pause=0, amount=1):
    return [b(direction, amount)] + ([b('wait', pause)] if pause else []) + [b('forever')]

def exhibit(direction, key, *, pause=0, amount=1):
    programs = [s('onflag', *motion(direction, pause, amount))]
    if key != 'm1':
        programs.append(s('onmessage', b('stopmine'), color='Red'))
    if key in ['m3', 'creatie', 'r1', 'r2']:
        programs.append(s('onmessage', *motion(direction, pause, amount), color='Blue'))
    return programs

def make_pages():
    titles = {'m1': '1. Exponatul prinde viață', 'm2': '2. Încremenim la semnal',
              'm3': '3. Inspecția completă', 'creatie': '4. Muzeul meu',
              'r1': 'R1. Exponatul somnoros', 'r2': 'R2. Inspecție pe rând'}
    pages = {}
    for key, title in titles.items():
        earth = exhibit('right', key, pause=5 if key == 'creatie' else 0)
        planet = exhibit('left', key, pause=5 if key == 'creatie' else 0,
                         amount=2 if key == 'creatie' else 1) if key != 'm1' else []
        guard = []
        if key == 'm2':
            guard = [s('onclick', b('message', 'Red'))]
        elif key in ['m3', 'creatie', 'r1']:
            guard = [s('onclick', b('home'), b('message', 'Red'), b('forward', 12),
                       b('wait', 20 if key == 'creatie' else 10), b('back', 12), b('message', 'Blue'))]
        if key == 'r1':
            planet[-1] = s('onclick', b('stopmine'), *motion('left'))
        if key == 'r2':
            planet[1]['trigger']['value'] = 'Blue'
            planet[2]['trigger']['value'] = 'Green'
            # Blue starts the guard's second strip AND the Earth's loop.
            # It is last: a Send waits for its receiver strips in ScratchJr.
            guard = [s('onclick', b('stopmine'), b('home'), b('message', 'Red'),
                       b('forward', 4), b('wait', 10), b('message', 'Blue')),
                     s('onmessage', b('forward', 8), b('wait', 10), b('back', 12),
                       b('message', 'Green'), color='Blue')]
        pages[key] = {'background': 'EmptyRoom.svg', 'focus': 'earth',
            'sprites': [n.actor('earth', 'Earth', 144, 144, *earth, scale=.38, name='Pământ'),
                        n.actor('planet', 'Planet', 336, 144, *planet, scale=.28, name='Planetă'),
                        n.actor('guard', 'Father', 48, 264, *guard, scale=.25, name='Paznic')],
            'texts': [n.label(title, 240, 25, 20), n.label('INTRARE', 58, 334, 13)]}
    return pages

def export(key, pages, title):
    record = n.export({'name': title, 'short': 'Muzeul', 'path': key+'.sjr', 'pages': pages})
    path = n.ROOT / record['path']
    with zipfile.ZipFile(path) as z:
        entries = {name: z.read(name) for name in z.namelist()}
    data = json.loads(entries['project/data.json'])
    for page_id in data['json']['pages']:
        p = data['json'][page_id]
        for sprite_id in p['sprites']:
            for i, program in enumerate(p[sprite_id].get('scripts', [])):
                if i >= 2:
                    for block in program:
                        block[2] += 600
                        block[3] -= 190
    thumb = Image.new('RGB', (160, 120), '#edf1fb')
    draw = ImageDraw.Draw(thumb)
    for y, text, size in [(20, 'LECȚIA 2', 23), (61, 'MUZEUL', 24)]:
        draw.text((80, y), text, anchor='mt', fill='#23365b',
                  font=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', size))
    stream = io.BytesIO(); thumb.save(stream, format='PNG'); png = stream.getvalue()
    entries.pop('project/thumbnails/'+data['thumbnail']['md5'])
    data['thumbnail']['md5'] = hashlib.md5(png).hexdigest()+'.png'
    data['ctime'] = '2026-11-17 15:00:00'; data['mtime'] = '1794927600000'
    entries['project/thumbnails/'+data['thumbnail']['md5']] = png
    entries['project/data.json'] = json.dumps(data, ensure_ascii=False).encode()
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
        for name, contents in entries.items(): z.writestr(name, contents)
    return {'key': key, 'file': record['path'], 'name': title,
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'pages': pages}

if __name__ == '__main__':
    pages = make_pages()
    records = [export(k, [p], 'L02 Muzeul - '+p['texts'][0]['text']) for k, p in pages.items()]
    starter = deepcopy(pages['m1']); starter['texts'][0]['text'] = 'Muzeul după închidere'
    for actor in starter['sprites']: actor['scripts'] = []
    records.append(export('start', [starter], 'L02 Muzeul - de la zero'))
    records.append(export('lectia_2', [pages[k] for k in ['m1', 'm2', 'm3', 'creatie']], 'L02 Muzeul - cele 4 etape'))
    records.append(export('rezerve', [pages[k] for k in ['r1', 'r2']], 'L02 Muzeul - cele 2 rezerve'))
    (ROOT/'muzeu.json').write_text(json.dumps({'lesson': 2, 'title': 'Muzeul după închidere',
        'duration': 60, 'projects': records}, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    sys.path.insert(0,str(ROOT.parent))
    from render_teacher_guides import teacher_html
    teacher_html(ROOT, duration=60)
    print('Built 7 individual projects, 2 collections and the 60-minute web guide.')

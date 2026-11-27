"""Cross-check published lessons, native SJR exports, PDFs and recorded browser runs.

This reads observations collected in the real app. It does not drive or simulate
ScratchJr. A changed project requires a new browser recording, not a new hash here.
"""
from pathlib import Path
import hashlib
import json
import re
import zipfile
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
M = HERE.parent
NAMES = 'stafeta muzeu autobuz spectacol curier atelier fabrica submarin reciclare gradinar'.split()


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def sha(data):
    return hashlib.sha256(data).hexdigest()


def model(block):
    if 'repeat' in block:
        return ['repeat', str(block['repeat']), [model(b) for b in block['body']]]
    return [block['block'], str(block['value'])]


def native(block):
    return [block[0], str(block[1])] + ([[native(b) for b in block[4]]] if block[0] == 'repeat' else [])


def flatten(blocks):
    for b in blocks:
        yield b
        if b[0] == 'repeat':
            yield from flatten(b[2])


def norm(text):
    return re.sub(r'\s+', ' ', re.sub(r'(?m)^\d+\s*$', '', text)).strip()


def images(page):
    return sorted(sha(i.data) for i in page.images)


def verify_project(folder, entry, custom):
    path = folder / f'solutii_{NAMES[int(folder.name[7:9])-1]}' / entry['file']
    assert sha(path.read_bytes()) == entry['sha256'], (path, 'changed since manifest')
    scripts = 0
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None, path
        actual = json.loads(z.read('project/data.json'))['json']
        assert len(actual['pages']) == len(entry['pages']), path
        for number, page in enumerate(entry['pages'], 1):
            exported = actual[actual['pages'][number - 1]]
            sent, received = set(), set()
            if custom:
                assert 'project/backgrounds/' + page['background'] in z.namelist(), path
            for actor in page['sprites']:
                a = exported[f'p{number}_{actor["id"]}']
                expected = [[model(b) for b in [s['trigger']] + s['actions']] for s in actor['scripts']]
                assert [[native(b) for b in s] for s in a['scripts']] == expected, (path, actor['id'])
                scripts += len(expected)
                for field, value in [('homex', actor['position'][0]), ('homey', actor['position'][1]),
                                     ('homescale', actor['scale']), ('homeshown', actor['shown'])]:
                    assert a[field] == value, (path, actor['id'], field)
                if custom:
                    assert 'project/characters/' + actor['asset'] in z.namelist(), (path, actor['id'])
                for script in expected:
                    for b in flatten(script):
                        if b[0] == 'message': sent.add(b[1])
                        if b[0] == 'onmessage': received.add(b[1])
            assert sent == received, (path, number, 'unpaired message colors', sent, received)
    return scripts


plans = read(M / 'Plan_lectii_ScratchJr_60min.json')['lessons']
progression = read(M / 'Progresia_cursului.json')['lessons']
assert [p['number'] for p in plans] == [p['number'] for p in progression] == list(range(1, 11))
course = PdfReader(M / 'Plan_lectii_ScratchJr_60min.pdf')
offset = 0
lessons = []
manifests = {}
for number, name in enumerate(NAMES, 1):
    folder = M / f'Lectia_{number:02}_ScratchJr'
    manifest = read(folder / (name + '.json'))
    manifests[number] = {p['key']: p for p in manifest['projects']}
    plan = plans[number - 1]
    end = 0
    for slot in plan['schedule']:
        start, next_end = map(int, slot['minutes'].split('-'))
        assert start == end and next_end > start, (number, 'schedule gap/overlap')
        end = next_end
    assert end == 60 and len(plan['backups']) == 2, number
    assert any('dificil' in s['title'] for s in plan['schedule']), (number, 'hard puzzle missing from core')
    if number >= 9:
        assert not any('creați' in s['title'].lower() for s in plan['schedule']), number
    guide = (folder / 'Ghid_profesor.md').read_text(encoding='utf-8')
    assert plan['title'] in guide and '60' in guide[:600], (number, 'stale guide')
    assert '## Locul lecției în curs' in guide, number
    pdf = PdfReader(folder / f'Ghid_profesor_Lectia_{number:02}.pdf')
    assert norm(plan['title']) in norm(pdf.pages[0].extract_text()), (number, 'stale PDF')
    for page, combined in zip(pdf.pages, course.pages[offset:offset + len(pdf.pages)]):
        assert norm(page.extract_text()) == norm(combined.extract_text()), (number, 'different PDF text')
        assert images(page) == images(combined), (number, 'different PDF screenshots')
    scripts = sum(verify_project(folder, p, number >= 6) for p in manifest['projects'])
    # The detailed capture maps also prove coverage of every script in the last two lessons.
    if number >= 9:
        coverage = read(folder / 'verificare/pdf-capture-coverage.json')
        expected = {(p['key'], a['id'], si): s for p in manifest['projects'] if p['key'] != 'start'
                    for a in p['pages'][0]['sprites'] for si, s in enumerate(a['scripts'])}
        assert {(c['key'], c['actor'], c['script']) for c in coverage} == set(expected), number
        for c in coverage:
            assert (folder / f'verificare/capturi_{name}' / c['capture']).is_file(), c
            assert 1 < c['page'] <= len(pdf.pages), c
        if number == 10:
            for key, script in expected.items():
                indices = [b for c in coverage if (c['key'], c['actor'], c['script']) == key for b in c['native_blocks']]
                count = len(list(flatten([model(b) for b in [script['trigger']] + script['actions']])))
                assert sorted(indices) == list(range(count)), key
    lessons.append({'lesson': number, 'title': plan['title'], 'pdf_pages': len(pdf.pages),
                    'course_pages': [offset + 1, offset + len(pdf.pages)],
                    'manifest_projects': len(manifest['projects']), 'scripts': scripts, 'result': 'PASS'})
    offset += len(pdf.pages)
assert offset == len(course.pages), 'unmatched course pages'

# L1 also supplies two convenience collections, outside the individual manifest.
folder = M / 'Lectia_01_ScratchJr'
collections = []
for file, keys in [('lectia_1.sjr', ['m1', 'm2', 'm3', 'creatie']), ('rezerve.sjr', ['r1', 'r2'])]:
    path = folder / 'solutii_stafeta' / file
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        data = json.loads(z.read('project/data.json'))['json']
        assert len(data['pages']) == len(keys)
        for pn, key in enumerate(keys, 1):
            page = data[data['pages'][pn - 1]]
            for actor in manifests[1][key]['pages'][0]['sprites']:
                a = page[f'p{pn}_{actor["id"]}']
                assert [[native(b) for b in s] for s in a['scripts']] == [
                    [model(b) for b in [s['trigger']] + s['actions']] for s in actor['scripts']]
                assert [a['homex'], a['homey']] == actor['position']
    collections.append({'file': file, 'sha256': sha(path.read_bytes()), 'result': 'PASS'})

# Fresh regression observations collected through normal UI controls on 27 November.
runs = read(HERE / 'browser-runs.json')
for run in runs:
    assert run['sha256'] == manifests[run['lesson']][run['key']]['sha256'], run['lesson']


def frames(n, label='core'):
    return next(r['frames'] for r in runs if r['lesson'] == n and r['label'] == label)


def pos(actor): return actor['x'], actor['y']
def angle(actor): return float(re.search(r'rotate\(([-.\d]+)deg', actor['transform'])[1])
def actor(frame, name): return frame['a'][f'p{frame.get("page", "page1")[-1]}_{name}']
def final(n, name, label='core'): return actor(frames(n, label)[-1], name)
def episodes(values):
    return sum(bool(v) and (i == 0 or not values[i - 1]) for i, v in enumerate(values))


assert pos(final(1, 'b')) == (408, 264) and pos(final(1, 'minge')) == (408, 240)
assert min(actor(f, 'b')['y'] for f in frames(1)) == 192
assert all(pos(actor(f, 'minge')) == (actor(f, 'b')['x'], actor(f, 'b')['y'] - 24)
           for f in frames(1) if actor(f, 'b')['x'] > 264)
inspection = frames(2, 'inspection')
away = [f for f in inspection if actor(f, 'guard')['x'] > 48]
assert away and max(actor(f, 'guard')['x'] for f in away) == 336
for name in ['earth', 'planet']:
    assert len({angle(actor(f, name)) for f in frames(2, 'rotating-ready')}) > 2
    assert len({angle(actor(f, name)) for f in away}) == 1
    assert len({angle(actor(f, name)) for f in inspection if actor(f, 'guard')['x'] == 48}) > 2
assert pos(final(2, 'guard', 'inspection')) == (48, 264)
assert frames(3)[-1]['page'] == 'page2'
for name, target in {'bus': (180, 264), 'ana': (264, 216), 'dan': (312, 264), 'mara': (360, 312)}.items():
    assert pos(final(3, name)) == target and final(3, name)['opacity'] == 1
for f in frames(3):
    if f['page'] == 'page2' and any(actor(f, name)['opacity'] > 0 for name in ['ana', 'dan', 'mara']):
        assert pos(actor(f, 'bus')) == (180, 264), 'passenger exits a moving bus'
assert episodes([actor(f, 'a')['y'] < 216 for f in frames(4)]) == 4
assert episodes([actor(f, 'b')['y'] < 216 for f in frames(4)]) == 6
assert pos(final(5, 'robot')) == (144, 276)
assert pos(final(5, 'fotbal')) == (408, 312) and pos(final(5, 'baschet')) == (456, 312)
assert frames(6)[-1]['page'] == 'page2' and pos(final(6, 'robot')) == (420, 300)
assert all(final(6, name)['opacity'] == 0 for name in ['rest1', 'rest2', 'rest3'])
assert pos(final(6, 'usa')) == (414, 152)
for f in frames(6):
    if f['page'] == 'page2' and actor(f, 'robot')['x'] > 324:
        assert actor(f, 'usa')['y'] == 152, 'robot enters before door is open'
assert pos(final(7, 'rover')) == (360, 228) and final(7, 'rover')['opacity'] == 1
assert all(final(7, name)['opacity'] == 0 for name in ['sasiu', 'stanga', 'dreapta', 'far'])
assert episodes([actor(f, 'far')['opacity'] == 1 for f in frames(7)]) == 2
for f in frames(7):
    if actor(f, 'far')['opacity'] > 0:
        assert pos(actor(f, 'stanga')) == (240, 252) and pos(actor(f, 'dreapta')) == (336, 252)
steps = read(HERE / 'submarin-steps.json')
assert steps['sha256'] == manifests[8]['m3']['sha256']
assert [s['command'] for s in steps['steps']] == ['dreapta']*5 + ['jos']*5 + ['sus']*5 + ['stanga']*5 + ['depune', 'dreapta']
assert final(8, 'transport', 'picked-up')['opacity'] == 1 and final(8, 'sol', 'picked-up')['opacity'] == 0
last = steps['steps'][-1]['frames'][-1]
assert pos(actor(last, 'robot')) == (144, 60) and pos(actor(last, 'livrata')) == (96, 120)
assert actor(last, 'livrata')['opacity'] == 1 and actor(last, 'transport')['opacity'] == 0
for step in steps['steps'][10:20]:
    for f in step['frames']:
        assert pos(actor(f, 'transport')) == (actor(f, 'robot')['x'], actor(f, 'robot')['y'] + 60)
targets = {'sticla1': (72, 260), 'hartie': (384, 260), 'doza': (240, 260), 'sticla2': (120, 260)}
assert pos(final(9, 'robot')) == (240, 92)
assert all(pos(final(9, name)) == target and final(9, name)['opacity'] == 1 for name, target in targets.items())
seen = []
for f in frames(9):
    for name in targets:
        if actor(f, name)['opacity'] == 1 and name not in seen:
            assert pos(actor(f, 'robot')) == (240, 92), 'next item starts before robot returns'
            seen.append(name)
assert seen == list(targets)
assert pos(final(10, 'robot')) == (96, 204) and pos(final(10, 'indicator')) == (216, 23)
assert all(final(10, name)['opacity'] == 1 for name in ['viea', 'vieb'])
assert all(final(10, name)['opacity'] == 0 for name in ['uscataa', 'uscatab', 'jeta', 'jetb', 'umplere'])
for jet, target in [('jeta', (240, 108)), ('jetb', (240, 252))]:
    assert episodes([actor(f, jet)['opacity'] == 1 for f in frames(10)]) == 2
    assert all(pos(actor(f, 'robot')) == target for f in frames(10) if actor(f, jet)['opacity'] > 0)
for n in [1, 3, 4, 5, 6, 7, 9, 10]:
    assert frames(n)[-1]['go'] == 'go on', (n, 'program did not finish')

result = {'result': 'PASS', 'review_date': '2026-11-27', 'lessons': lessons,
          'native_exports': sum(l['manifest_projects'] for l in lessons) + len(collections),
          'extra_collections': collections, 'pdf_pages': offset,
          'fresh_core_browser_runs': 10,
          'observed_frames': sum(len(r['frames']) for r in runs) + sum(len(s['frames']) for s in steps['steps']),
          'scope': 'Native exports and recorded ScratchJr Desktop Reborn UI observations; not an Android or classroom test.'}
(HERE / 'course-results.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, ensure_ascii=False, indent=2))

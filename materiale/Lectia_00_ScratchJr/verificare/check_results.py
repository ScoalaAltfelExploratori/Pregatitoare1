"""Check observed browser output, independently of the project generator."""
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parent

def read(name):
    return json.loads((ROOT / (name + '.json')).read_text(encoding='utf8'))

def final(record):
    return {s['id']: s for s in record['stageHistory'][-1]['sprites']}

def position(sprite):
    return tuple(float(n) for n in re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px', sprite['transform']).groups())

def audio(name, count):
    record = read(name)
    assert len(record['events']) == count, (name, len(record['events']))
    if count:
        assert record['peak'] > 0
    return record

route = audio('01_ocolul', 1)
assert route['stageHistory'][-1]['page'] == 'page2'
apples = final(audio('02_mere', 3))
assert {position(apples['p2_mar' + str(i)])[1] for i in range(1, 6)} == {124}

for name, count, visible in [('03_masa_initial', 0, 5), ('04_masa_doi', 2, 3), ('05_masa_trei', 3, 0)]:
    sprites = final(audio(name, count))
    assert sum(sprites['p3_mar' + str(i)]['opacity'] == 1 for i in range(1, 6)) == visible

rain = audio('06_adapost', 1)
cast = ['iepuras', 'pui', 'catel', 'rata', 'pasare']
hidden = {}
for key in cast:
    hidden[key] = next(f['t'] for f in rain['stageHistory'] if any(s['id'] == 'p4_' + key and s['opacity'] == 0 for s in f['sprites']))
assert max(hidden[key] for key in cast[:2]) < min(hidden[key] for key in cast[2:])
assert all(final(rain)['p4_' + key]['opacity'] == 0 for key in cast)
assert final(rain)['p4_nor']['opacity'] == 0 and final(rain)['p4_soare']['opacity'] == 1

repeat = audio('07_repetare', 1)
assert repeat['stageHistory'][-1]['go'] == 'go on'
assert position(final(repeat)['p1_iepuras']) == (252, 184)
assert position(final(repeat)['p1_catel']) == (284, 182)

dance = read('08_statui')['stageHistory'][-40:]
for key in cast:
    locations = {position(next(s for s in f['sprites'] if s['id'] == 'p1_' + key)) for f in dance}
    assert (len(locations) == 1) == (key in cast[:2]), (key, len(locations))

guard = audio('09_gard', 0)
assert guard['stageHistory'][-1]['page'] == 'page1'
assert position(final(guard)['p1_iepuras']) == (12, 184)
assert any(position(s)[0] > 12 for f in guard['stageHistory'] for s in f['sprites'] if s['id'] == 'p1_iepuras')

manual = read('10_constructie')
assert position(final(manual)['p2_mar3']) == (136, 124)
assert position(next(s for s in manual['stageHistory'][0]['sprites'] if s['id'] == 'p2_mar3')) == (136, 28)
print('All 10 browser recordings match the expected visible outcomes.')

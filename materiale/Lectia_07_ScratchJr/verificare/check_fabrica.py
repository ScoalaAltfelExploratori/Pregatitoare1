"""Verify exported files against observed native-browser motion (no simulator)."""
from pathlib import Path
import json, hashlib, zipfile, re, xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
manifest=json.loads((R/'fabrica.json').read_text(encoding='utf-8'))
evidence=json.loads((R/'capturi_fabrica/observatii-browser.json').read_text(encoding='utf-8'))
hashes={p['key']:p['sha256'] for p in evidence['testedProjects']}
def pos(row,id):return tuple(map(float,re.search(r'translate3d\(([-.\d]+)px, ([-.\d]+)px',row['actors'][id]['transform']).groups()))
def visible(row,id):return row['actors'][id]['opacity']==1
def first(rows,predicate):return next(i for i,r in enumerate(rows) if predicate(r))
for p in manifest['projects']:
    path=R/'solutii_fabrica'/p['file']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==p['sha256']==hashes[p['key']]
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        data=json.loads(z.read('project/data.json'))
        assert len(data['json']['pages'])==1
        for pid in data['json']['pages']:
            page=data['json'][pid];assert len(page['sprites'])==7
            if p['key']=='start':assert all(not page[s]['scripts'] for s in page['sprites'])
        for page in p['pages']:
            assert 'project/backgrounds/'+page['background'] in z.namelist()
            for a in page['sprites']:assert 'project/characters/'+a['asset'] in z.namelist()
        for name in z.namelist():
            if name.endswith('.svg'):
                svg=z.read(name);assert b'<script' not in svg
                for e in ET.fromstring(svg).iter():
                    for k,v in e.attrib.items():
                        if k.endswith('href'):assert v.startswith('data:image/png;base64,')
summary={}
for key,rows in evidence['runs'].items():
    assert rows[-1]['run']=='go on',(key,'still running')
    for id in rows[-1]['actors']:
        assert len({(pos(r,id),visible(r,id)) for r in rows[-10:]})==1,(key,id,'unstable final state')
    if key=='start':
        for id in rows[0]['actors']:assert len({(pos(r,id),visible(r,id)) for r in rows})==1
        summary[key]={'samples':len(rows),'blank_and_static':True};continue
    assert pos(rows[-1],'sasiu')==(192,168)
    if key=='m1':
        assert visible(rows[-1],'sasiu') and not visible(rows[-1],'rover')
        assert pos(rows[-1],'stanga')==(90,270) and pos(rows[-1],'dreapta')==(378,270)
    else:
        chassis=first(rows,lambda r:pos(r,'sasiu')==(192,168))
        left_move=first(rows,lambda r:pos(r,'stanga')!=(90,270))
        right_move=first(rows,lambda r:pos(r,'dreapta')!=(378,270))
        left_end=first(rows,lambda r:pos(r,'stanga')==(210,222))
        right_end=first(rows,lambda r:pos(r,'dreapta')==(306,222))
        assert chassis<min(left_move,right_move),(key,'wheels before chassis')
        assert pos(rows[-1],'stanga')==(210,222) and pos(rows[-1],'dreapta')==(306,222)
        if key=='r1':assert right_move>left_end,'sequential wheels overlap'
        else:assert max(left_move,right_move)<min(left_end,right_end),'parallel wheels do not overlap'
        if key=='m2':
            assert visible(rows[-1],'sasiu') and visible(rows[-1],'stanga') and visible(rows[-1],'dreapta')
            assert not visible(rows[-1],'rover')
        else:
            if key!='r1':assert left_end<right_end,'slow right wheel did not finish last'
            flashes=[i for i,r in enumerate(rows) if visible(r,'far') and (i==0 or not visible(rows[i-1],'far'))]
            assert len(flashes)==(6 if key=='r2' else 3 if key=='creatie' else 2),(key,'flash count',len(flashes))
            assert flashes[0]>max(left_end,right_end),(key,'lamp starts too early')
            swap=first(rows,lambda r:visible(r,'rover'))
            drive=first(rows,lambda r:pos(r,'rover')!=(192,168))
            assert swap>flashes[1] and drive>=swap
            assert all(not visible(rows[-1],id) for id in ('sasiu','stanga','dreapta','far'))
            assert visible(rows[-1],'rover') and pos(rows[-1],'rover')==(264,168)
            if key=='r2':
                at_start=[i for i in range(drive+1,len(rows)) if pos(rows[i],'rover')==(192,168) and pos(rows[i-1],'rover')!=(192,168)]
                assert len(at_start)==2,('test return count',at_start)
                assert flashes[2]>=at_start[0] and flashes[4]>=at_start[1]
                assert all(pos(rows[i],'rover')==(192,168) for i in flashes),'lamp tested away from bench'
            summary[key]={'samples':len(rows),'flashes':len(flashes),'left_finished_ms':rows[left_end]['time']-rows[0]['time'],'right_finished_ms':rows[right_end]['time']-rows[0]['time'],'first_flash_ms':rows[flashes[0]]['time']-rows[0]['time'],'final_rover':pos(rows[-1],'rover')}
    summary.setdefault(key,{'samples':len(rows),'completed':True})
assert set(evidence['reopened'])=={'start','m3'}
(R/'verificare/fabrica-rezultate.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'PASS: 7 exact packages, {len(summary)} native-browser runs, parallel/sequential wheels, slow-wheel wait, lamp flashes, two test returns, one departure, reset/replay and reopen.')

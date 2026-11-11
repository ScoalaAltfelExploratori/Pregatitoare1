from pathlib import Path
import json,wave,sys
import numpy as np
P=Path(__file__).resolve().parents[2];A=P/'verificare/audio'
sys.stdout.reconfigure(encoding='utf-8')
results=[]
for meta in sorted(A.glob('p*.json')):
    record=json.loads(meta.read_text(encoding='utf-8'))
    with wave.open(str(meta.with_suffix('.wav')),'rb') as w:
        assert w.getnchannels()==1 and w.getsampwidth()==2
        rate=w.getframerate();audio=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
    window=round(rate*.005)
    peaks=np.array([np.max(np.abs(audio[i:i+window]),initial=0) for i in range(0,len(audio),window)])
    active=np.flatnonzero(peaks>.02);groups=[]
    for i in active:
        if not groups or i-groups[-1][-1]>20:groups.append([int(i)])
        else:groups[-1].append(int(i))
    onsets=[g[0]*window/rate for g in groups];ends=[(g[-1]+1)*window/rate for g in groups]
    gaps=np.diff(onsets).tolist();expected=record['expected']
    assert len(groups)==expected['sounds'],(meta.name,len(groups),expected['sounds'])
    reference=record['gaps']
    assert len(gaps)==len(reference)
    assert all(abs(a-b)<.08 for a,b in zip(gaps,reference)),(meta.name,gaps,reference)
    # The loud attack above 0.02 is shorter than the full 104 ms Pop buffer.
    assert all(0.015<e-s<.15 for s,e in zip(onsets,ends)),(meta.name,onsets,ends)
    tail=len(audio)/rate-ends[-1] if ends else len(audio)/rate
    if expected['sounds']:
        assert tail>.65,(meta.name,tail)
    assert record['pass'],meta.name
    results.append({'file':meta.stem+'.wav','pass':True,'sounds':len(groups),'onsets_seconds':onsets,'gaps_seconds':gaps,'trailing_silence_seconds':tail if len(audio) else None,'duration_seconds':len(audio)/rate,'actual_pcm_analyzed':bool(len(audio)),'no_audio_source_started':not record['audio']['events']})
(P/'verificare/analiza_audio.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for source,target in [('p2_secret_1','exemplu_cod_secret'),('p4_sapte_1','exemplu_salut_secret')]:
    row=next(r for r in results if r['file']==source+'.wav')
    with wave.open(str(A/(source+'.wav')),'rb') as w:
        params=w.getparams();frames=w.readframes(w.getnframes())
    start=max(0,int((row['onsets_seconds'][0]-.25)*params.framerate));end=min(params.nframes,int((row['onsets_seconds'][-1]+1)*params.framerate))
    with wave.open(str(A/(target+'.wav')),'wb') as w:
        w.setparams(params);w.writeframes(frames[start*2:end*2])
print('PASS: actual PCM bursts and gaps in',len(results),'browser recordings; two listening examples trimmed from recordings.')

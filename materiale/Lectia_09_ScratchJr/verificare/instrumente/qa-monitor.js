// Test-only audio observation. Original application and lesson programs are unchanged.
// Every real connection to the speaker destination is additionally tapped into a
// silent recorder. Original connections remain in place; the recorder outputs zeros.
(() => {
  const nativeConnect=AudioNode.prototype.connect;
  const nativeStart=AudioBufferSourceNode.prototype.start;
  const taps=new WeakMap(); const contexts=new Set();
  let stageHistory=[], lastStage="", capturing=false, chunks=[], events=[], rate=48000, started=0, stopped=0;
  const getTap=ctx=>{
    if(taps.has(ctx))return taps.get(ctx);
    const tap=ctx.createGain(), recorder=ctx.createScriptProcessor(1024,2,1);
    taps.set(ctx,tap);contexts.add(ctx);
    nativeConnect.call(tap,recorder);nativeConnect.call(recorder,ctx.destination);
    recorder.onaudioprocess=e=>{
      if(!capturing)return;
      const input=e.inputBuffer, out=new Float32Array(input.length);
      for(let ch=0;ch<input.numberOfChannels;ch++){
        const a=input.getChannelData(ch);
        for(let i=0;i<out.length;i++)out[i]+=a[i]/input.numberOfChannels;
      }
      rate=input.sampleRate;chunks.push(out);
    };
    return tap;
  };
  AudioNode.prototype.connect=function(...args){
    const result=nativeConnect.apply(this,args);
    if(args[0] instanceof AudioDestinationNode)nativeConnect.call(this,getTap(this.context));
    return result;
  };
  AudioBufferSourceNode.prototype.start=function(...args){
    if(capturing){
      const b=this.buffer;let peak=0;
      if(b){const a=b.getChannelData(0);for(let i=0;i<a.length;i++)peak=Math.max(peak,Math.abs(a[i]));}
      events.push({at_ms:performance.now()-started,contextTime:this.context.currentTime,state:this.context.state,duration:b?.duration,frames:b?.length,sampleRate:b?.sampleRate,peak});
    }
    return nativeStart.apply(this,args);
  };
  function wav(){
    const n=chunks.reduce((sum,a)=>sum+a.length,0), buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
    const str=(at,s)=>{for(let i=0;i<s.length;i++)v.setUint8(at+i,s.charCodeAt(i));};
    str(0,'RIFF');v.setUint32(4,36+n*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,n*2,true);
    let k=44;for(const a of chunks)for(const s of a){v.setInt16(k,Math.round(Math.max(-1,Math.min(1,s))*32767),true);k+=2;}
    return new Blob([buf],{type:'audio/wav'});
  }
  function sampleStage(){
    const page=[...document.querySelectorAll('.stagepage')].find(n=>getComputedStyle(n).visibility==='visible');
    const state={page:page?.id,go:document.getElementById('go')?.className,sprites:page?[...page.children].filter(n=>n.id).map(n=>({id:n.id,transform:n.style.transform,opacity:Number(n.style.opacity||1),visibility:n.style.visibility})):[]};
    const key=JSON.stringify(state);
    if(key!==lastStage){stageHistory.push({t:performance.now()-started,...state});lastStage=key;}
  }
  setInterval(()=>{if(capturing)sampleStage();},20);
  document.addEventListener('DOMContentLoaded',()=>{
    const panel=document.createElement('aside');panel.id='qa-audio';
    panel.style.cssText='position:fixed;right:8px;top:305px;width:142px;z-index:99999;background:#fff;border:2px solid #176b55;border-radius:8px;padding:5px;font:12px Arial;color:#173e3a';
    panel.innerHTML='<strong>Lesson 9 QA</strong><br><button id="qa-start">Start capture</button><button id="qa-stop">Stop capture</button><br><a id="qa-wav" download="browser-audio.wav">Download WAV</a><details><summary>Audio evidence</summary><pre id="qa-result" style="max-height:130px;overflow:auto;white-space:pre-wrap"></pre></details><div id="qa-status">Ready</div>';
    document.body.append(panel);
    document.getElementById('qa-start').onclick=()=>{chunks=[];events=[];stageHistory=[];lastStage='';started=performance.now();capturing=true;sampleStage();document.getElementById('qa-status').textContent='Recording';};
    document.getElementById('qa-stop').onclick=()=>{
      capturing=false;stopped=performance.now();
      let peak=0;for(const a of chunks)for(const s of a)peak=Math.max(peak,Math.abs(s));
      sampleStage();const result={stageHistory,duration_ms:stopped-started,sampleRate:rate,frames:chunks.reduce((s,a)=>s+a.length,0),peak,contexts:[...contexts].map(c=>({state:c.state,sampleRate:c.sampleRate})),events};
      document.getElementById('qa-result').textContent=JSON.stringify(result);
      document.getElementById('qa-status').textContent=events.length+' sources; peak '+peak.toFixed(3);
      const a=document.getElementById('qa-wav');if(a.href.startsWith('blob:'))URL.revokeObjectURL(a.href);a.href=URL.createObjectURL(wav());
    };
  });
})();

(function(root){
  'use strict';
  const clone=o=>JSON.parse(JSON.stringify(o));
  const BLOCKS={right:{label:'Dreapta',icon:'→',color:'motion',value:1,min:0,max:10},left:{label:'Stânga',icon:'←',color:'motion',value:1,min:0,max:10},jump:{label:'Salt',icon:'↟',color:'motion',value:1,min:1,max:3},grow:{label:'Mărește',icon:'↗',color:'looks',value:1,min:1,max:3},shrink:{label:'Micșorează',icon:'↙',color:'looks',value:1,min:1,max:3},hide:{label:'Ascunde',icon:'◌',color:'looks'},show:{label:'Arată',icon:'●',color:'looks'},pop:{label:'Pop',icon:'♪',color:'sound'},wait:{label:'Așteaptă',icon:'⌛',color:'control',value:10,min:1,max:10},repeat:{label:'Repetă',icon:'↻',color:'control',value:3,min:1,max:5},send:{label:'Trimite',icon:'✉',color:'start',value:'orange',options:{orange:'Portocaliu',blue:'Albastru'}},page:{label:'Pagina',icon:'▣',color:'end',value:'beach',options:{park:'Parc',beach:'Plajă',night:'Noapte'}},stop:{label:'Oprește',icon:'■',color:'control'},forever:{label:'Mereu',icon:'∞',color:'end'}};
  function initial(scene){return {page:'park',actors:Object.fromEntries((scene.actors||[]).map(a=>[a.id,{...clone(a),scale:1,jump:0,dancing:false}])),sounds:0,soundTicks:[],tick:0,peakAnimals:(scene.actors||[]).filter(a=>a.group==='animals'&&a.visible).length,lastAnimalChange:0,lastPop:-1,contacts:[]};}
  function compile(body,depth=0){
    const ops=[];
    for(const block of body){
      const def=BLOCKS[block.type];if(!def)throw Error('Bloc necunoscut.');
      if(def.min!==undefined&&(!Number.isInteger(block.value)||block.value<def.min||block.value>def.max))throw Error('Valoarea blocului nu este în interval.');
      if(def.options&&!Object.hasOwn(def.options,block.value))throw Error('Alege o valoare din lista blocului.');
      if(block.type==='repeat'){
        if(depth>=1)throw Error('Folosim o singură adâncime de repetiție.');
        if(!block.children?.length)throw Error('Pune cel puțin un bloc în interiorul repetiției.');
        const inner=compile(block.children,depth+1);
        if(inner.some(b=>b.type==='forever'))throw Error('Mereu se pune la sfârșit, în afara repetiției.');
        for(let i=0;i<block.value;i++)ops.push(...inner.map(op=>({...op,repeatId:block.id})));
      }else if(block.type==='right'||block.type==='left'){
        if(block.value===0)ops.push({...block,type:'noop'});else for(let i=0;i<block.value;i++)ops.push({...block,value:1});
      }else if(block.type==='jump')ops.push({...block},{...block,type:'land'});
      else ops.push({...block});
      if(ops.length>160)throw Error('Programul este prea lung pentru o demonstrație.');
    }
    const forever=ops.findIndex(b=>b.type==='forever');
    if(forever>=0&&(forever!==ops.length-1||forever===0))throw Error('Pune Mereu după o acțiune, la sfârșit.');
    return ops;
  }
  function measure(scene,state){
    const actors=Object.values(state.actors);
    if(scene.metric==='position')return state.actors.rabbit.x;
    if(scene.metric==='visible')return actors.filter(a=>a.group===scene.group&&a.visible).length;
    if(scene.metric==='sounds')return state.sounds;
    if(scene.metric==='dancing')return actors.filter(a=>a.group==='animals'&&a.dancing).length;
    if(scene.metric==='page')return state.page;
    if(scene.metric==='grown'){const a=state.actors;return a.rabbit.scale>1&&a.dog.scale>1?'both':a.rabbit.scale>1?'rabbit':a.dog.scale>1?'dog':'none';}
  }
  function contains(programs,type){return Object.values(programs).some(scripts=>scripts.some(s=>JSON.stringify(s.body).includes(`"type":"${type}"`)));}
  function achieved(scene,state,programs){
    if(measure(scene,state)!==scene.target)return false;
    if(scene.require==='repeat'&&!contains(programs,'repeat'))return false;
    if(scene.require==='beach'&&state.page!=='beach')return false;
    if(scene.require==='rhythm'&&!(state.soundTicks.length===3&&state.soundTicks[2]-state.soundTicks[1]>state.soundTicks[1]-state.soundTicks[0]))return false;
    if(scene.require==='final'&&!(state.peakAnimals===7&&state.sounds>=1&&state.lastPop>state.lastAnimalChange))return false;
    return true;
  }
  function simulate(scene,programs,previous,event={type:'flag'}){
    const state=clone(previous||initial(scene)),frames=[],tasks=[],compiled={};let error='',seq=0;
    try{for(const actor of scene.actors||[])compiled[actor.id]=(programs[actor.id]||[]).map(s=>({...s,ops:compile(s.body)}));}catch(e){return{state,frames,error:e.message};}
    const schedule=(actor,scriptIndex,ready)=>{
      const s=compiled[actor.id][scriptIndex];if(!s.ops.length)return;
      if(tasks.some(t=>!t.dead&&t.actor===actor.id&&t.scriptIndex===scriptIndex))return;
      tasks.push({id:++seq,actor:actor.id,scriptIndex,ops:s.ops,pc:0,ready,dead:false});
      if(s.ops.some(op=>op.type==='forever'))actor.dancing=true;
    };
    const trigger=(type,color,id,ready)=>{for(const actor of Object.values(state.actors)){
      if(actor.page!==state.page||(id&&actor.id!==id))continue;
      (compiled[actor.id]||[]).forEach((s,i)=>{if(s.trigger===type&&(type!=='message'||s.color===color))schedule(actor,i,ready);});
    }};
    if(event.type==='tap'&&(!state.actors[event.actor]?.visible||state.actors[event.actor].page!==state.page))return{state,frames,error:'Acest personaj nu este vizibil pe pagina curentă.'};
    trigger(event.type,event.color,event.actor,state.tick);
    const startTick=state.tick,maxTicks=scene.mode==='dance'?60:160;
    let bounded=false;
    for(let tick=startTick;tick<=startTick+maxTicks;tick++){
      state.tick=tick;let changed=false,active=[],pops=0;
      for(const task of [...tasks]){
        if(task.dead||task.ready>tick)continue;
        const actor=state.actors[task.actor];if(actor.page!==state.page){task.dead=true;continue;}
        const op=task.ops[task.pc++];if(!op){task.dead=true;continue;}
        active.push({actor:actor.id,script:task.scriptIndex,block:op.id,repeat:op.repeatId});changed=true;task.ready=tick+4;
        switch(op.type){
          case 'right':case 'left':{const next=actor.x+(op.type==='right'?1:-1);if(next<0||next>10){error='Axa noastră are locuri de la 0 la 10. Schimbă numărul de pași.';break;}actor.x=next;break;}
          case 'jump':actor.jump=op.value;task.ready=tick+3;break;
          case 'land':actor.jump=0;break;
          case 'grow':actor.scale=Math.min(2,actor.scale+op.value*.1);break;
          case 'shrink':actor.scale=Math.max(.4,actor.scale-op.value*.1);break;
          case 'hide':actor.visible=false;break;
          case 'show':actor.visible=true;break;
          case 'pop':if(state.sounds>=10){error='Păstrăm cel mult 10 sunete. Scurtează programul.';break;}state.sounds++;state.soundTicks.push(tick);state.lastPop=tick;pops++;break;
          case 'wait':task.ready=tick+op.value;break;
          case 'send':trigger('message',op.value,null,tick+1);break;
          case 'stop':tasks.filter(t=>t.actor===actor.id).forEach(t=>t.dead=true);actor.dancing=false;actor.jump=0;break;
          case 'forever':task.pc=0;break;
          case 'page':state.page=op.value;tasks.forEach(t=>t.dead=true);Object.values(state.actors).forEach(a=>{a.dancing=false;a.jump=0;});trigger('flag',null,null,tick+1);break;
        }
        if(task.pc>=task.ops.length)task.dead=true;
        if(error)break;
      }
      const contacts=[],visible=Object.values(state.actors).filter(a=>a.visible&&a.page===state.page);
      for(let i=0;i<visible.length;i++)for(let j=i+1;j<visible.length;j++){
        const a=visible[i],b=visible[j];if(a.group==='controls'||b.group==='controls'||Math.abs(a.x-b.x)>.2)continue;
        const key=[a.id,b.id].sort().join(':');contacts.push(key);
        if(!state.contacts.includes(key)){trigger('bump',null,a.id,tick+1);trigger('bump',null,b.id,tick+1);}
      }
      state.contacts=contacts;
      const animals=Object.values(state.actors).filter(a=>a.group==='animals'&&a.visible).length;
      if(changed){const prior=frames.at(-1)?.state||previous||initial(scene),before=Object.values(prior.actors).filter(a=>a.group==='animals'&&a.visible).length;if(animals!==before)state.lastAnimalChange=tick;state.peakAnimals=Math.max(state.peakAnimals,animals);frames.push({state:clone(state),active,pops,tick});}
      if(error||!tasks.some(t=>!t.dead))break;
      if(tick===startTick+maxTicks)bounded=true;
    }
    if(bounded&&!tasks.some(t=>!t.dead&&t.ops.some(op=>op.type==='forever')))error='Programul durează prea mult. Folosește mai puține repetări.';
    return{state,frames,error,bounded,achieved:!error&&achieved(scene,state,programs)};
  }
  const api={BLOCKS,clone,initial,compile,measure,achieved,simulate};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.CodingEngine=api;
}(typeof window!=='undefined'?window:globalThis));

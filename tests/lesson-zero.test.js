const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const scenes=require('../scratchjr/lectia-0/lesson');
const E=require('../scratchjr/lectia-0/engine');
const find=id=>scenes.find(s=>s.id===id);
const block=(type,value,id=type)=>({id,type,value});
test('all twelve coding activities have executable solutions and reach their targets',()=>{
  assert.deepEqual(scenes.filter(s=>s.number).map(s=>s.number),[1,2,3,4,5,6,7,8,9,10]);
  assert.equal(scenes.filter(s=>s.actors).length,12);
  for(const scene of scenes.filter(s=>s.actors)){
    let r=E.simulate(scene,scene.solution);
    if(scene.id==='lant')for(const actor of ['butterfly','dog','ball'])r=E.simulate(scene,scene.solution,r.state,{type:'tap',actor});
    assert.equal(r.error,'',scene.id);assert.equal(r.achieved,true,scene.id);assert.equal(E.measure(scene,r.state),scene.target);
    for(const f of r.frames)for(const actor of Object.values(f.state.actors))assert.ok(actor.x>=0&&actor.x<=10);
  }
});
test('movement values and repeat bodies determine the result, rather than a canned animation',()=>{
  const scene=find('pasi'),p=E.clone(scene.solution);p.rabbit[0].body[0].value=4;
  const r=E.simulate(scene,p);assert.equal(r.state.actors.rabbit.x,7);assert.equal(r.achieved,false);
  const loop=find('repetam'),q=E.clone(loop.solution);q.rabbit[0].body[0].value=2;
  assert.equal(E.simulate(loop,q).state.actors.rabbit.x,4);
  q.rabbit[0].body[0].children=[];assert.match(E.simulate(loop,q).error,/interiorul/);
});
test('order changes visibility and page changes terminate old-page programs',()=>{
  const magic=find('magie'),p=E.clone(magic.starter);
  p.ball1[0].body=[block('hide'),block('show')];assert.equal(E.measure(magic,E.simulate(magic,p).state),7);
  p.ball1[0].body.reverse();assert.equal(E.measure(magic,E.simulate(magic,p).state),6);
  const page=find('usa'),q=E.clone(page.solution);q.rabbit[0].body.reverse();const r=E.simulate(page,q);
  assert.equal(r.state.page,'beach');assert.equal(r.state.actors.rabbit.x,3);assert.equal(r.achieved,false);
});
test('messages run the matching receiver, and editable receiver colors alter routing',()=>{
  const scene=find('plic'),p=E.clone(scene.solution);p.butterfly[0].body[0].value='blue';
  assert.equal(E.measure(scene,E.simulate(scene,p).state),'rabbit');
  p.dog[0].color='blue';assert.equal(E.measure(scene,E.simulate(scene,p).state),'both');
});
test('contact scripts execute on collision and their edits affect collection',()=>{
  const s=find('comori'),p=E.clone(s.solution);p.rabbit[0].body[0].value=2;
  assert.equal(E.measure(s,E.simulate(s,p).state),8);
  p.ball1[0].body=[];assert.equal(E.measure(s,E.simulate(s,p).state),9);
});
test('sound counts, pause order, and final sequence are verified from execution',()=>{
  const s=find('ritm'),p=E.clone(s.solution);const [a,b,wait,c]=p.rabbit[0].body;p.rabbit[0].body=[a,wait,b,c];
  const r=E.simulate(s,p);assert.equal(r.state.sounds,3);assert.equal(r.achieved,false);
  const final=find('finala'),q=E.clone(final.solution);q.ball[0].body=[block('send','blue'),block('wait',10),block('send','orange'),block('wait',5),block('pop')];
  assert.equal(E.simulate(final,q).achieved,false);
});
test('stop cancels the selected character routines and hidden characters cannot be clicked',()=>{
  const s=find('statui'),r=E.simulate(s,s.solution);assert.equal(E.measure(s,r.state),2);assert.equal(r.bounded,true);
  const waiting=E.clone(s.solution);waiting.dancer5[0].body=[block('wait',1),block('forever')];
  assert.equal(E.measure(s,E.simulate(s,waiting).state),1,'a repeating wait must not animate or count as dancing');
  const chain=find('lant');assert.match(E.simulate(chain,chain.solution,undefined,{type:'tap',actor:'dog'}).error,/vizibil/);
});
test('range and finite preview limits protect the maths and presentation',()=>{
  const s=find('pasi'),p=E.clone(s.solution);p.rabbit[0].body[0].value=10;assert.match(E.simulate(s,p).error,/0 la 10/);
  p.rabbit[0].body=[block('forever')];assert.match(E.simulate(s,p).error,/după o acțiune/);
  p.rabbit[0].body=[{id:'r',type:'repeat',value:5,children:[block('pop','', 'a'),block('pop','', 'b'),block('pop','', 'c')]}];assert.match(E.simulate(s,p).error,/10 sunete/);
});
const base=path.join(__dirname,'../scratchjr/lectia-0');
function open(id='pasi'){
  const dom=new JSDOM(fs.readFileSync(path.join(base,'index.html'),'utf8'),{runScripts:'outside-only',url:`https://example.test/Pregatitoare1/scratchjr/lectia-0/?scena=${id}`}),w=dom.window,doc=w.document;
  let serial=0;const pending=new Map();w.setTimeout=fn=>{pending.set(++serial,fn);return serial;};w.clearTimeout=id=>pending.delete(id);
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.Audio=class{addEventListener(){}play(){return Promise.reject(Error('muted'));}pause(){}};
  for(const f of ['lesson.js','engine.js','app.js'])w.eval(fs.readFileSync(path.join(base,f),'utf8'));
  const click=selector=>doc.querySelector(selector).click(),select=(selector,value)=>{const el=doc.querySelector(selector);el.value=String(value);el.dispatchEvent(new w.Event('change',{bubbles:true}));};
  const drain=async()=>{for(let n=0;n<250&&pending.size;n++){const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn());await Promise.resolve();await Promise.resolve();}assert.equal(pending.size,0);};
  return{dom,w,doc,click,select,drain,pending};
}
test('editor edits invalidate predictions, execute new values, and undo restores code',async()=>{
  const t=open();t.click('[data-type=right]');t.select('.block-value',2);t.select('#prediction',5);t.click('#run');await t.drain();
  assert.match(t.doc.querySelector('#feedback').textContent,/Ținta reușită.*5/);
  t.select('.block-value',4);assert.equal(t.doc.querySelector('#prediction').value,'');assert.ok(t.doc.querySelector('#next').disabled);
  t.select('#prediction',7);t.click('#run');await t.drain();assert.match(t.doc.querySelector('#feedback').textContent,/Rezultat: 7/);assert.ok(t.doc.querySelector('#next').disabled);
  t.click('#undo');assert.equal(t.doc.querySelector('.block-value').value,'2');t.dom.window.close();
});
test('reorder, delete, repeat insertion and undo manipulate the executable tree',()=>{
  const t=open('repetam');t.click('[data-type=repeat]');t.click('[data-type=right]');assert.equal(t.doc.querySelectorAll('.repeat-block .code-block').length,1);
  t.click('#delete');assert.equal(t.doc.querySelectorAll('.repeat-block .code-block').length,0);t.click('#undo');assert.equal(t.doc.querySelectorAll('.repeat-block .code-block').length,1);
  t.click('#clear');t.click('[data-type=left]');t.click('[data-type=right]');t.click('#move-left');assert.equal(t.doc.querySelector('.block-handle').textContent,'→ Dreapta');t.dom.window.close();
});
test('stop and navigation cancel pending frames; reset and revisits preserve programs',async()=>{
  const t=open();t.click('[data-type=right]');t.select('.block-value',4);t.select('#prediction',7);t.click('#run');assert.ok(t.pending.size);t.click('#stop');await t.drain();assert.match(t.doc.querySelector('#feedback').textContent,/Oprit/);
  t.click('#reset');assert.equal(t.doc.querySelector('.block-value').value,'4');t.click('#run');t.click('#contents');t.doc.querySelectorAll('#scene-list button')[2].click();await t.drain();assert.match(t.doc.querySelector('h1').textContent,/O idee/);
  t.click('#previous');assert.equal(t.doc.querySelector('.block-value').value,'4');t.dom.window.close();
});
test('a wrong prediction does not hide a successful coding result; muted audio still works',async()=>{
  const t=open('ritm');t.click('#contents');t.click('#example');t.select('#prediction',2);t.click('#run');await t.drain();assert.match(t.doc.querySelector('#feedback').textContent,/Ținta reușită.*Am prezis 2.*3/);assert.equal(t.doc.querySelector('#next').disabled,false);t.dom.window.close();
});
test('invalid links open the introduction, and the keyboard does not act behind a dialog',()=>{
  const t=open('invalid');assert.match(t.doc.querySelector('h1').textContent,/Laboratorul/);t.click('#contents');t.doc.dispatchEvent(new t.w.KeyboardEvent('keydown',{key:'ArrowRight'}));assert.match(t.doc.querySelector('h1').textContent,/Laboratorul/);t.dom.window.close();
});

const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const scenes = require('../scratchjr/lectia-0/lesson');
const base = path.join(__dirname,'../scratchjr/lectia-0');
function open(id='pasi') {
  const dom = new JSDOM(fs.readFileSync(path.join(base,'index.html'),'utf8'),{runScripts:'outside-only',url:`https://example.test/Pregatitoare1/scratchjr/lectia-0/?scena=${id}`});
  const w=dom.window;
  let serial=0; const pending=new Map();
  w.setTimeout=fn=>{pending.set(++serial,fn);return serial;}; w.clearTimeout=id=>pending.delete(id);
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  w.Audio=class{addEventListener(){} play(){return Promise.reject(new Error('muted'));} pause(){}};
  w.eval(fs.readFileSync(path.join(base,'lesson.js'),'utf8'));
  w.eval(fs.readFileSync(path.join(base,'app.js'),'utf8'));
  const doc=w.document, click=id=>doc.getElementById(id).click();
  const answer=value=>[...doc.querySelectorAll('#answers button')].find(b=>b.textContent===String(value)).click();
  const drain=async()=>{for(let n=0;n<80&&pending.size;n++){const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn());await Promise.resolve();await Promise.resolve();}assert.equal(pending.size,0);};
  return {dom,w,doc,click,answer,drain,pending};
}
test('Lesson 0 has ten ordered ideas, two backups, and valid maths entirely within 0–10',()=>{
  assert.deepEqual(scenes.filter(s=>s.number).map(s=>s.number),[1,2,3,4,5,6,7,8,9,10]);
  assert.equal(scenes.filter(s=>s.id.startsWith('rezerva')).length,2);
  assert.equal(new Set(scenes.map(s=>s.id)).size,scenes.length);
  for(const s of scenes.filter(s=>s.choices)){
    assert.equal(s.choices.filter(c=>c===s.answer).length,1);
    if(!s.math)continue;
    assert.ok(s.choices.every(c=>c>=0&&c<=10));
    let value=s.math[0];
    for(let i=1;i<s.math.length;i++){value+=s.operation==='−'||s.operation==='+−'&&i===2?-s.math[i]:s.math[i];assert.ok(value>=0&&value<=10,s.id);}
    assert.equal(s.operation==='missing'?s.math[1]:value,s.answer,s.id);
    if(s.operation==='missing')assert.equal(value,10);
  }
});
test('wrong answers retry; correct answers require a finished demonstration before advancing',async()=>{
  const t=open();
  assert.ok(t.doc.querySelector('#next').disabled);
  t.answer(4);assert.ok(t.doc.querySelector('#next').disabled);assert.ok(t.doc.querySelector('#demo').disabled);
  t.answer(5);assert.ok(t.doc.querySelector('#next').disabled);assert.equal(t.doc.querySelector('#demo').disabled,false);
  t.click('demo');assert.ok(t.doc.querySelector('#next').disabled);await t.drain();
  assert.equal(t.doc.querySelector('[data-number="5"]').className,'lit');
  assert.equal(t.doc.querySelector('#next').disabled,false);
  assert.equal(t.doc.querySelector('h1').textContent,'Pași care se adună');
  t.dom.window.close();
});
test('all demos produce the expected visible result, including zero and ten',async()=>{
  for(const s of scenes.filter(s=>s.choices&&s.mode!=='chain')){
    const t=open(s.id);t.answer(s.answer);t.click('demo');await t.drain();
    assert.equal(t.doc.querySelector('#demo').disabled,false,s.id);
    if(s.mode==='hide'||s.mode==='collect')assert.equal(t.doc.querySelectorAll('.object:not(.gone)').length,s.answer);
    if(s.mode==='missing')assert.equal(t.doc.querySelectorAll('.object img').length,10);
    if(s.mode==='freeze')assert.equal(t.doc.querySelectorAll('.dancing').length,2);
    if(s.mode==='final'){assert.equal(t.doc.querySelectorAll('.final-animals .sprite:not(.leaving)').length,5);assert.ok(t.doc.querySelector('#return-show'));}
    t.dom.window.close();
  }
});
test('hidden discoveries cannot advance the chain; each revealed character is required',()=>{
  const t=open('lant');t.answer('Fluturele');t.click('demo');
  t.click('chain-2');assert.ok(t.doc.querySelector('#next').disabled);assert.ok(t.doc.querySelector('#chain-1').disabled);
  t.click('chain-0');assert.equal(t.doc.querySelector('#chain-1').disabled,false);
  t.click('chain-1');assert.equal(t.doc.querySelector('#chain-2').disabled,false);
  t.click('chain-2');assert.equal(t.doc.querySelector('#next').disabled,false);assert.equal(t.doc.querySelector('#stage').className,'night');
  t.dom.window.close();
});
test('reset and teacher navigation cancel pending animation callbacks',async()=>{
  const t=open('finala');t.answer(5);t.click('demo');assert.ok(t.pending.size);
  t.click('reset');await t.drain();assert.ok(t.doc.querySelector('#next').disabled);assert.equal(t.doc.querySelector('#return-show'),null);
  t.answer(5);t.click('demo');t.click('contents');t.doc.querySelectorAll('#scene-list button')[1].click();await t.drain();
  assert.equal(t.doc.querySelector('h1').textContent,'Pași care se adună');assert.equal(t.doc.querySelector('#return-show'),null);assert.ok(t.doc.querySelector('#next').disabled);
  t.dom.window.close();
});
test('keyboard respects answer gates and does not navigate behind an open teacher menu',()=>{
  const t=open();const key=k=>t.doc.dispatchEvent(new t.w.KeyboardEvent('keydown',{key:k}));
  key('ArrowRight');assert.equal(t.doc.querySelector('h1').textContent,'Pași care se adună');
  t.click('contents');key('ArrowLeft');assert.equal(t.doc.querySelector('h1').textContent,'Pași care se adună');
  t.click('skip');assert.equal(t.doc.querySelector('h1').textContent,'Încă o dată!');assert.equal(t.doc.querySelector('#menu').open,false);
  t.dom.window.close();
});
test('an invalid deep link opens the introduction safely',()=>{
  const t=open('not-a-scene');assert.equal(t.doc.querySelector('h1').textContent,'Laboratorul surprizelor');t.dom.window.close();
});

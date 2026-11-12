const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'materiale/Lectia_00_ScratchJr/lesson.json'),'utf8'));

test('Lesson 0 directs teachers to ScratchJr and native downloadable projects',()=>{
  const doc=new JSDOM(fs.readFileSync(path.join(root,'scratchjr/lectia-0/index.html'),'utf8')).window.document;
  assert.equal(doc.querySelector('#workspace'),null);
  assert.equal(doc.querySelectorAll('script').length,0);
  assert.ok(doc.querySelector('a[href="https://richiesamlie.github.io/ScratchJr-Desktop-Reborn/play/"]'));
  for(const project of data.projects){
    assert.ok([...doc.querySelectorAll('a[download]')].some(a=>a.href.endsWith(project.path)),project.path);
    const bytes=fs.readFileSync(path.join(root,'materiale/Lectia_00_ScratchJr',project.path));
    assert.equal(bytes.subarray(0,4).toString('hex'),'504b0304');
  }
});

test('the construction copy preserves support programs and leaves only chosen tasks empty',()=>{
  const full=data.projects[0],starter=data.projects[1];
  for(let i=0;i<4;i++){
    const expected=structuredClone(full.pages[i]);
    for(const [id,index] of expected.build){
      const target=expected.sprites.find(s=>s.id===id);
      assert.ok(target.scripts[index].actions.length>0);
      target.scripts[index].actions=[];
    }
    assert.deepEqual(starter.pages[i],expected);
  }
});

test('native pages have valid destinations and all message receivers use a sent color',()=>{
  const flatten=items=>items.flatMap(b=>b.body?flatten(b.body):[b]);
  for(const project of data.projects){
    assert.ok(project.pages.length<=4);
    for(const page of project.pages){
      const sent=new Set(page.sprites.flatMap(s=>s.scripts.flatMap(sc=>flatten(sc.actions))).filter(b=>b.block==='message').map(b=>b.value));
      for(const sprite of page.sprites)for(const sc of sprite.scripts){
        for(const b of flatten(sc.actions))if(b.block==='gotopage')assert.ok(b.value>=1&&b.value<=project.pages.length);
        if(project!==data.projects[1]&&sc.trigger.block==='onmessage')assert.ok(sent.has(sc.trigger.value));
      }
    }
  }
});

test('the lesson, construction copy and five reserves use only bundled ScratchJr assets',()=>{
  const bundled=['Rabbit','Chicken','Dog','Duck','Bird','House3','Fence','Table','Tree1','Apple','Thundercloud','Sun'];
  assert.equal(data.projects.length,7);
  for(const project of data.projects)for(const page of project.pages){
    assert.equal(page.background,'Park.svg');
    for(const sprite of page.sprites)assert.ok(bundled.includes(sprite.asset.replace('.svg','')),sprite.asset);
  }
});

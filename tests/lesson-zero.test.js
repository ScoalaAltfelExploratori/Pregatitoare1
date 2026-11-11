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

test('story scenes use a completion message to reveal their guide, without answer quizzes',()=>{
  const pages=data.projects[0].pages;assert.equal(pages.length,4);
  for(let i=0;i<pages.length;i++){
    assert.equal(pages[i].sprites.filter(s=>s.id.startsWith('raspuns')).length,0);
    const guide=pages[i].sprites.find(s=>s.id==='ghid');
    assert.equal(guide.shown,false);
    assert.ok(guide.scripts.some(s=>s.trigger.block==='onmessage'&&s.actions.some(a=>a.block==='show')));
    const exits=guide.scripts.flatMap(sc=>sc.actions.filter(a=>a.block==='gotopage'));
    assert.deepEqual(exits,[{block:'gotopage',value:i===3?1:i+2}]);
  }
});

test('the construction copy leaves main scripts empty and keeps supporting characters',()=>{
  const full=data.projects[0],starter=data.projects[1];
  for(let i=0;i<4;i++){
    assert.equal(starter.pages[i].sprites[0].scripts[0].trigger.block,'onclick');
    assert.deepEqual(starter.pages[i].sprites[0].scripts[0].actions,[]);
    assert.deepEqual(starter.pages[i].sprites.slice(1),full.pages[i].sprites.slice(1));
  }
});

test('all four projects use only bundled ScratchJr characters and backgrounds',()=>{
  assert.equal(data.projects.length,4);
  for(const project of data.projects){
    assert.ok(project.pages.length<=4);
    for(const page of project.pages){
      assert.ok(['Park.svg','Theatre.svg'].includes(page.background));
      for(const sprite of page.sprites)assert.ok(['Rabbit.svg','Dog.svg','Ball.svg','Butterfly.svg'].includes(sprite.asset));
    }
  }
});

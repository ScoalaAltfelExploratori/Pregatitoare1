const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const getRoboURL = require('../legacy-links');
const root = path.join(__dirname, '..');
const site = 'https://example.test/Pregatitoare1/';
const open = file => new JSDOM(fs.readFileSync(path.join(root, file), 'utf8'), { url: new URL(file, site).href });

test('the home menu separates ScratchJr, original Robo and home adventures', () => {
  const dom = open('index.html'), doc = dom.window.document;
  const links = [...doc.querySelectorAll('main a')].map(a => a.href);
  for (const target of ['scratchjr/index.html', 'robo/index.html', 'robo/index.html?adventure=home']) {
    assert.ok(links.includes(new URL(target, site).href), target);
  }
  assert.equal(doc.querySelector('#game-view'), null);
  dom.window.close();
});

test('all ten course entries lead to their own lesson and downloadable materials', () => {
  const dom = open('scratchjr/index.html'), cards = [...dom.window.document.querySelectorAll('.lesson-card')];
  assert.equal(cards.length, 10);
  for (let i = 0; i < cards.length; i++) {
    const n = i + 1, stem = `materiale/Lectia_${String(n).padStart(2, '0')}_ScratchJr`;
    const link = cards[i].querySelector('.lesson-open');
    assert.equal(link.href, new URL(stem + '/index.html', site).href);
    const lesson = open(stem + '/index.html'), doc = lesson.window.document;
    assert.equal(doc.querySelector('.lesson-pager [rel=prev]')?.getAttribute('href'), n > 1 ? `../Lectia_${String(n-1).padStart(2, '0')}_ScratchJr/index.html` : undefined);
    assert.equal(doc.querySelector('.lesson-pager [rel=next]')?.getAttribute('href'), n < 10 ? `../Lectia_${String(n+1).padStart(2, '0')}_ScratchJr/index.html` : undefined);
    assert.ok([...doc.querySelectorAll('.lesson-pager a')].some(a => a.href === new URL('scratchjr/index.html', site).href));
    assert.equal(cards[i].querySelectorAll('.resources a').length, 3);
    lesson.window.close();
  }
  dom.window.close();
});

test('older lesson and home URLs preserve their choices under GitHub Pages and offline', () => {
  for (const base of [site, site + 'index.html', 'file:///C:/course/index.html']) {
    for (const suffix of ['?lesson=8&variant=2', '?adventure=home', '?lesson=22', '?variant=2', '#joaca']) {
      const target = new URL(getRoboURL(base + suffix));
      assert.equal(target.href, new URL('robo/index.html' + suffix, base).href);
    }
    assert.equal(getRoboURL(base), null);
    assert.equal(getRoboURL(base + '?utm_source=school'), null);
  }
});

test('Robo assets and diploma dependencies resolve from the separated section', () => {
  const dom = open('robo/index.html'), doc = dom.window.document;
  assert.ok(doc.querySelector('#game-view'));
  assert.equal(doc.baseURI, site);
  for (const resource of ['app.js', 'style.css', 'assets/diploma-template.js', 'assets/vendor/jspdf.umd.min.js']) {
    assert.equal(new URL(resource, doc.baseURI).href, site + resource);
    assert.ok(fs.existsSync(path.join(root, resource)), resource);
  }
  dom.window.close();
});

test('every reachable local page, document, image and download exists with exact filename case', () => {
  const queue = ['index.html'], seen = new Set();
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const source = fs.readFileSync(path.join(root, file), 'utf8'), url = new URL(file, site);
    let refs = [], dom;
    if (file.endsWith('.html')) {
      dom = new JSDOM(source, { url: url.href });
      refs = [...dom.window.document.querySelectorAll('a[href],link[href],script[src],img[src],audio[src],source[src]')].map(el => ({ ref: el.getAttribute('href') || el.getAttribute('src'), base: dom.window.document.baseURI }));
    } else {
      refs = [...source.matchAll(/\]\(([^)]+)\)/g)].map(m => ({ ref: m[1], base: url.href }));
    }
    for (const { ref, base } of refs) {
      if (!ref || /^(?:data:|mailto:|javascript:|#)/.test(ref)) continue;
      const target = new URL(ref, base);
      if (target.origin !== url.origin) continue;
      assert.ok(target.pathname.startsWith('/Pregatitoare1/'), `${file}: link escapes the website: ${ref}`);
      let relative = decodeURIComponent(target.pathname.slice('/Pregatitoare1/'.length));
      if (!relative || relative.endsWith('/')) relative += 'index.html';
      let directory = root;
      for (const segment of relative.split('/')) {
        assert.ok(fs.readdirSync(directory).includes(segment), `${file}: missing or incorrect case: ${ref}`);
        directory = path.join(directory, segment);
      }
      assert.ok(fs.statSync(directory).isFile(), `${file}: ${ref} is not a file`);
      if (/\.(html|md)$/i.test(relative) && !seen.has(relative)) queue.push(relative);
    }
    dom?.window.close();
  }
  for (let n = 1; n <= 10; n++) assert.ok(seen.has(`materiale/Lectia_${String(n).padStart(2, '0')}_ScratchJr/index.html`));
  assert.ok(seen.has('robo/index.html'));
});

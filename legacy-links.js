(function (root) {
  'use strict';
  function getRoboURL(input) {
    const current = new URL(input);
    const legacy = ['lesson', 'variant', 'adventure'].some(key => current.searchParams.has(key));
    if (!legacy && current.hash !== '#joaca') return null;
    const target = new URL('robo/index.html', current);
    target.search = current.search;
    target.hash = current.hash;
    return target.href;
  }
  if (typeof module === 'object' && module.exports) module.exports = getRoboURL;
  else {
    const target = getRoboURL(root.location.href);
    if (target) root.location.replace(target);
  }
})(typeof window === 'undefined' ? globalThis : window);

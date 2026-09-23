/*! Raisd abbreviation hover tooltips — loads glossary.json */
(function () {
  'use strict';

  function glossaryUrl() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('abbr-tooltips.js') !== -1) {
        return src.replace(/abbr-tooltips\.js(?:\?.*)?$/, 'glossary.json');
      }
    }
    return 'glossary.json';
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  // Longer keys first so "LUCT CMS" / "CAP-53" / "SDD-15" beat shorter tokens
  function sortedKeys(dict) {
    return Object.keys(dict).sort(function (a, b) {
      return b.length - a.length || a.localeCompare(b);
    });
  }

  function buildRegex(keys) {
    var parts = keys.map(function (k) {
      return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    // Word-ish boundaries: avoid matching inside longer tokens already handled by length sort
    return new RegExp('\\b(' + parts.join('|') + ')\\b', 'g');
  }

  var SKIP = { SCRIPT:1, STYLE:1, TEXTAREA:1, CODE:1, PRE:1, KBD:1, SAMP:1 };

  function shouldSkip(node) {
    var el = node.parentElement;
    while (el) {
      if (SKIP[el.tagName]) return true;
      if (el.classList && el.classList.contains('mermaid')) return true;
      if (el.getAttribute && el.getAttribute('data-no-abbr') != null) return true;
      // already wrapped
      if (el.tagName === 'ABBR' && el.classList.contains('raisd-abbr')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function enhanceElement(el, title) {
    if (!title) return;
    if (!el.getAttribute('title')) el.setAttribute('title', title);
    el.classList.add('raisd-abbr');
    if (el.tagName === 'A' || el.tagName === 'ABBR') {
      el.setAttribute('aria-label', el.textContent.trim() + ' — ' + title);
    }
  }

  function wrapTextNode(textNode, re, dict) {
    var text = textNode.nodeValue;
    if (!text || !re.test(text)) return;
    re.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var key = m[1];
      var abbr = document.createElement('abbr');
      abbr.className = 'raisd-abbr';
      abbr.textContent = key;
      abbr.setAttribute('title', dict[key]);
      frag.appendChild(abbr);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    textNode.parentNode.replaceChild(frag, textNode);
  }

  function walk(root, re, dict) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      if (shouldSkip(n)) return;
      if (!n.nodeValue || !/\S/.test(n.nodeValue)) return;
      wrapTextNode(n, re, dict);
    });
  }

  function annotateExisting(root, dict) {
    root.querySelectorAll('a, abbr, strong, th, h1, h2, h3, span.chip').forEach(function (el) {
      var t = (el.childNodes.length === 1 && el.firstChild.nodeType === 3)
        ? el.textContent.trim()
        : null;
      // Also match when element text is exactly a key or starts with key + punctuation
      if (!t) return;
      if (dict[t]) {
        enhanceElement(el, dict[t]);
        return;
      }
      var m = t.match(/^(CAP-\d{2}|M[1-5]|SDD-\d{2}|ADR-\d+)\b/);
      if (m && dict[m[1]]) enhanceElement(el, dict[m[1]]);
    });
  }

  function apply(dict) {
    var keys = sortedKeys(dict);
    var re = buildRegex(keys);
    annotateExisting(document.body, dict);
    walk(document.body, re, dict);
  }

  fetch(glossaryUrl(), { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(apply)
    .catch(function (err) { console.warn('Raisd abbr tooltips:', err); });
})();

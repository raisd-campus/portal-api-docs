/*! Raisd abbreviation hover tooltips — loads glossary.json
 *  Applies to page copy and rendered Mermaid diagrams (SVG + HTML labels).
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var appliedDict = null;
  var appliedRe = null;
  var observer = null;

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

  function sortedKeys(dict) {
    return Object.keys(dict).sort(function (a, b) {
      return b.length - a.length || a.localeCompare(b);
    });
  }

  function buildRegex(keys) {
    var parts = keys.map(function (k) {
      return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    return new RegExp('\\b(' + parts.join('|') + ')\\b', 'g');
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1, PRE: 1, KBD: 1, SAMP: 1 };

  function isSvgNode(el) {
    return el && el.namespaceURI === SVG_NS;
  }

  function shouldSkip(node) {
    var el = node.parentElement;
    while (el) {
      if (SKIP[el.tagName]) return true;
      // Unrendered Mermaid source only — rendered diagrams become SVG/div
      if (el.tagName === 'PRE' && el.classList && el.classList.contains('mermaid')) {
        return true;
      }
      // Do not wrap SVG text nodes with HTML <abbr>
      if (isSvgNode(el)) return true;
      if (el.getAttribute && el.getAttribute('data-no-abbr') != null) return true;
      if (el.tagName === 'ABBR' && el.classList && el.classList.contains('raisd-abbr')) {
        return true;
      }
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
      if (!t) return;
      if (dict[t]) {
        enhanceElement(el, dict[t]);
        return;
      }
      var m = t.match(/^(CAP-\d{2}|M[1-5]|SDD-\d{2}|ADR-\d+)\b/);
      if (m && dict[m[1]]) enhanceElement(el, dict[m[1]]);
    });
  }

  function titlesForText(text, re, dict) {
    var compact = String(text || '').replace(/\s+/g, ' ').trim();
    if (!compact) return [];
    if (dict[compact]) return [dict[compact]];
    var titles = [];
    var seen = {};
    re.lastIndex = 0;
    var m;
    while ((m = re.exec(compact)) !== null) {
      var key = m[1];
      if (dict[key] && !seen[key]) {
        seen[key] = 1;
        titles.push(dict[key]);
      }
    }
    return titles;
  }

  function setSvgTooltip(el, title) {
    if (!el || !title) return;
    el.setAttribute('title', title);
    el.setAttribute('data-raisd-abbr', '1');
    el.style.cursor = 'help';
    var existing = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      var c = el.childNodes[i];
      if (c.nodeType === 1 && c.tagName && c.tagName.toLowerCase() === 'title' &&
          c.classList && c.classList.contains('raisd-abbr-title')) {
        existing = c;
        break;
      }
    }
    if (!existing) {
      existing = document.createElementNS(SVG_NS, 'title');
      existing.classList.add('raisd-abbr-title');
      el.insertBefore(existing, el.firstChild);
    }
    existing.textContent = title;
  }

  function annotateSvgTree(svg, re, dict) {
    if (!svg || svg.getAttribute('data-raisd-abbr-done') === '1') return;
    svg.setAttribute('data-raisd-abbr-done', '1');

    // HTML labels inside foreignObject (htmlLabels: true)
    svg.querySelectorAll('foreignObject').forEach(function (fo) {
      if (fo.getAttribute('data-raisd-abbr-done') === '1') return;
      fo.setAttribute('data-raisd-abbr-done', '1');
      annotateExisting(fo, dict);
      walk(fo, re, dict);
      // Also title the FO / parent group when the whole label matches
      var titles = titlesForText(fo.textContent, re, dict);
      if (titles.length) {
        var host = fo.closest('g') || fo;
        setSvgTooltip(host, titles.join(' · '));
      }
    });

    // Native SVG text labels
    svg.querySelectorAll('text').forEach(function (textEl) {
      if (textEl.getAttribute('data-raisd-abbr') === '1') return;
      var titles = titlesForText(textEl.textContent, re, dict);
      if (!titles.length) return;
      setSvgTooltip(textEl, titles.join(' · '));
      var host = textEl.closest('g.node, g.edgeLabel, g.cluster, g.label, g.actor, g.messageText, g.loopText, g.note') ||
        textEl.closest('g') || textEl;
      if (host !== textEl && host.getAttribute('data-raisd-abbr') !== '1') {
        setSvgTooltip(host, titles.join(' · '));
      }
    });
  }

  function annotateMermaid(root, re, dict) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('.mermaid svg, svg[id^="mermaid-"]').forEach(function (svg) {
      annotateSvgTree(svg, re, dict);
    });
  }

  function applyAll() {
    if (!appliedDict || !appliedRe) return;
    annotateExisting(document.body, appliedDict);
    walk(document.body, appliedRe, appliedDict);
    annotateMermaid(document.body, appliedRe, appliedDict);
  }

  function watchMermaid() {
    if (observer) return;
    observer = new MutationObserver(function (mutations) {
      var need = false;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n.nodeType !== 1) continue;
            if (n.tagName === 'svg' || (n.querySelector && n.querySelector('svg'))) {
              need = true;
              break;
            }
          }
        }
        if (need) break;
      }
      if (need) annotateMermaid(document.body, appliedRe, appliedDict);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Mermaid startOnLoad is async — retry a few times
    [100, 400, 1000, 2500].forEach(function (ms) {
      setTimeout(function () {
        annotateMermaid(document.body, appliedRe, appliedDict);
      }, ms);
    });
  }

  function apply(dict) {
    appliedDict = dict;
    appliedRe = buildRegex(sortedKeys(dict));
    applyAll();
    watchMermaid();
  }

  fetch(glossaryUrl(), { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(apply)
    .catch(function (err) { console.warn('Raisd abbr tooltips:', err); });
})();

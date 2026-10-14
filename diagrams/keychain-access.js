/*! Raisd docs — portal-style Keychain embed (fixed top-right). */
(function () {
  'use strict';

  var KEYCHAIN_ORIGIN = 'https://keychain.raisd.co';
  var EMBED_STATE_TYPE = 'raisd.keychain.embed.state';
  var EMBED_RESIZE_TYPE = 'raisd.keychain.embed.resize';
  var ROOT_ATTR = 'data-raisd-keychain-access';

  function allowedOrigins() {
    return [
      KEYCHAIN_ORIGIN,
      'https://raisd-keychain.vercel.app',
      'http://localhost:5180',
      'http://127.0.0.1:5180',
    ];
  }

  function embedSrc() {
    var url = new URL('/embed', KEYCHAIN_ORIGIN);
    url.searchParams.set('portalOrigin', window.location.origin);
    return url.toString();
  }

  function mount() {
    if (document.querySelector('[' + ROOT_ATTR + ']')) return;

    var root = document.createElement('div');
    root.setAttribute(ROOT_ATTR, '');
    root.className = 'raisd-keychain-access';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'raisd-keychain-access-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'raisd-keychain-panel');
    btn.innerHTML =
      '<span class="raisd-keychain-dot" aria-hidden="true"></span>Keychain';

    var panel = null;
    var iframe = null;
    var open = false;
    var height = 320;

    function setUnlocked(unlocked) {
      var dot = btn.querySelector('.raisd-keychain-dot');
      if (dot) dot.classList.toggle('is-unlocked', !!unlocked);
    }

    function closePanel() {
      open = false;
      btn.setAttribute('aria-expanded', 'false');
      if (panel) {
        panel.remove();
        panel = null;
        iframe = null;
      }
    }

    function openPanel() {
      open = true;
      btn.setAttribute('aria-expanded', 'true');
      panel = document.createElement('div');
      panel.id = 'raisd-keychain-panel';
      panel.className = 'raisd-keychain-access-panel';
      iframe = document.createElement('iframe');
      iframe.title = 'Demo Keychain';
      iframe.src = embedSrc();
      iframe.className = 'raisd-keychain-access-frame';
      iframe.style.height = height + 'px';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
      panel.appendChild(iframe);
      root.appendChild(panel);
    }

    btn.addEventListener('click', function () {
      if (open) closePanel();
      else openPanel();
    });

    window.addEventListener('message', function (event) {
      if (allowedOrigins().indexOf(event.origin) === -1) return;
      var data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === EMBED_STATE_TYPE && typeof data.unlocked === 'boolean') {
        setUnlocked(data.unlocked);
        return;
      }
      if (data.type === EMBED_RESIZE_TYPE && typeof data.height === 'number') {
        height = Math.min(Math.max(data.height, 200), 560);
        if (iframe) iframe.style.height = height + 'px';
      }
    });

    root.appendChild(btn);
    document.body.appendChild(root);
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();

/*! Raisd — portal-style Keychain embed (fixed top-right). Self-contained CSS for hosts like Jenkins / Argo CD. */
(function () {
  'use strict';

  var KEYCHAIN_ORIGIN = 'https://keychain.raisd.co';
  var EMBED_STATE_TYPE = 'raisd.keychain.embed.state';
  var EMBED_RESIZE_TYPE = 'raisd.keychain.embed.resize';
  var FILL_TYPE = 'raisd.keychain.fill';
  var READY_TYPE = 'raisd.keychain.ready';
  var PROTOCOL_VERSION = 1;
  var ROOT_ATTR = 'data-raisd-keychain-access';
  var STYLE_ATTR = 'data-raisd-keychain-access-style';

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

  function injectStyles() {
    if (document.querySelector('[' + STYLE_ATTR + ']')) return;
    var style = document.createElement('style');
    style.setAttribute(STYLE_ATTR, '');
    style.textContent =
      '.raisd-keychain-access{position:fixed!important;top:12px!important;right:12px!important;left:auto!important;bottom:auto!important;z-index:100001!important;display:flex!important;flex-direction:column;align-items:flex-end;gap:8px;pointer-events:none;visibility:visible!important;font-family:"Segoe UI",system-ui,-apple-system,sans-serif;width:auto!important;height:auto!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important}' +
      '.raisd-keychain-access-btn,.raisd-keychain-access-panel{pointer-events:auto}' +
      '.raisd-keychain-access-btn{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;border:1px solid #d7dee8;background:#fff;color:#152033;font:inherit;font-size:.875rem;font-weight:600;box-shadow:0 4px 14px rgba(21,32,51,.12);cursor:pointer}' +
      '.raisd-keychain-access-btn:hover{background:#e8f0f8}' +
      '.raisd-keychain-dot{display:inline-block;width:8px;height:8px;border-radius:999px;background:#9aa8b8}' +
      '.raisd-keychain-dot.is-unlocked{background:#22c55e}' +
      '.raisd-keychain-access-panel{width:min(22rem,calc(100vw - 1.5rem));overflow:hidden;border-radius:12px;border:1px solid #d7dee8;background:#fff;box-shadow:0 16px 40px rgba(21,32,51,.16)}' +
      '.raisd-keychain-access-frame{display:block;width:100%;border:0;background:#fff}';
    (document.head || document.documentElement).appendChild(style);
  }

  /** Some hosts strip injected <style>; pin layout on the node. */
  function applyRootInline(root) {
    root.style.setProperty('position', 'fixed', 'important');
    root.style.setProperty('top', '12px', 'important');
    root.style.setProperty('right', '12px', 'important');
    root.style.setProperty('left', 'auto', 'important');
    root.style.setProperty('bottom', 'auto', 'important');
    root.style.setProperty('z-index', '100001', 'important');
    root.style.setProperty('display', 'flex', 'important');
    root.style.setProperty('flex-direction', 'column', 'important');
    root.style.setProperty('align-items', 'flex-end', 'important');
    root.style.setProperty('gap', '8px', 'important');
    root.style.setProperty('pointer-events', 'none', 'important');
    root.style.setProperty('visibility', 'visible', 'important');
    root.style.setProperty('width', 'auto', 'important');
    root.style.setProperty('height', 'auto', 'important');
    root.style.setProperty('margin', '0', 'important');
    root.style.setProperty('padding', '0', 'important');
  }

  function applyBtnInline(btn) {
    btn.style.setProperty('pointer-events', 'auto', 'important');
    btn.style.setProperty('display', 'inline-flex', 'important');
    btn.style.setProperty('align-items', 'center', 'important');
    btn.style.setProperty('gap', '8px', 'important');
    btn.style.setProperty('padding', '6px 12px', 'important');
    btn.style.setProperty('border-radius', '999px', 'important');
    btn.style.setProperty('border', '1px solid #d7dee8', 'important');
    btn.style.setProperty('background', '#fff', 'important');
    btn.style.setProperty('color', '#152033', 'important');
    btn.style.setProperty('font', 'inherit', 'important');
    btn.style.setProperty('font-size', '0.875rem', 'important');
    btn.style.setProperty('font-weight', '600', 'important');
    btn.style.setProperty('box-shadow', '0 4px 14px rgba(21,32,51,.12)', 'important');
    btn.style.setProperty('cursor', 'pointer', 'important');
  }

  function isKeychainFillMessage(data) {
    return (
      data &&
      typeof data === 'object' &&
      data.type === FILL_TYPE &&
      data.version === PROTOCOL_VERSION &&
      typeof data.username === 'string' &&
      typeof data.password === 'string'
    );
  }

  /** React-controlled inputs ignore el.value = … — use the native setter + events. */
  function setNativeValue(el, value) {
    if (!el) return;
    var proto =
      el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    var desc = Object.getOwnPropertyDescriptor(proto, 'value');
    if (desc && desc.set) desc.set.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function announceReady() {
    try {
      if (window.opener || /[?&]keychain=1(?:&|$)/.test(window.location.search)) {
        window.postMessage(
          { type: READY_TYPE, version: PROTOCOL_VERSION },
          window.location.origin,
        );
        if (window.opener) {
          window.opener.postMessage(
            { type: READY_TYPE, version: PROTOCOL_VERSION },
            '*',
          );
        }
      }
    } catch (_) {
      /* ignore */
    }
  }

  /** Fill Jenkins /login (j_username / j_password). */
  function installJenkinsFillListener() {
    if (!/jenkins\.raisd\.co$/i.test(window.location.hostname)) return;
    window.addEventListener('message', function (event) {
      if (allowedOrigins().indexOf(event.origin) === -1) return;
      if (!isKeychainFillMessage(event.data)) return;
      var user =
        document.querySelector('input[name="j_username"]') ||
        document.getElementById('j_username');
      var pass =
        document.querySelector('input[name="j_password"]') ||
        document.getElementById('j_password');
      var form = user && user.form;
      if (!user || !pass) return;
      setNativeValue(user, event.data.username);
      setNativeValue(pass, event.data.password);
      if (event.data.autoSubmit && form) {
        var submitBtn =
          form.querySelector('button[type="submit"]') ||
          form.querySelector('button[name="Submit"]');
        if (submitBtn && typeof form.requestSubmit === 'function') form.requestSubmit(submitBtn);
        else if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else form.submit();
      }
    });
    announceReady();
  }

  /** Fill Argo CD /login (React: name=username / name=password). */
  function installArgocdFillListener() {
    if (!/argocd\.raisd\.co$/i.test(window.location.hostname)) return;
    window.addEventListener('message', function (event) {
      if (allowedOrigins().indexOf(event.origin) === -1) return;
      if (!isKeychainFillMessage(event.data)) return;

      function findFields() {
        return {
          user:
            document.querySelector('input[name="username"]') ||
            document.querySelector('input[autocomplete="username"]') ||
            document.querySelector('.login__box input[type="text"]'),
          pass:
            document.querySelector('input[name="password"]') ||
            document.querySelector('.login__box input[type="password"]'),
        };
      }

      function apply(attempt) {
        var fields = findFields();
        if (!fields.user || !fields.pass) {
          if (attempt < 20) setTimeout(function () { apply(attempt + 1); }, 150);
          return;
        }
        setNativeValue(fields.user, event.data.username);
        setNativeValue(fields.pass, event.data.password);
        if (!event.data.autoSubmit) return;
        var btn =
          document.querySelector('.login__box button') ||
          Array.prototype.find.call(document.querySelectorAll('button'), function (b) {
            return /sign\s*in/i.test((b.textContent || '').trim());
          });
        if (btn) btn.click();
      }

      apply(0);
    });
    announceReady();
  }

  function isLoginPath(path) {
    return path === '/login' || path.indexOf('/login/') === 0 || /\/login\/?$/.test(path);
  }

  /**
   * Only on sign-in surfaces. After login, Keychain must unmount on Jenkins,
   * Argo CD, and docs (docs previously kept `raisd-auth-gate` and stayed open).
   */
  function isSignInSurface() {
    var host = (location.hostname || '').toLowerCase();
    var path = (location.pathname || '').toLowerCase();

    // Docs: only while the site gate is visible (not yet authenticated).
    if (host === 'docs.raisd.co' || /\.github\.io$/.test(host)) {
      if (document.documentElement.classList.contains('raisd-auth-ok')) return false;
      return (
        document.documentElement.classList.contains('raisd-auth-gate') ||
        !!document.getElementById('raisd-auth-overlay') ||
        !!document.querySelector('form.raisd-auth-card')
      );
    }

    // Jenkins + Argo CD: /login only (ignore password fields on other pages).
    if (/jenkins\.raisd\.co$/i.test(host) || /argocd\.raisd\.co$/i.test(host)) {
      return isLoginPath(path);
    }

    if (isLoginPath(path)) return true;
    if (document.documentElement.classList.contains('raisd-auth-gate')) return true;
    if (document.getElementById('raisd-auth-overlay')) return true;
    if (document.querySelector('form.raisd-auth-card')) return true;
    var pass = document.querySelector('input[type="password"]');
    if (!pass) return false;
    return Boolean(
      document.querySelector(
        'input[name="j_username"], input[name="username"], input[name="email"], input[type="email"], input[autocomplete="username"], input[autocomplete="email"], #password-email, #email',
      ),
    );
  }

  function maxPanelHeight() {
    return Math.min(800, Math.max(320, Math.floor(window.innerHeight * 0.85)));
  }

  function unmount() {
    var existing = document.querySelector('[' + ROOT_ATTR + ']');
    if (existing) existing.remove();
  }

  function mount() {
    if (!isSignInSurface()) {
      unmount();
      return;
    }
    injectStyles();
    installJenkinsFillListener();
    installArgocdFillListener();
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
    var height = Math.min(520, maxPanelHeight());

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
      iframe.title = 'Keychain';
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
        height = Math.min(Math.max(data.height, 240), maxPanelHeight());
        if (iframe) iframe.style.height = height + 'px';
      }
    });

    applyRootInline(root);
    applyBtnInline(btn);
    root.appendChild(btn);
    document.body.appendChild(root);
  }

  function syncMount() {
    if (isSignInSurface()) mount();
    else unmount();
  }

  if (document.body) syncMount();
  else document.addEventListener('DOMContentLoaded', syncMount);

  // Argo/docs SPAs change login state without a full navigation.
  window.addEventListener('popstate', syncMount);
  setInterval(syncMount, 800);
})();

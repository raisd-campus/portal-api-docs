/*! Raisd docs site gate — single shared username/password (SHA-256 hashes in site-auth-config.json).
 *  Client-side only (GitHub Pages has no server basic-auth). Obscures casual access; not a substitute
 *  for private hosting / Cloudflare Access for highly sensitive material.
 */
(function () {
  'use strict';

  var SESSION_KEY = 'raisd-docs-auth-v1';
  var OVERLAY_ID = 'raisd-auth-overlay';

  function scriptBase() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('site-auth.js') !== -1) {
        return src.replace(/site-auth\.js(?:\?.*)?$/, '');
      }
    }
    return '';
  }

  function configUrl() {
    return scriptBase() + 'site-auth-config.json';
  }

  function sha256hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.prototype.map
        .call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, '0');
        })
        .join('');
    });
  }

  function sessionToken(userHash, passHash) {
    return sha256hex(userHash + ':' + passHash);
  }

  function markAuthed() {
    document.documentElement.classList.add('raisd-auth-ok');
    var el = document.getElementById(OVERLAY_ID);
    if (el) el.remove();
  }

  function showOverlay(onSubmit) {
    document.documentElement.classList.add('raisd-auth-gate');
    if (document.getElementById(OVERLAY_ID)) return;

    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'raisd-auth-title');
    overlay.innerHTML =
      '<form class="raisd-auth-card" autocomplete="on">' +
      '  <img class="raisd-auth-logo" src="' +
      scriptBase() +
      'assets/raisd-logo.svg" width="80" height="22" alt="Raisd" />' +
      '  <h1 id="raisd-auth-title">Control Plane docs</h1>' +
      '  <p class="raisd-auth-lead">Sign in with the shared docs credentials to continue.</p>' +
      '  <label class="raisd-auth-label">Username' +
      '    <input name="username" type="text" autocomplete="username" required autofocus />' +
      '  </label>' +
      '  <label class="raisd-auth-label">Password' +
      '    <input name="password" type="password" autocomplete="current-password" required />' +
      '  </label>' +
      '  <p class="raisd-auth-error" hidden></p>' +
      '  <button type="submit">Sign in</button>' +
      '</form>';

    function mount() {
      document.body.appendChild(overlay);
      var form = overlay.querySelector('form');
      var err = overlay.querySelector('.raisd-auth-error');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        err.hidden = true;
        var u = form.username.value;
        var p = form.password.value;
        onSubmit(u, p).catch(function () {
          err.textContent = 'Incorrect username or password.';
          err.hidden = false;
        });
      });
    }

    if (document.body) mount();
    else document.addEventListener('DOMContentLoaded', mount);
  }

  function boot() {
    if (!window.crypto || !window.crypto.subtle) {
      document.documentElement.classList.add('raisd-auth-ok');
      return;
    }

    fetch(configUrl(), { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('config ' + r.status);
        return r.json();
      })
      .then(function (cfg) {
        if (!cfg || !cfg.userHash || !cfg.passHash) throw new Error('bad config');
        return sessionToken(cfg.userHash, cfg.passHash).then(function (token) {
          if (sessionStorage.getItem(SESSION_KEY) === token) {
            markAuthed();
            return;
          }
          showOverlay(function (username, password) {
            return Promise.all([sha256hex(username), sha256hex(password)]).then(function (parts) {
              if (parts[0] !== cfg.userHash || parts[1] !== cfg.passHash) {
                return Promise.reject(new Error('auth'));
              }
              return sessionToken(cfg.userHash, cfg.passHash).then(function (tok) {
                sessionStorage.setItem(SESSION_KEY, tok);
                markAuthed();
              });
            });
          });
        });
      })
      .catch(function (err) {
        console.warn('Raisd docs auth:', err);
        // Fail closed: keep gate visible with message
        showOverlay(function () {
          return Promise.reject(new Error('unavailable'));
        });
        var errEl = document.querySelector('#' + OVERLAY_ID + ' .raisd-auth-error');
        if (errEl) {
          errEl.textContent = 'Sign-in is temporarily unavailable. Try again later.';
          errEl.hidden = false;
        }
      });
  }

  boot();
})();

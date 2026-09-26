/*! Raisd docs — nav dropdowns + nested side submenus with leave delay */
(function () {
  'use strict';

  var LEAVE_MS = 380;
  var timers = new WeakMap();

  function clearTimer(el) {
    var t = timers.get(el);
    if (t) {
      clearTimeout(t);
      timers.delete(el);
    }
  }

  function closeSubs(except) {
    document.querySelectorAll('.nav-sub.open, .nav-sub.is-hover').forEach(function (sub) {
      if (sub === except) return;
      clearTimer(sub);
      sub.classList.remove('open', 'is-hover');
      var trig = sub.querySelector('.nav-sub-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });
  }

  function closeAll(exceptDd) {
    document.querySelectorAll('.nav-dd.open, .nav-dd.is-hover').forEach(function (dd) {
      if (dd === exceptDd) return;
      clearTimer(dd);
      dd.classList.remove('open', 'is-hover');
      closeSubs(null);
    });
  }

  function openHover(el, kind) {
    clearTimer(el);
    if (kind === 'dd') {
      closeAll(el);
    } else {
      closeSubs(el);
    }
    el.classList.add('is-hover');
    if (kind === 'sub') {
      var trig = el.querySelector('.nav-sub-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'true');
    }
  }

  function scheduleClose(el, kind) {
    clearTimer(el);
    timers.set(
      el,
      setTimeout(function () {
        el.classList.remove('is-hover');
        timers.delete(el);
        if (kind === 'sub') {
          var trig = el.querySelector('.nav-sub-trigger');
          if (trig && !el.classList.contains('open')) {
            trig.setAttribute('aria-expanded', 'false');
          }
        } else if (kind === 'dd') {
          closeSubs(null);
        }
      }, LEAVE_MS)
    );
  }

  function bindHoverIntent() {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    document.querySelectorAll('.nav-dd').forEach(function (dd) {
      dd.addEventListener('mouseenter', function () {
        openHover(dd, 'dd');
      });
      dd.addEventListener('mouseleave', function () {
        scheduleClose(dd, 'dd');
      });
    });

    document.querySelectorAll('.nav-sub').forEach(function (sub) {
      sub.addEventListener('mouseenter', function () {
        openHover(sub, 'sub');
      });
      sub.addEventListener('mouseleave', function () {
        scheduleClose(sub, 'sub');
      });
    });
  }

  document.addEventListener('click', function (e) {
    var sub = e.target.closest && e.target.closest('.nav-sub');
    var subTrig = e.target.closest && e.target.closest('.nav-sub-trigger');
    var dd = e.target.closest && e.target.closest('.nav-dd');
    var main = e.target.closest && e.target.closest('.nav-dd-main');
    var coarse = window.matchMedia && window.matchMedia('(hover: none), (max-width: 900px)').matches;

    if (subTrig && sub) {
      // Touch / narrow: first tap opens child menu; second tap follows hub link
      if (coarse) {
        var willOpen = !sub.classList.contains('open');
        if (willOpen) {
          e.preventDefault();
          closeSubs(sub);
          sub.classList.add('open');
          subTrig.setAttribute('aria-expanded', 'true');
          return;
        }
      }
    }

    if (main && dd) {
      if (coarse && !dd.classList.contains('open')) {
        e.preventDefault();
        closeAll(dd);
        dd.classList.add('open');
        return;
      }
    }

    if (!dd) closeAll(null);
    else if (!sub) closeSubs(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHoverIntent);
  } else {
    bindHoverIntent();
  }
})();

/*! Raisd docs — nav dropdowns with leave delay + touch toggle */
(function () {
  'use strict';

  var LEAVE_MS = 380;
  var timers = new WeakMap();

  function clearTimer(dd) {
    var t = timers.get(dd);
    if (t) {
      clearTimeout(t);
      timers.delete(dd);
    }
  }

  function closeAll(except) {
    document.querySelectorAll('.nav-dd.open, .nav-dd.is-hover').forEach(function (dd) {
      if (dd === except) return;
      clearTimer(dd);
      dd.classList.remove('open', 'is-hover');
    });
  }

  function openHover(dd) {
    clearTimer(dd);
    closeAll(dd);
    dd.classList.add('is-hover');
  }

  function scheduleClose(dd) {
    clearTimer(dd);
    timers.set(
      dd,
      setTimeout(function () {
        dd.classList.remove('is-hover');
        timers.delete(dd);
      }, LEAVE_MS)
    );
  }

  function bindHoverIntent() {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    document.querySelectorAll('.nav-dd').forEach(function (dd) {
      dd.addEventListener('mouseenter', function () {
        openHover(dd);
      });
      dd.addEventListener('mouseleave', function () {
        scheduleClose(dd);
      });
    });
  }

  document.addEventListener('click', function (e) {
    var dd = e.target.closest && e.target.closest('.nav-dd');
    var main = e.target.closest && e.target.closest('.nav-dd-main');

    if (main && dd) {
      var coarse = window.matchMedia && window.matchMedia('(hover: none)').matches;
      if (coarse && !dd.classList.contains('open')) {
        e.preventDefault();
        closeAll(dd);
        dd.classList.add('open');
        return;
      }
    }

    if (!dd) closeAll(null);
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

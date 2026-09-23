/*! Raisd docs — touch/click toggle for nav dropdowns */
(function () {
  'use strict';

  function closeAll(except) {
    document.querySelectorAll('.nav-dd.open').forEach(function (dd) {
      if (dd !== except) dd.classList.remove('open');
    });
  }

  document.addEventListener('click', function (e) {
    var dd = e.target.closest && e.target.closest('.nav-dd');
    var main = e.target.closest && e.target.closest('.nav-dd-main');

    if (main && dd) {
      // On coarse pointers, first click opens menu; follow link on second click / menu item
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
})();

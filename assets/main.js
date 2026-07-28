/* Chen-Wei Hsiung — site behaviour. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* Tell the head script this file arrived, so it leaves the .js class in
     place and the reveal animation stays on. */
  window.__cwhReady = true;

  /* ---------- theme ----------
     The stored theme was already applied by the head script; this block only
     wires up the toggle. */
  var STORE = 'cwh-theme';

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- language ----------
     Both languages are in the DOM; CSS hides the inactive one. The initial
     choice was already made by the head script, so this only handles the
     toggle. */
  var LANG_STORE = 'cwh-lang';
  var HTML_LANG = { zh: 'zh-Hant', en: 'en' };

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', HTML_LANG[lang]);
  }

  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh';
      applyLang(next);
      try { localStorage.setItem(LANG_STORE, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.topnav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Map();
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      var bestId = null;
      var bestRatio = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });

      links.forEach(function (a) {
        a.classList.toggle('active', bestId !== null && a.getAttribute('href') === '#' + bestId);
      });
    }, { rootMargin: '-62px 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] });

    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();

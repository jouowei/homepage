/* Chen-Wei Hsiung — site behaviour. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var STORE = 'cwh-theme';
  var stored = null;
  try { stored = localStorage.getItem(STORE); } catch (e) { /* private mode */ }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

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
     Both languages are in the DOM; CSS hides the inactive one.
     Default follows the browser, with Chinese as the fallback. */
  var LANG_STORE = 'cwh-lang';
  var TITLES = {
    zh: 'Chen-Wei Hsiung',
    en: 'Chen-Wei Hsiung'
  };
  var HTML_LANG = { zh: 'zh-Hant', en: 'en' };

  var storedLang = null;
  try { storedLang = localStorage.getItem(LANG_STORE); } catch (e) { /* private mode */ }

  function detectLang() {
    var nav = (navigator.language || 'zh').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', HTML_LANG[lang]);
    document.title = TITLES[lang];
  }

  applyLang(storedLang === 'zh' || storedLang === 'en' ? storedLang : detectLang());

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

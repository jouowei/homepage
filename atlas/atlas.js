/* 瓶頸圖譜 — 互動層。無外部相依。 */
(function () {
  'use strict';
  var A = window.ATLAS;
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(el);
    return el;
  }

  /* ───────── 主題 ───────── */
  (function () {
    var STORE = 'cwh-theme';
    function current() {
      var e = root.getAttribute('data-theme');
      if (e) return e;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    var btn = $('#themeToggle');
    if (btn) btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORE, next); } catch (e) {}
    });
  })();
  $('#asOf').textContent = A.asOf;

  /* ───────── 統一節點登記 ───────── */
  var TYPES = {
    source:     { label: '分子側來源', color: 'var(--pink)', col: 0 },
    pipe:       { label: '融資管道', color: 'var(--blue)', col: 1 },
    tenant:     { label: '承載者', color: 'var(--teal)', col: 2 },
    flow:       { label: '信用流', color: 'var(--violet)', col: 3 },
    bottleneck: { label: '物理瓶頸', color: 'var(--accent)', col: 4 },
    thermo:     { label: '溫度計 / 非收費站', color: 'var(--text-mute)', col: 4 },
    layer:      { label: '瓶頸層', color: 'var(--warn)', col: 5 },
    thread:     { label: 'Thread', color: 'var(--ok)', col: 6 },
    misnode:    { label: '接錯節點', color: 'var(--hot)', col: 0 },
    dim:        { label: '分子維度', color: 'var(--pink)', col: 0 }
  };
  var N = {};       // id -> node
  var order = [];
  function reg(type, id, label, data) { var n = { id: id, type: type, label: label, d: data, links: [] }; N[id] = n; order.push(n); return n; }

  A.numerator.sources.forEach(function (s) { reg('source', s.id, s.name, s); });
  A.numerator.pipes.forEach(function (p) { reg('pipe', p.id, p.name, p); });
  A.numerator.tenants.forEach(function (t) { reg('tenant', t.id, t.name, t); });
  A.flows.forEach(function (f) { reg('flow', f.id, f.name, f); });
  A.bottlenecks.forEach(function (b) { reg(b.tier < 0 ? 'thermo' : 'bottleneck', b.id, b.name, b); });
  A.layers.forEach(function (l) { reg('layer', l.id, l.name, l); });
  A.threads.forEach(function (t) { reg('thread', t.id, t.name.replace(/-20\d\dQ?\d?$/, ''), t); });
  A.numerator.misnodes.forEach(function (m) { reg('misnode', m.id, m.n + ' ' + m.name, m); });
  A.numerator.dims.forEach(function (d) { reg('dim', d.id, d.name, d); });

  /* 邊 */
  var E = [];
  function link(a, b, kind) { if (!N[a] || !N[b]) return; E.push({ a: a, b: b, kind: kind || '' }); N[a].links.push(b); N[b].links.push(a); }
  var SRC_PIPES = { s_fed: ['p_ig', 'p_bank'], s_bank: ['p_ig', 'p_pc', 'p_vendor'], s_asia: ['p_ig'], s_broad: ['p_ig', 'p_pc', 'p_abs'] };
  Object.keys(SRC_PIPES).forEach(function (s) { SRC_PIPES[s].forEach(function (p) { link(s, p, 'flow'); }); });
  var PIPE_TENANTS = { p_ig: ['n_hyper'], p_pc: ['n_lab', 'n_hyper'], p_abs: ['n_lab', 'n_hyper'], p_bank: ['n_lab', 'n_hyper'], p_vendor: ['n_lab'] };
  Object.keys(PIPE_TENANTS).forEach(function (p) { PIPE_TENANTS[p].forEach(function (t) { link(p, t, 'flow'); }); });
  A.numerator.tenants.forEach(function (t) { link(t.id, t.flow, 'flow'); });
  A.numerator.sources.forEach(function (s) { link(s.id, s.misnode, ''); });
  A.bottlenecks.forEach(function (b) {
    (b.flows || []).forEach(function (f) { link(f, b.id, 'flow'); });
    link(b.layer, b.id, '');
  });
  A.threads.forEach(function (t) { (t.nodes || []).forEach(function (n) { link(t.id, n, ''); }); });
  // 接力棒之間的遷移邊
  var bat = A.relay.batons;
  for (var i = 0; i < bat.length - 1; i++) link(bat[i].node, bat[i + 1].node, 'migrate');

  /* ───────── 路由 ───────── */
  var state = { view: 'graph', id: null };
  function parseHash() {
    var h = location.hash.replace(/^#/, '').split('/');
    var v = h[0] || 'graph';
    if (!$('#view-' + v)) v = 'graph';
    return { view: v, id: h[1] || null };
  }
  function setHash(view, id) {
    var h = '#' + view + (id ? '/' + id : '');
    if (location.hash !== h) history.replaceState(null, '', h);
  }
  function showView(v) {
    state.view = v;
    $$('.view').forEach(function (el) { el.classList.toggle('active', el.id === 'view-' + v); });
    $$('.tabs a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-view') === v); });
    if (v === 'graph') graph.ensure();
  }
  window.addEventListener('hashchange', function () { var p = parseHash(); showView(p.view); if (p.id) select(p.id, true); else closePanel(); });

  /* ───────── 側欄 ───────── */
  var panel = $('#panel'), panelBody = $('#panelBody');
  $('#panelClose').addEventListener('click', function () { closePanel(); setHash(state.view, null); graph.highlight(null); });
  function closePanel() { panel.hidden = true; state.id = null; }
  function chips(ids) {
    var out = (ids || []).filter(function (id) { return N[id]; }).map(function (id) {
      return '<span class="chip" data-go="' + esc(id) + '">' + esc(N[id].label) + '</span>';
    }).join('');
    return out ? '<div class="chips">' + out + '</div>' : '<p><small>—</small></p>';
  }
  function reading(r, cls, title) {
    if (!r) return '';
    var src = r.source ? '<span class="src">' + (r.url ? '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.source) + '</a>' : esc(r.source)) + (r.date ? ' · ' + esc(r.date) : '') + '</span>'
                       : (r.date ? '<span class="src">' + esc(r.date) + '</span>' : '');
    return '<div class="reading ' + cls + '"><strong>' + title + '</strong> ' + esc(r.text) + src + '</div>';
  }
  function related(n) {
    var ids = n.links.filter(function (id, i, arr) { return arr.indexOf(id) === i; });
    return '<h5>相關節點</h5>' + chips(ids);
  }
  function renderPanel(n) {
    var d = n.d, t = TYPES[n.type], h = '';
    h += '<div class="type" style="color:' + t.color + '">' + esc(t.label) + '</div><h3>' + esc(n.label) + '</h3>';
    if (n.type === 'bottleneck' || n.type === 'thermo') {
      h += '<div class="meta chips">';
      if (d.tier > 0) h += '<span class="badge t' + d.tier + '">Tier ' + d.tier + '</span>';
      if (d.tier === 0) h += '<span class="badge">節點</span>';
      if (d.tier < 0) h += '<span class="badge">溫度計</span>';
      if (N[d.layer]) h += '<span class="badge acc">' + esc(N[d.layer].label) + '</span>';
      if (d.clock) h += '<span class="badge">時鐘 ' + esc(d.clock) + '</span>';
      if (d.wave && d.wave !== '—') h += '<span class="badge">Wave ' + esc(d.wave) + '</span>';
      if (d.durability) h += '<span class="badge ok">耐久度 ' + d.durability + '</span>';
      h += '</div>';
      h += '<dl class="kv"><dt>碰撞</dt><dd>' + esc(d.collision) + '</dd>' + (d.sde ? '<dt>SDE</dt><dd>' + esc(d.sde) + '</dd>' : '') + '</dl>';
      h += '<p>' + esc(d.desc) + '</p>';
      h += reading(d.notionReading, 'notion', 'Notion 讀數');
      h += reading(d.publicReading, 'public', '公開讀數');
      if (d.triggers && d.triggers.length) h += '<h5>物理觸發（非價位）</h5><ul class="plain">' + d.triggers.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      if (d.controllers && d.controllers.length) {
        h += '<h5>控制者（Layer B，公開資料）</h5><table>' + d.controllers.map(function (c) { return '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.role) + '</td><td>' + esc(c.share) + '</td></tr>'; }).join('') + '</table>';
      }
      h += '<h5>撞上它的信用流</h5>' + chips(d.flows);
      h += '<h5>追蹤它的 thread</h5>' + chips(d.threads);
      if (d.notion) h += '<div class="notion-ref">Notion：' + esc(d.notion) + '</div>';
    } else if (n.type === 'flow') {
      h += '<dl class="kv"><dt>驅動力</dt><dd>' + esc(d.driver) + '</dd><dt>年規模</dt><dd>' + esc(d.scale) + '</dd></dl>';
      if (d.note) h += '<p>' + esc(d.note) + '</p>';
      h += reading(d.reading, 'public', '公開讀數');
      h += '<h5>撞上的瓶頸</h5>' + chips(n.links.filter(function (id) { return N[id].type === 'bottleneck' || N[id].type === 'thermo'; }));
    } else if (n.type === 'layer') {
      var row = A.matrix.rows.filter(function (r) { return r.layer === n.id; })[0];
      if (row) h += '<h5>碰撞矩陣列</h5><table>' + row.cells.map(function (c, i) { return '<tr><td>' + esc(A.matrix.cols[i]) + '</td><td>' + esc(c) + '</td></tr>'; }).join('') + '</table>';
      h += '<h5>此層的節點</h5>' + chips(n.links);
    } else if (n.type === 'thread') {
      h += '<div class="meta chips"><span class="badge">' + esc(d.status) + '</span><span class="badge acc">' + esc(d.domain) + '</span></div>';
      h += '<p>' + esc(d.summary) + '</p>';
      h += '<h5>關鍵字</h5><div class="chips">' + d.keywords.map(function (k) { return '<span class="badge">' + esc(k) + '</span>'; }).join('') + '</div>';
      h += '<h5>掛住的節點</h5>' + chips(d.nodes);
      h += '<div class="notion-ref">Notion：DOC-8 主題回顧索引 › ' + esc(d.name) + '</div>';
    } else if (n.type === 'misnode') {
      h += '<dl class="kv"><dt>接錯的是</dt><dd>' + esc(d.what) + '</dd><dt>可否補線</dt><dd>' + esc(d.fix) + '</dd><dt>DOC-9</dt><dd>' + esc(d.sec) + '</dd></dl>';
      h += related(n);
    } else if (n.type === 'pipe') {
      h += '<dl class="kv"><dt>誰在用</dt><dd>' + esc(d.who) + '</dd><dt>儀表</dt><dd>' + esc(d.gauge) + '</dd><dt>覆蓋率</dt><dd>' + esc(d.dir) + '</dd></dl>';
      h += reading({ text: d.publicText, source: d.source, url: d.url }, 'public', '公開讀數');
      h += related(n);
      h += '<div class="notion-ref">Notion：DOC-9 §9.2 分子管道地圖</div>';
    } else if (n.type === 'source' || n.type === 'tenant') {
      h += '<p>' + esc(d.desc) + '</p>' + related(n);
    } else if (n.type === 'dim') {
      h += '<dl class="kv"><dt>問什麼</dt><dd>' + esc(d.q) + '</dd><dt>載體</dt><dd>' + esc(d.carrier) + '</dd><dt>狀態</dt><dd>' + esc(d.status) + '</dd><dt>失效模式</dt><dd>' + esc(d.fail) + '</dd></dl>';
      h += '<div class="notion-ref">Notion：DOC-9 §9.1 分子四維台帳</div>';
    }
    panelBody.innerHTML = h;
    panel.hidden = false;
    panel.scrollTop = 0;
  }
  document.addEventListener('click', function (ev) {
    var go = ev.target.closest && ev.target.closest('[data-go]');
    if (go) { ev.preventDefault(); select(go.getAttribute('data-go')); }
  });
  function select(id, fromHash) {
    var n = N[id];
    if (!n) return;
    state.id = id;
    renderPanel(n);
    if (!fromHash) setHash(state.view, id);
    graph.highlight(id);
    flow.highlight(id);
  }

  /* ───────── 圖譜（力導向，SVG） ───────── */
  var graph = (function () {
    var svg = $('#graphSvg'), g, edgeLayer, nodeLayer, built = false;
    var W = 1200, H = 900, nodes = [], visibleTypes = {};
    var tx = 0, ty = 0, scale = 1;
    Object.keys(TYPES).forEach(function (t) { visibleTypes[t] = t !== 'dim' && t !== 'misnode' ? true : true; });
    visibleTypes.dim = false;

    function radius(n) {
      if (n.type === 'bottleneck') return n.d.tier === 1 ? 15 : n.d.tier === 2 ? 12 : 9;
      if (n.type === 'thermo') return 7;
      if (n.type === 'flow') return 12;
      if (n.type === 'layer') return 10;
      if (n.type === 'thread') return 6;
      if (n.type === 'pipe') return 9;
      return 8;
    }
    function colX(c) { return 80 + c * ((W - 320) / 6); }
    function anchorX(n, i) { var x = colX(TYPES[n.type].col); if (n.type === 'bottleneck' || n.type === 'thermo') x += (i % 3 - 1) * 95; if (n.type === 'thread') x += (i % 2) * 20; return x; }

    function layout() {
      nodes = order.filter(function (n) { return visibleTypes[n.type]; });
      var byCol = {};
      nodes.forEach(function (n) { var c = TYPES[n.type].col; (byCol[c] = byCol[c] || []).push(n); });
      Object.keys(byCol).forEach(function (c) {
        var arr = byCol[c];
        arr.forEach(function (n, i) {
          n.ax = anchorX(n, i);
          n.x = n.ax + (Math.random() - .5) * 30;
          n.y = 50 + (i + .5) * ((H - 100) / arr.length);
          n.vx = 0; n.vy = 0; n.r = radius(n);
        });
      });
      var idx = {}; nodes.forEach(function (n) { idx[n.id] = n; });
      var edges = E.filter(function (e) { return idx[e.a] && idx[e.b]; });
      // 力模擬（同步跑固定步數）
      for (var it = 0; it < 360; it++) {
        var alpha = 1 - it / 360, k = .012 + .03 * alpha;
        // 斥力
        for (var i = 0; i < nodes.length; i++) {
          var a = nodes[i];
          for (var j = i + 1; j < nodes.length; j++) {
            var b = nodes[j], dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy + 1, d = Math.sqrt(d2);
            var min = a.r + b.r + 30;
            var f = (d < min ? (min - d) * .45 : 0) + 1400 / d2;
            f *= alpha;
            var fx = dx / d * f, fy = dy / d * f;
            a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
          }
        }
        // 彈簧
        edges.forEach(function (e) {
          var a = idx[e.a], b = idx[e.b], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) + .01;
          var target = 120 + (a.r + b.r);
          var f = (d - target) * .006 * alpha;
          a.vx += dx / d * f; a.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f;
        });
        // 欄位錨定 + 邊界
        nodes.forEach(function (n) {
          n.vx += (n.ax - n.x) * k;
          n.vy += (H / 2 - n.y) * .002 * alpha;
          n.x += n.vx; n.y += n.vy; n.vx *= .6; n.vy *= .6;
          n.x = Math.max(40, Math.min(W - 40, n.x)); n.y = Math.max(40, Math.min(H - 20, n.y));
        });
      }
      return edges;
    }

    function build() {
      svg.innerHTML = '';
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      g = svgEl('g', {}, svg);
      var cols = svgEl('g', {}, g);
      [['分子側來源', 0], ['融資管道', 1], ['承載者', 2], ['信用流', 3], ['物理瓶頸', 4], ['瓶頸層', 5], ['THREADS', 6]].forEach(function (c) {
        var t = svgEl('text', { x: colX(c[1]), y: 18, 'class': 'gcol-label' }, cols); t.textContent = c[0];
      });
      edgeLayer = svgEl('g', {}, g); nodeLayer = svgEl('g', {}, g);
      var edges = layout();
      var idx = {}; nodes.forEach(function (n) { idx[n.id] = n; });
      edges.forEach(function (e) {
        var a = idx[e.a], b = idx[e.b];
        var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * .08;
        var p = svgEl('path', { d: 'M' + a.x + ',' + a.y + ' Q' + mx + ',' + my + ' ' + b.x + ',' + b.y, 'class': 'gedge ' + e.kind, 'data-a': e.a, 'data-b': e.b }, edgeLayer);
        e.el = p;
      });
      nodes.forEach(function (n) {
        var gn = svgEl('g', { 'class': 'gnode', transform: 'translate(' + n.x + ',' + n.y + ')', 'data-id': n.id }, nodeLayer);
        var fill = TYPES[n.type].color;
        svgEl('circle', { r: n.r, fill: fill, 'fill-opacity': n.type === 'thermo' ? .35 : .85, stroke: fill }, gn);
        if (n.type === 'bottleneck' && n.d.tier === 1) svgEl('circle', { r: n.r + 4, fill: 'none', stroke: fill, 'stroke-opacity': .5, 'stroke-dasharray': '3 2' }, gn);
        var t = svgEl('text', { x: n.r + 4, y: 4 }, gn);
        t.textContent = n.label.length > 16 ? n.label.slice(0, 15) + '…' : n.label;
        gn.addEventListener('click', function (ev) { ev.stopPropagation(); select(n.id); });
        n.el = gn;
      });
      applyTransform();
      built = true;
      $('#graphStats').textContent = '節點 ' + nodes.length + ' · 邊 ' + edges.length + '\nNotion DOC-3 ' + A.notionAsOf.doc3 + '\nDOC-9 ' + A.notionAsOf.doc9 + ' · DOC-8 ' + A.notionAsOf.doc8 + '\n公開資料 ' + A.asOf;
      if (state.id) highlight(state.id);
    }
    function applyTransform() { if (g) g.setAttribute('transform', 'translate(' + tx + ',' + ty + ') scale(' + scale + ')'); }

    // 平移 / 縮放
    var drag = null;
    svg.addEventListener('mousedown', function (e) { drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty }; svg.classList.add('dragging'); });
    window.addEventListener('mousemove', function (e) { if (!drag) return; var s = svg.getBoundingClientRect().width / W; tx = drag.tx + (e.clientX - drag.x) / s; ty = drag.ty + (e.clientY - drag.y) / s; applyTransform(); });
    window.addEventListener('mouseup', function () { drag = null; svg.classList.remove('dragging'); });
    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = svg.getBoundingClientRect(), s = rect.width / W;
      var px = (e.clientX - rect.left) / s, py = (e.clientY - rect.top) / s;
      var f = e.deltaY < 0 ? 1.12 : 1 / 1.12, ns = Math.max(.4, Math.min(4, scale * f));
      tx = px - (px - tx) * (ns / scale); ty = py - (py - ty) * (ns / scale); scale = ns; applyTransform();
    }, { passive: false });
    // 觸控
    var touch = null;
    svg.addEventListener('touchstart', function (e) { if (e.touches.length === 1) touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: tx, ty: ty }; }, { passive: true });
    svg.addEventListener('touchmove', function (e) { if (!touch || e.touches.length !== 1) return; var s = svg.getBoundingClientRect().width / W; tx = touch.tx + (e.touches[0].clientX - touch.x) / s; ty = touch.ty + (e.touches[0].clientY - touch.y) / s; applyTransform(); }, { passive: true });
    svg.addEventListener('touchend', function () { touch = null; });
    svg.addEventListener('click', function () { closePanel(); highlight(null); setHash('graph', null); });
    $('#graphReset').addEventListener('click', function () { tx = 0; ty = 0; scale = 1; applyTransform(); });

    function highlight(id) {
      if (!built) return;
      var keep = null;
      if (id && N[id]) { keep = {}; keep[id] = 1; N[id].links.forEach(function (l) { keep[l] = 1; }); }
      nodes.forEach(function (n) { n.el.classList.toggle('dim', !!keep && !keep[n.id]); n.el.classList.toggle('selected', n.id === id); });
      $$('.gedge', edgeLayer).forEach(function (p) {
        var a = p.getAttribute('data-a'), b = p.getAttribute('data-b');
        var on = !!id && (a === id || b === id);
        p.classList.toggle('hot', on); p.classList.toggle('dim', !!keep && !on);
      });
    }
    function search(q) {
      q = (q || '').trim().toLowerCase();
      nodes.forEach(function (n) {
        var hit = q && (n.label.toLowerCase().indexOf(q) >= 0 || JSON.stringify(n.d).toLowerCase().indexOf(q) >= 0);
        n.el.classList.toggle('hit', !!hit); n.el.classList.toggle('dim', !!q && !hit);
      });
      $$('.gedge', edgeLayer).forEach(function (p) { p.classList.toggle('dim', !!q); });
    }
    // 圖例 + 類型開關
    var legend = $('#graphLegend');
    Object.keys(TYPES).forEach(function (t) {
      var l = document.createElement('label');
      l.innerHTML = '<input type="checkbox" ' + (visibleTypes[t] ? 'checked' : '') + ' data-type="' + t + '"><span class="sw" style="background:' + TYPES[t].color + '"></span>' + esc(TYPES[t].label);
      legend.appendChild(l);
    });
    legend.addEventListener('change', function (e) { var t = e.target.getAttribute('data-type'); if (t) { visibleTypes[t] = e.target.checked; build(); } });
    $('#graphSearch').addEventListener('input', function (e) { search(e.target.value); });
    return { ensure: function () { if (!built) build(); }, highlight: highlight, rebuild: build };
  })();

  /* ───────── 分子端信用流向圖 ───────── */
  var flow = (function () {
    var svg = $('#flowSvg'), W = 1180, H = 620, boxes = {};
    var built = false;
    function box(id, x, y, w, h, title, sub, extra) {
      var gg = svgEl('g', { 'class': 'fnode', 'data-id': id, transform: 'translate(' + x + ',' + y + ')' }, svg);
      svgEl('rect', { width: w, height: h, rx: 8 }, gg);
      var t = svgEl('text', { x: 10, y: 20 }, gg); t.textContent = title;
      if (sub) { var s = svgEl('text', { x: 10, y: 36, 'class': 'sub' }, gg); s.textContent = sub; }
      if (extra) { var e = svgEl('text', { x: w - 8, y: 18, 'text-anchor': 'end', 'class': extra.cls }, gg); e.textContent = extra.text; }
      boxes[id] = { x: x, y: y, w: w, h: h, el: gg };
      if (N[id]) gg.addEventListener('click', function (ev) { ev.stopPropagation(); select(id); });
      return gg;
    }
    function curve(a, b, width, cls) {
      var A_ = boxes[a], B_ = boxes[b];
      var x1 = A_.x + A_.w, y1 = A_.y + A_.h / 2, x2 = B_.x, y2 = B_.y + B_.h / 2, mx = (x1 + x2) / 2;
      svgEl('path', { d: 'M' + x1 + ',' + y1 + ' C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2, 'class': 'flink ' + (cls || ''), 'stroke-width': width || 2 }, svg);
    }
    function colLabel(x, text) { var t = svgEl('text', { x: x, y: 22, 'class': 'fcol' }, svg); t.textContent = text; }
    function build() {
      svg.innerHTML = ''; svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      var linksLayer = svgEl('g', {}, svg);
      colLabel(20, '分子側來源'); colLabel(300, '融資管道（儀表覆蓋）'); colLabel(600, '承載者'); colLabel(820, '可抵押性分岔'); colLabel(1010, '分母側瓶頸');
      var srcY = 50; A.numerator.sources.forEach(function (s, i) { var m = N[s.misnode] ? s.misnode : null; box(s.id, 20, srcY + i * 120, 230, 56, s.short || s.name, s.misnode ? '' : '', m ? { text: '接錯 ' + A.numerator.misnodes.filter(function (x) { return x.id === m; })[0].n, cls: 'fmis' } : null); });
      var pipeY = 50; A.numerator.pipes.forEach(function (p, i) { box(p.id, 300, pipeY + i * 96, 250, 56, p.short || p.name, p.dir, { text: p.gauge.slice(0, 2), cls: 'fbadge' }); });
      var tenY = 120; A.numerator.tenants.forEach(function (t, i) { box(t.id, 600, tenY + i * 130, 190, 56, t.name, ''); });
      box('fork_t', 820, 150, 170, 60, '有形腿（可抵押）', '資料中心 / 加速器 / 電力設備');
      box('fork_i', 820, 330, 170, 60, '無形腿（不可抵押）', '流程 / 訓練 / 組織 / 資料管線');
      var spine = [['aichip', '算力'], ['euv', '先進製程'], ['cowos', '先進封裝'], ['hbm', 'HBM'], ['power', '電力 / 併網'], ['abf', '材料 / 載板']];
      spine.forEach(function (s, i) { box(s[0], 1010, 50 + i * 88, 150, 50, s[1], '瓶頸剛性 ↑'); });
      box('ocf', 820, 470, 170, 56, '營運現金流', '與股東回報競爭 · 通道 = 零');
      // links
      Object.keys(SRC_PIPES).forEach(function (s) { SRC_PIPES[s].forEach(function (p) { curve(s, p, 2, ''); }); });
      A.numerator.pipes.forEach(function (p) { PIPE_TENANTS[p.id].forEach(function (t) { curve(p.id, t, p.width, 'pipe'); }); });
      A.numerator.tenants.forEach(function (t) { curve(t.id, 'fork_t', 5, 'tenant'); curve(t.id, 'fork_i', 2, 'dead'); });
      spine.forEach(function (s) { curve('fork_t', s[0], 3, 'fork'); });
      curve('ocf', 'fork_i', 2, 'dead');
      // move links behind boxes
      $$('.flink', svg).forEach(function (p) { linksLayer.appendChild(p); });
      svg.insertBefore(linksLayer, svg.firstChild);
      built = true;
    }
    function highlight(id) { if (!built) return; $$('.fnode', svg).forEach(function (n) { n.classList.toggle('selected', n.getAttribute('data-id') === id); }); }
    return { build: build, highlight: highlight };
  })();

  /* ───────── 靜態區塊 ───────── */
  function card(html, id, extraCls) { return '<div class="card ' + (id ? 'clickable' : '') + ' ' + (extraCls || '') + '" ' + (id ? 'data-go="' + esc(id) + '"' : '') + '>' + html + '</div>'; }

  function renderFlowView() {
    var nu = A.numerator;
    $('#flowPrinciple').textContent = nu.principle;
    flow.build();
    $('#flowChain').innerHTML = nu.chain.steps.map(function (s) { return '<li class="' + (s.visible ? '' : 'blind') + (s.valve ? ' valve' : '') + '"><span class="n">' + s.n + '</span>' + esc(s.name) + '</li>'; }).join('');
    $('#flowChainNote').textContent = nu.chain.note;
    $('#flowMisnodes').innerHTML = nu.misnodes.map(function (m) { return card('<h4>' + esc(m.n + ' ' + m.name) + '</h4><p>' + esc(m.what) + '</p><p><small>' + esc(m.fix) + '</small></p><div class="meta"><span class="tag">DOC-9 ' + esc(m.sec) + '</span></div>', m.id); }).join('');
    var f = nu.fork;
    $('#flowFork').innerHTML = card('<h4>' + esc(f.tangible.name) + '</h4><p>' + esc(f.tangible.items) + '</p><p><small>' + esc(f.tangible.accounting) + '</small></p><div class="meta"><span class="tag">信用彈性：' + esc(f.tangible.elasticity) + '</span></div>')
      + card('<h4>' + esc(f.intangible.name) + '</h4><p>' + esc(f.intangible.items) + '</p><p><small>' + esc(f.intangible.accounting) + '</small></p><div class="meta"><span class="tag">信用彈性：' + esc(f.intangible.elasticity) + '</span></div>')
      + '<p class="callout" style="grid-column:1/-1">' + esc(f.warning) + '</p>';
    $('#flowRent').innerHTML = card('<h4>基建租</h4><p>' + esc(nu.rentFork.infra) + '</p>') + card('<h4>合約租（帶自毀時鐘）</h4><p>' + esc(nu.rentFork.contract) + '</p>');
    $('#flowDims').innerHTML = '<tr><th>維</th><th>問什麼</th><th>現行載體</th><th>狀態</th><th>已知失效模式</th></tr>' + nu.dims.map(function (d) { return '<tr><td><span class="chip" data-go="' + d.id + '">' + esc(d.name) + '</span></td><td>' + esc(d.q) + '</td><td>' + esc(d.carrier) + '</td><td>' + esc(d.status) + '</td><td>' + esc(d.fail) + '</td></tr>'; }).join('');
    $('#flowGates').innerHTML = nu.gates.map(function (g) { return card('<h4>' + esc(g.name) + '</h4><p>' + esc(g.desc) + '</p>'); }).join('');
    $('#flowGatesNote').textContent = nu.gatesNote;
    var tf = nu.topform;
    $('#flowTopform').innerHTML = '<h4>' + esc(tf.name) + '</h4><p>' + esc(tf.thesis) + '</p><p><strong>' + esc(tf.score) + '</strong></p><h5 style="margin:.6rem 0 .2rem;font-size:.78rem;color:var(--text-mute)">四個天花板</h5><div class="meta">' + tf.ceilings.map(function (c) { return '<span class="tag">' + esc(c) + '</span>'; }).join('') + '</div><ol class="plain" style="font-size:.84rem">' + tf.signals.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
    $('#flowWarsh').innerHTML = '<h4>' + esc(nu.warsh.name) + '</h4><p>' + esc(nu.warsh.desc) + '</p>';
    $('#flowQuadrant').innerHTML = '<h4>' + esc(nu.quadrant.name) + '</h4><p>' + esc(nu.quadrant.now) + '</p>';
  }

  function bnCard(b) {
    var h = '<h4>' + esc(b.name) + '</h4><div class="meta">';
    if (N[b.layer]) h += '<span class="tag">' + esc(A.layers.filter(function (l) { return l.id === b.layer; })[0].short) + '</span>';
    if (b.clock) h += '<span class="tag">' + esc(b.clock) + '</span>';
    if (b.wave && b.wave !== '—') h += '<span class="tag">' + esc(b.wave) + '</span>';
    if (b.durability) h += '<span class="tag">耐久度 ' + b.durability + '</span>';
    h += '</div><p><strong>' + esc(b.collision) + '</strong></p>';
    if (b.notionReading) h += '<div class="reading notion"><strong>Notion</strong> ' + esc(b.notionReading.text) + '<span class="src">' + esc(b.notionReading.date) + '</span></div>';
    if (b.publicReading) h += '<div class="reading public"><strong>公開</strong> ' + esc(b.publicReading.text) + '<span class="src">' + esc(b.publicReading.source) + ' · ' + esc(b.publicReading.date) + '</span></div>';
    return card(h, b.id);
  }
  function renderNowView() {
    $('#nowStats').innerHTML = [
      ['🟢 6 · 🟡 9 · 🔴 1 · ⚫ 0', '追趕時鐘讀數（16 節點）', 'DOC-3 §6.4 · 2026-07-16'],
      ['0 / 4', '分母側轉換信號（GPU 過剩／CapEx 見頂／平台鎖定／雲毛利）', 'DOC-3 · 2026-08-17'],
      ['≈ 1 / 7', '融資側頂部七訊號組合', 'DOC-8 · 2026-08-07'],
      ['$725B', '四大雲端商 2026 資本支出（+77%）', '公開資料 · 2026-08'],
      ['128 / 144 週', 'LPT / GSU 變壓器交期（變電站級 >160 週）', 'Wood Mackenzie · 2025Q2 / 2026'],
      ['2,600 GW', '美國併網佇列（達商轉中位數約 5 年）', '公開資料 · 2026']
    ].map(function (s) { return '<div class="stat"><div class="n">' + esc(s[0]) + '</div><div class="l">' + esc(s[1]) + '</div><div class="d">' + esc(s[2]) + '</div></div>'; }).join('');
    var byTier = function (t) { return A.bottlenecks.filter(function (b) { return b.tier === t; }).sort(function (a, b) { return (a.rank || 99) - (b.rank || 99); }); };
    $('#nowTier1').innerHTML = byTier(1).map(bnCard).join('');
    $('#nowTier2').innerHTML = byTier(2).map(bnCard).join('');
    $('#nowTier3').innerHTML = byTier(3).map(bnCard).join('');
    var R = A.relay;
    $('#nowRelay').innerHTML = R.batons.map(function (b) { return '<li class="' + b.state + '" data-go="' + esc(b.node) + '"><span class="y">第 ' + b.n + ' 棒 · ' + esc(b.year) + '</span><div>' + esc(b.name) + '</div><span class="s">' + (b.state === 'done' ? '已交棒' : b.state === 'live' ? '進行中' : '未具名 · 期限 ' + esc(b.deadline)) + '</span></li>'; }).join('');
    $('#nowRelayRule').textContent = R.rule;
    var D = R.detector;
    $('#nowDetector').innerHTML = '<p>' + esc(D.rule) + '</p><table><tr><td>' + esc(D.legA.name) + '</td><td>' + esc(D.legA.notion) + '<br><strong>' + esc(D.legA.trend) + '</strong></td></tr><tr><td>' + esc(D.legB.name) + '</td><td>' + esc(D.legB.notion) + '<br><em>' + esc(D.legB.publicText) + '</em><br><strong>' + esc(D.legB.trend) + '</strong></td></tr></table><p class="callout">' + esc(D.verdict) + '</p>';
    $('#nowTypes').innerHTML = R.types.map(function (t) { return card('<h4>' + esc(t.name) + '</h4><p>' + esc(t.desc) + '</p>'); }).join('');
    $('#nowBlind').innerHTML = R.blindspots.map(function (b) { return card('<h4>' + b.n + ' · ' + esc(b.name) + '</h4><p>' + esc(b.desc) + '</p><div class="meta"><span class="tag">' + esc(b.date) + '</span></div>'); }).join('');
    var M = A.matrix;
    $('#nowMatrix').innerHTML = '<tr><th>瓶頸層 ＼ 信用流</th>' + M.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' + M.rows.map(function (r) { var l = A.layers.filter(function (x) { return x.id === r.layer; })[0]; return '<tr><td class="row-head"><span class="chip" data-go="' + r.layer + '">' + esc(l.name) + '</span></td>' + r.cells.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('');
    $('#nowMatrixNote').textContent = '🔴 = 3 條以上信用流同時碰撞、🟡 = 2 條、🟢 = 1 條；✅ 已覆蓋、⚠️ 部分、❌ 研究缺口。' + M.note;
    $('#nowGaps').innerHTML = A.gaps.map(function (g) { return card('<h4>' + esc(g.name) + '</h4><p>' + esc(g.detail) + '</p><div class="meta"><span class="tag">' + esc(g.where) + '</span></div>'); }).join('');
  }
  function renderThreads(q) {
    q = (q || '').toLowerCase();
    $('#threadList').innerHTML = A.threads.filter(function (t) { return !q || (t.name + t.domain + t.keywords.join(' ') + t.summary).toLowerCase().indexOf(q) >= 0; }).map(function (t) {
      return '<div class="thread" data-go="' + t.id + '"><span class="name">' + esc(t.name) + '</span><span class="status">' + esc(t.status) + ' · ' + esc(t.domain) + '</span><p class="sum">' + esc(t.summary) + '</p><div class="kw">' + t.keywords.map(function (k) { return '<span>' + esc(k) + '</span>'; }).join('') + (t.nodes || []).map(function (n) { return N[n] ? '<span style="color:var(--accent)">' + esc(N[n].label) + '</span>' : ''; }).join('') + '</div></div>';
    }).join('');
  }
  function renderSources() {
    $('#sourcesLede').textContent = '分母側與分子側的結構、燈號、裁決與日期來自個人 Notion 知識庫「投資系統 3.0」（DOC-3 截至 ' + A.notionAsOf.doc3 + '、DOC-9 截至 ' + A.notionAsOf.doc9 + '、DOC-8 截至 ' + A.notionAsOf.doc8 + '）。每個 Tier 1 節點另以 ' + A.asOf + ' 檢索的公開資料補上最新讀數，兩者分開標示、互不覆寫。';
    $('#sourcesNotion').innerHTML = ['DOC-3 物理瓶頸圖譜：§0.0 焦點瓶頸儀表板、§0.5 母原理實證地圖、§1 信用流 × 瓶頸矩陣、§6 追趕時鐘、收費站耐久度指數、Layer B 控制者圖譜、整合瓶頸資料庫、瓶頸節點動態表',
      'DOC-9 分子側機制圖譜：§9.1 四維台帳、§9.2 管道地圖、§7 傳導鏈、§8 可抵押性分界、§10 接力貨幣化、§11 貨幣區、§12 行為者自陳、§13 恆等式偽裝、§14 補線提案規格缺陷',
      'DOC-8 主題回顧索引：索引表（thread 登記簿）、BOTTLENECK-MIGRATION-RELAY、800V-HVDC-POWER-TOLLBOOTH、FRAMEWORK-TURNINGPOINT-PIVOT、DOC8-L11 現行 log'].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    $('#sourcesPublic').innerHTML = A.sources.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>' + (N[s.topic] ? ' <span class="chip" data-go="' + esc(s.topic) + '">' + esc(N[s.topic].label) + '</span>' : '') + '</li>'; }).join('');
  }

  renderFlowView(); renderNowView(); renderThreads(''); renderSources();
  $('#threadSearch').addEventListener('input', function (e) { renderThreads(e.target.value); });

  /* 啟動 */
  var p = parseHash();
  showView(p.view);
  if (p.id) select(p.id, true);
})();

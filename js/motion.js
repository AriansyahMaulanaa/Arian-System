/* =============================================================
   AKSARA — MESIN MOTION v3
   Replika mesin appear rujukan (type:spring, bounce, delay) yang
   digerakkan setelah Preloader selesai. js/main.js tidak disentuh:
   kelas .is-visible tetap diulisnya, spring mengambil alih nilai
   akhir dengan gaya inline.
   ============================================================= */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.querySelector('.preloader');

  /* Gerak dihormati / tanpa preloader: biarkan main.js + CSS bekerja */
  if (reduce || !preloader) {
    if (preloader) {
      preloader.dataset.done = '1';
      preloader.remove();
    }
    document.querySelector('.giant')?.classList.add('is-type-revealed');
    return;
  }

  /* ---------- Solver spring: (durasi, bounce) → (k, c) -------------
     Kontak sama dengan rujukan: respons menetap tepat pada "durasi",
     damping ratio = 1 − bounce. Frekuensi alami dicari binarti lewat
     simulasi semi-implisit.                                             */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function solveSpring(duration, bounce) {
    const zeta = clamp(1 - bounce, 0.05, 1);
    const dt = 1 / 120;

    function settleTime(w0) {
      const c = 2 * zeta * w0;
      const k = w0 * w0;
      let x = 0, v = 0, t = 0, calm = 0;
      while (t < 10) {
        const a = -k * (x - 1) - c * v;
        v += a * dt;
        x += v * dt;
        t += dt;
        if (Math.abs(x - 1) < 0.005 && Math.abs(v) < 0.05) {
          calm += dt;
          if (calm >= 0.12) return t - calm;
        } else {
          calm = 0;
        }
      }
      return Infinity;
    }

    /* waktu-settle turun saat w0 naik → potong dua */
    let lo = 0.5, hi = 80;
    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2;
      if (settleTime(mid) > duration) lo = mid; else hi = mid;
    }
    const w0 = (lo + hi) / 2;
    return { k: w0 * w0, c: 2 * zeta * w0 };
  }

  /* ---------- Pelari spring (transform + opacity) ------------------ */
  const tCache = new Map();
  const live = [];
  let ticking = 0;
  let lastNow = 0;

  function compose(o, baseTransform) {
    const parts = [];
    if (baseTransform && baseTransform !== 'none') parts.push(baseTransform);
    if (o?.y !== undefined && o.y !== 0) parts.push(`translateY(${o.y.toFixed(2)}px)`);
    if (o?.x !== undefined && o.x !== 0) parts.push(`translateX(${o.x.toFixed(2)}px)`);
    if (o?.scale !== undefined && o.scale !== 1) parts.push(`scale(${Math.max(o.scale, 0).toFixed(4)})`);
    return parts.length ? parts.join(' ') : 'none';
  }

  function theLoop(now) {
    const dtTotal = Math.min(Math.max((now - lastNow) / 1000, 0), 1 / 30);
    lastNow = now;
    const steps = Math.max(1, Math.ceil(dtTotal / (1 / 180)));
    const sub = dtTotal / steps;

    for (let i = live.length - 1; i >= 0; i--) {
      const s = live[i];
      s.t += dtTotal;
      if (s.t < s.delay) continue;

      let done = true;
      for (const key in s.props) {
        const p = s.props[key];
        if (p.settled) continue;
        for (let n = 0; n < steps; n++) {
          const a = -p.k * (p.x - 1) - p.c * p.v;
          p.v += a * sub;
          p.x += p.v * sub;
        }
        if (p.x > 0.999 && Math.abs(p.v) < 0.06) {
          p.x = 1;
          p.settled = true;
        } else {
          done = false;
        }
        const value = p.from + (p.to - p.from) * Math.max(0, p.x);
        if (key === 'opacity') {
          s.el.style.opacity = value.toFixed(3);
        } else {
          let o = tCache.get(s.el);
          if (!o) { o = {}; tCache.set(s.el, o); }
          o[key] = value;
        }
      }

      if (done) {
        const o = tCache.get(s.el);
        if (o) for (const key in s.props) o[key] = key === 'opacity' ? 1 : (key === 'y' || key === 'x') ? 0 : key === 'scale' ? 1 : o[key];
        if (s.originalOpacity.value) s.el.style.setProperty('opacity', s.originalOpacity.value, s.originalOpacity.priority);
        else s.el.style.removeProperty('opacity');
        delete s.el.dataset.spring;
        if (s.originalTransform.value) s.el.style.setProperty('transform', s.originalTransform.value, s.originalTransform.priority);
        else s.el.style.removeProperty('transform');
        if (s.originalTransition.value) s.el.style.setProperty('transition', s.originalTransition.value, s.originalTransition.priority);
        else s.el.style.removeProperty('transition');
        s.el.classList.add('is-appeared');
        live.splice(i, 1);
      }
    }

    /* tulis transform gabungan sekali per kabar */
    for (const s of live) {
      const o = tCache.get(s.el);
      s.el.style.transform = compose(o, s.baseTransform);
    }

    if (live.length) {
      ticking = requestAnimationFrame(theLoop);
    } else {
      ticking = 0;
    }
  }

  function spring(el, spec, delayMs) {
    if (!el || el.dataset.spring === 'on') return;
    el.dataset.spring = 'on';
    const originalTransform = { value: el.style.getPropertyValue('transform'), priority: el.style.getPropertyPriority('transform') };
    const originalOpacity = { value: el.style.getPropertyValue('opacity'), priority: el.style.getPropertyPriority('opacity') };
    const originalTransition = { value: el.style.getPropertyValue('transition'), priority: el.style.getPropertyPriority('transition') };
    el.style.transition = 'none';               /* netralkan transisi CSS kelas */

    const [duration, bounce] = spec.spring;
    const { k, c } = solveSpring(duration, bounce);
    const props = {};
    let o = tCache.get(el);
    if (!o) { o = {}; tCache.set(el, o); }

    /* Simpan transform tata letak/rotasi supaya gerak masuk menumpang di atasnya. */
    const baseTransform = getComputedStyle(el).transform;

    for (const key in spec.from) {
      const from = spec.from[key];
      const to = key === 'opacity' ? 1 : key === 'scale' ? 1 : 0;
      props[key] = { from, to, x: 0, v: 0, k, c, settled: false };
      if (key === 'opacity') el.style.opacity = String(from);
      else o[key] = from;
    }
    el.style.transform = compose(o, baseTransform);

    live.push({ el, props, baseTransform, originalTransform, originalOpacity, originalTransition, t: 0, delay: (delayMs || 0) / 1000 });
    if (!ticking) {
      lastNow = performance.now();
      ticking = requestAnimationFrame(theLoop);
    }
  }

  /* ---------- Katalog koreografi (bounce & durasi ala rujukan) ----- */
  const SPR = {
    pop:   { from: { scale: 0.5, opacity: 0.001 },        spring: [1, 0.2] },
    rise:  { from: { y: 30, opacity: 0.001 },             spring: [0.85, 0.25] },
    popS:  { from: { y: 16, scale: 0.96, opacity: 0.001 }, spring: [0.8, 0.3] },
    popR:  { from: { y: 14, scale: 0.985, opacity: 0.001 }, spring: [1.05, 0.06] },
    giant: { from: { y: 120, opacity: 0.001 },            spring: [1, 0.18] },
    chip:  { from: { y: 16, opacity: 0.001 },             spring: [0.7, 0.3] },
  };

  /* ---------- Daftar elemen + jeda berjenjang dari main.js -------- */
  const byEl = new Map();
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    byEl.set(el, {
      spec: SPR.popR,
      delay: parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0,
    });
  });

  /* Kelompok yang TIDAK diatur main.js (beserta jarak pergulungannya)
     — agar kartu & sel masuk pop berurutan, bukan serentak.          */
  [['.mode-grid', 110], ['.flow-steps', 95], ['.postcard-grid', 120], ['.faq-list', 60]]
    .forEach(([sel, step]) => {
      document.querySelectorAll(sel).forEach((container) => {
        [...container.children].forEach((child, i) => {
          const cur = byEl.get(child);
          if (cur && !cur.delay) cur.delay = i * step;
        });
      });
    });

  const cells = [...document.querySelectorAll('.nav-links a'), document.querySelector('.nav-cta')].filter(Boolean);
  const stripItems = [...document.querySelectorAll('.hero-strip > *')];
  const reelEl = document.querySelector('.hero-reel');
  const bottomItems = [...document.querySelectorAll('.hero-bottom > *')];
  const giantEl = document.querySelector('.giant');

  /* ---------- Kata raksasa: pas-lebar seperti rujukan -------------
     Ukur lebar/tinggi TINTA huruf via canvas (presisi, bebas dari
     sel baris) lalu tulis viewBox supaya svg meregang pas lebar.   */
  function fitGiant() {
    let ctx = null;
    document.querySelectorAll('.giant svg').forEach((svg) => {
      const textEl = svg.querySelector('text');
      if (!textEl) return;
      const word = (textEl.textContent || '').trim().toUpperCase();
      if (!word) return;
      const ls = parseFloat(getComputedStyle(textEl).letterSpacing) || 0;
      if (!ctx) ctx = document.createElement('canvas').getContext('2d');
      try { ctx.letterSpacing = `${ls}px`; } catch (err) { /* browser lama: abaikan */ }
      ctx.font = '100px ' + (getComputedStyle(textEl).fontFamily || 'Anton');
      const m = ctx.measureText(word);
      const left = -m.actualBoundingBoxLeft;
      const top = -m.actualBoundingBoxAscent;
      const w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      if (w > 10 && h > 10) {
        svg.setAttribute('viewBox', `${left.toFixed(2)} ${top.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`);
      }
    });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(fitGiant));
    document.fonts.load('100px Anton').then(() => requestAnimationFrame(fitGiant)).catch(() => fitGiant());
  }
  requestAnimationFrame(fitGiant);

  /* ---------- Pasang keadaan awal sebelum render pertama ---------- */
  const springItem = (el, spec, delay) => { if (el) spring(el, spec, delay); };

  function deployStart(base) {
    cells.forEach((el, i) => springItem(el, SPR.pop, base + i * 55));
    stripItems.forEach((el, i) => springItem(el, SPR.chip, base + 120 + i * 70));
    if (giantEl) {
      giantEl.classList.add('is-type-revealed');
      springItem(giantEl, SPR.giant, base + 200);
    }
    if (reelEl) springItem(reelEl, SPR.popS, base + 380);
    bottomItems.forEach((el, i) => springItem(el, SPR.chip, base + 540 + i * 100));

    /* [data-reveal] yang sedang tampil di port (main.js sempat
       menghidupkannya di balik preloader) → masuk panggung pembuka */
    let k = 0;
    byEl.forEach((info, el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
        spring(el, info.spec, base + 640 + info.delay + Math.min(k++, 3) * 90);
        byEl.delete(el);
      }
    });

    /* sisanya: muncul saat digulir (IO sendiri, selaras main.js) */
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          const info = byEl.get(el);
          if (!info) return;
          byEl.delete(el);
          spring(el, info.spec, info.delay);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
      byEl.forEach((info, el) => io.observe(el));
    } else {
      byEl.forEach((info, el) => spring(el, info.spec, info.delay));
      byEl.clear();
    }

    /* ---------- Jaring pengaman: tak ada sel yang tersisih ----------
       Lompatan besar gulir (klik tautan #, seret scrollbar) bisa
       menyeberangi jendela deteksi IO; sapuan berkala memastikan
       segala yang menampak berpotongan tetap ber-spring.              */
    const safetySweep = setInterval(() => {
      if (!byEl.size) { clearInterval(safetySweep); return; }
      const vh = window.innerHeight;
      byEl.forEach((info, el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -60) {
          spring(el, info.spec, info.delay);
          byEl.delete(el);
        }
      });
    }, 280);
  }

  /* ---------- Preloader ------------------------------------------- */
  document.body.classList.add('is-preloading');

  const elCount = document.getElementById('pre-count');
  const elStatus = document.getElementById('pre-status');
  const elFill = document.querySelector('.pre-fill');
  const colLines = [...document.querySelectorAll('.pre-col-line')];
  const DUR = 3.1;
  const PHRASES = ['Menyiapkan sistem', 'Memuat modul', 'Menyusun antrean', 'Mengunci data'];
  let phrase = 0;

  const bumpStatus = (text) => {
    if (!elStatus) return;
    const inner = elStatus.firstElementChild;
    if (!inner) return;
    inner.style.transition = 'transform .24s ease';
    inner.style.transform = 'translateY(-112%)';
    setTimeout(() => {
      inner.style.transition = 'none';
      inner.textContent = text;
      inner.style.transform = 'translateY(112%)';
      void inner.offsetHeight;
      inner.style.transition = 'transform .3s cubic-bezier(.22,1,.36,1)';
      inner.style.transform = 'translateY(0)';
    }, 240);
  };

  preloader.classList.add('is-on');

  const t0 = performance.now();
  let lastPhrase = 0;
  let exited = false;

  function preLoop(now) {
    if (exited) return;
    const t = (now - t0) / 1000;
    const p = Math.min(1, t / DUR);
    const shown = Math.floor(p * 100 + 0.0001);

    if (elCount) elCount.textContent = String(shown).padStart(3, '0');
    if (elFill) elFill.style.transform = `scaleX(${p})`;
    colLines.forEach((line, i) => {
      line.style.transform = `scaleY(${clamp(p * colLines.length - i, 0, 1)})`;
    });

    if (t - lastPhrase > 0.62 && p < 1) {
      bumpStatus(PHRASES[phrase % PHRASES.length]);
      phrase++; lastPhrase = t;
    }
    if (p >= 1 && t - lastPhrase > 0.35) {
      bumpStatus('Siap.');
      lastPhrase = t + 99;
      setTimeout(exitPreloader, 420);
      return;
    }
    requestAnimationFrame(preLoop);
  }

  function exitPreloader() {
    if (exited) return;
    exited = true;
    preloader.classList.add('is-exit');
    window.__preloaderRealExit = true;
    setTimeout(() => {
      preloader.dataset.done = '1';
      preloader.remove();
      document.body.classList.remove('is-preloading');
      fitGiant();
      deployStart(0.05);
    }, 700);
  }

  requestAnimationFrame(preLoop);
})();

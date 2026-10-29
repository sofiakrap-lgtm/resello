/* mascot-scene.js: kaksi maskottikohtausta giveasy.ru:n mallilla (mitattu 29.10.2026).

   1) data-scene="roll"  Fysiikkakohtaus. Muodot putoavat sivuilta kaareen, vierivät ja asettuvat lappeelleen
      pohjalle. Niihin voi tarttua hiirellä tai sormella ja ne voi heittää. Muoto ei koskaan mene maan puolelle.
   2) data-scene="pop"   Kaksi isoa maskottia ponnahtaa jousella esiin kaaren takaa, kun osio
      tulee näkyviin, ja painuu takaisin, kun osio poistuu. Silmät seuraavat kursoria.

   Merkintä:
   <section class="scene" data-scene="roll" data-edge="180" data-ctrl="530">
     <svg class="scene__bg" viewBox="0 0 1000 500" preserveAspectRatio="none"><path class="scene__ground" d=""/></svg>
     <div class="scene__slot"><svg viewBox="0 0 100 100"> ... <g data-pupil> ... </svg></div>  (yksi per maskotti)
   </section>
   Kaaren muoto koordinaatistossa 1000 x 500: y = edge reunoilla, ctrl = Bezier-kontrollipiste (syvyys). */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: -1e4, y: -1e4, active: false };
  addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; }, { passive: true });

  /* ---------- yhteiset ---------- */
  const curveY = (t, edge, ctrl) => (edge * (1 - t) * (1 - t) + 2 * ctrl * t * (1 - t) + edge * t * t) / 500; // 0..1 korkeudesta
  const gaze = (slot, cx, cy, angle, range = 3.5) => {
    const pupils = slot._pupils || (slot._pupils = [...slot.querySelectorAll('[data-pupil]')]);
    if (!pupils.length) return;
    let dx = pointer.x - cx, dy = pointer.y - cy; const d = Math.hypot(dx, dy) || 1;
    const f = pointer.active ? Math.min(1, d / 400) : 0; dx = dx / d * f; dy = dy / d * f;
    const c = Math.cos(-angle), s = Math.sin(-angle); // huomioi rungon kierto (giveasy: gaze 1)
    const lx = dx * c - dy * s, ly = dx * s + dy * c;
    pupils.forEach(p => { p.style.transform = `translate(${lx * range}px, ${ly * range}px)`; });
  };

  /* ---------- 1) ROLL: jäykän kappaleen fysiikka ----------
     Muodot putoavat sivulta kaareen, vierivät ja liukuvat painovoiman ja kitkan mukaan ja asettuvat
     lappeelleen kaaren pohjalle. Törmäys lasketaan muodon OIKEASTA ääriviivasta (näytteet SVG:stä),
     joten mikään osa muodosta ei koskaan mene maan (ruskean) puolelle. */
  const P = { size: 0.46, speed: 0.75, spread: 0.2, drop: 0.12, gap: 380, jitter: 120,
    gravity: 2.08, restitution: 0.18, friction: 0.55, air: 0.35, spin: 1.2, inertia: 0.42,
    fit: 0.9, pad: 12, gapPx: 4, stick: 11, throwMax: 2.2, iter: 6, samples: 64 }; // muodot pysyvät aina kokonaan näkyvissä osion sisällä

  function outline(svg, size) { // ääriviivan pisteet kappaleen keskipisteen ympärillä, px
    const vb = svg.viewBox.baseVal, k = size / vb.width, pts = [];
    svg.querySelectorAll('path, rect, circle, ellipse, polygon').forEach(g => {
      if (!g.getTotalLength) return; const L = g.getTotalLength();
      for (let i = 0; i < P.samples; i++) { const q = g.getPointAtLength(L * i / P.samples); pts.push([(q.x - vb.x - vb.width / 2) * k, (q.y - vb.y - vb.height / 2) * k]); }
    });
    return pts;
  }

  function roll(el) {
    const edge = +el.dataset.edge || 180, qy = +el.dataset.ctrl || 530;
    const p = el.querySelector('.scene__ground'); if (p) p.setAttribute('d', `M0 ${edge} Q500 ${qy} 1000 ${edge} L1000 500 L0 500 Z`);
    const slots = [...el.querySelectorAll('.scene__slot')];
    let W, H, started = false, last = 0, grabbed = null;
    const groundY = x => { const t = Math.min(1, Math.max(0, x / W)); return (edge * (1 - t) * (1 - t) + 2 * qy * t * (1 - t) + edge * t * t) / 500 * H; };
    const groundN = x => { const t = Math.min(1, Math.max(0, x / W)); const s = (2 * (qy - edge) * (1 - 2 * t)) / 500 * H / W; const n = Math.hypot(s, 1); return [s / n, -1 / n]; }; // ylöspäin osoittava normaali
    const bodies = slots.map(s => ({ el: s, x: -1e4, y: 0, a: 0, vx: 0, vy: 0, w: 0, in: false, sleep: 0, pts: [], size: 0, r: 0 }));

    const layout = () => {
      W = el.clientWidth; H = el.clientHeight;
      let size = P.size * H; const fit = W < 640 ? .78 : P.fit; const total = bodies.length * size; if (total > W * fit) size *= (W * fit) / total;
      bodies.forEach(b => {
        b.size = size; b.el.style.width = b.el.style.height = size + 'px'; b.el.style.transformOrigin = '50% 50%';
        const svg = b.el.querySelector('svg'); b.pts = outline(svg, size);
        b.r = Math.max(...b.pts.map(([x, y]) => Math.hypot(x, y)));
        b.m = 1; b.I = P.inertia * b.r * b.r;
      });
    };
    layout(); el._bodies = bodies; el._ground = x => groundY(x);
    addEventListener('resize', () => { layout(); bodies.forEach(b => b.sleep = 0); });

    const world = (b, [px, py]) => { const c = Math.cos(b.a), s = Math.sin(b.a); return [b.x + px * c - py * s, b.y + px * s + py * c, px * c - py * s, px * s + py * c]; };
    const settleAt = (b, x) => { // lepoasento: aseta kappale koskemaan maata pohjasta
      b.x = x; b.a = 0; b.y = 0; let maxPen = -1e9;
      for (const q of b.pts) { const [wx, wy] = world(b, q); maxPen = Math.max(maxPen, wy - groundY(wx)); } b.y -= maxPen;
    };

    if (reduce) { // staattinen: rinnakkain kaaren pohjalla
      const span = bodies.length * bodies[0].size; let x = W / 2 - span / 2 + bodies[0].size / 2;
      bodies.forEach(b => { settleAt(b, x); b.in = true; x += b.size; }); render(); return;
    }

    const start = () => {
      if (started) return; started = true; let t = 0;
      bodies.forEach((b, k) => {
        setTimeout(() => {
          const left = k % 2 === 0; const sp = P.speed * W * (1 + (Math.random() * 2 - 1) * P.spread);
          // syntyy kokonaan näkyvänä osion yläkulmaan ja putoaa kaareen
          b.a = (Math.random() - .5) * .4; b.x = left ? P.pad + b.r : W - P.pad - b.r; b.y = P.pad + b.r;
          b.vx = left ? sp : -sp; b.vy = 0; b.w = (left ? 1 : -1) * 1.5; b.in = true; b.sleep = 0;
        }, t);
        t += P.gap + (Math.random() * 2 - 1) * P.jitter;
      });
    };
    new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) start(); }), { threshold: 0.3 }).observe(el);

    slots.forEach((s, i) => {
      const pos = e => { const R = el.getBoundingClientRect(); return [e.clientX - R.left, e.clientY - R.top]; };
      s.addEventListener('pointerdown', e => { grabbed = bodies[i]; grabbed.sleep = 0; [grabbed.tx, grabbed.ty] = pos(e); s.setPointerCapture(e.pointerId); s.classList.add('is-grabbed'); e.preventDefault(); });
      s.addEventListener('pointermove', e => { if (grabbed === bodies[i]) [grabbed.tx, grabbed.ty] = pos(e); });
      const up = () => { if (grabbed !== bodies[i]) return; const m = P.throwMax * W, sp = Math.hypot(grabbed.vx, grabbed.vy); if (sp > m) { grabbed.vx *= m / sp; grabbed.vy *= m / sp; } s.classList.remove('is-grabbed'); grabbed = null; };
      s.addEventListener('pointerup', up); s.addEventListener('pointercancel', up);
    });

    // impulssi kosketuspisteessä (r = vektori keskipisteestä), normaali n
    const contact = (b, rx, ry, nx, ny, e) => {
      const vcx = b.vx - b.w * ry, vcy = b.vy + b.w * rx; const vn = vcx * nx + vcy * ny;
      if (vn >= 0) return;
      const rn = rx * ny - ry * nx, j = -(1 + (vn < -120 ? e : 0)) * vn / (1 / b.m + rn * rn / b.I);
      b.vx += j * nx / b.m; b.vy += j * ny / b.m; b.w += rn * j / b.I;
      const tx = -ny, ty = nx; const vt = (b.vx - b.w * ry) * tx + (b.vy + b.w * rx) * ty;
      const rt = rx * ty - ry * tx; let jt = -vt / (1 / b.m + rt * rt / b.I); const lim = P.friction * j; jt = Math.max(-lim, Math.min(lim, jt));
      b.vx += jt * tx / b.m; b.vy += jt * ty / b.m; b.w += rt * jt / b.I;
    };

    function step(dt) {
      const g = P.gravity * W;
      for (const b of bodies) {
        if (!b.in || (b.sleep > .6 && b !== grabbed)) continue;
        if (b === grabbed) { b.vx += ((b.tx - b.x) * P.stick - b.vx) * Math.min(1, dt * 12); b.vy += ((b.ty - b.y) * P.stick - b.vy) * Math.min(1, dt * 12); b.w *= 1 - Math.min(1, dt * 6); }
        else { b.vy += g * dt; const k = Math.max(0, 1 - P.air * dt); b.vx *= k; b.vy *= k; b.w *= Math.max(0, 1 - P.spin * dt); }
        b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.w * dt;
      }
      const groundFix = (b, impulse) => { // maa: syvin ääriviivapiste ruskean puolella nostetaan pintaan
        let best = null, pen = 0;
        for (const q of b.pts) { const [wx, wy, rx, ry] = world(b, q); const d = wy - groundY(wx); if (d > pen) { pen = d; best = [wx, rx, ry]; } }
        if (!best) return;
        const [nx, ny] = groundN(best[0]), corr = pen * -ny; b.x += nx * corr; b.y += ny * corr;
        if (impulse) contact(b, best[1], best[2], nx, ny, P.restitution);
      };
      const wallFix = (b, impulse) => { // seinät ja yläreuna: koko ääriviiva pysyy osion sisällä
        let minX = 1e9, maxX = -1e9, minY = 1e9, lp = null, rp = null;
        for (const q of b.pts) { const w = world(b, q); if (w[0] < minX) { minX = w[0]; lp = w; } if (w[0] > maxX) { maxX = w[0]; rp = w; } minY = Math.min(minY, w[1]); }
        if (minX < P.pad) { b.x += P.pad - minX; if (impulse) contact(b, lp[2], lp[3], 1, 0, .1); }
        if (maxX > W - P.pad) { b.x -= maxX - (W - P.pad); if (impulse) contact(b, rp[2], rp[3], -1, 0, .1); }
        if (minY < P.pad) { b.y += P.pad - minY; b.vy = Math.max(0, b.vy); }
      };
      for (let it = 0; it < P.iter; it++) {
        for (const b of bodies) if (b.in) wallFix(b, it === 0);
        // kappaleet keskenään (sisäympyrä, rako gapPx)
        for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
          const A = bodies[i], B = bodies[j]; if (!A.in || !B.in) continue;
          const rA = A.size * .47, rB = B.size * .47, dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || .01, min = rA + rB + P.gapPx;
          if (d < min) {
            const nx = dx / d, ny = dy / d, pen2 = min - d, wa = A === grabbed ? .15 : 1, wb = B === grabbed ? .15 : 1, ws = wa + wb;
            A.x -= nx * pen2 * wa / ws; A.y -= ny * pen2 * wa / ws; B.x += nx * pen2 * wb / ws; B.y += ny * pen2 * wb / ws;
            A.sleep = B.sleep = 0;
            if (it === 0) { const rv = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny; if (rv < 0) { const jj = -(1 + .1) * rv / 2; A.vx -= jj * nx; A.vy -= jj * ny; B.vx += jj * nx; B.vy += jj * ny; } }
          }
        }
        for (const b of bodies) if (b.in) groundFix(b, it === 0); // maa viimeisenä: ruskea voittaa aina
      }
      for (let f = 0; f < 3; f++) for (const b of bodies) if (b.in) { wallFix(b, false); groundFix(b, false); }
      for (const b of bodies) { // lepotila: pieni liike sammutetaan, jotta muodot eivät väreile
        if (!b.in || b === grabbed) continue;
        const slow = Math.hypot(b.vx, b.vy) < 12 && Math.abs(b.w) < .08;
        b.sleep = slow ? b.sleep + dt : 0; if (b.sleep > .6) { b.vx = b.vy = b.w = 0; }
      }
    }
    function render() {
      for (const b of bodies) {
        if (!b.in) { b.el.style.opacity = 0; continue; }
        b.el.style.opacity = 1;
        b.el.style.transform = `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0) rotate(${b.a}rad)`;
      }
    }
    const loop = now => {
      const dt = Math.min(1 / 30, (now - (last || now)) / 1000); last = now;
      const R = el.getBoundingClientRect();
      if (started && R.bottom > -200 && R.top < innerHeight + 200) { for (let k = 0; k < 4; k++) step(dt / 4); render(); }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- 2) POP: jousiponnahdus ---------- */
  function pop(el) {
    const edge = +el.dataset.edge || 300, qy = +el.dataset.ctrl || 690;
    const p = el.querySelector('.scene__ground'); if (p) p.setAttribute('d', `M0 ${edge} Q500 ${qy} 1000 ${edge} L1000 500 L0 500 Z`);
    const slots = [...el.querySelectorAll('.scene__slot')];
    const rot = (el.dataset.rotate || '208,-29').split(',').map(Number);
    const zoom = (el.dataset.zoom || '1,1.05').split(',').map(Number);
    const C = { width: 0.45, center: 0.5, gap: 0.03, top: 0.14, // top: tila yläreunaan jousen ylilyönnille, osuus korkeudesta
      enter: { dur: 700, gap: 260, delay: 120, ease: 'cubic-bezier(.34,1.56,.64,1)', tilt: 8, scale: .94, drift: .05 },
      exit: { dur: 380, gap: 90, ease: 'cubic-bezier(.36,0,.66,-.3)' } };
    let shown = false, pos = [];
    const layout = () => {
      const W = el.clientWidth, H = el.clientHeight;
      // Muodot näkyvät aina kokonaisina: kierretyn muodon alareuna jää maan yläpuolelle koko leveydeltä
      // ja yläreunaan jää tilaa jousen ylilyönnille. Liian iso muoto pienennetään.
      const gY = x => curveY(Math.min(1, Math.max(0, x / W)), edge, qy) * H;
      const ext = (w, i) => { const a = Math.abs((rot[i] || 0) * Math.PI / 180); return w * (Math.abs(Math.cos(a)) + Math.abs(Math.sin(a))) / 2; };
      let k = 1;
      for (let tries = 0; tries < 40; tries++) {
        const ws = slots.map((s, i) => C.width * W * (zoom[i] || 1) * (W < 640 ? 1.25 : 1) * k);
        const es = ws.map((w, i) => ext(w, i));
        const total = es.reduce((a, b) => a + 2 * b, 0) + C.gap * W * (slots.length - 1);
        let x = C.center * W - total / 2, ok = total <= W - 16;
        pos = slots.map((s, i) => {
          const w = ws[i], e = es[i], cx = x + e; x += 2 * e + C.gap * W;
          let g = Infinity; for (let t = -e; t <= e; t += e / 8) g = Math.min(g, gY(cx + t));
          const cy = g - e - 4; if (cy - e < C.top * H) ok = false;
          return { x: cx - w / 2, y: cy - w / 2, w, out: cx < W / 2 ? -1 : 1, H, W };
        });
        if (ok) break; k *= 0.95;
      }
      pos.forEach((P0, i) => { slots[i].style.width = slots[i].style.height = P0.w + 'px'; });
      apply(false);
    };
    const apply = instant => slots.forEach((s, i) => {
      const P0 = pos[i]; if (!P0) return;
      const hidden = `translate(${P0.x + P0.out * C.enter.drift * P0.W}px, ${P0.H + 20}px) rotate(${(rot[i] || 0) + P0.out * C.enter.tilt}deg) scale(${C.enter.scale})`;
      const visible = `translate(${P0.x}px, ${P0.y}px) rotate(${rot[i] || 0}deg) scale(1)`;
      if (instant !== undefined) s.style.transition = 'none';
      s.style.transform = shown ? visible : hidden; s._ang = (rot[i] || 0) * Math.PI / 180;
      if (instant !== undefined) { void s.offsetWidth; s.style.transition = ''; }
    });
    const show = on => {
      if (on === shown) return; shown = on;
      const order = on ? slots : slots.slice().reverse();
      order.forEach((s, k) => {
        const T = on ? C.enter : C.exit;
        s.style.transition = `transform ${T.dur}ms ${T.ease} ${(on ? C.enter.delay : 0) + k * T.gap}ms`;
      });
      apply();
    };
    layout(); addEventListener('resize', layout);
    if (reduce) { shown = true; apply(true); return; }
    new IntersectionObserver(es => es.forEach(e => { if (e.intersectionRatio >= .35) show(true); else if (e.intersectionRatio < .25) show(false); }), { threshold: [0, .25, .35, .6] }).observe(el);
    const loop = () => { const R = el.getBoundingClientRect(); if (R.bottom > 0 && R.top < innerHeight) slots.forEach((s, i) => { const b = s.getBoundingClientRect(); gaze(s, b.left + b.width / 2, b.top + b.height / 2, s._ang || 0, 3.5); }); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  document.querySelectorAll('[data-scene="roll"]').forEach(roll);
  document.querySelectorAll('[data-scene="pop"]').forEach(pop);
})();

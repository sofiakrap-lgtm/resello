/* mascot-follow.js: ReSellan maskotit seuraavat hiirtä.
   Ei kirjastoja. Toimii inline-SVG-maskoteilla.

   Merkintä HTML:ssä:
   <div class="mascot" data-mascot data-strength="1">
     <svg viewBox="0 0 100 100">
       <g data-body> ...koko hahmo...
         <g data-pupil> ...vasen pupilli... </g>
         <g data-pupil> ...oikea pupilli... </g>
       </g>
     </svg>
   </div>

   - data-body:   koko hahmo kallistuu ja siirtyy hieman kursoria kohti.
   - data-pupil:  pupillit liukuvat kursorin suuntaan silmän sisällä.
   - data-strength: 0.5 = rauhallinen, 1 = oletus, 1.5 = innokas.
   - data-eye-range: pupillin maksimisiirtymä viewBox-yksiköissä (oletus 3.5).
   Jos maskotti on valmis animoitu SVG ilman erillisiä pupilleja, merkitse vain data-body:
   silloin hahmo kallistuu ja kääntyy, mutta silmät eivät liiku. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const els = [...document.querySelectorAll('[data-mascot]')];
  if (!els.length || reduce) return; // reduced motion: maskotit pysyvät paikallaan

  const LERP = 0.12;          // pehmennys per frame (0.08 laiska, 0.2 terävä)
  const BODY_MOVE = 6;        // px, rungon maksimisiirtymä kohti kursoria
  const BODY_TILT = 4;        // astetta, maksimikallistus
  const IDLE_AFTER = 2500;    // ms ilman liikettä -> palaa keskelle ja idle-loop jatkuu
  const REACH = 600;          // px, etäisyys jolla vaikutus on täysi

  const state = els.map(el => ({
    el,
    body: el.querySelector('[data-body]') || el,
    pupils: [...el.querySelectorAll('[data-pupil]')],
    k: parseFloat(el.dataset.strength || 1),
    eye: parseFloat(el.dataset.eyeRange || 3.5),
    cur: { x: 0, y: 0 }, tgt: { x: 0, y: 0 }, visible: true
  }));
  state.forEach(s => s.pupils.forEach(p => { p.style.transformBox = 'fill-box'; }));

  let px = innerWidth / 2, py = innerHeight / 2, last = 0;
  const onMove = (x, y) => { px = x; py = y; last = performance.now(); document.documentElement.classList.add('mascots-tracking'); };
  if (fine) addEventListener('pointermove', e => onMove(e.clientX, e.clientY), { passive: true });
  // Kosketuslaitteet: maskotit katsovat vierityksen suuntaan (ylös/alas) ja kosketuskohtaan
  addEventListener('touchstart', e => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
  let sy = scrollY;
  addEventListener('scroll', () => { if (fine) return; const d = scrollY - sy; sy = scrollY; onMove(innerWidth / 2, d > 0 ? innerHeight : 0); }, { passive: true });

  // Vain näkyvät maskotit lasketaan
  const io = new IntersectionObserver(es => es.forEach(e => { const s = state.find(x => x.el === e.target); if (s) s.visible = e.isIntersecting; }));
  state.forEach(s => io.observe(s.el));

  const tick = now => {
    const idle = now - last > IDLE_AFTER;
    if (idle) document.documentElement.classList.remove('mascots-tracking');
    for (const s of state) {
      if (!s.visible) continue;
      const r = s.el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let dx = px - cx, dy = py - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const f = Math.min(1, dist / REACH);
      s.tgt.x = idle ? 0 : (dx / dist) * f;
      s.tgt.y = idle ? 0 : (dy / dist) * f;
      s.cur.x += (s.tgt.x - s.cur.x) * LERP;
      s.cur.y += (s.tgt.y - s.cur.y) * LERP;
      const k = s.k;
      s.body.style.transform = `translate(${s.cur.x * BODY_MOVE * k}px, ${s.cur.y * BODY_MOVE * 0.6 * k}px) rotate(${s.cur.x * BODY_TILT * k}deg)`;
      s.pupils.forEach(p => { p.style.transform = `translate(${s.cur.x * s.eye}px, ${s.cur.y * s.eye}px)`; });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

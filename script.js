/* ── PRELOADER ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('out'), 1350);
});

/* ── CUSTOM CURSOR ─────────────────────────────────────── */
const dot  = document.getElementById('c-dot');
const ring = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function trackRing() {
  rx += (mx - rx) * .13;
  ry += (my - ry) * .13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(trackRing);
})();

document.querySelectorAll('a, button, .exp-card, .pill, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

/* ── GRAIN ─────────────────────────────────────────────── */
const gc = document.getElementById('grain');
const gx = gc.getContext('2d');

function drawGrain() {
  gc.width  = window.innerWidth;
  gc.height = window.innerHeight;
  const img = gx.createImageData(gc.width, gc.height);
  const d   = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255 | 0;
    d[i] = d[i+1] = d[i+2] = v;
    d[i+3] = 255;
  }
  gx.putImageData(img, 0, 0);
}
drawGrain();
setInterval(drawGrain, 120);
window.addEventListener('resize', drawGrain);

/* ── NAV SCROLL ────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 70);
}, { passive: true });

/* ── SCROLL REVEAL ─────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -56px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── COUNTER ANIMATION ─────────────────────────────────── */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el  = e.target;
    const end = parseInt(el.dataset.target, 10);
    const t0  = performance.now();
    const dur = 1600;
    (function tick(now) {
      const p    = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * end);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.y[data-target]').forEach(el => counterIO.observe(el));

/* ── MAGNETIC BUTTON ───────────────────────────────────── */
const magnet = document.getElementById('magnet-btn');
if (magnet) {
  magnet.addEventListener('mousemove', e => {
    const r  = magnet.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * .28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * .28;
    magnet.style.transform = `translate(${dx}px,${dy}px) translateY(-4px)`;
  });
  magnet.addEventListener('mouseleave', () => {
    magnet.style.transform = '';
  });
}

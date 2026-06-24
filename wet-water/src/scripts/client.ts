import { animate, scroll } from 'motion';

const root = document.documentElement;
root.classList.add('js'); // belt-and-braces; an inline <head> script sets this pre-paint

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- loading splash ----
const splash = document.getElementById('splash');
const splashDrop = document.getElementById('splash-drop');
if (splashDrop && !reduce) {
  animate(splashDrop, { scale: [1, 1.14, 1], opacity: [0.8, 1, 0.8] }, { duration: 1.1, repeat: Infinity, ease: 'easeInOut' });
}
window.setTimeout(() => splash?.classList.add('done'), reduce ? 200 : 1500);

// ---- reveal-on-scroll (IntersectionObserver toggles the .in class).
// Above-the-fold elements (hero) are already intersecting, so they reveal on load. ----
const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
  // Safety net: reveal anything still hidden after 4.5s (e.g. short pages).
  window.setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 4500);
}

// ---- continuous ambient motion (Motion) ----
if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-float]').forEach((el) => {
    const dur = Number(el.dataset.dur ?? 7);
    const delay = Number(el.dataset.delay ?? 0);
    animate(el, { y: [0, -15, 0] }, { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' });
  });

  document.querySelectorAll<HTMLElement>('[data-glow]').forEach((el, i) => {
    animate(el, { opacity: [0.45, 0.85, 0.45], scale: [1, 1.05, 1] }, { duration: 6 + i * 1.5, delay: i, repeat: Infinity, ease: 'easeInOut' });
  });
}

// ---- scroll-linked thermometer (cooling: full at top, drains as you scroll down) ----
const fill = document.getElementById('therm-fill');
if (fill) {
  scroll((progress: number) => {
    fill.style.height = `${(90 - progress * 76).toFixed(1)}%`;
  });
}

// ---- FAQ accordion (single open) ----
const faqItems = Array.from(document.querySelectorAll<HTMLElement>('.faq-item'));
faqItems.forEach((item) => {
  const btn = item.querySelector<HTMLButtonElement>('.faq-q');
  const sign = item.querySelector<HTMLElement>('.sign');
  btn?.addEventListener('click', () => {
    const willOpen = !item.classList.contains('open');
    faqItems.forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      const s = other.querySelector('.sign');
      if (s) s.textContent = '+';
    });
    if (willOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      if (sign) sign.textContent = '–';
    }
  });
});

// ---- cookie banner ----
const cookie = document.getElementById('cookie');
document.querySelectorAll('[data-cookie-dismiss]').forEach((b) =>
  b.addEventListener('click', () => cookie?.classList.add('hidden')),
);

// ---- newsletter ----
const newsForm = document.getElementById('news-form');
const newsThanks = document.getElementById('news-thanks');
newsForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  newsForm.setAttribute('hidden', '');
  newsThanks?.removeAttribute('hidden');
});

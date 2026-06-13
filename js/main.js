// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle) navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => navLinks?.classList.remove('open')));

// Active link
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(l => { if (l.getAttribute('href') === page) l.classList.add('active'); });

// Carousel
class Carousel {
  constructor(el) {
    this.el = el;
    this.slides = [...el.querySelectorAll('.carousel-slide')];
    this.total  = this.slides.length;
    this.cur    = 0;
    el.querySelector('.carousel-prev')?.addEventListener('click', () => this.go(this.cur - 1));
    el.querySelector('.carousel-next')?.addEventListener('click', () => this.go(this.cur + 1));
    this.buildDots();
    this.show(0);
    // Auto-advance
    this.timer = setInterval(() => this.go(this.cur + 1), 5000);
    el.addEventListener('mouseenter', () => clearInterval(this.timer));
    el.addEventListener('mouseleave', () => { this.timer = setInterval(() => this.go(this.cur + 1), 5000); });
  }
  go(n) { this.show(((n % this.total) + this.total) % this.total); }
  show(n) {
    this.slides.forEach((s, i) => s.classList.toggle('active', i === n));
    this.el.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === n));
    this.cur = n;
  }
  buildDots() {
    const wrap = this.el.querySelector('.carousel-dots');
    if (!wrap) return;
    for (let i = 0; i < this.total; i++) {
      const d = document.createElement('button');
      d.className = 'dot'; d.setAttribute('aria-label', `Slide ${i+1}`);
      d.addEventListener('click', () => this.show(i));
      wrap.appendChild(d);
    }
  }
}
document.querySelectorAll('.carousel-wrap').forEach(el => new Carousel(el));

// Minimal forms
document.querySelectorAll('form.form-minimal').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 3500);
  });
});

// Scroll-reveal
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.home-team-card, .founder-card, .assoc-card, .blog-card, .proj-number').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

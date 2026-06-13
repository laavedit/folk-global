// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}
document.querySelectorAll('.nav-links a').forEach(l =>
  l.addEventListener('click', () => navLinks && navLinks.classList.remove('open'))
);

// Active link highlight
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(l => {
  if (l.getAttribute('href') === page) l.classList.add('active');
});

// Navbar border on scroll
window.addEventListener('scroll', () => {
  const nb = document.querySelector('.navbar');
  if (nb) nb.style.borderBottomColor = window.scrollY > 60 ? 'var(--secondary)' : 'var(--primary)';
});

// Contact form
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2c5f2e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// Smooth reveal on scroll
if ('IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.pillar-card, .work-card, .team-card, .blog-card, .involve-card, .value-item, .stat-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; t.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; obs.observe(t); });
}

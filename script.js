// Mobile menu
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');

if (btn && menu) {
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll (optimized)
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute('href');
  const target = document.querySelector(targetId);

  if (!target) return;

  e.preventDefault();

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  menu?.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
});

// Intersection Observer (optimized)
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('visible');

    const bars = el.querySelectorAll('.skill-fill');
    bars.forEach(bar => {
      bar.style.width = `${bar.dataset.width || 0}%`;
    });

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .skill-card')
  .forEach(el => io.observe(el));


// Form handling (SAFE + Lighthouse friendly)
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const button = document.getElementById('submitBtn');

  if (!button) return;

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = 'Sending...';

  setTimeout(() => {
    button.textContent = 'Message Sent ✓';
    button.style.background = '#22c55e';

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
      button.style.background = '';
      form.reset();
    }, 2000);

  }, 700);
}     

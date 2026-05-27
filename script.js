// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── TYPEWRITER ──
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const words = ['Creator', 'Developer', 'Editor', 'Modeler', 'Builder'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const word = words[wordIdx];
    if (!deleting) {
      typeEl.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typeEl.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

// ── ACTIVE NAV ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── SKILL CARD RIPPLE ──
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const href = card.getAttribute('data-href');
    if (href) window.location.href = href;
  });
});

// ── CONSOLE EASTER EGG ──
console.log(
  '%c IvanVoit Portfolio ',
  'background: #00f5a0; color: #090c10; font-size: 16px; font-weight: bold; padding: 6px 12px;'
);
console.log('%c Checkout my GitHub: https://github.com/IvanVoit', 'color: #7d8590; font-size: 12px;');
// --- LÓGICA DE EXPANSIÓN DE TARJETAS ---
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Si haces clic en la imagen del zoom, no cierres la tarjeta
    if (e.target.tagName === 'IMG') return;

    const isActive = card.classList.contains('active');
    
    // Opcional: Cerrar otras tarjetas al abrir una nueva
    document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));

    if (!isActive) {
      card.classList.add('active');
    }
  });
});

// --- LÓGICA DE ZOOM DE IMÁGENES ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("full-image");

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.closest('.skill-details')) {
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

modal.onclick = () => modal.style.display = "none";

document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll effect ─────────────────────────────────
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Mobile Menu ──────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    });
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => navList.classList.remove('active'));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
      }
    });
  }

  // ── Lightbox Galerie ─────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ── Modal Catalogue ──────────────────────────────────────
  window.openModal = (id) => {
    const f = window.formationsData?.find(x => x.id === id);
    if (!f) return;

    const bodyEl = document.getElementById('modal-body');
    const ctaEl  = document.getElementById('modal-cta');
    if (!bodyEl || !ctaEl) return;

    bodyEl.innerHTML = `
      <div class="modal-header">
        <span class="card-tag">${f.category}</span>
        <h2>${f.title}</h2>
      </div>
      <div class="meta-info">
        <div class="meta-item">
          <span class="meta-label">Durée</span>
          <span class="meta-value">${f.duration}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Public</span>
          <span class="meta-value">${f.public}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Tarif</span>
          <span class="meta-value">${f.tarif}</span>
        </div>
      </div>
      <div class="modal-body">
        <h3>Objectifs pédagogiques</h3>
        <ul>${f.objectifs.map(o => `<li>${o}</li>`).join('')}</ul>
      </div>
    `;

    ctaEl.href = `https://wa.me/223XXXXXXXX?text=${encodeURIComponent(f.whatsappMsg)}`;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = () => {
    document.getElementById('modal')?.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelector('.close-modal')?.addEventListener('click', window.closeModal);
  document.getElementById('modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) window.closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeModal(); });

  // ── Entrance animations ──────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .domain-card, .gallery-item, .value-card, .info-card, .testimonial-card, .form-wrapper').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // Listen for animation trigger
  document.addEventListener('animationTrigger', () => {
    document.querySelectorAll('.card, .domain-card, .gallery-item, .value-card, .info-card, .testimonial-card, .form-wrapper').forEach(el => {
      el.classList.add('visible');
    });
  });

  // Add .visible class style dynamically
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

});

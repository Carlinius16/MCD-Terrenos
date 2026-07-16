document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header al hacer scroll + barra de progreso ---------- */
  const header = document.getElementById('header');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrollY = window.scrollY;

    header.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('show', scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menú móvil ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  /* ---------- Animación de aparición al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Contador animado de estadísticas ---------- */
  const stats = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => statsObserver.observe(el));

});

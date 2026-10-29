(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js-ready');
  const nav = document.querySelector('.site-nav');
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const progressBar = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');
  const sections = Array.from(document.querySelectorAll('main section[id], footer[id]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  const setMenu = (open) => {
    if (!navMenu || !menuToggle) return;
    navMenu.classList.toggle('is-open', open);
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      setMenu(!navMenu.classList.contains('is-open'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleDesktopChange = (event) => {
      if (event.matches) setMenu(false);
    };

    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  /* ---------- Estado de scroll: progreso, nav y botón superior ---------- */
  let scrollTicking = false;

  const updateScrollState = () => {
    const scrollTop = window.scrollY || root.scrollTop;
    const scrollable = root.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    if (nav) {
      nav.classList.toggle('is-scrolled', scrollTop > 12);
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrollTop > 700);
    }

    if (sections.length && navLinks.length) {
      const marker = scrollTop + 140;
      let current = sections[0].id;

      sections.forEach((section) => {
        if (section.offsetTop <= marker) current = section.id;
      });

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    scrollTicking = false;
  };

  const requestScrollUpdate = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollState);
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  updateScrollState();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    });
  }

  /* ---------- Aparición de bloques ---------- */
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    revealElements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
      revealObserver.observe(element);
    });
  }

  /* ---------- Contadores ---------- */
  const counters = Array.from(document.querySelectorAll('[data-count]'));

  const animateCounter = (element) => {
    const target = Number.parseFloat(element.dataset.count || '0');
    const decimals = Number.parseInt(element.dataset.decimals || '0', 10);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = (target * eased).toFixed(decimals);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.textContent = target.toFixed(decimals);
      }
    };

    window.requestAnimationFrame(tick);
  };

  if (!prefersReducedMotion && 'IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ---------- Luz que sigue al cursor en el hero ---------- */
  const hero = document.querySelector('.hero');
  const portrait = document.querySelector('.portrait');
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (hero && !prefersReducedMotion && finePointer) {
    hero.addEventListener(
      'pointermove',
      (event) => {
        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hero.style.setProperty('--mx', `${x}px`);
        hero.style.setProperty('--my', `${y}px`);

        if (portrait) {
          const offsetX = (event.clientX / window.innerWidth - 0.5) * 10;
          const offsetY = (event.clientY / window.innerHeight - 0.5) * 8;
          portrait.style.setProperty('--portrait-x', `${offsetX}px`);
          portrait.style.setProperty('--portrait-y', `${offsetY}px`);
        }
      },
      { passive: true }
    );

    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--mx', '72%');
      hero.style.setProperty('--my', '28%');
      if (portrait) {
        portrait.style.setProperty('--portrait-x', '0px');
        portrait.style.setProperty('--portrait-y', '0px');
      }
    });
  }

  /* ---------- Imprimir / guardar PDF ---------- */
  document.querySelectorAll('.print-btn').forEach((button) => {
    button.addEventListener('click', () => {
      setMenu(false);
      window.print();
    });
  });

  /* ---------- Año actual ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

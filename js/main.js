(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  requestAnimationFrame(() => root.classList.add('is-loaded'));

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const intro = document.querySelector('.intro');
  const heroTitle = document.querySelector('.hero-title-wrap h1');
  const heroSlogan = document.querySelector('.hero-slogan');
  const heroRadialLeft = document.querySelector('.hero-radial--left');
  const heroRadialRight = document.querySelector('.hero-radial--right');
  const parallaxCards = [...document.querySelectorAll('.project-card')];
  let scrollFrame = 0;
  let previousScrollY = window.scrollY;
  let lastDirection = 'up';

  const paintScrollState = () => {
    scrollFrame = 0;
    const currentScrollY = Math.max(0, window.scrollY);
    const delta = currentScrollY - previousScrollY;
    if (Math.abs(delta) > 2) lastDirection = delta > 0 ? 'down' : 'up';
    previousScrollY = currentScrollY;

    if (header) {
      header.classList.toggle('is-scrolled', currentScrollY > 18);
      header.classList.toggle('is-hidden', currentScrollY > 90 && lastDirection === 'down');
    }

    if (!reducedMotion && intro && intro.getBoundingClientRect().bottom > 0) {
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)));
      if (heroTitle) heroTitle.style.transform = `translate3d(0, ${progress * 54}px, 0) scale(${1 - progress * 0.025})`;
      if (heroSlogan) heroSlogan.style.translate = `0 ${progress * 24}px`;
      if (heroRadialLeft) heroRadialLeft.style.translate = `${progress * 42}px ${progress * -24}px`;
      if (heroRadialRight) heroRadialRight.style.translate = `${progress * -35}px ${progress * 30}px`;
    }

    if (!reducedMotion) {
      parallaxCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const shift = Math.max(-22, Math.min(22, distance * -28));
        card.style.setProperty('--media-shift', `${shift.toFixed(2)}px`);
      });
    }
  };

  paintScrollState();
  window.addEventListener('scroll', () => {
    if (mobileMenu?.classList.contains('is-open')) setMenu(false);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScrollState);
  }, { passive: true });

  const setMenu = (isOpen) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('menu-open', isOpen);
    const label = menuToggle.querySelector('.sr-only');
    if (label) label.textContent = isOpen ? 'Tutup menu' : 'Buka menu';
  };

  setMenu(false);
  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  document.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 809) setMenu(false);
  }, { passive: true });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const staggerGroups = ['.project-grid', '.service-list', '.pricing-grid', '.experience-grid', '.insight-grid'];
  staggerGroups.forEach((selector) => {
    document.querySelectorAll(`${selector} > [data-reveal]`).forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 85}ms`);
    });
  });
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-34% 0px -60% 0px', threshold: 0 });
    navSections.forEach((section) => navObserver.observe(section));
  }

  if (!reducedMotion && finePointer) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      let tiltFrame = 0;
      let clientX = 0;
      let clientY = 0;

      const paintTilt = () => {
        tiltFrame = 0;
        const rect = card.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1100px) rotateX(${y * -2.4}deg) rotateY(${x * 3.2}deg) translateY(-7px)`;
      };

      card.addEventListener('pointermove', (event) => {
        clientX = event.clientX;
        clientY = event.clientY;
        if (!tiltFrame) tiltFrame = requestAnimationFrame(paintTilt);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        if (tiltFrame) cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
        card.style.transform = '';
      }, { passive: true });
    });
  }

  const serviceRows = [...document.querySelectorAll('[data-service-row]')];
  const activateService = (activeRow) => {
    serviceRows.forEach((row) => row.classList.toggle('is-active', row === activeRow));
  };
  serviceRows.forEach((row) => {
    row.addEventListener('pointerenter', () => activateService(row), { passive: true });
    row.addEventListener('focusin', () => activateService(row));
  });

  const processTabs = [...document.querySelectorAll('[data-process-tab]')];
  const processPanels = [...document.querySelectorAll('[data-process-panel]')];

  const selectProcess = (index, moveFocus = false) => {
    processTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && moveFocus) tab.focus();
    });
    processPanels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
  };

  processTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectProcess(index));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) nextIndex = (index + 1) % processTabs.length;
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) nextIndex = (index - 1 + processTabs.length) % processTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = processTabs.length - 1;
      selectProcess(nextIndex, true);
    });
  });

  const faqTriggers = [...document.querySelectorAll('[data-faq-trigger]')];
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
      faqTriggers.forEach((other) => {
        const answer = document.getElementById(other.getAttribute('aria-controls'));
        const isCurrent = other === trigger && shouldOpen;
        other.setAttribute('aria-expanded', String(isCurrent));
        other.closest('.faq-item')?.classList.toggle('is-open', isCurrent);
        if (answer) answer.hidden = !isCurrent;
      });
    });
  });

  const billingToggle = document.querySelector('[data-billing-toggle]');
  const billingSwitch = billingToggle?.querySelector('button');
  const billingPrices = [...document.querySelectorAll('.price-amount strong[data-monthly]')];
  const billingPeriods = [...document.querySelectorAll('.price-amount span[data-period]')];

  const setBillingPeriod = (isAnnual) => {
    billingSwitch?.setAttribute('aria-checked', String(isAnnual));
    billingPrices.forEach((price) => {
      price.textContent = isAnnual ? price.dataset.annual : price.dataset.monthly;
    });
    billingPeriods.forEach((period) => {
      period.textContent = isAnnual ? '/TAHUN' : '/BULAN';
    });
  };

  billingSwitch?.addEventListener('click', () => {
    setBillingPeriod(billingSwitch.getAttribute('aria-checked') !== 'true');
  });
})();

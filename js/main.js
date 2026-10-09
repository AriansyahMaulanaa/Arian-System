(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  requestAnimationFrame(() => root.classList.add('is-loaded'));

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const intro = document.querySelector('.intro');
  const heroTitle = document.querySelector('.hero-title-wrap');
  const heroSlogan = document.querySelector('.hero-slogan');
  const heroRadialLeft = document.querySelector('.hero-radial--left');
  const heroRadialRight = document.querySelector('.hero-radial--right');
  let scrollFrame = 0;
  let previousScrollY = window.scrollY;
  let lastDirection = 'up';

  const setPageInert = (isInert) => {
    [main, footer].forEach((element) => {
      if (!element) return;
      element.inert = isInert;
    });
  };

  const setMenu = (isOpen, returnFocus = false) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    document.body.classList.toggle('menu-open', isOpen);
    setPageInert(isOpen);

    const label = menuToggle.querySelector('.sr-only');
    if (label) label.textContent = isOpen ? 'Tutup menu' : 'Buka menu';

    if (isOpen) {
      requestAnimationFrame(() => mobileMenu.querySelector('a')?.focus());
    } else if (returnFocus) {
      menuToggle.focus();
    }
  };

  const paintScrollState = () => {
    scrollFrame = 0;
    const currentScrollY = Math.max(0, window.scrollY);
    const delta = currentScrollY - previousScrollY;
    if (Math.abs(delta) > 2) lastDirection = delta > 0 ? 'down' : 'up';
    previousScrollY = currentScrollY;

    if (header) {
      header.classList.toggle('is-scrolled', currentScrollY > 18);
      header.classList.toggle('is-hidden', currentScrollY > 120 && lastDirection === 'down');
    }

    if (!reducedMotion && finePointer && intro && intro.getBoundingClientRect().bottom > 0) {
      const progress = Math.min(1, Math.max(0, currentScrollY / Math.max(window.innerHeight, 1)));
      if (heroTitle && progress > 0) heroTitle.style.transform = `translate3d(0, ${progress * 30}px, 0)`;
      if (heroSlogan) heroSlogan.style.translate = `0 ${progress * 14}px`;
      if (heroRadialLeft) heroRadialLeft.style.translate = `${progress * 30}px ${progress * -18}px`;
      if (heroRadialRight) heroRadialRight.style.translate = `${progress * -24}px ${progress * 20}px`;
    }

  };

  setMenu(false);
  paintScrollState();

  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScrollState);
  }, { passive: true });

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true', true);
  });

  document.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    const menuIsOpen = menuToggle?.getAttribute('aria-expanded') === 'true';
    if (event.key === 'Escape' && menuIsOpen) {
      event.preventDefault();
      setMenu(false, true);
      return;
    }

    if (event.key !== 'Tab' || !menuIsOpen || !mobileMenu || !menuToggle) return;
    const focusable = [menuToggle, ...mobileMenu.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScrollState);
  }, { passive: true });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const staggerGroups = ['.value-grid', '.control-grid', '.project-grid', '.pricing-grid', '.credibility-list'];
  staggerGroups.forEach((selector) => {
    document.querySelectorAll(`${selector} > [data-reveal]`).forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 75}ms`);
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.07 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const billingChoices = [...document.querySelectorAll('[data-billing-choice]')];
  const billingPrices = [...document.querySelectorAll('[data-plan-price]')];
  const billingNote = document.querySelector('[data-billing-note]');
  const selectBillingPeriod = (period) => {
    const isAnnual = period === 'annual';
    billingChoices.forEach((choice) => {
      const isActive = choice.dataset.billingChoice === period;
      choice.classList.toggle('is-active', isActive);
      choice.setAttribute('aria-pressed', String(isActive));
    });
    billingPrices.forEach((price) => {
      const priceValue = isAnnual ? price.dataset.annual : price.dataset.monthly;
      const periodLabel = price.parentElement?.querySelector('[data-plan-period]');
      const periodValue = isAnnual
        ? periodLabel?.dataset.annualPeriod
        : periodLabel?.dataset.monthlyPeriod;
      if (priceValue) price.textContent = priceValue;
      if (periodValue && periodLabel) periodLabel.textContent = periodValue;
    });
    if (billingNote) {
      billingNote.textContent = isAnnual
        ? 'Tagihan dibayar sekaligus; setara 10 bulan harga bulanan.'
        : 'Bayar setiap bulan sesuai paket.';
    }
  };

  billingChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      selectBillingPeriod(choice.dataset.billingChoice === 'annual' ? 'annual' : 'monthly');
    });
  });

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const navSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-30% 0px -62% 0px', threshold: 0 });
    navSections.forEach((section) => navObserver.observe(section));
  }

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
  const setFaqAnswer = (answer, shouldOpen) => {
    if (!answer) return;
    if (!answer.animate || !answer.getAnimations) {
      answer.hidden = !shouldOpen;
      return;
    }
    answer.getAnimations().forEach((animation) => animation.cancel());

    if (reducedMotion) {
      answer.hidden = !shouldOpen;
      return;
    }

    if (shouldOpen) {
      answer.hidden = false;
      const targetHeight = answer.scrollHeight;
      const animation = answer.animate([
        { height: '0px', opacity: 0 },
        { height: `${targetHeight}px`, opacity: 1 }
      ], { duration: 380, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      answer.style.overflow = 'hidden';
      animation.addEventListener('finish', () => {
        answer.style.removeProperty('overflow');
      }, { once: true });
      return;
    }

    if (answer.hidden) return;
    const startHeight = answer.getBoundingClientRect().height;
    const animation = answer.animate([
      { height: `${startHeight}px`, opacity: 1 },
      { height: '0px', opacity: 0 }
    ], { duration: 280, easing: 'cubic-bezier(.44, 0, .34, .98)' });
    answer.style.overflow = 'hidden';
    animation.addEventListener('finish', () => {
      answer.hidden = true;
      answer.style.removeProperty('overflow');
    }, { once: true });
  };

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
      faqTriggers.forEach((other) => {
        const answer = document.getElementById(other.getAttribute('aria-controls'));
        const isCurrent = other === trigger && shouldOpen;
        other.setAttribute('aria-expanded', String(isCurrent));
        other.closest('.faq-item')?.classList.toggle('is-open', isCurrent);
        setFaqAnswer(answer, isCurrent);
      });
    });
  });
})();

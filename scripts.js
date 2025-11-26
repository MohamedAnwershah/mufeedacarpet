(() => {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  const menuBtn = $('#menu-btn');
  const mobileMenu = $('#mobile-menu');
  const navLinks = $$('nav a, .mobile-link');
  const revealElements = $$('.reveal-on-scroll');
  const header = $('#main-header');

  // --- 1. Mobile Menu Logic ---
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    const height = mobileMenu.scrollHeight + 'px';
    mobileMenu.style.maxHeight = height;
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.style.maxHeight = '0px';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close on outside click
    document.addEventListener('click', (ev) => {
      if (!mobileMenu.classList.contains('open')) return;
      if (ev.target.closest('#menu-btn') || ev.target.closest('#mobile-menu')) return;
      closeMenu();
    });

    // FIX: Handle Resize (Prevent menu getting stuck if rotating phone)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.style.opacity = '';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 2. Smooth Scroll & Close Menu ---
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href') || '';
      if (!href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    });
  });

  // --- 3. Reveal on Scroll ---
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- 4. Header Shadow ---
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }, { passive: true });
  }

})();
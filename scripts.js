document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variables ---
    const navLinks = document.querySelectorAll('nav a, .mobile-link');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-btn');
    
    // --- Mobile Menu Toggle (Simplified) ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Good practice
            // Simply toggle the 'open' class. CSS handles the rest.
            mobileMenu.classList.toggle('open');
        });
    }

    // --- Smooth Scrolling & Auto-Close ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Allow default behavior for non-anchor links
            if (!targetId || !targetId.startsWith('#')) return;

            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Always close menu when a link is clicked
                if (mobileMenu) {
                    mobileMenu.classList.remove('open');
                }

                // Scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Reveal on Scroll Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });
});
/* =====================================================
   SmartAIthon 2026 — Shared Navigation Bar Script
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');

    // Automatic active link detection based on current URL path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    function toggleMenu() {
        if (!hamburger || !navMenu) return;
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (!hamburger || !navMenu) return;
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        hamburger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // Close menu when any nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Navbar scroll shadow
    window.addEventListener('scroll', function () {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
    });
});

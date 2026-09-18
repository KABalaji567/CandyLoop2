document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Dark/Light Mode Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    });

    // RTL/LTR Toggle Logic
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    
    const updateRTLDisplay = (isRTL) => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        rtlToggleBtns.forEach(btn => {
            btn.innerText = isRTL ? 'LTR' : 'RTL';
        });
    };

    // Initial check
    if (localStorage.dir === 'rtl') {
        updateRTLDisplay(true);
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCurrentlyRTL = document.documentElement.dir === 'rtl';
            const newRTL = !isCurrentlyRTL;
            localStorage.dir = newRTL ? 'rtl' : 'ltr';
            updateRTLDisplay(newRTL);
            // Swap review slider arrow icons to match reading direction
            const arrowNext = document.querySelector('.reviews-arrow-next');
            const arrowPrev = document.querySelector('.reviews-arrow-prev');
            if (arrowNext && arrowPrev) {
                if (newRTL) {
                    arrowNext.classList.replace('fa-chevron-right', 'fa-chevron-left');
                    arrowPrev.classList.replace('fa-chevron-left', 'fa-chevron-right');
                } else {
                    arrowNext.classList.replace('fa-chevron-left', 'fa-chevron-right');
                    arrowPrev.classList.replace('fa-chevron-right', 'fa-chevron-left');
                }
            }
        });
    });

    // Also swap arrow icons on initial RTL load
    if (localStorage.dir === 'rtl') {
        const arrowNext = document.querySelector('.reviews-arrow-next');
        const arrowPrev = document.querySelector('.reviews-arrow-prev');
        if (arrowNext && arrowPrev) {
            arrowNext.classList.replace('fa-chevron-right', 'fa-chevron-left');
            arrowPrev.classList.replace('fa-chevron-left', 'fa-chevron-right');
        }
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-slate-900', 'bg-slate-900/90');
            } else {
                navbar.classList.remove('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-slate-900/90', 'bg-slate-900');
            }
        });
    }

    // Candy Dust Particles effect for hero section
    const heroSection = document.querySelector('.hero-dust-container');
    if(heroSection) {
        for(let i=0; i<30; i++) {
            createDustParticle(heroSection);
        }
    }

    function createDustParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('dust');
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
    }

    // Active Link Highlighting
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        // Updated selector to match lg:flex for desktop and #mobile-menu for mobile
        const navLinks = document.querySelectorAll('#navbar .lg\\:flex a, #mobile-menu a');
        
        // Target the Home buttons specifically
        const desktopHomeBtn = document.querySelector('#navbar .group button');
        const mobileHomeBtn = document.querySelector('#mobile-menu .cursor-pointer');

        // Reset Home buttons style initially
        [desktopHomeBtn, mobileHomeBtn].forEach(btn => {
            if (btn) {
                btn.classList.remove('text-brand-pink', 'font-bold');
                btn.classList.add('text-white');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Add hover underline class
            link.classList.add('nav-link');
            
            // Remove any hardcoded or previously added active styles
            link.classList.remove('text-brand-pink', 'bg-brand-pink/5', 'nav-link-active', 'font-bold');
            
            // Only add text-white if it's not a button-like link (e.g., Bookings)
            // and not a desktop dropdown item (which should use its own light/dark colors)
            const isDropdownItem = link.closest('.group div');
            if (!link.classList.contains('bg-brand-pink') && !isDropdownItem) {
                link.classList.add('text-white');
            }
            
            // Check if this link matches current path
            if (href === currentPath || (currentPath === 'index.html' && href === 'index-2.html' && window.location.pathname.includes('index-2'))) {
                // Apply active styles
                link.classList.add('nav-link-active', 'text-brand-pink', 'font-bold');
                link.classList.remove('text-white');
                
                // Add background for dropdown items if active
                if (link.classList.contains('block') && link.closest('.group')) {
                    link.classList.add('bg-brand-pink/5');
                }
                
                // If it's a child of Home dropdown or an index page, highlight Home buttons
                if (href.includes('index')) {
                    [desktopHomeBtn, mobileHomeBtn].forEach(btn => {
                        if (btn) {
                            btn.classList.add('text-brand-pink', 'font-bold');
                            btn.classList.remove('text-white');
                        }
                    });
                }
            }
        });
    };

    // Scroll Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Review Slider Navigation
    const reviewsSlider = document.getElementById('reviews-slider');
    const reviewsPrev = document.getElementById('reviews-prev');
    const reviewsNext = document.getElementById('reviews-next');

    if (reviewsSlider && reviewsPrev && reviewsNext) {
        const SLIDE_WIDTH = 344; // 320px card + 24px gap
        reviewsPrev.addEventListener('click', () => {
            const isRTL = document.documentElement.dir === 'rtl';
            reviewsSlider.scrollBy({ left: isRTL ? SLIDE_WIDTH : -SLIDE_WIDTH, behavior: 'smooth' });
        });
        reviewsNext.addEventListener('click', () => {
            const isRTL = document.documentElement.dir === 'rtl';
            reviewsSlider.scrollBy({ left: isRTL ? -SLIDE_WIDTH : SLIDE_WIDTH, behavior: 'smooth' });
        });
    }

    highlightActiveLink();
});

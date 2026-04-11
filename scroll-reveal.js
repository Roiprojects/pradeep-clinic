/**
 * Dr. Pradeep Children's Clinic - UX Engine
 * Handles scroll-revelations and interactive polish.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial reveal for elements already in viewport
    document.querySelectorAll('.reveal-up, .scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Navbar Scroll States
    const navbar = document.getElementById('navbar') || document.querySelector('nav');
    const scrollHandler = () => {
        if (window.scrollY > 40) {
            navbar?.classList.add('scroll-scrolled');
            navbar?.classList.add('premium-nav'); // Ensure class is present
        } else {
            navbar?.classList.remove('scroll-scrolled');
        }
    };

    window.addEventListener('scroll', scrollHandler);

    // 3. Scroll Progress Indicator
    const createScrollIndicator = () => {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
            bar.style.width = percent + '%';
        });
    };
    
    createScrollIndicator();

    // 4. Staggered Children Animation
    document.querySelectorAll('.stagger-container').forEach(container => {
        const baseDelay = parseFloat(container.dataset.baseDelay || 0);
        const children = container.children;
        Array.from(children).forEach((child, idx) => {
            child.style.transitionDelay = (baseDelay + (idx * 0.15)) + 's';
            child.classList.add('reveal-up');
            revealObserver.observe(child);
        });
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 6. Interactive Accordion Interaction Logic (Premium Touch/Click)
    const initInteractiveAccordion = () => {
        const accordionItems = document.querySelectorAll('.service-stack-item');
        if (!accordionItems.length) return;

        console.log('Interactive Accordion Engine: Active');
        
        let isTouchDevice = false;
        
        // Detect touch to apply click-to-expand logic instead of hover
        window.addEventListener('touchstart', function() {
            isTouchDevice = true;
        }, { passive: true, once: true });

        // Set the first item active by default on load (good for initial storytelling)
        accordionItems[0].classList.add('is-active');

        accordionItems.forEach(item => {
            // Observe for scroll reveal
            item.classList.add('reveal-up');
            revealObserver.observe(item);

            item.addEventListener('mouseenter', () => {
                if (!isTouchDevice) {
                    // Remove active from all
                    accordionItems.forEach(i => i.classList.remove('is-active'));
                    // Add active to hovered
                    item.classList.add('is-active');
                }
            });

            item.addEventListener('click', () => {
                if (isTouchDevice) {
                    // On touch, toggle active state
                    const wasActive = item.classList.contains('is-active');
                    accordionItems.forEach(i => i.classList.remove('is-active'));
                    if (!wasActive) {
                        item.classList.add('is-active');
                    }
                }
            });
        });
    };

    initInteractiveAccordion();
});

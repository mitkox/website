document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('.header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const currentYearElement = document.getElementById('currentYear');
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    if (!prefersReducedMotion && revealElements.length) {
        document.documentElement.classList.add('motion-ready');
        revealElements.forEach((element) => {
            const delay = Number(element.getAttribute('data-reveal-delay') || 0);
            if (delay > 0) {
                element.style.transitionDelay = `${Math.min(delay, 260)}ms`;
            }
        });

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, {
                rootMargin: '0px 0px 10% 0px',
                threshold: 0.08
            });

            revealElements.forEach((element) => revealObserver.observe(element));
        } else {
            revealElements.forEach((element) => element.classList.add('is-visible'));
        }
    } else {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    }

    const setHeaderState = () => {
        header?.classList.toggle('scrolled', window.scrollY > 8);
    };

    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    const closeMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.classList.add('no-scroll');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.classList.contains('active')) return;
            if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    if ('IntersectionObserver' in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;

                navLinks.forEach((link) => {
                    const isCurrent = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('active', isCurrent);
                });
            });
        }, {
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const button = contactForm.querySelector('.contact-btn');
            if (button?.classList.contains('processing')) return;

            const name = contactForm.getAttribute('data-name');
            const domain = contactForm.getAttribute('data-domain');
            if (!name || !domain) return;

            const label = button?.querySelector('.btn-content span');
            const originalLabel = label?.textContent || 'Start the conversation';
            const formData = new FormData(contactForm);
            const getValue = (field) => String(formData.get(field) || '').trim();
            const company = getValue('company');
            const subject = company
                ? `Enterprise AI conversation - ${company}`
                : 'Enterprise AI conversation';
            const body = [
                `Name: ${getValue('name') || 'Not provided'}`,
                `Work email: ${getValue('email')}`,
                `Company: ${company || 'Not provided'}`,
                `Priority: ${getValue('priority')}`,
                '',
                'What should we discuss?',
                getValue('message') || 'Not provided'
            ].join('\n');

            button?.classList.add('processing');

            if (label) {
                label.textContent = 'Opening email...';
            }

            window.setTimeout(() => {
                window.location.href = `mailto:${name}@${domain}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }, 80);

            window.setTimeout(() => {
                if (label) {
                    label.textContent = originalLabel;
                }
                button?.classList.remove('processing');
            }, 1200);
        });
    }

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const email = 'sales@mitkox.com';
        emailLink.href = `mailto:${email}`;
        emailLink.textContent = email;
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
            .then((registrations) => {
                registrations.forEach((registration) => registration.unregister());
            })
            .catch(() => {});
    }

    const canUsePointerDepth = !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (canUsePointerDepth) {
        document.querySelectorAll('.platform-stack, .platform-node, .service-card, .contact-panel').forEach((element) => {
            element.addEventListener('pointermove', (event) => {
                const rect = element.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                const rotateX = y * -4;
                const rotateY = x * 5;

                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            });

            element.addEventListener('pointerleave', () => {
                element.style.transform = '';
            });
        });
    }
});

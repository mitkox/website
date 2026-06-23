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

    // Contact address is base64-encoded so it never appears as plaintext in any
    // static asset (HTML, JS, or structured data) that email harvesters scrape.
    // It is decoded only at runtime, for real visitors. To change it, run
    // btoa('user@domain.com') in a browser console and replace the value below.
    const CONTACT_B64 = 'c2FsZXNAbWl0a294LmNvbQ==';
    const getContactAddress = () => {
        try {
            return atob(CONTACT_B64);
        } catch (error) {
            return '';
        }
    };

    // The "Contact us" button and the email reveal link are native mailto
    // links. Setting a real href on a real anchor is the most reliable way to
    // hand off to the visitor's mail app across desktop and mobile browsers,
    // with no synthetic clicks and no focus/visibility detection required. The
    // address is decoded at runtime so it never appears as plaintext in the
    // markup that email harvesters scrape.
    const contactAddress = getContactAddress();

    const buildMailto = (subject, body) => {
        const params = [];
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        // CRLF line breaks render reliably across mail clients (notably Outlook
        // desktop) once URL-encoded as %0D%0A.
        if (body) params.push(`body=${encodeURIComponent(body.replace(/\r\n|\r|\n/g, '\r\n'))}`);
        return `mailto:${contactAddress}${params.length ? `?${params.join('&')}` : ''}`;
    };

    if (contactAddress) {
        // Seed the "Contact us" button with a short, ready-to-send note so a
        // prospect lands in their mail app with the message already framed.
        const contactButton = document.getElementById('contactUs');
        if (contactButton) {
            const body = [
                'Hi Mitko,',
                '',
                'We would like to talk about an enterprise AI platform.',
                '',
                'A bit about us:',
                '- Company:',
                '- Role:',
                '- What we want to achieve:',
                ''
            ].join('\r\n');
            contactButton.setAttribute('href', buildMailto('Enterprise AI conversation', body));
            contactButton.setAttribute('rel', 'nofollow');
        }
    }

    const emailLink = document.getElementById('email-link');
    if (emailLink && contactAddress) {
        emailLink.href = `mailto:${contactAddress}`;
        emailLink.textContent = contactAddress;
        emailLink.setAttribute('rel', 'nofollow');
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

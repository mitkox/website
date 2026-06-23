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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const statusEl = document.getElementById('contactStatus');

        const setStatus = (state, nodes) => {
            if (!statusEl) return;
            statusEl.className = 'contact-status' + (state ? ` is-${state}` : '');
            statusEl.replaceChildren(...nodes);
            statusEl.hidden = false;
        };

        const copyToClipboard = async (text) => {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    return true;
                }
            } catch (error) {
                // Fall through to the legacy execCommand path below.
            }
            try {
                const area = document.createElement('textarea');
                area.value = text;
                area.setAttribute('readonly', '');
                area.style.position = 'absolute';
                area.style.left = '-9999px';
                document.body.appendChild(area);
                area.select();
                const ok = document.execCommand('copy');
                document.body.removeChild(area);
                return ok;
            } catch (error) {
                return false;
            }
        };

        // Triggering the mailto via a synchronous anchor click keeps it tied to
        // the user gesture, so desktop and mobile browsers (Chrome, Safari,
        // Firefox, Edge) treat it as a user-initiated external navigation
        // instead of silently blocking it.
        const triggerMailto = (url) => {
            const opener = document.createElement('a');
            opener.href = url;
            opener.style.display = 'none';
            document.body.appendChild(opener);
            opener.click();
            document.body.removeChild(opener);
        };

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const button = contactForm.querySelector('.contact-btn');
            if (button?.classList.contains('processing')) return;

            const address = getContactAddress();
            if (!address) return;

            const label = button?.querySelector('.btn-content span');
            const originalLabel = label?.textContent || 'Start the conversation';
            const formData = new FormData(contactForm);
            const getValue = (field) => String(formData.get(field) || '').trim();
            const company = getValue('company');
            const subject = company
                ? `Enterprise AI conversation - ${company}`
                : 'Enterprise AI conversation';
            // CRLF line breaks render reliably across mail clients (notably
            // Outlook desktop) once URL-encoded as %0D%0A.
            const body = [
                `Name: ${getValue('name') || 'Not provided'}`,
                `Work email: ${getValue('email')}`,
                `Company: ${company || 'Not provided'}`,
                `Priority: ${getValue('priority')}`,
                '',
                'What should we discuss?',
                getValue('message') || 'Not provided'
            ].join('\r\n').replace(/\r\n|\r|\n/g, '\r\n');

            const mailtoUrl = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            button?.classList.add('processing');
            if (label) {
                label.textContent = 'Opening email...';
            }

            // Detect whether the browser actually handed off to a mail app. If
            // the page never loses focus or visibility, no handler is available
            // and we surface a copy-to-clipboard fallback instead of failing
            // silently.
            let handedOff = false;
            const markHandedOff = () => { handedOff = true; };
            const onVisibility = () => {
                if (document.hidden) handedOff = true;
            };
            window.addEventListener('blur', markHandedOff, { once: true });
            document.addEventListener('visibilitychange', onVisibility);

            triggerMailto(mailtoUrl);

            window.setTimeout(() => {
                window.removeEventListener('blur', markHandedOff);
                document.removeEventListener('visibilitychange', onVisibility);

                if (label) {
                    label.textContent = originalLabel;
                }
                button?.classList.remove('processing');

                if (handedOff) {
                    const note = document.createElement('span');
                    note.textContent = `Opening your email app with everything pre-filled. If it didn't appear, email ${address} directly.`;
                    setStatus('success', [note]);
                    return;
                }

                // Fallback: this browser has no mail handler configured.
                const intro = document.createElement('span');
                intro.textContent = 'Your browser has no email app set up. Email ';
                const mail = document.createElement('a');
                mail.href = mailtoUrl;
                mail.rel = 'nofollow';
                mail.textContent = address;
                const tail = document.createElement('span');
                tail.textContent = ' directly — your message is ready to copy below.';

                const actions = document.createElement('span');
                actions.className = 'status-actions';
                const copyBtn = document.createElement('button');
                copyBtn.type = 'button';
                copyBtn.className = 'status-copy';
                copyBtn.textContent = 'Copy message';
                const fullMessage = `To: ${address}\r\nSubject: ${subject}\r\n\r\n${body}`;
                copyBtn.addEventListener('click', async () => {
                    const ok = await copyToClipboard(fullMessage);
                    copyBtn.textContent = ok ? 'Copied' : 'Press Ctrl/Cmd+C';
                    window.setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2000);
                });
                actions.appendChild(copyBtn);

                setStatus('error', [intro, mail, tail, document.createElement('br'), actions]);
            }, 1200);
        });
    }

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const email = getContactAddress();
        if (email) {
            emailLink.href = `mailto:${email}`;
            emailLink.textContent = email;
            emailLink.setAttribute('rel', 'nofollow');
        }
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

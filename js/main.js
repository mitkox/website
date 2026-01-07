// Theme Management - Initialize before DOM content loads
(function() {
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Performance optimization: Only load features if needed
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Get current theme
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    // Set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update aria-label
        if (themeToggle) {
            themeToggle.setAttribute('aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content',
                theme === 'dark' ? '#0a0e1a' : '#ffffff'
            );
        }
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        // Keyboard accessibility
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize AOS animations with reduced motion support only if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: prefersReducedMotion ? 0 : 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            once: true,
            mirror: false,
            disable: prefersReducedMotion ? true : false,
            offset: 100,
            delay: 0
        });
    }

    // 2026 Trend: Add parallax effect to hero section
    if (!prefersReducedMotion) {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }, { passive: true });
        }
    }
    
    // Initialize typewriter effect with performance optimization
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement && !prefersReducedMotion) {
        const phrases = [
            'Industrial AI Solutions',
            'Edge Computing',
            'On-Premises AI',
            'Custom AI Models',
            'AI Agents',
            'Industrial IoT'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80; // Slightly faster for better UX
        let timeoutId;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 40;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 80;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1200;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }
            
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            timeoutId = setTimeout(typeEffect, typingSpeed);
        }
        
        timeoutId = setTimeout(typeEffect, 800);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        });
    } else if (typewriterElement && prefersReducedMotion) {
        // For users who prefer reduced motion, show a static text
        typewriterElement.textContent = 'Industrial AI Solutions';
    }
    
    // Removed particles.js for better performance and cleaner design
});

// Add shadow to header when scrolling
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Navigation active state with performance optimization
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Use IntersectionObserver for better performance than scroll event
const observerOptions = {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.1
};

// Header shadow on scroll - with throttling for performance
const header = document.querySelector('.header');
let scrollThrottleTimer;

window.addEventListener('scroll', () => {
    if (!scrollThrottleTimer) {
        scrollThrottleTimer = setTimeout(() => {
            if (window.scrollY > 10) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
            scrollThrottleTimer = null;
        }, 100); // Throttle to 100ms
    }
});

// Use Intersection Observer instead of scroll events for better performance
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the section is in viewport
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Update navigation highlighting
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    window.addEventListener('scroll', () => {
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile navigation functionality with enhanced touch support
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    // Add touch event listeners for better mobile experience
    const toggleMenu = (event) => {
        // Prevent default to avoid potential scroll issues
        event.preventDefault();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        } else {
            // Open menu
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            document.body.classList.add('no-scroll');
            navToggle.setAttribute('aria-expanded', 'true');
            navMenu.setAttribute('aria-hidden', 'false');
            
            // Focus first nav link for keyboard users
            const firstNavLink = navMenu.querySelector('.nav-link');
            if (firstNavLink) {
                setTimeout(() => firstNavLink.focus(), 100);
            }
        }
    };
    
    // Use both click and touchstart for better responsiveness
    navToggle.addEventListener('click', toggleMenu);
    
    // Handle touch events separately to prevent double-firing
    let touchStarted = false;
    navToggle.addEventListener('touchstart', (e) => {
        touchStarted = true;
        // Prevent the subsequent click event
        setTimeout(() => { touchStarted = false; }, 300);
    }, { passive: true });
    
    navToggle.addEventListener('touchend', (e) => {
        if (touchStarted) {
            e.preventDefault();
            toggleMenu(e);
        }
    }, { passive: false });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            // Update ARIA attributes
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// Close menu when clicking outside
if (navMenu) {
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    });
}

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            navToggle.focus();
        }
    }
});

// Simple email protection with enhanced UX and error handling
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    // Setup contact buttons with better error handling
    if (contactButtons.length > 0) {
        contactButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Prevent double-clicks
                if (this.classList.contains('processing')) {
                    return;
                }
                
                const name = this.getAttribute('data-name');
                const domain = this.getAttribute('data-domain');
                
                if (name && domain) {
                    // Add processing state
                    this.classList.add('processing');
                    
                    // Only construct the email address when the button is clicked
                    const email = `${name}@${domain}`;
                    
                    // Add a subtle button click effect
                    this.classList.add('clicked');
                    
                    // Update button text temporarily for user feedback
                    const originalContent = this.innerHTML;
                    const btnContent = this.querySelector('.btn-content span');
                    if (btnContent) {
                        btnContent.textContent = 'Opening...';
                    }
                    
                    setTimeout(() => {
                        this.classList.remove('clicked');
                        
                        // Restore original content
                        setTimeout(() => {
                            this.innerHTML = originalContent;
                            this.classList.remove('processing');
                        }, 1000);
                    }, 300);
                    
                    // Open the user's mail client with error handling
                    setTimeout(() => {
                        try {
                            window.location.href = `mailto:${email}`;
                        } catch (error) {
                            console.log('Error opening email client:', error);
                            // Fallback: copy email to clipboard if possible
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(email).then(() => {
                                    if (btnContent) {
                                        btnContent.textContent = 'Email Copied!';
                                    }
                                }).catch(() => {
                                    if (btnContent) {
                                        btnContent.textContent = email;
                                    }
                                });
                            } else {
                                // Last resort: show the email address
                                if (btnContent) {
                                    btnContent.textContent = email;
                                }
                            }
                        }
                    }, 100);
                } else {
                    console.warn('Missing email data attributes on contact button');
                }
            });
            
            // Add keyboard support
            button.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.click();
                }
            });
        });
    }
});

// Update footer year and add performance optimizations
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Lazy load images if browser supports IntersectionObserver
if ('IntersectionObserver' in window) {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if (lazyImages.length > 0) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// Add passive event listeners for better scroll performance on touch devices
document.addEventListener('DOMContentLoaded', function() {
    const supportsPassive = (function() {
        let passive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    passive = true;
                    return passive;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return passive;
    })();

    if (supportsPassive) {
        const wheelOpt = { passive: true };
        const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        window.addEventListener(wheelEvent, function(){}, wheelOpt);
        window.addEventListener('touchstart', function(){}, wheelOpt);
    }
});

// 2026 Trend: Add smooth mouse tracking for cards (desktop only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.service-card, .contact-card-inner');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

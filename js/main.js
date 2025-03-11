// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true
    });
    
    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
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
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100; // Normal typing speed
            }
            
            // Check if word is complete
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at the end of typing
                isDeleting = true;
                typingSpeed = 1500; // Wait before deleting
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to next phrase after deleting
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }
    
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6366f1'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
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

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Update ARIA attributes
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        }
    });
});

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            navToggle.focus();
        }
    }
});

// Simple email protection to prevent spam
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    // Setup contact buttons
    if (contactButtons.length > 0) {
        contactButtons.forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const domain = this.getAttribute('data-domain');
                
                if (name && domain) {
                    // Only construct the email address when the button is clicked
                    const email = `${name}@${domain}`;
                    
                    // Add a subtle button click effect
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 300);
                    
                    // Open the user's mail client
                    setTimeout(() => {
                        window.location.href = `mailto:${email}`;
                    }, 100);
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

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true
    });
    
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

// Navigation menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');

    if (navToggle && navMenu) {
        // Toggle menu when clicking the hamburger icon
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking on any nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Make sure menu resets on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Keep track of scroll position to add styling to header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
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

// Email protection to prevent spam
document.addEventListener('DOMContentLoaded', function() {
    const revealButtons = document.querySelectorAll('.reveal-email');
    
    if (revealButtons.length > 0) {
        revealButtons.forEach(button => {
            button.addEventListener('click', function() {
                const emailContainer = this.closest('.email-protection');
                const emailSpan = emailContainer.querySelector('.email-text');
                
                if (emailSpan) {
                    const name = emailSpan.getAttribute('data-name');
                    const domain = emailSpan.getAttribute('data-domain');
                    
                    if (name && domain) {
                        // Generate email address on-demand
                        const email = `${name}@${domain}`;
                        
                        // Replace text with actual email address
                        const emailLink = document.createElement('a');
                        emailLink.href = `mailto:${email}`;
                        emailLink.textContent = email;
                        emailLink.className = 'revealed-email';
                        
                        // Replace the span and button with the link
                        emailContainer.innerHTML = '';
                        emailContainer.appendChild(emailLink);
                        
                        // Add success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'email-success';
                        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Email revealed. Click to send a message.';
                        emailContainer.appendChild(successMsg);
                        
                        // Animate the success message
                        setTimeout(() => {
                            successMsg.style.opacity = '0';
                            setTimeout(() => {
                                successMsg.remove();
                            }, 500);
                        }, 3000);
                    }
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

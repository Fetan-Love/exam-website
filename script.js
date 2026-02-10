// ===================================
// MODERN PORTFOLIO WEBSITE SCRIPTS
// Enhanced by AI Assistant
// ===================================

'use strict';

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDarkMode();
    initActiveNavLink();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initParallax();
    initNavbarScroll();
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    // Toggle menu on button click
    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        mobileToggle.textContent = isOpen ? '✕' : '☰';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.textContent = '☰';
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.textContent = '☰';
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// DARK MODE TOGGLE
// ===================================
function initDarkMode() {
    const darkToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    if (!darkToggle) return;
    
    // Check saved preference
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    if (isDark) {
        body.classList.add('dark-mode');
        darkToggle.textContent = '☀️';
    }
    
    // Toggle dark mode
    darkToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isNowDark = body.classList.contains('dark-mode');
        
        // Save preference
        localStorage.setItem('darkMode', isNowDark ? 'enabled' : 'disabled');
        
        // Update button icon
        darkToggle.textContent = isNowDark ? '☀️' : '🌙';
        
        // Add transition effect
        body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    });
}

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove all active classes first
        link.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.feature-card, .course-card, .project-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });
}

// ===================================
// CONTACT FORM VALIDATION
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const messageDiv = document.getElementById('form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
        
        // Get form values
        const vardas = document.getElementById('vardas').value.trim();
        const email = document.getElementById('email').value.trim();
        const tema = document.getElementById('tema').value;
        const zinute = document.getElementById('zinute').value.trim();
        
        // Validation
        let errors = [];
        
        if (vardas.length < 2) {
            errors.push('Vardas turi būti bent 2 simbolių ilgio');
        }
        
        if (!isValidEmail(email)) {
            errors.push('Neteisingas el. pašto formatas');
        }
        
        if (!tema) {
            errors.push('Prašome pasirinkti temą');
        }
        
        if (zinute.length < 10) {
            errors.push('Žinutė turi būti bent 10 simbolių ilgio');
        }
        
        if (errors.length > 0) {
            showMessage('error', errors.join('. '));
            return;
        }
        
        // Success simulation
        showMessage('success', '✓ Žinutė sėkmingai išsiųsta! Atsakysiu per 24 valandas.');
        form.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
        }, 5000);
        
        // In production, you would send the form data here:
        // sendFormData({ vardas, email, tema, zinute });
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(type, text) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        let isValid = true;
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
        }
        
        if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            isValid = false;
        }
        
        if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (field.value.trim().length < minLength) {
                isValid = false;
            }
        }
        
        if (isValid) {
            field.classList.remove('invalid');
            field.style.borderColor = '#28a745';
        } else {
            field.classList.add('invalid');
            field.style.borderColor = '#dc3545';
        }
        
        return isValid;
    }
}

// ===================================
// PARALLAX EFFECT
// ===================================
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            // Only apply on larger screens
            if (window.innerWidth > 768) {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            } else {
                el.style.transform = 'translateY(0)';
            }
        });
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.padding = '0';
        } else {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
} else {
    // Fallback for older browsers
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// PERFORMANCE MONITORING (DEV ONLY)
// ===================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.textContent = '☰';
            document.body.style.overflow = '';
        }
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Sveiki! ', 'color: #007bff; font-size: 20px; font-weight: bold;');
console.log('%cŠi svetainė sukurta Raidos Giminauskaitės kaip egzamino projektas.', 'color: #666; font-size: 14px;');
console.log('%cNorite pasiūlyti patobulinimų? Susisiekite per kontaktų formą!', 'color: #28a745; font-size: 14px;');

// ===================================
// BACK TO TOP BUTTON
// ===================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100));
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
});

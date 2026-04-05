/**
 * Main JavaScript for Solvix Website
 * Handles navbar behavior, mobile menu, and utility functions
 */

// Enhanced Navbar Scroll Behavior
class NavbarController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navbarToggle = document.querySelector('.navbar-toggle');
    this.navbarMenu = document.querySelector('ul');
    this.isScrolled = false;
    this.init();
  }

  init() {
    this.handleScroll();
    this.setupEventListeners();
    this.setupMobileMenu();
  }

  handleScroll() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 50 && !this.isScrolled) {
        this.isScrolled = true;
        this.navbar.classList.add('navbar-scrolled', 'glass', 'shadow-lg');
        this.updateNavbarLinks(true);
      } else if (scrollPosition <= 50 && this.isScrolled) {
        this.isScrolled = false;
        this.navbar.classList.remove('navbar-scrolled', 'glass', 'shadow-lg');
        this.updateNavbarLinks(false);
      }
    }, { passive: true });
  }

  updateNavbarLinks(scrolled) {
    const logo = this.navbar.querySelector('a[href="index.html"]');
    const links = this.navbar.querySelectorAll('ul a:not(.bg-gradient-to-r)');
    
    if (scrolled) {
      logo?.classList.replace('text-white', 'text-gray-900');
      links.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-700');
      });
    } else {
      // Only change on homepage with transparent navbar
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        logo?.classList.replace('text-gray-900', 'text-white');
        links.forEach(link => {
          link.classList.remove('text-gray-700');
          link.classList.add('text-white');
        });
      }
    }
  }

  setupMobileMenu() {
    if (!this.navbarToggle || !this.navbarMenu) return;

    this.navbarToggle.addEventListener('click', () => {
      this.navbarMenu.classList.toggle('hidden');
      this.navbarToggle.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = this.navbarToggle.querySelectorAll('span');
      if (this.navbarToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navbarMenu && !this.navbarMenu.classList.contains('hidden')) {
        this.navbarMenu.classList.add('hidden');
        this.navbarToggle.classList.remove('active');
        const spans = this.navbarToggle.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '';
      }
    });

    // Close menu when link is clicked
    const menuLinks = this.navbarMenu?.querySelectorAll('a');
    menuLinks?.forEach(link => {
      link.addEventListener('click', () => {
        this.navbarMenu.classList.add('hidden');
        this.navbarToggle.classList.remove('active');
      });
    });
  }

  setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
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
  }
}

// Service Card Expansion (for services page)
class ServiceCardController {
  constructor() {
    this.cards = document.querySelectorAll('.service-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      const header = card.querySelector('.service-card-header');
      if (header) {
        header.addEventListener('click', () => this.toggleCard(card));
      }
    });
  }

  toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards (accordion behavior)
    this.cards.forEach(c => {
      if (c !== card) {
        c.classList.remove('expanded');
      }
    });
    
    // Toggle current card
    card.classList.toggle('expanded');
    
    // Animate with GSAP if available
    if (typeof gsap !== 'undefined') {
      const content = card.querySelector('.service-card-content');
      if (content) {
        if (!isExpanded) {
          gsap.to(content, {
            maxHeight: content.scrollHeight + 'px',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else {
          gsap.to(content, {
            maxHeight: 0,
            duration: 0.5,
            ease: 'power2.in'
          });
        }
      }
    }
  }
}

// Lazy Load Images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Form Validation Enhancement
function enhanceFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500');
          
          // Remove error class on input
          input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
          }, { once: true });
        }
      });
      
      if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Sending...';
        }
        
        // Here you would typically send the form data
        // For now, we'll just simulate success
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = '✓ Sent Successfully!';
            submitBtn.classList.add('bg-green-500');
          }
          form.reset();
          
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = 'Send Message';
              submitBtn.classList.remove('bg-green-500');
            }
          }, 2000);
        }, 1500);
      }
    });
  });
}

// Utility: Detect reduced motion preference
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Utility: Debounce function
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

// Performance monitoring
function monitorPerformance() {
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Silently fail if PerformanceObserver not supported
    }
  }
}

// Initialize everything when DOM is ready
function init() {
  new NavbarController();
  new ServiceCardController();
  setupLazyLoading();
  enhanceFormValidation();
  
  // Monitor performance in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorPerformance();
  }
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other scripts
window.SolvixUtils = {
  prefersReducedMotion,
  debounce
};

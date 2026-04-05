/**
 * GSAP-based animations for Solvix Website
 * Scroll-triggered section reveals, stagger animations, and premium micro-interactions
 */

// Initialize GSAP and ScrollTrigger
function initAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, falling back to CSS animations');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable GSAP animations for users who prefer reduced motion
    gsap.globalTimeline.pause();
    return;
  }

  // Scroll Progress Indicator
  createScrollProgress();
  
  // Section Reveal Animations
  initSectionReveals();
  
  // Card Animations
  initCardAnimations();
  
  // Counter Animations
  initCounterAnimations();
  
  // Floating Logo Animation
  initFloatingLogo();
  
  // Stagger Animations for Grids
  initGridStagger();
}

/**
 * Scroll Progress Indicator
 */
function createScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 z-50 origin-left';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  // Animate progress bar on scroll
  gsap.to('#scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/**
 * Section Reveal Animations
 */
function initSectionReveals() {
  const sections = gsap.utils.toArray('.scroll-reveal');
  
  sections.forEach((section, index) => {
    gsap.fromTo(section,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });
}

/**
 * Card Hover Animations with 3D effect
 */
function initCardAnimations() {
  const cards = document.querySelectorAll('.premium-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    });
    
    // 3D tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(this, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

/**
 * Animated Number Counters
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-animate');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: duration / 1000,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              counter.textContent = Math.ceil(counter.textContent);
            }
          }
        );
      }
    });
  });
}

/**
 * Floating Logo Animation
 */
function initFloatingLogo() {
  const logo = document.querySelector('.floating-logo');
  
  if (logo) {
    gsap.to(logo, {
      y: -10,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}

/**
 * Grid Stagger Animations
 */
function initGridStagger() {
  const grids = gsap.utils.toArray('.stagger-grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.stagger-item');
    
    gsap.fromTo(items,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/**
 * Button Ripple Effect
 */
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn-ripple');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.className = 'ripple-effect';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: {
      targets: navbar,
      className: 'navbar-scrolled'
    }
  });
}

/**
 * Parallax Effect for Hero Background
 */
function initParallax() {
  const parallaxElements = gsap.utils.toArray('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed') || 0.5;
    
    gsap.to(element, {
      yPercent: 50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/**
 * Text Reveal Animation
 */
function initTextReveal() {
  const textElements = gsap.utils.toArray('.text-reveal');
  
  textElements.forEach(text => {
    const words = text.textContent.split(' ');
    text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    const spans = text.querySelectorAll('.word');
    
    gsap.fromTo(spans,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/**
 * Page Transition Effect
 */
function initPageTransitions() {
  // Fade in page on load
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
  
  // Add transition to internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]:not([href^="//"]), a[href^="' + window.location.origin + '"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.target !== '_blank') {
        e.preventDefault();
        const destination = this.href;
        
        gsap.to('body', {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            window.location.href = destination;
          }
        });
      }
    });
  });
}

// Initialize all animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    addRippleEffect();
    initNavbarScroll();
    initParallax();
    initTextReveal();
    initPageTransitions();
  });
} else {
  initAnimations();
  addRippleEffect();
  initNavbarScroll();
  initParallax();
  initTextReveal();
  initPageTransitions();
}

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

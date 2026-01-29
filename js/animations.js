// ===================================
// SOLVIX CORPORATE WEBSITE
// Animations & Scroll Effects
// ===================================

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optionally unobserve after animation
      // animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll-animate class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(el => animateOnScroll.observe(el));
});

// === ANIMATED COUNTERS ===
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const target = parseInt(entry.target.dataset.target);
      const duration = parseInt(entry.target.dataset.duration) || 2000;
      animateCounter(entry.target, target, duration);
      entry.target.dataset.animated = 'true';
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => counterObserver.observe(counter));
});

// === PARALLAX EFFECT (Optional) ===
function parallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Initialize parallax if elements exist
if (document.querySelector('[data-parallax]')) {
  parallaxEffect();
}

// === STAGGER ANIMATION ===
function staggerAnimation(elements, delay = 100) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('active');
    }, index * delay);
  });
}

// Apply stagger to card grids
const cardGridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.staggered) {
      const cards = entry.target.querySelectorAll('.card, .service-card');
      staggerAnimation(cards, 150);
      entry.target.dataset.staggered = 'true';
      cardGridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.feature-grid, .grid');
  grids.forEach(grid => {
    if (grid.querySelectorAll('.card, .service-card').length > 0) {
      cardGridObserver.observe(grid);
    }
  });
});

// === HOVER TILT EFFECT (Subtle) ===
function addTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Apply tilt to cards (optional, can be enabled/disabled)
// document.addEventListener('DOMContentLoaded', () => {
//   const tiltCards = document.querySelectorAll('.card');
//   addTiltEffect(tiltCards);
// });

// === FADE IN ON LOAD ===
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// === SCROLL PROGRESS INDICATOR (Optional) ===
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #1e3a8a, #3b82f6);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Uncomment to enable scroll progress indicator
// createScrollProgress();

// === EXPORT FUNCTIONS FOR EXTERNAL USE ===
window.SolvixAnimations = {
  animateCounter,
  staggerAnimation,
  addTiltEffect
};

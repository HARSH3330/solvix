// ===================================
// Animations & Scroll Effects
// ===================================

// === SCROLL-TRIGGERED ANIMATIONS ===
const scrollAnimObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-animate').forEach(el => {
    scrollAnimObserver.observe(el);
  });
});

// === ANIMATED COUNTERS ===
function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current >= target ? target : Math.floor(current);
    
    if (current >= target) {
      clearInterval(timer);
    }
  }, 16);
}

// Observe and animate counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.animated) return;
    
    const target = parseInt(entry.target.dataset.target);
    const duration = parseInt(entry.target.dataset.duration) || 2000;
    
    animateCounter(entry.target, target, duration);
    entry.target.dataset.animated = 'true';
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });
});

// === STAGGERED ANIMATIONS ===
function staggerAnimation(elements, delay = 100) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('active');
    }, index * delay);
  });
}

// Observe grid animations
const gridAnimObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.staggered) return;
    
    const cards = entry.target.querySelectorAll('.card, .service-card');
    if (cards.length > 0) {
      staggerAnimation(cards, 150);
      entry.target.dataset.staggered = 'true';
      gridAnimObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-grid, .grid').forEach(grid => {
    gridAnimObserver.observe(grid);
  });
});

// === PARALLAX EFFECT ===
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      element.style.transform = `translateY(${-(scrolled * speed)}px)`;
    });
  });
}

if (document.querySelector('[data-parallax]')) {
  initializeParallax();
}

// === HOVER TILT EFFECT ===
function addTiltEffect(cards) {
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (e.clientY - rect.top - centerY) / 20;
      const rotateY = (centerX - (e.clientX - rect.left)) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// === PAGE LOAD FADE-IN ===
window.addEventListener('load', () => {
  const body = document.body;
  body.style.opacity = '0';
  body.style.transition = 'opacity 0.3s ease-in';
  
  setTimeout(() => {
    body.style.opacity = '1';
  }, 100);
});

// === SCROLL PROGRESS BAR (Optional) ===
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #1e3a8a, #3b82f6);
    z-index: 9999; transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Uncomment to enable:
// createScrollProgress();

// === PUBLIC API ===
window.SolvixAnimations = {
  animateCounter,
  staggerAnimation,
  addTiltEffect,
  createScrollProgress
};

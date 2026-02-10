// ===================================
// Main JavaScript Functionality
// ===================================

// === NAVIGATION ELEMENTS ===
const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

// === HAMBURGER ANIMATION HELPER ===
function setHamburgerState(isActive) {
  if (!navbarToggle) return;
  const spans = navbarToggle.querySelectorAll('span');
  if (isActive) {
    spans[0]?.style && (spans[0].style.transform = 'rotate(45deg) translateY(8px)');
    spans[1]?.style && (spans[1].style.opacity = '0');
    spans[2]?.style && (spans[2].style.transform = 'rotate(-45deg) translateY(-8px)');
  } else {
    spans[0]?.style && (spans[0].style.transform = 'none');
    spans[1]?.style && (spans[1].style.opacity = '1');
    spans[2]?.style && (spans[2].style.transform = 'none');
  }
}

// === CLOSE MOBILE MENU ===
function closeMobileMenu() {
  navbarMenu.classList.remove('active');
  setHamburgerState(false);
}

// === STICKY NAVIGATION ===
window.addEventListener('scroll', () => {
  const isScrolled = window.pageYOffset > 50;
  navbar.classList.toggle('scrolled', isScrolled);
  navbar.classList.toggle('transparent', !isScrolled);
});

// === MOBILE MENU TOGGLE ===
if (navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    setHamburgerState(navbarMenu.classList.contains('active'));
  });

  // Close menu when clicking on a link
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// === ACTIVE PAGE HIGHLIGHTING ===
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-menu a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
    link.classList.add('active');
  }
});

// === LAZY LOADING IMAGES ===
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// === SERVICE CARD EXPAND/COLLAPSE ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card').forEach(card => {
    const header = card.querySelector('.service-card-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      
      document.querySelectorAll('.service-card.expanded').forEach(other => {
        if (other !== card) other.classList.remove('expanded');
      });

      card.classList.toggle('expanded', !wasExpanded);
    });
  });
});

// === UTILITY FUNCTIONS ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// === KEYBOARD ACCESSIBILITY ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu?.classList.contains('active')) {
    closeMobileMenu();
  }
});

// === INITIALIZE ON DOM LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  const isScrolled = window.pageYOffset > 50;
  navbar.classList.add(isScrolled ? 'scrolled' : 'transparent');

  window.addEventListener('scroll', debounce(() => {
    // Performance-optimized scroll handler
  }, 100));
});

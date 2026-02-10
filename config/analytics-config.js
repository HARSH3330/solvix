// =====================================================
// GOOGLE ANALYTICS & EMAILJS CONFIGURATION
// =====================================================
// This file configures Google Analytics 4 and EmailJS
// for the Solvix website. Keep this file private as it
// contains API credentials.

// === GOOGLE ANALYTICS 4 ===
window.dataLayer = window.dataLayer || [];

function gtag(...args) {
  window.dataLayer.push(args);
}

gtag('js', new Date());

// TODO: Add Google analytics Id 
const GA_MEASUREMENT_ID = 'G_XXXXXXXXXXXXX';

gtag('config', GA_MEASUREMENT_ID, {
  page_path: window.location.pathname,
  page_title: document.title,
  anonymize_ip: true,
  cookie_expires: 63072000
});

// === EMAILJS CONFIGURATION ===
// EmailJS allows form submissions to be sent via email
// 
// Configuration values:
// - serviceId: Your EmailJS service ID (Gmail, SendGrid, etc.)
// - contactTemplateId: Template for contact form emails
// - careerTemplateId: Template for career form emails
// - publicKey: Your EmailJS public API key (safe to expose)
//
// Form submission emails will be sent to: info@wesolvix.in

const EMAILJS_CONFIG = {
  serviceId: 'service_z6vljsb',
  contactTemplateId: 'template_ur18e7o',
  careerTemplateId: 'template_nhr1o4u',
  publicKey: '7UGnxCMD0CZ96eRY6'
};

// Initialize EmailJS with retry logic
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    return true;
  }
  return false;
}

if (!initializeEmailJS()) {
  setTimeout(() => {
    if (!initializeEmailJS()) {
      console.warn('EmailJS library did not load within expected time');
    }
  }, 500);
}

// === EVENT TRACKING ===
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

function trackFormSubmission(formType) {
  trackEvent('form_submit', {
    form_type: formType,
    timestamp: new Date().toISOString()
  });
}

function trackPageView(pageName) {
  trackEvent('page_view', { page_name: pageName });
}

function trackButtonClick(buttonName) {
  trackEvent('button_click', { button_name: buttonName });
}

// === ERROR TRACKING ===
window.addEventListener('error', (event) => {
  // Suppress GoDaddy cookie banner errors
  if (event.filename?.includes('script.js') && event.message?.includes('style')) {
    event.preventDefault();
    console.warn('Suppressed third-party script error');
    return false;
  }
  
  trackEvent('javascript_error', {
    error_message: event.message,
    error_source: event.filename,
    error_lineno: event.lineno
  });
});

// Suppress third-party unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('style') || 
      event.reason?.toString?.().includes('style')) {
    event.preventDefault();
    console.warn('Suppressed third-party promise rejection');
  }
});

// === PUBLIC API ===
window.AnalyticsConfig = {
  EMAILJS_CONFIG,
  trackEvent,
  trackFormSubmission,
  trackPageView,
  trackButtonClick
};

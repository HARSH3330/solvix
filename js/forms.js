// ===================================
// SOLVIX CORPORATE WEBSITE
// Form Validation & Handling
// ===================================

// === FORM VALIDATION RULES ===
const validationRules = {
  required: (value) => value.trim() !== '',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^[\d\s\-\+\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10,
  minLength: (value, min) => value.length >= min,
  maxLength: (value, max) => value.length <= max
};

// === ERROR MESSAGES ===
const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`,
  file: 'Please upload a file'
};

// === VALIDATE FIELD ===
function validateField(field) {
  const value = field.value;
  const rules = field.dataset.validate ? field.dataset.validate.split(',') : [];
  let isValid = true;
  let errorMessage = '';
  
  // Check each validation rule
  for (let rule of rules) {
    const [ruleName, ruleValue] = rule.split(':');
    
    if (ruleName === 'required' && !validationRules.required(value)) {
      isValid = false;
      errorMessage = errorMessages.required;
      break;
    }
    
    if (value && ruleName === 'email' && !validationRules.email(value)) {
      isValid = false;
      errorMessage = errorMessages.email;
      break;
    }
    
    if (value && ruleName === 'phone' && !validationRules.phone(value)) {
      isValid = false;
      errorMessage = errorMessages.phone;
      break;
    }
    
    if (value && ruleName === 'minLength' && !validationRules.minLength(value, parseInt(ruleValue))) {
      isValid = false;
      errorMessage = errorMessages.minLength(ruleValue);
      break;
    }
    
    if (value && ruleName === 'maxLength' && !validationRules.maxLength(value, parseInt(ruleValue))) {
      isValid = false;
      errorMessage = errorMessages.maxLength(ruleValue);
      break;
    }
  }
  
  // File input validation
  if (field.type === 'file' && field.hasAttribute('required')) {
    if (!field.files || field.files.length === 0) {
      isValid = false;
      errorMessage = errorMessages.file;
    }
  }
  
  return { isValid, errorMessage };
}

// === SHOW ERROR ===
function showError(field, message) {
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorElement = document.createElement('span');
  errorElement.className = 'form-error';
  errorElement.textContent = message;
  field.parentElement.appendChild(errorElement);
}

// === CLEAR ERROR ===
function clearError(field) {
  field.classList.remove('error');
  const errorElement = field.parentElement.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }
}

// === REAL-TIME VALIDATION ===
function setupRealtimeValidation(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  
  fields.forEach(field => {
    // Validate on blur
    field.addEventListener('blur', () => {
      const { isValid, errorMessage } = validateField(field);
      if (!isValid) {
        showError(field, errorMessage);
      } else {
        clearError(field);
      }
    });
    
    // Clear error on input
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        const { isValid } = validateField(field);
        if (isValid) {
          clearError(field);
        }
      }
    });
  });
}

// === VALIDATE FORM ===
function validateForm(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  let isFormValid = true;
  
  fields.forEach(field => {
    const { isValid, errorMessage } = validateField(field);
    if (!isValid) {
      showError(field, errorMessage);
      isFormValid = false;
    } else {
      clearError(field);
    }
  });
  
  return isFormValid;
}

// === FILE UPLOAD PREVIEW ===
function setupFileUpload(fileInput) {
  const label = fileInput.nextElementSibling || fileInput.parentElement.querySelector('.form-file-label');
  
  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      const fileSize = (files[0].size / 1024 / 1024).toFixed(2); // MB
      label.innerHTML = `
        <div style="text-align: center;">
          <div style="font-weight: 600; color: var(--color-primary);">✓ File Selected</div>
          <div style="font-size: var(--font-size-sm); margin-top: 4px;">${fileName}</div>
          <div style="font-size: var(--font-size-xs); color: var(--color-gray-500);">${fileSize} MB</div>
        </div>
      `;
      clearError(fileInput);
    }
  });
}

// === FORM SUBMISSION ===
function handleFormSubmit(form, callback) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Call the callback function (for backend integration)
      if (callback) {
        await callback(data, formData);
      } else {
        // Default behavior - log to console
        console.log('Form submitted:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showFormSuccess(form);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showFormError(form, 'An error occurred. Please try again.');
    } finally {
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// === SHOW SUCCESS MESSAGE ===
function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.style.cssText = `
    padding: var(--spacing-4);
    background-color: #d1fae5;
    border: 2px solid var(--color-success);
    border-radius: var(--radius-md);
    color: #065f46;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-4);
    text-align: center;
  `;
  successMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
  
  form.insertBefore(successMessage, form.firstChild);
  
  // Reset form
  form.reset();
  
  // Clear file upload labels
  const fileLabels = form.querySelectorAll('.form-file-label');
  fileLabels.forEach(label => {
    label.innerHTML = `
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
      <span>Click to upload file</span>
    `;
  });
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
  
  // Scroll to success message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// === SHOW ERROR MESSAGE ===
function showFormError(form, message) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'form-error-message';
  errorMessage.style.cssText = `
    padding: var(--spacing-4);
    background-color: #fee2e2;
    border: 2px solid var(--color-error);
    border-radius: var(--radius-md);
    color: #991b1b;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-4);
    text-align: center;
  `;
  errorMessage.textContent = message;
  
  form.insertBefore(errorMessage, form.firstChild);
  
  // Remove error message after 5 seconds
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

// === INITIALIZE FORMS ===
document.addEventListener('DOMContentLoaded', () => {
  // Setup all forms
  const forms = document.querySelectorAll('form[data-validate-form]');
  
  forms.forEach(form => {
    setupRealtimeValidation(form);
    handleFormSubmit(form);
  });
  
  // Setup file uploads
  const fileInputs = document.querySelectorAll('.form-file-input');
  fileInputs.forEach(input => setupFileUpload(input));
});

// === EXPORT FOR EXTERNAL USE ===
window.SolvixForms = {
  validateField,
  validateForm,
  showError,
  clearError,
  handleFormSubmit,
  setupFileUpload
};

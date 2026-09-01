document.documentElement.classList.add('js');

import { initBusinessStatus } from './business-status.js';
import { initNavigation } from './navigation.js';
import { initGalleryFilters } from './tabs-filters.js';
import { initImageFallbacks } from './image-fallbacks.js';
import { initAnimations } from './animations.js';
import { initThree } from './three.js';

function initInquiryForm() {
  const form = document.querySelector('[data-inquiry-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const requiredFields = [...form.querySelectorAll('[required]')];
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const valid = field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      status.textContent = 'Please complete the required name and email fields.';
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const subject = 'Website inquiry — I Love Children Learning Center';
    const body = [
      `Parent / guardian: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Child's age: ${data.get('age') || 'Not provided'}`,
      `Desired start month: ${data.get('start') || 'Not provided'}`,
      '',
      'Message:',
      data.get('message') || 'I would like more information about the learning center.'
    ].join('\n');

    const mailto = `mailto:dunlapbiah9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app. Review the message before sending.';
    window.location.href = mailto;
  });
}

function setCurrentYear() {
  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

initNavigation();
initBusinessStatus();
initGalleryFilters();
initImageFallbacks();
initAnimations();
initInquiryForm();
setCurrentYear();
initThree();

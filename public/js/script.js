(() => {
  'use strict';

  // Select all forms with the 'needs-validation' class
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over each form
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // If form is invalid
      if (!form.checkValidity()) {
        event.preventDefault();  // Stop submission
        event.stopPropagation(); // Stop bubbling
      }
      // Add Bootstrap validation styling
      form.classList.add('was-validated');
    }, false);
  });
})();



// The script adds Bootstrap form validation.

// Targets forms with .needs-validation.

// Prevents submission if the form is invalid.

// Adds .was-validated to show Bootstrap’s validation feedback.

// Use with novalidate in your <form> tag.

// ✅ Purpose → Show custom Bootstrap validation messages and styling before submission.
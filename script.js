// IMAGE MODAL ZOOM (supports both grid and detail images)
document.querySelectorAll('.service-img, .service-detail-img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.display = 'flex';

    const zoomedImg = document.createElement('img');
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;

    modal.appendChild(zoomedImg);
    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
      modal.remove();
    });
  });
});

// FORM VALIDATION + AJAX SUBMISSION WITH CUSTOM ERRORS AND PER-FORM SUCCESS MESSAGES
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const errorBox = form.querySelector('#formErrors');
    if (errorBox) {
      errorBox.innerHTML = '';
      errorBox.style.display = 'none';
    }

    const inputs = form.querySelectorAll('input, textarea, select');
    let valid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const errorMessage = input.getAttribute('data-error') || 'Invalid input';

      // Date must be in the future
      if (input.id === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          valid = false;
          if (errorBox) errorBox.innerHTML += `<p>Please select a future date.</p>`;
          input.style.borderColor = 'red';
          return;
        }
      }

      if (input.hasAttribute('required') && !value) {
        valid = false;
        if (errorBox) errorBox.innerHTML += `<p>${errorMessage}</p>`;
        input.style.borderColor = 'red';
        return;
      }

      if (input.id === 'name' && value.length < 2) {
        valid = false;
        if (errorBox) errorBox.innerHTML += `<p>Full name must be at least 2 characters.</p>`;
        input.style.borderColor = 'red';
        return;
      }

      if (input.id === 'email' && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value)) {
        valid = false;
        if (errorBox) errorBox.innerHTML += `<p>Check your email and try again.</p>`;
        input.style.borderColor = 'red';
        return;
      }

      if (input.id === 'phone' && !/^\d{10,}$/.test(value)) {
        valid = false;
        if (errorBox) errorBox.innerHTML += `<p>Phone number must be 10 digits.</p>`;
        input.style.borderColor = 'red';
        return;
      }

      input.style.borderColor = '#000';
    });

    if (!valid) {
      if (errorBox) errorBox.style.display = 'block';
      return;
    }

    const formData = new FormData(form);
    fetch(form.action || '#', {
      method: form.method || 'POST',
      body: formData
    })
    .then(() => {
      const successMessage = form.getAttribute('data-success') || 'Form submitted successfully!';
      alert(successMessage);
      form.reset();
    })
    .catch(() => {
      alert('There was an error submitting the form.');
    });
  });
});

// SITE SEARCH FUNCTIONALITY WITH DROPDOWN
function searchSite() {
  const dropdownValue = document.getElementById('searchSelect').value.toLowerCase();
  const inputValue = document.getElementById('searchInput').value.toLowerCase();
  const keyword = dropdownValue || inputValue;
  const results = document.getElementById('searchResults');
  results.innerHTML = '';

  const pages = [
    { title: 'Web Development', url: 'web dev.html', keywords: ['web', 'development', 'responsive', 'design'] },
    { title: 'App Development', url: 'app dev.html', keywords: ['app', 'mobile', 'development'] },
    { title: 'Brand Strategy', url: 'brand strategy.html', keywords: ['brand', 'strategy', 'identity'] },
    { title: 'Content Creation', url: 'content creation.html', keywords: ['content', 'creation', 'media'] },
    { title: 'Our Story', url: 'our story.html', keywords: ['story', 'founder', 'journey'] },
    { title: 'Bookings', url: 'bookings.html', keywords: ['book', 'appointment'] },
    { title: 'About Us', url: 'Pages/about.html', keywords: ['about', 'team', 'mission'] },
    { title: 'Services', url: 'Pages/service.html', keywords: ['services', 'offerings'] },
    { title: 'Contact', url: 'Pages/contact.html', keywords: ['contact', 'email', 'phone'] },
    { title: 'Enquiry', url: 'Pages/enquiry.html', keywords: ['enquiry', 'form', 'questions'] }
  ];

  const matches = pages.filter(page =>
    page.keywords.some(k => k.includes(keyword))
  );

  if (matches.length === 0) {
    results.innerHTML = '<li>No results found.</li>';
  } else {
    matches.forEach(match => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${match.url}">${match.title}</a>`;
      results.appendChild(li);
    });
  }
}

// AUTO-UPDATE FOOTER YEAR
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// ACCORDION TOGGLE FUNCTIONALITY WITH ICON ROTATION (preserves Read More)
document.querySelectorAll('.accordion-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isExpanded));
    content.classList.toggle('expanded');

    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-chevron-down', isExpanded);
      icon.classList.toggle('fa-chevron-up', !isExpanded);
    }
  });
});

// LIVE DATE AND TIME DISPLAY
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const formatted = now.toLocaleString('en-ZA', options);
  const datetimeElement = document.getElementById('datetime');
  if (datetimeElement) {
    datetimeElement.textContent = `- ${formatted}`;
  }
}

setInterval(updateDateTime, 1000);
updateDateTime();
// HAMBURGER MENU TOGGLE FOR MOBILE NAVIGATION
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('#mainNav ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('hamreveal');
      navMenu.classList.toggle('hamreveal');
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
  }
});

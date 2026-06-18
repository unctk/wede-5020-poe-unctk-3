'use strict';

/* Mobile hamburger navigation */
const hamburger = document.getElementById('hamburger');
const navList   = document.querySelector('.nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', function () {
        const isOpen = navList.classList.toggle('nav-open');
        this.setAttribute('aria-expanded', isOpen);
        this.textContent = isOpen ? '✕' : '☰';
    });

    navList.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navList.classList.remove('nav-open');
            hamburger.textContent = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* Back-to-top button */
const topBtn = document.getElementById('back-to-top');

if (topBtn) {
    window.addEventListener('scroll', function () {
        topBtn.classList.toggle('visible', window.scrollY > 400);
    });
    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* Stats counter animation (index page)*/
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

if (statNumbers.length) {
    const countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const el     = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const step   = Math.max(1, Math.ceil(target / 60));

            // let — current is updated on every interval tick
            let current = 0;

            const timer = setInterval(function () {
                current = Math.min(current + step, target);
                el.textContent = current.toLocaleString() + suffix;
                if (current >= target) clearInterval(timer);
            }, 25);

            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) { countObserver.observe(el); });
}

/* Lightbox for award / gallery images*/
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-lightbox]').forEach(function (img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () { openLightbox(this.src, this.alt); });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});

/* Accordion (services page FAQ) */
document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
        const item   = this.closest('.accordion-item');
        const body   = item.querySelector('.accordion-body');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
            openItem.classList.remove('open');
            openItem.querySelector('.accordion-body').style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});

/*Impact search / filter (services page) */
const searchInput = document.getElementById('services-search');

if (searchInput) {
    searchInput.addEventListener('input', function () {
        const query     = this.value.toLowerCase().trim();
        const cards     = document.querySelectorAll('.impact-card');
        const noResults = document.getElementById('no-results');

        let visible = 0;

        cards.forEach(function (card) {
            const match = card.textContent.toLowerCase().includes(query);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        if (noResults) {
            noResults.style.display = (visible === 0 && query !== '') ? 'block' : 'none';
        }
    });
}

/* Enquiry form - validation, AJAX submission and response*/
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(this);

        const name    = this.querySelector('#name');
        const email   = this.querySelector('#email');
        const phone   = this.querySelector('#phone');
        const type    = this.querySelector('#enquiry-type');
        const message = this.querySelector('#message');

        
        let valid = true;

        // Name: must not be empty
        if (!name.value.trim()) {
            showError(name, 'Please enter your full name.'); valid = false;
        }

        if (!validEmail(email.value)) {
            showError(email, 'Please enter a valid email address.'); valid = false;
        }

        // Phone: optional field - only validate if the user has typed something
        if (phone && phone.value.trim() && !validPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number, e.g. +27 82 123 4567.'); valid = false;
        }

        if (!type.value) {
            showError(type, 'Please select an enquiry type.'); valid = false;
        }

        // Message: minimum 20 characters
        if (message.value.trim().length < 20) {
            showError(message, 'Your message must be at least 20 characters.'); valid = false;
        }

        if (!valid) return;

        // AJAX-style async submission with loading state
        const submitBtn  = this.querySelector('[type="submit"]');
        const btnText    = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled    = true;

        const formData = new FormData(enquiryForm);

        
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        }).then(function () {
            submitBtn.textContent = btnText;
            submitBtn.disabled    = false;
            displayEnquiryResponse(name.value, type.value);
        }).catch(function () {
         
            submitBtn.textContent = btnText;
            submitBtn.disabled    = false;
            displayEnquiryResponse(name.value, type.value);
        });
    });
}

function displayEnquiryResponse(nameValue, typeValue) {
    const responses = {
        volunteer:     'Thank you for your interest in volunteering! Our team will review your message and reach out within 3 to 5 business days about current opportunities.',
        sponsor:       'Thank you for your sponsorship enquiry! NLF\'s CSI partnerships have transformed education across 40 districts. We will be in touch shortly to discuss how we can collaborate.',
        'NGO partner': 'Thank you for your partnership enquiry. Our team will respond within 3 to 5 business days to explore how we can amplify impact together.',
        media:         'Thank you for your media enquiry. Our communications team will respond within 2 business days.',
        general:       'Thank you for your message. A member of our team will respond within 3 to 5 business days.'
    };

    const firstName = nameValue.trim().split(' ')[0];
    const response  = responses[typeValue] || responses.general;
    showSuccess(enquiryForm, 'Hi ' + firstName + ', your enquiry has been received! ' + response);
}

/*Contact form - validation + email compilation*/

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(this);

        const name        = this.querySelector('#contact-name');
        const email       = this.querySelector('#contact-email');
        const msgType     = this.querySelector('#contact-type');      
        const subject     = this.querySelector('#contact-subject');
        const message     = this.querySelector('#contact-message');

        
        let valid = true;

        if (!name.value.trim()) {
            showError(name, 'Please enter your full name.'); valid = false;
        }
        if (!validEmail(email.value)) {
            showError(email, 'Please enter a valid email address.'); valid = false;
        }
        if (msgType && !msgType.value) {
            showError(msgType, 'Please select a message type.'); valid = false;
        }
        if (!subject.value.trim()) {
            showError(subject, 'Please enter a subject.'); valid = false;
        }
        if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters.'); valid = false;
        }
        if (!valid) return;

    
        const typeLabel  = msgType ? msgType.options[msgType.selectedIndex].text : '';
        const emailBody  = 'Name: '         + name.value    + '\n'
                         + 'Email: '        + email.value   + '\n'
                         + 'Message Type: ' + typeLabel      + '\n\n'
                         + message.value;

       
        const mailto = 'mailto:info@newleaders.co.za'
                     + '?subject=' + encodeURIComponent('[' + typeLabel + '] ' + subject.value)
                     + '&body='    + encodeURIComponent(emailBody);
        window.location.href = mailto;

        const firstName = name.value.trim().split(' ')[0];
        showSuccess(contactForm,
            'Thank you ' + firstName + '! Your email client should now be open with the message pre-filled. ' +
            'If it did not open, please email info@newleaders.co.za directly.'
        );
    });
}

/* Leaflet interactive map (contact page) */
function initMap() {
    const mapEl = document.getElementById('nlf-map');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('nlf-map', { scrollWheelZoom: false }).setView([-26.1343, 28.0578], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const pins = [
        { lat: -26.1343, lng: 28.0578, name: 'NLF Head Office', info: '18 Glenhove Road, Melrose Estate, Johannesburg' },
        { lat: -26.1932, lng: 28.0473, name: 'Postal Address', info: 'P.O. Box 31533, Braamfontein, Johannesburg' },
        { lat: -25.7479, lng: 28.1878, name: 'Pretoria DBE Office', info: '222 Struben Street, Pretoria' }
    ];

    pins.forEach(function (p) {
        L.marker([p.lat, p.lng])
         .addTo(map)
         .bindPopup('<strong>' + p.name + '</strong><br>' + p.info);
    });
}

if (document.getElementById('nlf-map')) initMap();

/* Helper functions */

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validPhone(phone) {
    return /^[\+]?[0-9][\d\s\-]{7,14}$/.test(phone.trim());
}


function showError(input, msg) {
    const group = input.closest('.form-group');
    if (!group) return;
    input.classList.add('input-error');
    const span = document.createElement('span');
    span.className   = 'error-msg';
    span.textContent = msg;
    group.appendChild(span);
}


function clearErrors(form) {
    form.querySelectorAll('.error-msg').forEach(function (el) { el.remove(); });
    form.querySelectorAll('.input-error').forEach(function (el) {
        el.classList.remove('input-error');
    });
}

// Inserts a green success banner above the form and resets all fields
function showSuccess(form, message) {
    const old = form.parentNode.querySelector('.form-success');
    if (old) old.remove();
    const div = document.createElement('div');
    div.className = 'form-success';
    div.innerHTML  = '<p>' + message + '</p>';
    form.parentNode.insertBefore(div, form);
    form.reset();
    div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
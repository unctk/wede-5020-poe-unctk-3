# CHANGELOG

All notable changes to this project will be documented in this file.

This project follows Semantic Versioning.

## [1.0.0] 
## Part 1 - Building the Structure
HTML pages created: index.html, about.html, services.html, enquiry.html, contact.html

- Built valid HTML5 structures with semantic elements (header, nav, main, section, footer).

- Created a sticky navigation header and consistent footer.

- Drafted initial structural frameworks for the Enquiry and Contact forms.

## Part 2 - Designing the Visuals 
CSS(style.css) created and linked to all five pages
- Styling: Added CSS custom properties(variables) for colours, fonts, spacing and border radius.

- Layout: Implemented CSS Grid( stats-grid, values-grid, team-grid) and Flexbox(two-col, header-inner, footer-inner).

- Interactivity: Added pseudo-classes( :hover, :focus, :active) on nav links, buttons, cards, and form inputs.

- Responsiveness: Added two media query breakpoints( tablet at 900px and phone at 520px) to ensure fluid grid collapse and responsive image scaling.

## Part 3 - Enhancing Fuctionality and SEO
JavaScript Enhancements (script.js):

- DOM Manipulation: Added mobile hamburger navigation toggle with aria-expanded state handling.

- Animations: Added a back-to-top button with scroll-triggered visibility and scroll fade-in animations using IntersectionObserver.

- Dynamic Content: Added a stats counter animation on the index page (IntersectionObserver + setInterval).

- Interactive Elements: - Implemented a gallery lightbox for award and DDD Dashboard images (click to enlarge, Escape to close).

  -Added an interactive FAQ Accordion on the services page (only one tab stays open at a time).

- Search Functionality: Added real-time search/filter DOM manipulation on the services page impact cards with a dynamic "no-results" message.

- Form Validation & AJAX: - Added strict JS validation for the enquiry form: name, email format, phone number format, enquiry type, and message length.

  -Implemented AJAX-style async enquiry form submission using the fetch() API with a simulated loading state (Sending...).

  -Added a dynamic, personalised response message displayed after successful AJAX enquiry submission.

  -Added JS validation for the contact form, compiling all fields into an email body sent via mailto: to the organisation.

- Interactive Map: Integrated Leaflet.js interactive map on the contact page, rendering three accurate, pinned office locations with popup information.

HTML Updates:

 -Hooks & IDs: Added data-target and data-suffix attributes to index stats for the counter animation. Bypassed the "Year Founded" animation to keep 2009 static for better UX.

 -Forms: Added id="enquiry-form", id="contact-form", and novalidate attributes to ensure HTML5 validation is bypassed in favor of custom JavaScript error handling.

 -Structure: Added the global lightbox overlay container, the impact search bar (services.html), and the message type dropdown (contact.html) to ensure all JS queries map perfectly to the DOM.

Search Engine Optimization (SEO):

- Crawling: Created robots.txt to instruct search engine crawlers.

- Structure: Created sitemap.xml listing all five pages with priority and change frequency.

- On-Page SEO: - Added unique <title> tags to all pages.

  -Added unique <meta name="description"> tags summarizing each page.

  -Added <meta name="keywords"> to all pages relevant to NLF and South African education.

  -Verified all <img src="..."> tags include descriptive alt text for screen readers and SEO indexing.

## References
New Leaders Foundation. (2024). About Us. Retrieved from https://www.newleaders.co.za/about

New Leaders Foundation. (2024). Data Driven Districts. Retrieved from https://www.newleaders.co.za/ddd

Trialogue. (2025). NLF NPO Directory Listing. Retrieved from https://trialogue.co.za

OpenStreetMap Contributors. (2024). OpenStreetMap. Retrieved from https://www.openstreetmap.org

Leaflet. (2024). Leaflet.js Documentation v1.9.4. Retrieved from https://leafletjs.com

Google Fonts. (2024). Playfair Display and DM Sans. Retrieved from https://fonts.google.com

Mozilla Developer Network. (2024). CSS Grid Layout. Retrieved from https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

Mozilla Developer Network. (2024). Fetch API. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

W3Schools. (2024). HTML Forms. Retrieved from https://www.w3schools.com/html/html_forms.asp

## Semantic Versioning

Format: MAJOR.MINOR.PATCH  

- MAJOR → Breaking changes (1.0.0 → 2.0.0)  
- MINOR → New features (1.0.0 → 1.1.0)  
- PATCH → Bug fixes / small improvements (1.0.0 → 1.0.1)

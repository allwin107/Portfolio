/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Update footer copyright year
   */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})()


/**
 * Load and render skills from skills.json
 */
async function loadSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  try {
    const response = await fetch('assets/data/skills.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Validate data structure
    if (!data || !data.skillCategories || !Array.isArray(data.skillCategories)) {
      throw new Error('Invalid skills data structure');
    }

    renderSkills(data.skillCategories);
  } catch (error) {
    console.error('Error loading skills:', error);
    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Unable to Load Skills</h3>
        <p>We're having trouble loading the skills data. Please try refreshing the page.</p>
        <button class="btn-primary" onclick="loadSkills()">Retry</button>
      </div>
    `;
  }
}

/**
 * Render skills categories and tags
 */
function renderSkills(skillCategories) {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  let html = '';

  skillCategories.forEach((category, index) => {
    const delay = index * 100;
    html += `
      <div class="skill-category" data-aos="fade-up" data-aos-delay="${delay}">
        <h3 class="category-title">
          <span class="category-icon">${category.icon}</span>
          ${category.title}
        </h3>
        <div class="skill-tags">
          ${category.skills.map(skill => `
            <span class="skill-tag">${skill.name}</span>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Refresh AOS animations if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

/**
 * Initialize skills loading on page load
 */
window.addEventListener('load', () => {
  if (document.getElementById('skillsContainer')) {
    loadSkills();
  }
});

/**
 * Load and render projects from projects.json
 */
async function loadProjects() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Validate data structure
    if (!data || !data.projects || !Array.isArray(data.projects)) {
      throw new Error('Invalid projects data structure');
    }

    // Check if projects array is empty
    if (data.projects.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <h3>No Projects Yet</h3>
          <p>Check back soon for exciting AI/ML projects!</p>
        </div>
      `;
      return;
    }

    renderProjects(data.projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Unable to Load Projects</h3>
        <p>We're having trouble loading the projects data. Please try refreshing the page.</p>
        <button class="btn-primary" onclick="loadProjects()">Retry</button>
      </div>
    `;
  }
}

/**
 * Determine project type based on characteristics
 */
function getProjectType(project) {
  const tech = project.technologies.map(t => t.toLowerCase()).join(' ');
  const title = project.title.toLowerCase();
  const summary = project.summary.toLowerCase();

  // Check for voice-AI projects
  if (tech.includes('voice') || tech.includes('speech') || tech.includes('elevenlabs') ||
    tech.includes('whisper') || title.includes('voice') || summary.includes('voice')) {
    return 'voice-ai';
  }

  // Check for backend API projects
  if (tech.includes('api') || tech.includes('flask') || tech.includes('fastapi') ||
    tech.includes('rest') || title.includes('api')) {
    return 'backend-api';
  }

  // Check for NLP projects
  if (tech.includes('nlp') || tech.includes('spacy') || tech.includes('llama') ||
    tech.includes('text') || title.includes('nlp') || summary.includes('nlp')) {
    return 'nlp';
  }

  // Check for UI projects
  if (tech.includes('html') || tech.includes('css') || tech.includes('react') ||
    tech.includes('vue') || tech.includes('ui') || project.liveDemo) {
    return 'ui';
  }

  // Check for complex/architecture projects
  if (tech.includes('machine learning') || tech.includes('ml') || tech.includes('pipeline') ||
    summary.includes('system') || summary.includes('architecture')) {
    return 'complex';
  }

  return 'general';
}

/**
 * Render visual assets based on project type
 */
function renderVisualAssets(project) {
  const projectType = getProjectType(project);
  let visualHtml = '';

  // Determine if project is interactive (has video or live demo)
  const isInteractive = project.video || project.liveDemo;

  // Main thumbnail with lazy loading and error handling
  const thumbnailSrc = project.thumbnail || 'https://via.placeholder.com/400x220/667eea/ffffff?text=' + encodeURIComponent(project.title);
  const thumbnailAlt = `${project.title} - ${project.summary}`;
  const fallbackImage = 'https://via.placeholder.com/400x220/667eea/ffffff?text=' + encodeURIComponent(project.title);

  visualHtml += `
    <img src="${thumbnailSrc}" 
         alt="${thumbnailAlt}" 
         class="project-thumbnail" 
         loading="lazy" 
         onerror="handleImageError(this, '${fallbackImage.replace(/'/g, "\\'")}')">
  `;

  // Add video for interactive projects (voice-AI, OCR, etc.)
  if (isInteractive && project.video) {
    visualHtml += `
      <div class="project-video-container">
        <video class="project-video" 
               controls 
               preload="metadata" 
               poster="${thumbnailSrc}"
               aria-label="Demo video for ${project.title}">
          <source src="${project.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `;
  }

  // Add additional screenshots for UI projects
  if (projectType === 'ui' && project.images && project.images.length > 0) {
    visualHtml += '<div class="project-screenshots">';
    project.images.forEach((img, idx) => {
      visualHtml += `
        <img src="${img}" 
             alt="${project.title} screenshot ${idx + 1}" 
             class="project-screenshot" 
             loading="lazy"
             onerror="this.style.display='none'">
      `;
    });
    visualHtml += '</div>';
  }

  // Add architecture diagram indicator for complex projects
  if (projectType === 'complex' && project.diagram) {
    visualHtml += `
      <div class="project-diagram">
        <img src="${project.diagram}" 
             alt="${project.title} architecture diagram" 
             class="project-diagram-img" 
             loading="lazy"
             onerror="this.style.display='none'">
      </div>
    `;
  }

  // Add type indicator badge
  const typeBadges = {
    'voice-ai': '<span class="badge-type badge-voice">Voice-AI</span>',
    'backend-api': '<span class="badge-type badge-api">API</span>',
    'nlp': '<span class="badge-type badge-nlp">NLP</span>',
    'ui': '<span class="badge-type badge-ui">UI</span>',
    'complex': '<span class="badge-type badge-complex">ML System</span>',
    'general': ''
  };

  return {
    html: visualHtml,
    typeBadge: typeBadges[projectType] || ''
  };
}

/**
 * Render project-specific demonstrations
 */
function renderDemonstration(project) {
  const projectType = getProjectType(project);
  let demoHtml = '';

  // Voice-AI projects: video walkthrough or live demo
  if (projectType === 'voice-ai') {
    if (project.video) {
      demoHtml += `
        <div class="project-section demo-section">
          <h4><i class="bi bi-play-circle"></i> Voice Demo</h4>
          <div class="demo-video-wrapper">
            <video class="demo-video" 
                   controls 
                   preload="metadata"
                   aria-label="Voice AI demonstration for ${project.title}">
              <source src="${project.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <p class="demo-caption">Watch the voice assistant in action with real-time speech processing</p>
          </div>
        </div>
      `;
    }
  }

  // Backend API projects: API documentation and examples
  if (projectType === 'backend-api' && project.apiDocumentation) {
    demoHtml += `
      <div class="project-section demo-section">
        <h4><i class="bi bi-code-square"></i> API Documentation</h4>
        <div class="api-demo">
          <a href="${project.apiDocumentation}" class="btn-api-docs" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-book"></i> View Full API Documentation
          </a>
    `;

    if (project.apiExample) {
      demoHtml += `
          <div class="api-example">
            <h5>Example Request:</h5>
            <pre><code>${project.apiExample.endpoint}
${JSON.stringify(project.apiExample.request, null, 2)}</code></pre>
            <h5>Example Response:</h5>
            <pre><code>${JSON.stringify(project.apiExample.response, null, 2)}</code></pre>
          </div>
      `;
    }

    demoHtml += `
        </div>
      </div>
    `;
  }

  // NLP projects: example inputs and outputs
  if (projectType === 'nlp' && project.nlpExamples) {
    demoHtml += `
      <div class="project-section demo-section">
        <h4><i class="bi bi-chat-left-text"></i> Example Classifications</h4>
        <div class="nlp-examples">
    `;

    project.nlpExamples.forEach((example, idx) => {
      demoHtml += `
          <div class="nlp-example">
            <div class="nlp-input">
              <h5><i class="bi bi-envelope"></i> Input Email ${idx + 1}:</h5>
              <pre>${example.input}</pre>
            </div>
            <div class="nlp-output">
              <h5><i class="bi bi-arrow-right-circle"></i> Classification Result:</h5>
              <div class="classification-result">
                <span class="result-label">Category:</span> 
                <span class="result-value category-${example.output.category.toLowerCase()}">${example.output.category}</span>
                <br>
                <span class="result-label">Priority:</span> 
                <span class="result-value priority-${example.output.priority.toLowerCase()}">${example.output.priority}</span>
                <br>
                <span class="result-label">Confidence:</span> 
                <span class="result-value">${(example.output.confidence * 100).toFixed(1)}%</span>
                <br>
                <span class="result-label">Reasoning:</span> 
                <span class="result-reasoning">${example.output.reasoning}</span>
              </div>
            </div>
          </div>
      `;
    });

    demoHtml += `
        </div>
      </div>
    `;
  }

  // For projects without live demos: comprehensive video demonstration
  if (!project.liveDemo && project.video && project.demoType === 'video') {
    demoHtml += `
      <div class="project-section demo-section">
        <h4><i class="bi bi-camera-video"></i> Video Demonstration</h4>
        <div class="demo-video-wrapper">
          <video class="demo-video" 
                 controls 
                 preload="metadata"
                 aria-label="Comprehensive demonstration for ${project.title}">
            <source src="${project.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <p class="demo-caption">Complete walkthrough showing functionality and features</p>
        </div>
      </div>
    `;
  }

  return demoHtml;
}

/**
 * Render project cards with case study sections
 */
function renderProjects(projects) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  let html = '';

  projects.forEach((project, index) => {
    const delay = index * 100;

    // Build technology tags
    const techTags = project.technologies.map(tech =>
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Build project links
    const links = [];
    if (project.liveDemo) {
      links.push(`<a href="${project.liveDemo}" class="btn-demo" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-play-circle"></i> Live Demo
      </a>`);
    }
    if (project.github) {
      links.push(`<a href="${project.github}" class="btn-github" target="_blank" rel="noopener noreferrer">
        <i class="bi bi-github"></i> GitHub
      </a>`);
    }

    // Render visual assets with conditional rendering
    const visualAssets = renderVisualAssets(project);

    // Featured badge
    const featuredBadge = project.featured ? '<span class="badge-featured">Featured</span>' : '';

    // Render project-specific demonstrations
    const demonstrationHtml = renderDemonstration(project);

    html += `
      <div class="project-card" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="project-visual">
          ${visualAssets.html}
          <div class="project-badges">
            ${featuredBadge}
            ${visualAssets.typeBadge}
            ${project.liveDemo ? '<span class="badge-live">Live Demo</span>' : ''}
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          
          <div class="project-section">
            <h4><i class="bi bi-exclamation-circle"></i> Problem</h4>
            <p>${project.problem}</p>
          </div>
          
          <div class="project-section">
            <h4><i class="bi bi-lightbulb"></i> Solution</h4>
            <p>${project.solution}</p>
          </div>
          
          <div class="project-section">
            <h4><i class="bi bi-tools"></i> Technologies</h4>
            <div class="tech-tags">
              ${techTags}
            </div>
          </div>
          
          <div class="project-section">
            <h4><i class="bi bi-graph-up"></i> Results & Impact</h4>
            <p>${project.results}</p>
          </div>
          
          ${demonstrationHtml}
          
          ${project.learnings ? `
          <div class="project-section">
            <h4><i class="bi bi-book"></i> Key Learnings</h4>
            <p>${project.learnings}</p>
          </div>
          ` : ''}
          
          <div class="project-links">
            ${links.join('')}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Initialize lazy loading observer
  initializeLazyLoading();

  // Refresh AOS animations if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

/**
 * Initialize Intersection Observer for lazy loading images
 */
function initializeLazyLoading() {
  // Check if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // For images with data-src attribute
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // Add loaded class for fade-in effect
          img.classList.add('lazy-loaded');

          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with loading="lazy"
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));

    // Observe all videos
    const lazyVideos = document.querySelectorAll('video[preload="metadata"]');
    lazyVideos.forEach(video => imageObserver.observe(video));
  }
}

/**
 * Initialize projects loading on page load
 */
window.addEventListener('load', () => {
  if (document.getElementById('projectsContainer')) {
    loadProjects();
  }
});


/**
 * Contact Form Validation and Submission
 */
(function () {
  'use strict';

  // Get form element
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  // Validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: 'Please enter your name',
        minLength: 'Name must be at least 2 characters',
        maxLength: 'Name must not exceed 100 characters',
        pattern: 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
      }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: 'Please enter your email address',
        pattern: 'Please enter a valid email address'
      }
    },
    subject: {
      required: true,
      minLength: 3,
      maxLength: 200,
      messages: {
        required: 'Please enter a subject',
        minLength: 'Subject must be at least 3 characters',
        maxLength: 'Subject must not exceed 200 characters'
      }
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 5000,
      messages: {
        required: 'Please enter your message',
        minLength: 'Message must be at least 10 characters',
        maxLength: 'Message must not exceed 5000 characters'
      }
    }
  };

  /**
   * Validate a single field
   */
  function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { valid: true };

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return {
        valid: false,
        message: rules.messages.required
      };
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return { valid: true };
    }

    // Min length validation
    if (rules.minLength && value.trim().length < rules.minLength) {
      return {
        valid: false,
        message: rules.messages.minLength
      };
    }

    // Max length validation
    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return {
        valid: false,
        message: rules.messages.maxLength
      };
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value.trim())) {
      return {
        valid: false,
        message: rules.messages.pattern
      };
    }

    return { valid: true };
  }

  /**
   * Display error message for a field
   */
  function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (field) {
      field.classList.add('error');
      field.classList.remove('success');
    }

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Clear error message for a field
   */
  function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (field) {
      field.classList.remove('error');
      field.classList.add('success');
    }

    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  /**
   * Validate all form fields
   */
  function validateForm() {
    let isValid = true;
    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (!field) return;

      const validation = validateField(fieldName, field.value);

      if (!validation.valid) {
        showError(fieldName, validation.message);
        isValid = false;
      } else {
        clearError(fieldName);
      }
    });

    return isValid;
  }

  /**
   * Show form status message
   */
  function showMessage(type, message) {
    const loadingElement = contactForm.querySelector('.loading');
    const errorElement = contactForm.querySelector('.error-message');
    const successElement = contactForm.querySelector('.sent-message');

    // Hide all messages first
    if (loadingElement) loadingElement.style.display = 'none';
    if (errorElement) errorElement.style.display = 'none';
    if (successElement) successElement.style.display = 'none';

    // Show appropriate message
    if (type === 'loading') {
      if (loadingElement) loadingElement.style.display = 'block';
    } else if (type === 'error') {
      if (errorElement) {
        errorElement.textContent = message || 'An error occurred. Please try again.';
        errorElement.style.display = 'block';
      }
    } else if (type === 'success') {
      if (successElement) {
        successElement.textContent = message || 'Your message has been sent. Thank you!';
        successElement.style.display = 'block';
      }
    }
  }

  /**
   * Reset form
   */
  function resetForm() {
    contactForm.reset();
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (field) {
        field.classList.remove('error', 'success');
      }
      clearError(fieldName);
    });
  }

  // Real-time validation on blur
  const formFields = contactForm.querySelectorAll('input, textarea');
  formFields.forEach(field => {
    field.addEventListener('blur', function () {
      const validation = validateField(this.id, this.value);
      if (!validation.valid) {
        showError(this.id, validation.message);
      } else {
        clearError(this.id);
      }
    });

    // Clear error on input
    field.addEventListener('input', function () {
      const errorElement = document.getElementById(`${this.id}-error`);
      if (errorElement && errorElement.textContent) {
        const validation = validateField(this.id, this.value);
        if (validation.valid) {
          clearError(this.id);
        }
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      showMessage('error', 'Please correct the errors above and try again.');
      return;
    }

    // Show loading state
    showMessage('loading');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    // Prepare form data
    const formData = new FormData(contactForm);

    // Submit form via AJAX
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        // Show success message
        showMessage('success', 'Your message has been sent successfully! I\'ll get back to you soon.');

        // Reset form after 2 seconds
        setTimeout(() => {
          resetForm();
          showMessage(''); // Hide all messages
        }, 3000);
      })
      .catch(error => {
        console.error('Form submission error:', error);
        showMessage('error', 'Sorry, there was an error sending your message. Please try again or contact me directly via email.');
      })
      .finally(() => {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
        }
      });
  });

  // Prevent form submission on Enter key in input fields (except textarea)
  contactForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Move to next field
        const fields = Array.from(contactForm.querySelectorAll('input, textarea'));
        const currentIndex = fields.indexOf(this);
        if (currentIndex < fields.length - 1) {
          fields[currentIndex + 1].focus();
        }
      }
    });
  });

})();


/**
 * Global Image Error Handler
 * Handles failed image loads with fallback placeholders
 */
function handleImageError(img, fallbackUrl) {
  // Prevent infinite loop if fallback also fails
  if (img.dataset.errorHandled) {
    console.error('Image fallback also failed:', img.src);
    // Use a data URI as last resort
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220"%3E%3Crect fill="%23667eea" width="400" height="220"/%3E%3Ctext fill="%23ffffff" font-family="Arial, sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage Not Available%3C/text%3E%3C/svg%3E';
    img.alt = 'Image not available';
    return;
  }

  img.dataset.errorHandled = 'true';
  img.src = fallbackUrl || 'https://via.placeholder.com/400x220/667eea/ffffff?text=Image+Not+Available';
  img.classList.add('image-fallback');
  console.warn('Image failed to load, using fallback:', img.src);
}

/**
 * Feature Detection and Graceful Degradation
 */
(function () {
  'use strict';

  // Check for IntersectionObserver support (for lazy loading)
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, loading all images immediately');
    // Load all lazy images immediately
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }

  // Check for fetch API support
  if (!window.fetch) {
    console.error('Fetch API not supported');
    // Provide fallback message
    const containers = ['projectsContainer', 'skillsContainer'];
    containers.forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = `
          <div class="error-state">
            <div class="error-icon">⚠️</div>
            <h3>Browser Not Supported</h3>
            <p>Your browser doesn't support modern web features. Please update your browser for the best experience.</p>
          </div>
        `;
      }
    });
  }

  // Check for localStorage support (for form data persistence)
  function isLocalStorageAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available, form data will not be persisted');
  }

  // Check for CSS Grid support
  if (!CSS.supports('display', 'grid')) {
    console.warn('CSS Grid not supported, layout may be affected');
    document.body.classList.add('no-grid-support');
  }

  // Check for CSS Custom Properties support
  if (!CSS.supports('color', 'var(--test)')) {
    console.warn('CSS Custom Properties not supported, using fallback styles');
    document.body.classList.add('no-css-vars');
  }

  // Detect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion preference detected');
    document.body.classList.add('reduce-motion');
  }

  // Detect dark mode preference (for future enhancement)
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Dark mode preference detected');
    // Could add dark mode class here in future
  }

})();

/**
 * Network Status Detection
 */
(function () {
  'use strict';

  // Check if online/offline events are supported
  if ('onLine' in navigator) {
    function updateOnlineStatus() {
      if (!navigator.onLine) {
        showOfflineNotification();
      } else {
        hideOfflineNotification();
      }
    }

    function showOfflineNotification() {
      let notification = document.getElementById('offline-notification');
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'offline-notification';
        notification.className = 'offline-notification';
        notification.innerHTML = `
          <div class="offline-content">
            <i class="bi bi-wifi-off"></i>
            <span>You're offline. Some features may not work.</span>
          </div>
        `;
        document.body.appendChild(notification);
      }
      notification.classList.add('show');
    }

    function hideOfflineNotification() {
      const notification = document.getElementById('offline-notification');
      if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Check initial status
    updateOnlineStatus();
  }
})();

/**
 * Global Error Handler
 */
window.addEventListener('error', function (event) {
  // Log errors for debugging
  console.error('Global error:', event.error);

  // Don't show error UI for script loading errors (handled elsewhere)
  if (event.filename && event.filename.includes('.js')) {
    console.warn('Script loading error:', event.filename);
  }
}, true);

/**
 * Unhandled Promise Rejection Handler
 */
window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser error handling
});

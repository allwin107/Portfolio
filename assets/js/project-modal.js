/**
 * =============================================================================
 * PROJECT MODAL FUNCTIONALITY
 * =============================================================================
 */

/**
 * Open project modal with full details
 */
function openProjectModal(projectId) {
    const project = window.projectsData.find(p => p.id === projectId);
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Populate modal content
    populateModalContent(project);

    // Show modal with animation
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus on close button for accessibility
    setTimeout(() => {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
    }, 100);
}

/**
 * Close project modal
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Add closing animation
    modal.classList.add('closing');

    // Remove modal after animation
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        // Clear modal content
        document.getElementById('modalBody').innerHTML = '';
        document.getElementById('modalTitle').textContent = '';
    }, 250);
}

/**
 * Populate modal with project content
 */
function populateModalContent(project) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modalTitle || !modalBody) return;

    // Set title
    modalTitle.textContent = project.title;

    // Build all technology tags
    const allTechTags = project.technologies.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Render visual assets
    const visualAssets = renderVisualAssets(project);
    const featuredBadge = project.featured ? '<span class="badge-featured">Featured</span>' : '';

    // Build demonstration HTML
    const demonstrationHtml = renderDemonstration(project);

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

    // Build modal content
    let content = `
    <!-- Modal Visual -->
    <div class="modal-project-visual">
      ${visualAssets.html}
      <div class="modal-project-badges">
        ${featuredBadge}
        ${visualAssets.typeBadge}
        ${project.liveDemo ? '<span class="badge-live">Live Demo</span>' : ''}
      </div>
    </div>

    <!-- Summary -->
    <div class="modal-section">
      <p style="font-size: 16px; color: #666; line-height: 1.7;">${project.summary}</p>
    </div>

    <!-- Problem & Solution Grid -->
    <div class="modal-details-grid">
      <div class="modal-section">
        <h4><i class="bi bi-exclamation-circle"></i> Problem</h4>
        <p>${project.problem}</p>
      </div>
      
      <div class="modal-section">
        <h4><i class="bi bi-lightbulb"></i> Solution</h4>
        <p>${project.solution}</p>
      </div>
    </div>

    <!-- Results -->
    <div class="modal-section">
      <h4><i class="bi bi-graph-up"></i> Results & Impact</h4>
      <p>${project.results}</p>
    </div>

    <!-- Technologies -->
    <div class="modal-section">
      <h4><i class="bi bi-tools"></i> Technologies</h4>
      <div class="modal-tech-tags">
        ${allTechTags}
      </div>
    </div>

    <!-- Demonstrations -->
    ${demonstrationHtml}

    <!-- Key Learnings -->
    ${project.learnings ? `
    <div class="modal-section">
      <h4><i class="bi bi-book"></i> Key Learnings</h4>
      <p>${project.learnings}</p>
    </div>
    ` : ''}

    <!-- Action Buttons -->
    ${links.length > 0 ? `
    <div class="modal-footer">
      ${links.join('')}
    </div>
    ` : ''}
  `;

    modalBody.innerHTML = content;
}

/**
 * Initialize modal event listeners
 */
function initializeModalListeners() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Close button click
    if (closeButton) {
        closeButton.addEventListener('click', closeProjectModal);
    }

    // Backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', closeProjectModal);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleModalKeyboard);
}

/**
 * Handle keyboard navigation for modal
 */
function handleModalKeyboard(event) {
    const modal = document.getElementById('projectModal');
    if (!modal || !modal.classList.contains('active')) return;

    // ESC key - close modal
    if (event.key === 'Escape') {
        closeProjectModal();
    }

    // Trap focus within modal
    if (event.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

/**
 * Handle image loading errors
 */
function handleImageError(img, fallbackSrc) {
    img.onerror = null; // Prevent infinite loop
    img.src = fallbackSrc;
}

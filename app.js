/**
 * Job Notification Tracker - Client-Side Routing
 * Full Layout Structure: [Top Bar] → [Context Header] → [Primary Workspace + Secondary Panel] → [Proof Footer]
 */

// Route definitions with placeholder content
const routes = {
  '/': {
    title: 'Home',
    isLanding: true,
    headline: 'Stop Missing The Right Jobs.',
    subtext: 'Precision-matched job discovery delivered daily at 9AM.',
    ctaText: 'Start Tracking',
    ctaLink: '/settings'
  },
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Manage and track your job applications and notifications.',
    emptyState: {
      title: 'No jobs yet',
      message: 'In the next step, you will load a realistic dataset.'
    }
  },
  '/saved': {
    title: 'Saved Jobs',
    subtitle: 'View and manage jobs you have marked as interesting.',
    emptyState: {
      title: 'No saved jobs',
      message: 'Your saved jobs will appear here for easy access.'
    }
  },
  '/digest': {
    title: 'Daily Digest',
    subtitle: 'Summarized job listings from the last 24 hours.',
    emptyState: {
      title: 'Digest is empty',
      message: 'Check back tomorrow at 9AM for your next precision-matched digest.'
    }
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Configure your job search filters and notification preferences.'
  },
  '/proof': {
    title: 'Proof of Work',
    subtitle: 'Artifact collection for project verification.',
    emptyState: {
      title: 'No artifacts yet',
      message: 'This page will house your project artifacts and completion evidence.'
    }
  }
};

/**
 * Render the full page structure according to design philosophy
 */
function renderPage(route) {
  const data = routes[route];

  if (data.isLanding) {
    return `
            <div class="kn-placeholder-page">
                <h1 class="kn-placeholder-page__title">${data.headline}</h1>
                <p class="kn-placeholder-page__subtitle">${data.subtext}</p>
                <div class="kn-empty-state__action">
                    <a href="#${data.ctaLink}" class="kn-button kn-button--primary">${data.ctaText}</a>
                </div>
            </div>
        `;
  }

  let workspaceContent = '';

  if (route === '/settings') {
    workspaceContent = `
            <div class="kn-card">
                <h2 class="kn-card__title">Job Preferences</h2>
                <div class="kn-card__content">
                    <div class="kn-mb-md">
                        <label class="kn-panel__section-title" style="display: block; margin-bottom: 8px;">Role Keywords</label>
                        <input type="text" class="kn-input" placeholder="e.g. Frontend Developer, Product Manager">
                    </div>
                    <div class="kn-mb-md">
                        <label class="kn-panel__section-title" style="display: block; margin-bottom: 8px;">Preferred Locations</label>
                        <input type="text" class="kn-input" placeholder="e.g. Remote, San Francisco, New York">
                    </div>
                    <div class="kn-mb-md">
                        <label class="kn-panel__section-title" style="display: block; margin-bottom: 8px;">Mode</label>
                        <select class="kn-input">
                            <option value="">Select Mode</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">Onsite</option>
                        </select>
                    </div>
                    <div class="kn-mb-md">
                        <label class="kn-panel__section-title" style="display: block; margin-bottom: 8px;">Experience Level</label>
                        <select class="kn-input">
                            <option value="">Select Experience</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                            <option value="lead">Lead / Manager</option>
                        </select>
                    </div>
                    <button class="kn-button kn-button--primary" disabled>Save Preferences</button>
                    <p class="text-small text-muted kn-mt-sm">Logic implementation coming in the next stage.</p>
                </div>
            </div>
        `;
  } else {
    workspaceContent = `
            <div class="kn-empty-state">
                <p class="kn-empty-state__title">${data.emptyState.title}</p>
                <p>${data.emptyState.message}</p>
            </div>
        `;
  }

  return `
    <!-- CONTEXT HEADER -->
    <header class="kn-context-header">
      <h1 class="kn-context-header__title">${data.title}</h1>
      <p class="kn-context-header__subtitle">${data.subtitle}</p>
    </header>

    <!-- MAIN CONTAINER -->
    <div class="kn-main-container">
      
      <!-- PRIMARY WORKSPACE (70%) -->
      <main class="kn-workspace">
        ${workspaceContent}
      </main>

      <!-- SECONDARY PANEL (30%) -->
      <aside class="kn-panel">
        <div class="kn-panel__section">
          <h3 class="kn-panel__section-title">Instructions</h3>
          <p class="text-small">This is a premium skeleton. Navigation and layout are fully functional. Feature logic will be implemented as discrete datasets are introduced.</p>
        </div>

        <div class="kn-panel__section">
          <h3 class="kn-panel__section-title">Next Step</h3>
          <div class="kn-prompt-box">
            <pre class="kn-prompt-box__content">Inject realistic job dataset</pre>
          </div>
        </div>
      </aside>
    </div>
  `;
}

/**
 * Navigate to a route
 */
function navigateTo(path) {
  const route = routes[path];

  if (!route) {
    window.location.hash = '#/dashboard';
    return;
  }

  if (route.redirect) {
    window.location.hash = `#${route.redirect}`;
    return;
  }

  // Render the page structure
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = renderPage(path);

  // Update UI state
  updateActiveNavLink(path);
  closeMobileMenu();
  window.scrollTo(0, 0);
}

/**
 * Update active navigation link highlighting
 */
function updateActiveNavLink(currentPath) {
  const navLinks = document.querySelectorAll('.kn-app-nav__link');
  navLinks.forEach(link => {
    const linkRoute = link.getAttribute('data-route');
    if (linkRoute === currentPath) {
      link.classList.add('kn-app-nav__link--active');
    } else {
      link.classList.remove('kn-app-nav__link--active');
    }
  });
}

/**
 * Mobile menu toggle
 */
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('kn-app-nav__links--open');
  hamburger.classList.toggle('kn-app-nav__hamburger--active');
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (navLinks) navLinks.classList.remove('kn-app-nav__links--open');
  if (hamburger) hamburger.classList.remove('kn-app-nav__hamburger--active');
}

/**
 * Get current route from hash
 */
function getCurrentRoute() {
  const hash = window.location.hash;
  return hash ? hash.substring(1) : '/';
}

function handleRouteChange() {
  navigateTo(getCurrentRoute());
}

/**
 * Initialize
 */
function init() {
  window.addEventListener('hashchange', handleRouteChange);

  const hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

  handleRouteChange();
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') init();

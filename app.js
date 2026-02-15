/**
 * Job Notification Tracker - Enhanced Logic
 */

// Global State
let currentFilters = {
  keyword: '',
  location: '',
  mode: '',
  experience: '',
  source: '',
  sort: 'latest'
};

/**
 * Filter and Sort Jobs
 */
function getProcessedJobs() {
  let filtered = JOB_DATA.filter(job => {
    const matchesKeyword = !currentFilters.keyword ||
      job.title.toLowerCase().includes(currentFilters.keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(currentFilters.keyword.toLowerCase());

    const matchesLocation = !currentFilters.location || job.location === currentFilters.location;
    const matchesMode = !currentFilters.mode || job.mode === currentFilters.mode;
    const matchesExperience = !currentFilters.experience || job.experience === currentFilters.experience;
    const matchesSource = !currentFilters.source || job.source === currentFilters.source;

    return matchesKeyword && matchesLocation && matchesMode && matchesExperience && matchesSource;
  });

  if (currentFilters.sort === 'latest') {
    filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  } else if (currentFilters.sort === 'salary-high') {
    // Simple heuristic for salary sorting (would need better parsing for real use)
    filtered.sort((a, b) => b.id - a.id);
  }

  return filtered;
}

/**
 * Job Card Component
 */
function createJobCard(job, isSaved) {
  const sourceClass = `kn-source-badge--${job.source.toLowerCase()}`;
  const savedText = isSaved ? 'Unsave' : 'Save';
  const savedClass = isSaved ? 'kn-button--secondary' : 'kn-button--secondary';

  return `
        <div class="kn-job-card" data-id="${job.id}">
            <div class="kn-job-card__main">
                <div class="kn-job-card__title">${job.title}</div>
                <div class="kn-job-card__company">${job.company}</div>
                <div class="kn-job-card__meta">
                    <span class="kn-job-card__meta-item">📍 ${job.location} (${job.mode})</span>
                    <span class="kn-job-card__meta-item">💼 ${job.experience}</span>
                    <span class="kn-job-card__meta-item">💰 ${job.salaryRange}</span>
                    <span class="kn-source-badge ${sourceClass}">${job.source}</span>
                    <span class="kn-job-card__meta-item">${job.postedDaysAgo === 0 ? 'Just now' : job.postedDaysAgo + ' days ago'}</span>
                </div>
            </div>
            <div class="kn-job-card__actions">
                <button class="kn-button kn-button--primary kn-button--small action-view">View</button>
                <button class="kn-button ${savedClass} kn-button--small action-save">${savedText}</button>
                <a href="${job.applyUrl}" target="_blank" class="kn-button kn-button--secondary kn-button--small">Apply</a>
            </div>
        </div>
    `;
}

/**
 * Filter Bar Component
 */
function createFilterBar() {
  const locations = [...new Set(JOB_DATA.map(j => j.location))].sort();
  const modes = [...new Set(JOB_DATA.map(j => j.mode))];
  const exps = ['Fresher', '0-1', '1-3', '3-5'];
  const sources = ['LinkedIn', 'Naukri', 'Indeed'];

  return `
        <div class="kn-filter-bar">
            <div class="kn-filter-group" style="flex: 2;">
                <label>Search</label>
                <input type="text" class="kn-input filter-keyword" placeholder="Role or company..." value="${currentFilters.keyword}">
            </div>
            <div class="kn-filter-group">
                <label>Location</label>
                <select class="kn-input filter-location">
                    <option value="">All Locations</option>
                    ${locations.map(l => `<option value="${l}" ${currentFilters.location === l ? 'selected' : ''}>${l}</option>`).join('')}
                </select>
            </div>
            <div class="kn-filter-group">
                <label>Mode</label>
                <select class="kn-input filter-mode">
                    <option value="">All Modes</option>
                    ${modes.map(m => `<option value="${m}" ${currentFilters.mode === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
            </div>
            <div class="kn-filter-group">
                <label>Experience</label>
                <select class="kn-input filter-experience">
                    <option value="">All Experience</option>
                    ${exps.map(e => `<option value="${e}" ${currentFilters.experience === e ? 'selected' : ''}>${e}</option>`).join('')}
                </select>
            </div>
            <div class="kn-filter-group">
                <label>Sort</label>
                <select class="kn-input filter-sort">
                    <option value="latest" ${currentFilters.sort === 'latest' ? 'selected' : ''}>Latest</option>
                    <option value="salary-high" ${currentFilters.sort === 'salary-high' ? 'selected' : ''}>Featured</option>
                </select>
            </div>
        </div>
    `;
}

/**
 * Route handlers
 */
const routes = {
  '/': { isLanding: true },
  '/dashboard': { title: 'Job Dashboard', subtitle: 'Precision-matched jobs for your profile.' },
  '/saved': { title: 'Saved Jobs', subtitle: 'Jobs you have shortlisted.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your search preferences.' },
  '/digest': { title: 'Daily Digest', subtitle: 'Your personalized job summary.' },
  '/proof': { title: 'Proof of Work', subtitle: 'Project verification assets.' }
};

function renderPage(path) {
  if (path === '/') {
    return `
            <div class="kn-placeholder-page">
                <h1 class="kn-placeholder-page__title">Stop Missing The Right Jobs.</h1>
                <p class="kn-placeholder-page__subtitle">Precision-matched job discovery delivered daily at 9AM.</p>
                <div class="kn-empty-state__action">
                    <a href="#/dashboard" class="kn-button kn-button--primary">Start Tracking</a>
                </div>
            </div>
        `;
  }

  const data = routes[path];
  let workspaceContent = '';

  if (path === '/dashboard') {
    const processedJobs = getProcessedJobs();
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');

    workspaceContent = `
            ${createFilterBar()}
            <div class="kn-job-list">
                ${processedJobs.length ? processedJobs.map(j => createJobCard(j, savedIds.includes(j.id))).join('') : `
                    <div class="kn-empty-state">
                        <p class="kn-empty-state__title">No matches found</p>
                        <p>Try adjusting your filters to see more results.</p>
                    </div>
                `}
            </div>
        `;
  } else if (path === '/saved') {
    const savedIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedJobs = JOB_DATA.filter(j => savedIds.includes(j.id));

    workspaceContent = `
            <div class="kn-job-list">
                ${savedJobs.length ? savedJobs.map(j => createJobCard(j, true)).join('') : `
                    <div class="kn-empty-state">
                        <p class="kn-empty-state__title">No saved jobs</p>
                        <p>Shortlist jobs on the dashboard to see them here.</p>
                        <div class="kn-empty-state__action">
                            <a href="#/dashboard" class="kn-button kn-button--primary">Browse Jobs</a>
                        </div>
                    </div>
                `}
            </div>
        `;
  } else if (path === '/settings') {
    workspaceContent = `
            <div class="kn-card">
                <h2 class="kn-card__title">Preferences</h2>
                <div class="kn-card__content">
                    <p>Logic for preference matching will be implemented in the next step.</p>
                </div>
            </div>
        `;
  } else {
    workspaceContent = `
            <div class="kn-empty-state">
                <p class="kn-empty-state__title">Coming Soon</p>
                <p>Features for ${data.title.toLowerCase()} are in development.</p>
            </div>
        `;
  }

  return `
        <header class="kn-context-header">
            <h1 class="kn-context-header__title">${data.title}</h1>
            <p class="kn-context-header__subtitle">${data.subtitle}</p>
        </header>
        <div class="kn-main-container">
            <main class="kn-workspace">${workspaceContent}</main>
            <aside class="kn-panel">
                <div class="kn-panel__section">
                    <h3 class="kn-panel__section-title">Instructions</h3>
                    <p class="text-small">Use the dashboard to browse 60+ live tech roles. View details or save for later.</p>
                </div>
                <div class="kn-panel__section">
                    <h3 class="kn-panel__section-title">Next Step</h3>
                    <div class="kn-prompt-box">
                        <pre class="kn-prompt-box__content">Implement matching scoring logic</pre>
                    </div>
                </div>
            </aside>
        </div>
    `;
}

/**
 * Interactions
 */
function setupEventListeners() {
  document.addEventListener('click', e => {
    const target = e.target;

    // View Modal
    if (target.classList.contains('action-view')) {
      const id = parseInt(target.closest('.kn-job-card').dataset.id);
      const job = JOB_DATA.find(j => j.id === id);
      showModal(job);
    }

    // Save Toggle
    if (target.classList.contains('action-save')) {
      const id = parseInt(target.closest('.kn-job-card').dataset.id);
      toggleSave(id);
      navigateTo(getCurrentRoute()); // Re-render current page
    }

    // Close Modal
    if (target.id === 'closeModal' || target.id === 'jobModal') {
      document.getElementById('jobModal').classList.remove('kn-modal--open');
    }
  });

  // Filtering
  document.addEventListener('input', e => {
    if (e.target.classList.contains('filter-keyword')) {
      currentFilters.keyword = e.target.value;
      renderDynamicContent();
    }
  });

  document.addEventListener('change', e => {
    if (e.target.classList.contains('filter-location')) {
      currentFilters.location = e.target.value;
      renderDynamicContent();
    }
    if (e.target.classList.contains('filter-mode')) {
      currentFilters.mode = e.target.value;
      renderDynamicContent();
    }
    if (e.target.classList.contains('filter-experience')) {
      currentFilters.experience = e.target.value;
      renderDynamicContent();
    }
    if (e.target.classList.contains('filter-sort')) {
      currentFilters.sort = e.target.value;
      renderDynamicContent();
    }
  });
}

function renderDynamicContent() {
  const path = getCurrentRoute();
  if (path === '/dashboard' || path === '/saved') {
    document.getElementById('appContent').innerHTML = renderPage(path);
  }
}

function showModal(job) {
  const modal = document.getElementById('jobModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
        <h2 class="kn-card__title">${job.title}</h2>
        <div class="kn-job-card__company" style="font-size: 1.2rem;">${job.company}</div>
        <p class="kn-mt-md">${job.description}</p>
        <div class="kn-panel__section-title kn-mt-md">Required Skills</div>
        <div class="kn-tag-list">
            ${job.skills.map(s => `<span class="kn-tag">${s}</span>`).join('')}
        </div>
        <div class="kn-mt-xl">
            <a href="${job.applyUrl}" target="_blank" class="kn-button kn-button--primary">Apply Now</a>
        </div>
    `;

  modal.classList.add('kn-modal--open');
}

function toggleSave(id) {
  let saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  if (saved.includes(id)) {
    saved = saved.filter(i => i !== id);
  } else {
    saved.push(id);
  }
  localStorage.setItem('savedJobs', JSON.stringify(saved));
}

/**
 * Navigation Core
 */
function navigateTo(path) {
  const appContent = document.getElementById('appContent');
  appContent.innerHTML = renderPage(path);
  updateActiveNavLink(path);
  closeMobileMenu();
  window.scrollTo(0, 0);
}

function updateActiveNavLink(currentPath) {
  document.querySelectorAll('.kn-app-nav__link').forEach(link => {
    link.classList.toggle('kn-app-nav__link--active', link.getAttribute('data-route') === currentPath);
  });
}

function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('kn-app-nav__links--open');
  document.getElementById('hamburger').classList.toggle('kn-app-nav__hamburger--active');
}

function closeMobileMenu() {
  document.getElementById('navLinks')?.classList.remove('kn-app-nav__links--open');
  document.getElementById('hamburger')?.classList.remove('kn-app-nav__hamburger--active');
}

function getCurrentRoute() {
  const hash = window.location.hash;
  return hash ? hash.substring(1) : '/';
}

function handleRouteChange() {
  navigateTo(getCurrentRoute());
}

function init() {
  window.addEventListener('hashchange', handleRouteChange);
  document.getElementById('hamburger')?.addEventListener('click', toggleMobileMenu);
  setupEventListeners();
  handleRouteChange();
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') init();

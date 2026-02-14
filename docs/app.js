/**
 * Job Notification Tracker - Client-Side Routing
 * Hash-based routing with placeholder pages
 */

// Route definitions with placeholder content
const routes = {
    '/': {
        title: 'Dashboard',
        redirect: '/dashboard'
    },
    '/dashboard': {
        title: 'Dashboard',
        subtitle: 'This section will be built in the next step.'
    },
    '/saved': {
        title: 'Saved Jobs',
        subtitle: 'This section will be built in the next step.'
    },
    '/digest': {
        title: 'Daily Digest',
        subtitle: 'This section will be built in the next step.'
    },
    '/settings': {
        title: 'Settings',
        subtitle: 'This section will be built in the next step.'
    },
    '/proof': {
        title: 'Proof of Work',
        subtitle: 'This section will be built in the next step.'
    }
};

/**
 * Render a placeholder page
 */
function renderPlaceholder(route) {
    const routeData = routes[route];

    return `
    <div class="kn-placeholder-page">
      <h1 class="kn-placeholder-page__title">${routeData.title}</h1>
      <p class="kn-placeholder-page__subtitle">${routeData.subtitle}</p>
    </div>
  `;
}

/**
 * Navigate to a route
 */
function navigateTo(path) {
    const route = routes[path];

    if (!route) {
        // Route not found, redirect to dashboard
        window.location.hash = '#/dashboard';
        return;
    }

    // Handle redirects
    if (route.redirect) {
        window.location.hash = `#${route.redirect}`;
        return;
    }

    // Render the page
    const appContent = document.getElementById('appContent');
    appContent.innerHTML = renderPlaceholder(path);

    // Update active navigation link
    updateActiveNavLink(path);

    // Close mobile menu if open
    closeMobileMenu();
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
 * Get current route from hash
 */
function getCurrentRoute() {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : '/';
}

/**
 * Handle hash changes
 */
function handleRouteChange() {
    const currentRoute = getCurrentRoute();
    navigateTo(currentRoute);
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

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');

    navLinks.classList.remove('kn-app-nav__links--open');
    hamburger.classList.remove('kn-app-nav__hamburger--active');
}

/**
 * Initialize the application
 */
function init() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Set up hamburger menu
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMobileMenu);

    // Initial route
    const currentRoute = getCurrentRoute();
    if (currentRoute === '/') {
        // Redirect to dashboard on first load
        window.location.hash = '#/dashboard';
    } else {
        navigateTo(currentRoute);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

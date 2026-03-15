// Dark mode toggle for Sphinx documentation
(function() {
    const DARK_MODE_KEY = 'sphinx-dark-mode';
    
    // Detect system preference
    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Get current theme
    function getTheme() {
        const saved = localStorage.getItem(DARK_MODE_KEY);
        if (saved !== null) {
            return saved === 'true';
        }
        return getSystemPreference();
    }
    
    // Apply theme
    function applyTheme(isDark) {
        const html = document.documentElement;
        if (isDark) {
            html.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            html.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem(DARK_MODE_KEY, isDark);
        
        // Update toggle button if it exists
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.textContent = isDark ? '☀️' : '🌙';
            toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    // Create toggle button
    function createToggleButton() {
        const isDark = getTheme();
        const toggle = document.createElement('button');
        toggle.id = 'dark-mode-toggle';
        toggle.className = 'dark-mode-toggle';
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newDarkMode = !getTheme();
            applyTheme(newDarkMode);
        });
        
        return toggle;
    }
    
    // Initialize on DOM ready
    function init() {
        // Apply theme immediately
        applyTheme(getTheme());
        
        // Create and insert toggle button
        const toggle = createToggleButton();
        
        // Try to insert into header/navigation area
        const header = document.querySelector('.md-header, .navbar, .navbar-header, header, [role="banner"]');
        if (header) {
            header.appendChild(toggle);
        } else {
            // Fallback: insert at top of body
            document.body.insertBefore(toggle, document.body.firstChild);
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addEventListener('change', function(e) {
                const saved = localStorage.getItem(DARK_MODE_KEY);
                if (saved === null) {
                    applyTheme(e.matches);
                }
            });
        }
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

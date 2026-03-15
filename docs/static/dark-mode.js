// Dark mode toggle for Sphinx documentation
(function() {
    'use strict';
    
    const DARK_MODE_KEY = 'sphinx-dark-mode';
    const DARK_CLASS = 'dark-mode';
    
    // Get system preference
    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Get current theme state
    function isDarkMode() {
        const saved = localStorage.getItem(DARK_MODE_KEY);
        if (saved !== null) {
            return saved === 'true';
        }
        return getSystemPreference();
    }
    
    // Toggle dark mode
    function toggleDarkMode() {
        const newState = !isDarkMode();
        setDarkMode(newState);
    }
    
    // Set dark mode state
    function setDarkMode(enabled) {
        localStorage.setItem(DARK_MODE_KEY, enabled.toString());
        
        if (enabled) {
            document.body.classList.add(DARK_CLASS);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove(DARK_CLASS);
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        updateButton();
    }
    
    // Update button display
    function updateButton() {
        const button = document.getElementById('dark-mode-toggle');
        if (button) {
            button.textContent = isDarkMode() ? '☀️' : '🌙';
            button.setAttribute('title', isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    // Initialize dark mode
    function init() {
        console.log('Initializing dark mode...');
        
        // Set initial state
        setDarkMode(isDarkMode());
        
        // Find and setup button
        const button = document.getElementById('dark-mode-toggle');
        if (button) {
            console.log('Dark mode button found, setting up listener...');
            
            button.removeEventListener('click', toggleDarkMode);
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dark mode toggle clicked');
                toggleDarkMode();
            });
            
            button.style.cursor = 'pointer';
        } else {
            console.log('Dark mode button not found');
        }
    }
    
    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also initialize on window load for extra safety
    window.addEventListener('load', init);
    
    // Expose toggle globally for debugging
    window.toggleDarkMode = toggleDarkMode;
    window.isDarkMode = isDarkMode;
})();

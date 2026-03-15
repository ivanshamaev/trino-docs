// Dark mode toggle for Sphinx documentation
'use strict';

const DARK_MODE_KEY = 'sphinx-dark-mode';
const DARK_CLASS = 'dark-mode';

console.log('Dark mode script loaded');

// Get system preference
window.getSystemPreference = function() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Get current theme state
window.isDarkMode = function() {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    if (saved !== null) {
        return saved === 'true';
    }
    return window.getSystemPreference();
};

// Set dark mode state
window.setDarkMode = function(enabled) {
    console.log('setDarkMode called with:', enabled);
    localStorage.setItem(DARK_MODE_KEY, enabled.toString());
    
    if (enabled) {
        document.body.classList.add(DARK_CLASS);
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove(DARK_CLASS);
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    window.updateButton();
};

// Toggle dark mode
window.toggleDarkMode = function() {
    console.log('toggleDarkMode called, current state:', window.isDarkMode());
    const newState = !window.isDarkMode();
    console.log('Setting to:', newState);
    window.setDarkMode(newState);
};

// Update button display
window.updateButton = function() {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
        const isDark = window.isDarkMode();
        button.textContent = isDark ? '☀️' : '🌙';
        button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        console.log('Button updated, isDark:', isDark);
    }
};

// Setup button listener
window.setupButtonListener = function() {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
        console.log('Setting up button listener');
        
        // Remove old listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new listener
        newButton.addEventListener('click', function(e) {
            console.log('Button clicked!');
            e.preventDefault();
            e.stopPropagation();
            window.toggleDarkMode();
        });
        
        newButton.style.cursor = 'pointer';
        return true;
    } else {
        console.log('Button not found for listener setup');
        return false;
    }
};

// Initialize dark mode
window.initDarkMode = function() {
    console.log('initDarkMode called');
    
    // Set initial theme state
    window.setDarkMode(window.isDarkMode());
    
    // Setup button listener
    setTimeout(function() {
        window.setupButtonListener();
    }, 50);
};

// Initialize when ready - multiple attempts for reliability
function attemptInit() {
    console.log('Attempting initialization, DOM ready:', document.readyState);
    window.initDarkMode();
}

if (document.readyState === 'loading') {
    console.log('Adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', attemptInit);
} else {
    console.log('DOM already loaded, initializing');
    setTimeout(attemptInit, 100);
}

// Also try on window load
window.addEventListener('load', function() {
    console.log('Window load event');
    setTimeout(attemptInit, 100);
});

// Try again after a short delay
setTimeout(attemptInit, 500);

console.log('Dark mode script initialized');

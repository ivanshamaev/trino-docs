// Collapsible hierarchical menu for Sphinx documentation
document.addEventListener('DOMContentLoaded', function() {
    // Get all list items in the navigation
    const navItems = document.querySelectorAll('.globaltoc ul li');
    
    navItems.forEach(function(item) {
        // Check if this item has nested lists (children)
        const nestedList = item.querySelector('ul');
        if (nestedList) {
            // Add a toggle button before the link
            const link = item.querySelector('a');
            if (link) {
                const toggleBtn = document.createElement('span');
                toggleBtn.className = 'toctree-toggle';
                toggleBtn.innerHTML = '▶';
                toggleBtn.style.cursor = 'pointer';
                toggleBtn.style.marginRight = '5px';
                toggleBtn.style.display = 'inline-block';
                toggleBtn.style.minWidth = '15px';
                
                // Insert toggle button before the link
                link.parentNode.insertBefore(toggleBtn, link);
                
                // Hide nested list initially
                nestedList.style.display = 'none';
                
                // Toggle on click
                toggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (nestedList.style.display === 'none') {
                        nestedList.style.display = 'block';
                        toggleBtn.innerHTML = '▼';
                        // Store state
                        localStorage.setItem('toctree_' + link.href, 'expanded');
                    } else {
                        nestedList.style.display = 'none';
                        toggleBtn.innerHTML = '▶';
                        // Store state
                        localStorage.setItem('toctree_' + link.href, 'collapsed');
                    }
                });
                
                // Expand menu if current page is active or has active descendant
                const isActive = link.classList.contains('current') || 
                                item.querySelector('a.current') !== null;
                if (isActive) {
                    nestedList.style.display = 'block';
                    toggleBtn.innerHTML = '▼';
                    localStorage.setItem('toctree_' + link.href, 'expanded');
                } else {
                    // Check localStorage for saved state
                    const savedState = localStorage.getItem('toctree_' + link.href);
                    if (savedState === 'expanded') {
                        nestedList.style.display = 'block';
                        toggleBtn.innerHTML = '▼';
                    }
                }
            }
        }
    });
});

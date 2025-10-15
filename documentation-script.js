/* ===================================
   DOCUMENTATION PAGE SCRIPT
   Handles search, filtering, and document interactions
   =================================== */

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('docSearch');
    const docsGrid = document.getElementById('docsGrid');
    const noResults = document.getElementById('noResults');
    const featuredDoc = document.querySelector('.featured-doc-card');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterDocuments(searchTerm);
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Get category
            const category = this.getAttribute('data-category');

            // Clear search
            if (searchInput) {
                searchInput.value = '';
            }

            // Filter by category
            filterByCategory(category);
        });
    });

    function filterDocuments(searchTerm) {
        const docCards = document.querySelectorAll('.doc-card');
        let visibleCount = 0;

        // Filter regular doc cards
        docCards.forEach(card => {
            const title = card.querySelector('.doc-card-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.doc-card-description')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Filter featured document
        if (featuredDoc) {
            const featuredTitle = featuredDoc.querySelector('.featured-doc-title')?.textContent.toLowerCase() || '';
            const featuredDescription = featuredDoc.querySelector('.featured-doc-description')?.textContent.toLowerCase() || '';

            if (searchTerm && !(featuredTitle.includes(searchTerm) || featuredDescription.includes(searchTerm))) {
                featuredDoc.classList.add('hidden');
                document.querySelector('.featured-doc-section').style.display = 'none';
            } else {
                featuredDoc.classList.remove('hidden');
                document.querySelector('.featured-doc-section').style.display = 'block';
                if (searchTerm && (featuredTitle.includes(searchTerm) || featuredDescription.includes(searchTerm))) {
                    visibleCount++;
                }
            }
        }

        // Show/hide no results
        updateNoResults(searchTerm, visibleCount);
        updateDocCount();
    }

    function filterByCategory(category) {
        const docCards = document.querySelectorAll('.doc-card');
        const featuredDocCard = document.querySelector('.featured-doc-card');
        let visibleCount = 0;

        // Filter regular doc cards
        docCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Filter featured document
        if (featuredDocCard) {
            const featuredCategory = featuredDocCard.getAttribute('data-category');

            if (category === 'all' || featuredCategory === category) {
                featuredDocCard.classList.remove('hidden');
                document.querySelector('.featured-doc-section').style.display = 'block';
                visibleCount++;
            } else {
                featuredDocCard.classList.add('hidden');
                document.querySelector('.featured-doc-section').style.display = 'none';
            }
        }

        // Show/hide no results
        updateNoResults('', visibleCount);
        updateDocCount();
    }

    function updateNoResults(searchTerm, visibleCount) {
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.add('show');
                if (docsGrid) {
                    docsGrid.style.display = 'none';
                }
            } else {
                noResults.classList.remove('show');
                if (docsGrid) {
                    docsGrid.style.display = 'grid';
                }
            }
        }
    }

    function updateDocCount() {
        const totalDocsElement = document.getElementById('totalDocs');
        if (totalDocsElement) {
            const visibleDocs = document.querySelectorAll('.doc-card:not(.hidden), .featured-doc-card:not(.hidden)').length;
            totalDocsElement.textContent = visibleDocs;
        }
    }

    // Initial count update
    updateDocCount();
});

// Download button functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.btn-doc-download');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            // Show download feedback
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Downloading...
            `;

            // Simulate download
            setTimeout(() => {
                this.innerHTML = originalText;
                // In a real implementation, trigger actual download here
                // window.location.href = 'path/to/document.pdf';
            }, 2000);
        });
    });
});

// Preview button functionality
document.addEventListener('DOMContentLoaded', function() {
    const previewBtns = document.querySelectorAll('.btn-doc-preview');

    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            // In a real implementation, open document preview
            alert('Document preview functionality will be implemented here');
        });
    });
});

// Keyboard shortcuts
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('docSearch');

    if (searchInput) {
        // Focus search on '/' key press
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }

            // Clear search on 'Escape' key
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
});

// Smooth scroll animation for doc cards
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all doc cards
    const cards = document.querySelectorAll('.doc-card, .featured-doc-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

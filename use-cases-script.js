// Use Cases Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFilterTabs();
    initFilterButtons();
    updateUseCaseCount();
});

// Initialize filter tabs
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterSections = {
        'industry': document.getElementById('industryFilters'),
        'department': document.getElementById('departmentFilters'),
        'solution': document.getElementById('solutionFilters')
    };

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get filter type
            const filterType = this.getAttribute('data-filter-type');

            // Hide all filter sections
            Object.values(filterSections).forEach(section => {
                if (section) section.style.display = 'none';
            });

            // Show selected filter section or hide all for 'all'
            if (filterType !== 'all' && filterSections[filterType]) {
                filterSections[filterType].style.display = 'flex';
            }

            // Reset all filter buttons
            resetFilterButtons();

            // Show all use cases when switching to 'All Use Cases'
            if (filterType === 'all') {
                showAllUseCases();
            }
        });
    });
}

// Initialize filter buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            const wasActive = this.classList.contains('active');

            // Remove active from all buttons in same filter group
            const parentFilter = this.closest('.filter-options');
            if (parentFilter) {
                parentFilter.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }

            // Add active to this button if it wasn't active
            if (!wasActive) {
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                filterUseCases(category);
            } else {
                showAllUseCases();
            }
        });
    });
}

// Reset all filter buttons
function resetFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
}

// Filter use cases by category
function filterUseCases(category) {
    const useCaseCards = document.querySelectorAll('.use-case-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    useCaseCards.forEach(card => {
        const cardCategories = card.getAttribute('data-categories');
        if (cardCategories && cardCategories.includes(category)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no results message
    if (noResults) {
        if (visibleCount === 0 && useCaseCards.length > 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    updateUseCaseCount(visibleCount);
}

// Show all use cases
function showAllUseCases() {
    const useCaseCards = document.querySelectorAll('.use-case-card');
    const noResults = document.getElementById('noResults');

    useCaseCards.forEach(card => {
        card.style.display = 'block';
    });

    if (noResults) {
        noResults.style.display = 'none';
    }

    updateUseCaseCount(useCaseCards.length);
}

// Update use case count
function updateUseCaseCount(count) {
    const totalUseCasesElement = document.getElementById('totalUseCases');
    if (totalUseCasesElement) {
        // If count is not provided, count all use case cards
        if (count === undefined) {
            count = document.querySelectorAll('.use-case-card').length;
        }
        totalUseCasesElement.textContent = count;
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#resources') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

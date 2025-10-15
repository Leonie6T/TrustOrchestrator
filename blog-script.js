/* ===================================
   BLOG PAGE SCRIPT
   Handles search, filtering, and post navigation
   =================================== */

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blogSearch');
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');

    if (searchInput && blogGrid) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const blogCards = blogGrid.querySelectorAll('.blog-card');
            const featuredPost = document.querySelector('.featured-post');
            let visibleCount = 0;

            // Filter blog cards
            blogCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
                const date = card.querySelector('.post-date').textContent.toLowerCase();

                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || date.includes(searchTerm)) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Filter featured post
            if (featuredPost) {
                const featuredTitle = featuredPost.querySelector('.featured-title').textContent.toLowerCase();
                const featuredExcerpt = featuredPost.querySelector('.featured-excerpt').textContent.toLowerCase();
                const featuredDate = featuredPost.querySelector('.featured-date').textContent.toLowerCase();

                if (searchTerm && !(featuredTitle.includes(searchTerm) || featuredExcerpt.includes(searchTerm) || featuredDate.includes(searchTerm))) {
                    featuredPost.style.display = 'none';
                } else {
                    featuredPost.style.display = 'grid';
                    if (searchTerm && (featuredTitle.includes(searchTerm) || featuredExcerpt.includes(searchTerm) || featuredDate.includes(searchTerm))) {
                        visibleCount++;
                    }
                }
            }

            // Show/hide no results message
            if (searchTerm && visibleCount === 0) {
                noResults.classList.add('show');
                blogGrid.style.display = 'none';
            } else {
                noResults.classList.remove('show');
                blogGrid.style.display = 'grid';
            }

            // Hide featured section label if search is active
            const featuredSection = document.querySelector('.featured-section');
            if (featuredSection) {
                const sectionLabel = featuredSection.querySelector('.section-label');
                if (sectionLabel) {
                    sectionLabel.style.display = searchTerm ? 'none' : 'inline-block';
                }
            }
        });
    }
});

// Open individual blog post
function openPost(postId) {
    // Navigate to individual blog post page
    window.location.href = `blog-post-${postId}.html`;
}

// Smooth scroll for internal navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add animation on scroll for blog cards
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

    // Observe all blog cards for scroll animation
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Handle keyboard navigation for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blogSearch');

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

// Add loading state for post navigation
function openPost(postId) {
    const targetUrl = `blog-post-${postId}.html`;

    // Add a brief loading indication
    const button = event?.target;
    if (button && button.classList.contains('btn-read-more')) {
        button.textContent = 'Loading...';
        button.style.pointerEvents = 'none';
    }

    // Navigate after a brief moment
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 200);
}

// Log search analytics (placeholder for future implementation)
function logSearchAnalytics(searchTerm, resultsCount) {
    // This can be connected to analytics tools in the future
    console.log(`Search: "${searchTerm}" - Results: ${resultsCount}`);
}

// Agent Assist Page Interactions

document.addEventListener('DOMContentLoaded', function() {
    initMetricCounters();
    initScrollAnimations();
    initInteractiveElements();
});

// Metric Counter Animation
function initMetricCounters() {
    const metricTiles = document.querySelectorAll('.metric-tile');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateMetrics();
            }
        });
    }, observerOptions);

    metricTiles.forEach(tile => observer.observe(tile));
}

function animateMetrics() {
    const metricTiles = document.querySelectorAll('.metric-tile');

    metricTiles.forEach(tile => {
        const target = parseInt(tile.getAttribute('data-target'));
        const valueElement = tile.querySelector('.number-value');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                valueElement.textContent = target;
                clearInterval(timer);

                // Add ripple effect on completion
                addRippleEffect(tile);
            } else {
                valueElement.textContent = Math.floor(current);
            }
        }, stepDuration);
    });
}

function addRippleEffect(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = '';
    }, 10);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe capability cards
    const capabilityCards = document.querySelectorAll('.capability-card');
    capabilityCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Observe navigator mockup
    const navigatorMockup = document.querySelector('.navigator-mockup');
    if (navigatorMockup) {
        observerOptions.threshold = 0.3;
        const mockupObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navigatorMockup.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        mockupObserver.observe(navigatorMockup);
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Metric tile interactions
    const metricTiles = document.querySelectorAll('.metric-tile');
    metricTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            // Could open modal with more details or case study
            showNotification('Click to view detailed case study (coming soon)');
        });

        tile.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Dashboard prompt interaction
    const dashboardFrame = document.querySelector('.agent-dashboard-frame');
    if (dashboardFrame) {
        dashboardFrame.addEventListener('click', function() {
            showNotification('Interactive demo available - contact us for a live walkthrough');
        });
    }

    // Action cards in navigator mockup
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remove highlighted class from all cards
            actionCards.forEach(c => c.classList.remove('highlighted'));
            // Add highlighted class to clicked card
            this.classList.add('highlighted');

            showNotification(`Action ${index + 1} selected`);
        });
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.page-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'page-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
        animation: slideInRight 0.4s ease, fadeOut 0.4s ease 2.6s;
        max-width: 400px;
        line-height: 1.5;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#demo' && href !== '#contact') return;

        e.preventDefault();

        if (href === '#demo') {
            showNotification('Demo video would open here. Contact us for a personalized walkthrough.');
        }

        if (href === '#contact') {
            showNotification('Contact form would open here. Reach out to schedule a demo.');
        }
    });
});

// Add hover effects to dashboard elements
const sentimentBadge = document.querySelector('.sentiment-badge');
if (sentimentBadge) {
    sentimentBadge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });

    sentimentBadge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Add pulse effect to next action prompt
const nextActionPrompt = document.querySelector('.next-action-prompt');
if (nextActionPrompt) {
    nextActionPrompt.addEventListener('mouseenter', function() {
        this.style.animationDuration = '1s';
    });

    nextActionPrompt.addEventListener('mouseleave', function() {
        this.style.animationDuration = '2s';
    });
}

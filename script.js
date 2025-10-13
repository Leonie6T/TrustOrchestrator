// Trust Orchestrator Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Intersection Observer for animations
    initScrollAnimations();

    // Form handling
    initFormHandling();

    // Button interactions
    initButtonInteractions();

    // Assessment functionality
    initAssessmentFlow();

    // Accordion functionality for ingredients
    initAccordion();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Handle anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip empty anchors
            if (href === '#') return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
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
                entry.target.classList.add('animate-in');

                // Special handling for statistics
                if (entry.target.classList.contains('stats-section')) {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.stat-item, .framework-item, .highlight-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate Numbers
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent.replace('%', '');
        const isPercentage = stat.textContent.includes('%');
        let currentNumber = 0;
        const increment = Math.ceil(finalNumber / 50);

        // Reset to 0 before animation
        stat.textContent = '0' + (isPercentage ? '%' : '');

        const timer = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }

            stat.textContent = currentNumber + (isPercentage ? '%' : '');
        }, 30);
    });
}

// Form Handling
function initFormHandling() {
    // Demo booking form (when implemented)
    const demoButtons = document.querySelectorAll('.btn-primary');

    demoButtons.forEach(button => {
        if (button.textContent.includes('Book a demo')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showDemoModal();
            });
        }

        if (button.textContent.includes('Watch video')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showVideoModal();
            });
        }
    });

    // Contact form handling
    const contactButtons = document.querySelectorAll('.btn');
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact Us')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showContactModal();
            });
        }
    });
}

// Modal Functions
function showDemoModal() {
    // Create and show demo booking modal
    const modal = createModal('Book a Demo', `
        <form id="demo-form" class="modal-form">
            <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="company">Company *</label>
                <input type="text" id="company" name="company" required>
            </div>
            <div class="form-group">
                <label for="industry">Industry</label>
                <select id="industry" name="industry">
                    <option value="">Select Industry</option>
                    <option value="financial">Financial Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="telecoms">Telecommunications</option>
                    <option value="government">Government/Public Sector</option>
                    <option value="travel">Travel & Hospitality</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="message">Tell us about your use case</label>
                <textarea id="message" name="message" rows="4" placeholder="What challenges are you looking to solve with conversational AI?"></textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Book Demo</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </form>
    `);

    // Handle form submission
    const form = document.getElementById('demo-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form, 'demo');
    });
}

function showVideoModal() {
    // Create and show video modal
    const modal = createModal('Trust Orchestrator Demo Video', `
        <div class="video-container">
            <div class="video-placeholder">
                <div class="video-play-button">▶</div>
                <p>Demo video will be embedded here</p>
                <p class="video-description">See how Trust Orchestrator transforms conversational AI automation</p>
            </div>
        </div>
    `);
}

function showContactModal() {
    // Create and show contact modal
    const modal = createModal('Contact Us', `
        <form id="contact-form" class="modal-form">
            <div class="form-group">
                <label for="contact-name">Full Name *</label>
                <input type="text" id="contact-name" name="name" required>
            </div>
            <div class="form-group">
                <label for="contact-email">Email Address *</label>
                <input type="email" id="contact-email" name="email" required>
            </div>
            <div class="form-group">
                <label for="contact-company">Company</label>
                <input type="text" id="contact-company" name="company">
            </div>
            <div class="form-group">
                <label for="inquiry-type">Inquiry Type</label>
                <select id="inquiry-type" name="inquiry_type">
                    <option value="demo">Request Demo</option>
                    <option value="partner">Partner Information</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="contact-message">Message *</label>
                <textarea id="contact-message" name="message" rows="4" required placeholder="How can we help you?"></textarea>
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Send Message</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </form>
    `);

    // Handle form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form, 'contact');
    });
}

// Modal Creation and Management
function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Form Submission Handling
function handleFormSubmission(form, type) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        console.log(`${type} form submitted:`, data);

        // Show success message
        showSuccessMessage(type);
        closeModal();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function showSuccessMessage(type) {
    const message = type === 'demo'
        ? 'Thank you! We\'ll contact you within 24 hours to schedule your demo.'
        : 'Thank you for your message! We\'ll get back to you soon.';

    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Button Interactions
function initButtonInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add CSS for modal and notification styles
const additionalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
    margin: 0;
    color: #1e293b;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #64748b;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.modal-close:hover {
    background-color: #f1f5f9;
}

.modal-body {
    padding: 1.5rem;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #0891b2;
    box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.1);
}

.form-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.video-container {
    text-align: center;
}

.video-placeholder {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    padding: 3rem;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.video-play-button {
    width: 80px;
    height: 80px;
    background-color: #0891b2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.video-play-button:hover {
    transform: scale(1.1);
}

.video-description {
    color: #64748b;
    font-style: italic;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10001;
    animation: slideInRight 0.3s ease;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-icon {
    font-weight: bold;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.header.scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }

    .form-buttons {
        flex-direction: column;
    }

    .notification {
        left: 20px;
        right: 20px;
    }
}
</style>
`;

// Assessment Flow Functionality
function initAssessmentFlow() {
    // Handle assessment form submission
    const assessmentForm = document.getElementById('trustBenchmarkForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAssessmentSubmission();
        });
    }

    // Handle details form submission
    const detailsForm = document.getElementById('detailsForm');
    if (detailsForm) {
        detailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDetailsSubmission();
        });
    }

    // Initialize results page
    if (window.location.pathname.includes('results.html')) {
        initializeResultsPage();
    }
}

function handleAssessmentSubmission() {
    const form = document.getElementById('trustBenchmarkForm');
    const formData = new FormData(form);
    const answers = {};
    
    // Collect all answers
    for (let i = 1; i <= 17; i++) {
        const questionName = `q${i}`;
        const selectedValue = formData.get(questionName);
        if (selectedValue) {
            answers[questionName] = parseInt(selectedValue);
        }
    }

    // Check if all questions are answered
    const totalQuestions = 17;
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions < totalQuestions) {
        showNotification('Please answer all questions before submitting.', 'error');
        return;
    }

    // Store answers in sessionStorage
    sessionStorage.setItem('assessmentAnswers', JSON.stringify(answers));
    
    // Calculate score
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((totalScore / (totalQuestions * 4)) * 100);
    
    // Store score
    sessionStorage.setItem('trustScore', percentage);
    
    // Redirect to getdetails page
    window.location.href = 'getdetails.html';
}

function handleDetailsSubmission() {
    const form = document.getElementById('detailsForm');
    const formData = new FormData(form);
    const userDetails = {
        fullName: formData.get('fullName'),
        company: formData.get('company'),
        email: formData.get('email')
    };

    // Store user details
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    
    // Redirect to results page
    window.location.href = 'results.html';
}

function initializeResultsPage() {
    // Get stored data
    const answers = JSON.parse(sessionStorage.getItem('assessmentAnswers') || '{}');
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    const trustScore = parseInt(sessionStorage.getItem('trustScore') || '0');

    // Display trust score
    const scoreElement = document.getElementById('trustScore');
    if (scoreElement) {
        scoreElement.textContent = trustScore;
    }

    // Determine maturity level and highlight appropriate card
    const maturityLevel = getMaturityLevel(trustScore);
    highlightMaturityLevel(maturityLevel);

    // Animate score display
    animateScoreDisplay(trustScore);
}

function getMaturityLevel(score) {
    if (score >= 85) return 'trusted';
    if (score >= 65) return 'emerging';
    if (score >= 40) return 'gap';
    return 'risk';
}

function highlightMaturityLevel(level) {
    // Remove active class from all cards
    const allCards = document.querySelectorAll('.level-card');
    allCards.forEach(card => card.classList.remove('active'));

    // Add active class to the appropriate card
    const targetCard = document.getElementById(`level-${level}`);
    if (targetCard) {
        targetCard.classList.add('active');
    }
}

function animateScoreDisplay(score) {
    const scoreElement = document.getElementById('trustScore');
    if (!scoreElement) return;

    let currentScore = 0;
    const increment = Math.ceil(score / 50);
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(timer);
        }
        scoreElement.textContent = currentScore;
    }, 30);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'error' ? '⚠' : '✓'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Accordion Functionality for Ingredients Section
function initAccordion() {
    const ingredientItems = document.querySelectorAll('.ingredient-item');

    ingredientItems.forEach(item => {
        const header = item.querySelector('.ingredient-header');
        const toggle = item.querySelector('.accordion-toggle');

        if (header && toggle) {
            header.addEventListener('click', function() {
                // Close all other items
                ingredientItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
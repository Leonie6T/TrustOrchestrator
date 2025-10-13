// Unassisted Chat Page Interactions

document.addEventListener('DOMContentLoaded', function() {
    initChatAnimations();
    initTypingIndicatorInteraction();
    initCursorInteractions();
});

// Chat message animation sequence
function initChatAnimations() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const bubbles = chatMessages.querySelectorAll('.chat-bubble');

    // Hide all bubbles initially
    bubbles.forEach(bubble => {
        bubble.style.opacity = '0';
    });

    // Animate bubbles in sequence
    bubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.opacity = '1';
            bubble.style.animation = 'fadeInUp 0.4s ease forwards';
        }, index * 800); // 800ms delay between each message
    });

    // Loop the animation
    setInterval(() => {
        bubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.style.animation = 'none';
                setTimeout(() => {
                    bubble.style.animation = 'fadeInUp 0.4s ease forwards';
                }, 50);
            }, index * 800);
        });
    }, 10000); // Restart animation every 10 seconds
}

// Typing indicator interaction
function initTypingIndicatorInteraction() {
    const typingBubble = document.querySelector('.chat-bubble.typing');
    const floatingBadge = document.querySelector('.floating-typing-badge');

    if (typingBubble) {
        typingBubble.addEventListener('click', function() {
            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'fadeInUp 0.4s ease';
            }, 50);

            // Optional: Show a tooltip or modal
            showTypingTooltip();
        });
    }

    if (floatingBadge) {
        floatingBadge.addEventListener('click', function() {
            // Highlight the typing indicator in the chat
            if (typingBubble) {
                typingBubble.scrollIntoView({ behavior: 'smooth', block: 'center' });
                typingBubble.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    typingBubble.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
}

// Show typing tooltip (optional enhancement)
function showTypingTooltip() {
    const existingTooltip = document.querySelector('.typing-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'typing-tooltip';
    tooltip.textContent = 'AI is processing your request in real-time';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 41, 59, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 0.3s ease;
    `;

    document.body.appendChild(tooltip);

    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translate(-50%, -50%) translateY(-10px)';
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
}

// Cursor interactions
function initCursorInteractions() {
    // Change cursor to text caret for chat bubbles
    const chatBubbles = document.querySelectorAll('.chat-bubble:not(.typing)');
    chatBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.cursor = 'text';
        });
    });

    // Change cursor to pointer for typing indicator
    const typingElements = document.querySelectorAll('.chat-bubble.typing, .typing-indicator, .floating-typing-badge');
    typingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Pulse animation on hover for typing indicator
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.addEventListener('mouseenter', function() {
            const dots = this.querySelectorAll('span');
            dots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.animation = 'none';
                    setTimeout(() => {
                        dot.style.animation = 'typing-bounce 0.6s ease-in-out infinite';
                    }, 50);
                }, index * 100);
            });
        });
    }
}

// Smooth scroll for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#demo' && href !== '#use-cases') return;

        e.preventDefault();

        // For demo links, you could open a modal or video
        if (href === '#demo') {
            alert('Demo video would open here');
        }

        // For use cases, scroll to section if it exists
        if (href === '#use-cases') {
            alert('Navigate to use cases section');
        }
    });
});

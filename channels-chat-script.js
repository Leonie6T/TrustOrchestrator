// 2025 Advanced Chat Page Interactions with AI-Driven Features

document.addEventListener('DOMContentLoaded', function() {
    initWaveformInteraction();
    initCursorEffects();
    init2025Features();
});

// 2025 Trend: AI-Driven Personalization
function init2025Features() {
    initAIPersonalization();
    init3DEffects();
    initVoiceActivation();
    initDataVisualization();
    initProgressiveWebApp();
    initAdvancedAccessibility();
}

// 2025 Trend: AI-Driven Personalization
function initAIPersonalization() {
    const capabilityRows = document.querySelectorAll('.capability-row');
    
    // Simulate AI-driven personalization based on user behavior
    const userPreferences = getUserPreferences();
    
    capabilityRows.forEach((row, index) => {
        // Add personalized classes based on user behavior
        if (userPreferences.premiumFeatures.includes(index)) {
            row.classList.add('premium');
        }
        if (userPreferences.personalizedContent.includes(index)) {
            row.classList.add('personalized');
        }
        
        // Add voice activation support
        if (userPreferences.voiceEnabled) {
            row.setAttribute('data-voice-enabled', 'true');
        }
        
        // Add data visualization for metrics
        if (userPreferences.showMetrics) {
            row.setAttribute('data-metrics', getRandomMetric());
        }
    });
}

// 2025 Trend: 3D Effects and Immersive Visuals
function init3DEffects() {
    const capabilityRows = document.querySelectorAll('.capability-row');
    
    capabilityRows.forEach(row => {
        row.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// 2025 Trend: Voice-Activated Interfaces
function initVoiceActivation() {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        // Add voice command support
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'v') { // Ctrl+V for voice
                e.preventDefault();
                recognition.start();
                showVoiceNotification('Listening for voice commands...');
            }
        });
        
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(command);
        };
    }
}

// 2025 Trend: Advanced Data Visualization
function initDataVisualization() {
    const capabilityRows = document.querySelectorAll('.capability-row[data-visualization]');
    
    capabilityRows.forEach(row => {
        row.addEventListener('click', function() {
            showDataVisualization(this);
        });
    });
}

// 2025 Trend: Progressive Web App Features
function initProgressiveWebApp() {
    // Add PWA features
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
    
    // Add install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
}

// 2025 Trend: Advanced Accessibility
function initAdvancedAccessibility() {
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

// Helper functions
function getUserPreferences() {
    // Simulate AI-driven user preference detection
    return {
        premiumFeatures: [2, 5, 8], // Random premium features
        personalizedContent: [0, 3, 6], // Personalized content
        voiceEnabled: true,
        showMetrics: true
    };
}

function getRandomMetric() {
    const metrics = ['95%', '100%', '40%', '2.5x', '3x'];
    return metrics[Math.floor(Math.random() * metrics.length)];
}

function handleVoiceCommand(command) {
    if (command.includes('show') || command.includes('display')) {
        showVoiceNotification('Showing capability details...');
    } else if (command.includes('demo') || command.includes('play')) {
        showVoiceNotification('Starting interactive demo...');
    }
}

function showDataVisualization(row) {
    const notification = document.createElement('div');
    notification.className = 'data-visualization-modal';
    notification.innerHTML = `
        <div class="modal-content">
            <h3>Data Visualization</h3>
            <div class="chart-placeholder">📊 Interactive Chart</div>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    document.body.appendChild(notification);
}

function showInstallPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'install-prompt';
    prompt.innerHTML = `
        <div class="prompt-content">
            <h3>Install Trust Orchestrator</h3>
            <p>Get quick access to our platform</p>
            <button onclick="this.parentElement.parentElement.remove()">Install</button>
        </div>
    `;
    prompt.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    `;
    document.body.appendChild(prompt);
}

// Interactive Waveform
function initWaveformInteraction() {
    const waveform = document.getElementById('interactiveWaveform');
    const interactiveWave = document.querySelector('.interactive-waveform');
    const statusText = document.querySelector('.status-text');

    if (!interactiveWave) return;

    // Click to play demo
    interactiveWave.addEventListener('click', function() {
        playDemoVoice(this, statusText);
    });

    // Pointer cursor on hover
    interactiveWave.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
}

// Play demo voice function
function playDemoVoice(waveformElement, statusElement) {
    // Add active state
    waveformElement.classList.add('active');

    if (statusElement) {
        statusElement.textContent = 'Playing...';
    }

    // Show notification
    showVoiceNotification('AI Voice Demo: "Hello! I\'m your Trust Orchestrator assistant. How can I help you today?"');

    // Simulate audio playing (in production, you'd play actual audio)
    setTimeout(() => {
        waveformElement.classList.remove('active');
        if (statusElement) {
            statusElement.textContent = 'Listening...';
        }
    }, 3000);
}

// Show voice notification
function showVoiceNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.voice-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'voice-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
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
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Cursor effects
function initCursorEffects() {
    const waveform = document.querySelector('.interactive-waveform');

    if (waveform) {
        // Enhanced hover effect
        waveform.addEventListener('mouseenter', function() {
            const bars = this.querySelectorAll('.wave-bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'wave-active 0.8s ease-in-out infinite';
                }, index * 30);
            });
        });

        waveform.addEventListener('mouseleave', function() {
            const bars = this.querySelectorAll('.wave-bar');
            bars.forEach(bar => {
                bar.style.animation = 'wave-idle 2s ease-in-out infinite';
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

        // For demo links
        if (href === '#demo') {
            showVoiceNotification('Demo video would open here. In production, this would launch a video player or interactive demo.');
        }

        // For use cases
        if (href === '#use-cases') {
            showVoiceNotification('Navigate to voice use cases section. This would scroll or redirect to the use cases page.');
        }
    });
});

// Add voice wave effect on scroll
window.addEventListener('scroll', function() {
    const waveformSection = document.querySelector('.waveform-section');
    if (!waveformSection) return;

    const rect = waveformSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        const interactiveWave = document.querySelector('.interactive-waveform');
        if (interactiveWave && !interactiveWave.classList.contains('visible')) {
            interactiveWave.classList.add('visible');
            interactiveWave.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    }
});

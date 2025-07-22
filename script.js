// Interactive Bluebird Poem JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const bird = document.getElementById('bird');
    const interactionHint = document.querySelector('.interaction-hint');
    
    let clickCount = 0;
    let isAnimating = false;
    
    // Bird click interaction
    bird.addEventListener('click', function() {
        if (isAnimating) return;
        
        isAnimating = true;
        clickCount++;
        
        // Add click animation class
        bird.classList.add('clicked');
        
        // Create audio context for bird sounds (if supported)
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            playBirdSound();
        }
        
        // Update interaction hint
        updateInteractionHint();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            bird.classList.remove('clicked');
            isAnimating = false;
        }, 500);
    });
    
    // Bird hover effects
    bird.addEventListener('mouseenter', function() {
        if (!isAnimating) {
            bird.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    bird.addEventListener('mouseleave', function() {
        if (!isAnimating) {
            bird.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    

    
    // Function to play bird sound using Web Audio API
    function playBirdSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Create a melodic bird song pattern
            const frequencies = [440, 523, 659, 784, 659, 523]; // A, C, E, G, E, C
            const duration = 0.15;
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequencies[0], audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
            
            // Play the sequence
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
                    
                    gain.gain.setValueAtTime(0, audioContext.currentTime);
                    gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                    
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + duration);
                }, index * 150);
            });
            
        } catch (error) {
            console.log('Audio not supported or blocked by browser');
        }
    }
    
    // Function to update interaction hint
    function updateInteractionHint() {
        const hints = [
            "Click the bird to hear its song...",
            "The bluebird sings of freedom...",
            "Listen to nature's melody...",
            "Watch the bluebird dance...",
            "Let the bluebird guide your heart..."
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        interactionHint.style.opacity = '0';
        
        setTimeout(() => {
            interactionHint.textContent = randomHint;
            interactionHint.style.opacity = '1';
        }, 300);
    }
    

    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        const speed = scrolled * 0.5;
        
        parallax.style.transform = `translateY(${speed}px)`;
    });
    
    // Add floating particles effect
    createFloatingParticles();
    
    function createFloatingParticles() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(particle);
        }
        
        // Add floating animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.3;
                }
                50% { 
                    transform: translateY(-20px) translateX(10px);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            bird.click();
        }
    });
    
    // Add touch support for mobile
    bird.addEventListener('touchstart', function(event) {
        event.preventDefault();
        bird.click();
    });
    
    // Initialize with a gentle entrance animation
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

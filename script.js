// Interactive Bluebird Poem JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const bird = document.getElementById('bird');
    const birdSound = document.getElementById('birdSound');
    const windSound = document.getElementById('windSound');
    
    let clickCount = 0;
    let isAnimating = false;
    let backgroundRevealed = false;
    
    // Ensure we start with black background
    document.body.style.background = '#000000 !important';
    document.body.classList.remove('background-revealed');
    
    // Enable audio after first user interaction
    let audioEnabled = false;
    function enableAudio() {
        if (!audioEnabled) {
            audioEnabled = true;
            birdSound.volume = 0.5;
            windSound.volume = 0.3;
        }
    }
    
    // Bird click interaction
    bird.addEventListener('click', function() {
        if (isAnimating) return;
        
        isAnimating = true;
        clickCount++;
        
        // Enable audio and play bird sound
        enableAudio();
        try {
            birdSound.currentTime = 0;
            birdSound.play();
        } catch (e) {
            console.log('Bird audio play failed:', e);
        }
        
        // Add click animation class
        bird.classList.add('clicked');
        
        // Toggle background visibility
        if (!backgroundRevealed) {
            // Reveal background
            setTimeout(() => {
                document.body.style.background = '';
                document.body.classList.add('background-revealed');
                backgroundRevealed = true;
                
                // Start wind sound after background transition begins
                setTimeout(() => {
                    try {
                        windSound.play();
                    } catch (e) {
                        console.log('Wind audio play failed:', e);
                    }
                }, 500);
                
                // Start leaf animation after background transition
                setTimeout(() => {
                    startLeafAnimation();
                }, 2000); // Wait for background transition to complete
            }, 400); // Wait for bird animation to start
        } else {
            // Hide background
            setTimeout(() => {
                document.body.classList.remove('background-revealed');
                backgroundRevealed = false;
                
                // Stop wind sound
                windSound.pause();
                windSound.currentTime = 0;
                
                // Remove all leaves
                const existingLeaves = document.querySelectorAll('.floating-leaf');
                existingLeaves.forEach(leaf => {
                    leaf.style.transition = 'opacity 1s ease-out';
                    leaf.style.opacity = '0';
                    setTimeout(() => leaf.remove(), 1000);
                });
            }, 400); // Wait for bird animation to start
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            bird.classList.remove('clicked');
            isAnimating = false;
        }, 800);
    });
    
    // Whiskey and Cigarette Section Interactions
    const whiskeySection = document.querySelector('.whiskey-cigarette-section');
    const ginImage = document.querySelector('.gin-image');
    const smokeImage = document.querySelector('.smoke-image');
    const textElements = document.querySelectorAll('.scattered-text p');
    
    // Whiskey glass interactions
    if (ginImage) {
        ginImage.addEventListener('click', function() {
            // Add tilt animation
            this.style.transform = 'rotate(15deg) scale(1.1)';
            this.style.transition = 'transform 0.3s ease-in-out';
            
            // Add liquid spill effect
            createLiquidSpill(this);
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
        
        ginImage.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 8px 24px rgba(255, 165, 0, 0.6)) brightness(1.2)';
            this.style.transition = 'filter 0.3s ease-in-out';
        });
        
        ginImage.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 4px 16px rgba(0,0,0,0.5)) brightness(1)';
        });
    }
    
    // Smoke/ashtray interactions
    if (smokeImage) {
        smokeImage.addEventListener('click', function() {
            // Add smoke animation
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transition = 'transform 0.4s ease-in-out';
            
            // Create additional smoke particles
            createSmokeParticles(this);
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 400);
        });
        
        smokeImage.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 4px 12px rgba(139, 69, 19, 0.6)) brightness(1.1)';
            this.style.transition = 'filter 0.3s ease-in-out';
        });
        
        smokeImage.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) brightness(1)';
        });
    }
    
    // Text interactions
    textElements.forEach((text, index) => {
        text.addEventListener('click', function() {
            // Add glow effect
            this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.3s ease-in-out';
            
            // Reveal hidden text or change content
            if (this.classList.contains('text-and')) {
                this.textContent = 'then';
                setTimeout(() => {
                    this.textContent = 'and';
                }, 1000);
            }
            
            setTimeout(() => {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
                this.style.transform = 'scale(1)';
            }, 300);
        });
        
        text.addEventListener('mouseenter', function() {
            this.style.color = '#E18A5F';
            this.style.transition = 'color 0.3s ease-in-out';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.color = '#FFFFFF';
        });
    });
    
    // Create liquid spill effect
    function createLiquidSpill(element) {
        const spill = document.createElement('div');
        spill.style.cssText = `
            position: absolute;
            width: 20px;
            height: 40px;
            background: linear-gradient(to bottom, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.6));
            border-radius: 50% 50% 0 0;
            top: ${element.offsetTop + element.offsetHeight - 20}px;
            left: ${element.offsetLeft + element.offsetWidth - 30}px;
            animation: liquidSpill 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(spill);
        
        setTimeout(() => {
            spill.remove();
        }, 1000);
    }
    
    // Create smoke particles
    function createSmokeParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${10 + Math.random() * 20}px;
                height: ${10 + Math.random() * 20}px;
                background: radial-gradient(circle, rgba(139, 69, 19, 0.6), transparent);
                border-radius: 50%;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                animation: smokeFloat 2s ease-out forwards;
                pointer-events: none;
                z-index: 999;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes liquidSpill {
            0% {
                transform: scaleY(0);
                opacity: 1;
            }
            50% {
                transform: scaleY(1);
                opacity: 1;
            }
            100% {
                transform: scaleY(1) translateY(50px);
                opacity: 0;
            }
        }
        
        @keyframes smokeFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Leaf animation function
    function startLeafAnimation() {
        // Remove any existing leaves first
        const existingLeaves = document.querySelectorAll('.floating-leaf');
        existingLeaves.forEach(leaf => leaf.remove());
        
        const container = document.querySelector('.container');
        const leafImages = ['assets/leaf1.png', 'assets/leaf2.png', 'assets/leaf3.png'];
        
        for (let i = 0; i < 8; i++) {
            const leaf = document.createElement('img');
            leaf.className = 'floating-leaf';
            leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
            leaf.style.cssText = `
                position: absolute;
                width: ${60 + Math.random() * 40}px;
                height: auto;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: leafFall ${8 + Math.random() * 6}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                transform: rotate(${Math.random() * 360}deg);
                opacity: 0;
                transition: opacity 1s ease-in-out;
            `;
            container.appendChild(leaf);
            
            // Fade in the leaf after a short delay
            setTimeout(() => {
                leaf.style.opacity = '0.8';
            }, i * 200); // Stagger the leaf appearances
        }
        
        // Add leaf falling animation
        const leafStyle = document.createElement('style');
        leafStyle.textContent = `
            @keyframes leafFall {
                0% { 
                    transform: translateY(-50px) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% { 
                    transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(leafStyle);
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
    
    // Eyes Mouse Tracking
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');
    
    // Mouse tracking for eyes
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        pupils.forEach((pupil, index) => {
            const eye = eyes[index];
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            // Calculate distance from eye center to mouse
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;
            
            // Limit movement range (adjust these values to control eye movement)
            const maxMoveX = 15;
            const maxMoveY = 10;
            
            // Calculate movement with easing
            const moveX = (deltaX / window.innerWidth) * maxMoveX;
            const moveY = (deltaY / window.innerHeight) * maxMoveY;
            
            // Apply transform to pupil
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Eye click interactions
    eyes.forEach((eye, index) => {
        eye.addEventListener('click', function() {
            // Add blink animation
            const pupil = this.querySelector('.pupil');
            const eyelash = this.querySelector('.eyelash');
            
            // Quick blink effect
            pupil.style.transform = 'scaleY(0.1)';
            eyelash.style.transform = 'scaleY(0.8)';
            
            setTimeout(() => {
                pupil.style.transform = 'scaleY(1)';
                eyelash.style.transform = 'scaleY(1)';
            }, 150);
            
            // Add glow effect based on eye color (alternating red/blue)
            if (index % 2 === 1) { // Blue eyes (odd indices)
                this.style.filter = 'drop-shadow(0 0 20px rgba(0, 150, 255, 0.6))';
            } else { // Red eyes (even indices)
                this.style.filter = 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))';
            }
            
            setTimeout(() => {
                this.style.filter = 'none';
            }, 500);
        });
        
        // Hover effects
        eye.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        eye.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Text interactions for eyes section
    const eyesTextElements = document.querySelectorAll('.eyes-text p');
    eyesTextElements.forEach((text, index) => {
        text.addEventListener('click', function() {
            // Add glow effect
            this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease-in-out';
            
            // Make eyes look at the clicked text
            const textRect = this.getBoundingClientRect();
            const textCenterX = textRect.left + textRect.width / 2;
            const textCenterY = textRect.top + textRect.height / 2;
            
            pupils.forEach((pupil, eyeIndex) => {
                const eye = eyes[eyeIndex];
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;
                
                const deltaX = textCenterX - eyeCenterX;
                const deltaY = textCenterY - eyeCenterY;
                
                const maxMoveX = 20;
                const maxMoveY = 15;
                
                const moveX = (deltaX / window.innerWidth) * maxMoveX;
                const moveY = (deltaY / window.innerHeight) * maxMoveY;
                
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // Return to mouse tracking after 2 seconds
                setTimeout(() => {
                    // This will be handled by the mousemove event
                }, 2000);
            });
            
            setTimeout(() => {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
                this.style.transform = 'scale(1)';
            }, 300);
        });
        
        text.addEventListener('mouseenter', function() {
            this.style.color = '#E18A5F';
            this.style.transition = 'color 0.3s ease-in-out';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.color = '#FFFFFF';
        });
    });
    
    // Scroll-triggered animations for eyes section
    const eyesSection = document.querySelector('.eyes-section');
    const eyesGroup = document.querySelector('.eyes-group');
    const textLines = document.querySelectorAll('.text-line-1, .text-line-2, .text-line-3, .text-line-4');
    const individualEyes = document.querySelectorAll('.eye');
    
    let eyesSectionAnimated = false;
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !eyesSectionAnimated) {
                eyesSectionAnimated = true;
                
                // Start eyes group animation
                setTimeout(() => {
                    eyesGroup.classList.add('animate');
                }, 100);
                
                // Animate text lines with delays
                textLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('animate');
                    }, 500 + (index * 300)); // 500ms delay + 300ms between each line
                });
                
                // Animate individual eyes with staggered delays
                individualEyes.forEach((eye, index) => {
                    setTimeout(() => {
                        eye.classList.add('animate');
                    }, 1500 + (index * 100)); // 1500ms delay + 100ms between each eye
                });
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before the section is fully in view
    });
    
    // Start observing the eyes section
    if (eyesSection) {
        observer.observe(eyesSection);
    }
    
    // Eye Bird Section Interactions
    const eyeBirdSection = document.querySelector('.eye-bird-section');
    const eyeBirdImage = document.querySelector('.eye-bird-image');
    const smallEyes = document.querySelectorAll('.small-eye');
    const eyeBirdPoemLines = document.querySelectorAll('.poem-line-1, .poem-line-2, .poem-line-3, .poem-line-4, .poem-line-5');
    
    let eyeBirdSectionAnimated = false;
    
    // Intersection Observer for eye-bird section
    const eyeBirdObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !eyeBirdSectionAnimated) {
                eyeBirdSectionAnimated = true;
                
                // Animate poem lines with delays
                eyeBirdPoemLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('animate');
                    }, 300 + (index * 400)); // 300ms delay + 400ms between each line
                });
                
                // Animate small eyes with staggered delays
                smallEyes.forEach((eye, index) => {
                    setTimeout(() => {
                        eye.style.opacity = '1';
                        eye.style.transform = 'scale(1)';
                    }, 1000 + (index * 200)); // 1000ms delay + 200ms between each eye
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Start observing the eye-bird section
    if (eyeBirdSection) {
        eyeBirdObserver.observe(eyeBirdSection);
    }
    
    // Eye bird image interactions
    if (eyeBirdImage) {
        eyeBirdImage.addEventListener('click', function() {
            // Add pulse animation
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
            this.style.transition = 'transform 0.3s ease-in-out';
            
            // Create bird flutter effect
            createBirdFlutter(this);
            
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
        
        eyeBirdImage.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7)) brightness(1.1)';
            this.style.transition = 'filter 0.3s ease-in-out';
        });
        
        eyeBirdImage.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5)) brightness(1)';
        });
    }
    
    // Small eyes interactions
    smallEyes.forEach((eye, index) => {
        eye.addEventListener('click', function() {
            // Add blink animation
            const pupil = this.querySelector('.small-pupil');
            const redPupil = this.querySelector('.small-red-pupil');
            const bluePupil = this.querySelector('.small-blue-pupil');
            
            // Quick blink effect
            if (pupil) pupil.style.transform = 'scaleY(0.1)';
            if (redPupil) redPupil.style.transform = 'translate(-50%, -50%) scaleY(0.1)';
            if (bluePupil) bluePupil.style.transform = 'translate(-50%, -50%) scaleY(0.1)';
            
            setTimeout(() => {
                if (pupil) pupil.style.transform = 'scaleY(1)';
                if (redPupil) redPupil.style.transform = 'translate(-50%, -50%) scaleY(1)';
                if (bluePupil) bluePupil.style.transform = 'translate(-50%, -50%) scaleY(1)';
            }, 150);
            
            // Add glow effect
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))';
            
            setTimeout(() => {
                this.style.filter = 'none';
            }, 500);
        });
        
        // Hover effects
        eye.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
        });
        
        eye.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Create bird flutter effect
    function createBirdFlutter(element) {
        for (let i = 0; i < 3; i++) {
            const flutter = document.createElement('div');
            flutter.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, rgba(52, 152, 219, 0.8), transparent);
                border-radius: 50%;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                animation: birdFlutter 1.5s ease-out forwards;
                pointer-events: none;
                z-index: 999;
            `;
            
            document.body.appendChild(flutter);
            
            setTimeout(() => {
                flutter.remove();
            }, 1500);
        }
    }
    
    // Add bird flutter animation
    const birdFlutterStyle = document.createElement('style');
    birdFlutterStyle.textContent = `
        @keyframes birdFlutter {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(birdFlutterStyle);
});

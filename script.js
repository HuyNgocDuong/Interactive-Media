// Interactive Bluebird Poem JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const birdChirpingAudio = document.getElementById('birdChirping');
    const heAnunnakiAudio = document.getElementById('heAnunnaki');
    const thoseThingsFunAudio = document.getElementById('thoseThingsFun');

    // Audio helper functions
    function playAudio(audioElement) {
        if (audioElement) {
            console.log('Attempting to play audio:', audioElement.id);
            audioElement.currentTime = 0;
            audioElement.play().catch(e => {
                console.log('Audio play failed:', e);
                console.log('Audio element:', audioElement);
                console.log('Audio src:', audioElement.src);
            });
        } else {
            console.log('Audio element not found');
        }
    }

    function stopAudio(audioElement) {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    }

    const bird = document.getElementById('bird');
    
    let clickCount = 0;
    let isAnimating = false;
    let backgroundRevealed = false;
    
    // Ensure we start with black background
    document.body.style.background = '#000000 !important';
    document.body.classList.remove('background-revealed');
    
    // Bird click interaction
    bird.addEventListener('click', function() {
        if (isAnimating) return;
        
        isAnimating = true;
        clickCount++;
        
        // Add click animation class
        bird.classList.add('clicked');
        
        // Toggle background visibility
        if (!backgroundRevealed) {
            // Reveal background
            setTimeout(() => {
                document.body.style.background = '';
                document.body.classList.add('background-revealed');
                backgroundRevealed = true;
                
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
    
    // "he's" text click functionality to scroll to section 5
    const hesText = document.querySelector('.text-line-4');
    const inThereText = document.querySelector('.text-in-there');
    
    if (hesText) {
        hesText.style.cursor = 'pointer';
        hesText.addEventListener('click', function() {
            // Smooth scroll to eye-bird section
            eyeBirdSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight "in there" text after scroll
            setTimeout(() => {
                if (inThereText) {
                    // Add highlight animation
                    inThereText.style.textShadow = '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 90px rgba(255, 255, 255, 0.6)';
                    inThereText.style.transform = 'scale(1.2)';
                    inThereText.style.transition = 'all 0.5s ease-in-out';
                    inThereText.style.color = '#FFD700'; // Golden color
                    
                    // Return to normal after 3 seconds
                    setTimeout(() => {
                        inThereText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
                        inThereText.style.transform = 'scale(1)';
                        inThereText.style.color = '#FFFFFF';
                    }, 3000);
                }
            }, 1000); // Wait for scroll to complete
        });
        
        // Add hover effect for "he's" text
        hesText.addEventListener('mouseenter', function() {
            this.style.color = '#FFD700';
            this.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
            this.style.transition = 'all 0.3s ease-in-out';
        });
        
        hesText.addEventListener('mouseleave', function() {
            this.style.color = '#FFFFFF';
            this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        });
    }
    
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
    let eyeBirdClickCount = 0;
    const maxEyeBirdClicks = 2;
    
    if (eyeBirdImage) {
        eyeBirdImage.addEventListener('click', function() {
            eyeBirdClickCount++;
            
            if (eyeBirdClickCount <= maxEyeBirdClicks) {
                // Calculate scale based on click count
                const scale = 1 + (eyeBirdClickCount * 0.3); // 1.3, 1.6, etc.
                
                // Add scale animation (only scale, no translate since container handles positioning)
                this.style.transform = `scale(${scale})`;
                this.style.transition = 'transform 0.4s ease-in-out';
                
                // Create bird flutter effect
                createBirdFlutter(this);
                
                // Add glow effect to show it's been clicked
                this.style.filter = 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7)) brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))';
                
                // If reached max clicks, add special effect
                if (eyeBirdClickCount === maxEyeBirdClicks) {
                    this.style.filter = 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7)) brightness(1.2) drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))';
                    
                    // Add a subtle shake effect
                    this.style.animation = 'eyeBirdShake 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                }
            } else {
                // Reset to original size after max clicks
                eyeBirdClickCount = 0;
                this.style.transform = 'scale(1)';
                this.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5)) brightness(1)';
            }
        });
        
        eyeBirdImage.addEventListener('mouseenter', function() {
            if (eyeBirdClickCount === 0) {
                this.style.filter = 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7)) brightness(1.1)';
            }
            this.style.transition = 'filter 0.3s ease-in-out';
        });
        
        eyeBirdImage.addEventListener('mouseleave', function() {
            if (eyeBirdClickCount === 0) {
                this.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5)) brightness(1)';
            }
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
        
        @keyframes eyeBirdShake {
            0%, 100% {
                transform: scale(1.6) rotate(0deg);
            }
            25% {
                transform: scale(1.6) rotate(-2deg);
            }
            75% {
                transform: scale(1.6) rotate(2deg);
            }
        }
    `;
    document.head.appendChild(birdFlutterStyle);
    
    // ===== SECTION 6: BRICK WALL INTERACTIVE FEATURES =====
    
    // Get Section 6 elements
    const brickWallSection = document.querySelector('.brick-wall-section');
    const brickWallImage = document.getElementById('brickWallImage');
    const brickWallText = document.getElementById('brickWallText');
    const particleContainer = document.getElementById('particleContainer');
    
    // 1. Brick Wall Cracking Effect (Feature 1)
    if (brickWallImage) {
        console.log('Brick wall image found, adding click listener');
        brickWallImage.addEventListener('click', function() {
            console.log('Brick wall clicked!');
            // Add crack effect
            this.classList.add('cracked');
            
            // Create particles around the crack
            createCrackParticles(this);
            
            // Remove crack class after animation
            setTimeout(() => {
                this.classList.remove('cracked');
            }, 800);
        });
    } else {
        console.log('Brick wall image not found!');
    }
    
    // 4. Wall Shake Effect (Feature 4)
    if (brickWallSection) {
        // Trigger shake when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add shake effect
                    brickWallSection.classList.add('shake');
                    
                    // Remove shake class after animation
                    setTimeout(() => {
                        brickWallSection.classList.remove('shake');
                    }, 600);
                    
                    // Trigger text reveal animation
                    if (brickWallText) {
                        brickWallText.classList.add('reveal');
                    }
                    
                    // Trigger wall build animation
                    brickWallSection.classList.add('build');
                    
                    // Start particle system
                    startParticleSystem();
                    
                    // Unobserve after first trigger
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(brickWallSection);
    }
    
    // 5. Enhanced Text Hover Effects (Feature 5)
    const poemLines = document.querySelectorAll('.text-bluebird-heart, .text-too-tough, .text-i-say, .text-mess-me-up');
    poemLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            // Create floating particles around the text
            createTextParticles(this);
        });
    });
    

    
    // 8. Scroll-triggered Animations (Feature 8)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add build animation class
                entry.target.classList.add('build');
                
                // Remove class after animation
                setTimeout(() => {
                    entry.target.classList.remove('build');
                }, 2000);
            }
        });
    }, { threshold: 0.1 });
    
    if (brickWallSection) {
        scrollObserver.observe(brickWallSection);
    }
    
    // Helper Functions
    
    // Create crack particles
    function createCrackParticles(element) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation-delay: ${Math.random() * 0.5}s;
                background: ${Math.random() > 0.5 ? '#FF6B6B' : '#FFD700'};
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }
    
    // Create text particles
    function createTextParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation-delay: ${Math.random() * 0.3}s;
                background: #87CEEB;
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }
    
    // Start particle system
    function startParticleSystem() {
        const interval = setInterval(() => {
            if (!brickWallSection.classList.contains('build')) {
                clearInterval(interval);
                return;
            }
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, 500);
    }
    
    // ===== SECTION 7: BURN SECTION INTERACTIVE FEATURES =====
    
               // Get Section 7 elements
           const burnSection = document.querySelector('.burn-section');
           const burnBird = document.querySelector('.burn-bird');
           const burnFlame = document.querySelector('.burn-flame');
           const burnBooks = document.querySelectorAll('.burn-book');
           const burnTable = document.querySelector('.burn-table');
           const burnEffects = document.getElementById('burnEffects');
           const burnText = document.getElementById('burnText');
    
               // 1. Burn Assets Click Effects
           if (burnBird) {
               burnBird.addEventListener('click', function() {
                   console.log('Burn bird clicked!');
                   this.classList.add('burning');
                   createBurnParticles(this);
                   setTimeout(() => this.classList.remove('burning'), 2000);
               });
           }
           
                   if (burnFlame) {
            let isActivated = false;
            burnFlame.addEventListener('click', function() {
                console.log('Burn flame clicked!');
                this.classList.add('burning');
                createBurnParticles(this);
                
                if (!isActivated) {
                    // Activate section to show all elements
                    burnSection.classList.add('fire-lit');
                    burnSection.classList.add('activated');
                    isActivated = true;
                } else {
                    // Deactivate section to hide all elements
                    burnSection.classList.remove('fire-lit');
                    burnSection.classList.remove('activated');
                    isActivated = false;
                }
                
                setTimeout(() => this.classList.remove('burning'), 2000);
            });
        }
           
           burnBooks.forEach(book => {
               book.addEventListener('click', function() {
                   console.log('Burn book clicked!');
                   this.classList.add('burning');
                   createBurnParticles(this);
                   setTimeout(() => this.classList.remove('burning'), 2000);
               });
           });
           
           if (burnTable) {
               burnTable.addEventListener('click', function() {
                   console.log('Burn table clicked!');
                   createBurnParticles(this);
               });
           }
    
    // 2. Scroll-triggered Animations
    if (burnSection) {
        // Trigger burn intro when section comes into view
        const burnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add burn intro animation
                    burnSection.classList.add('burn-intro');
                    
                    // Trigger text reveal animation
                    if (burnText) {
                        burnText.classList.add('reveal');
                    }
                    
                    // Start burn particle system
                    startBurnParticleSystem();
                    
                    // Unobserve after first trigger
                    burnObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        burnObserver.observe(burnSection);
    }
    
    // 3. Enhanced Text Hover Effects
               const burnPoemLines = document.querySelectorAll('.text-burn-top, .text-burn-bottom');
    burnPoemLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            // Create floating burn particles around the text
            createBurnTextParticles(this);
        });
    });
    
    // Helper Functions for Burn Section
    
    // Create burn particles
    function createBurnParticles(element) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'burn-particle';
            particle.style.cssText = `
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation-delay: ${Math.random() * 0.8}s;
                background: ${Math.random() > 0.5 ? '#FF4500' : '#FF6347'};
            `;
            
            burnEffects.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
    }
    
    // Create burn text particles
    function createBurnTextParticles(element) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'burn-particle';
            particle.style.cssText = `
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation-delay: ${Math.random() * 0.5}s;
                background: #FF4500;
            `;
            
            burnEffects.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
    }
    
    // Start burn particle system
    function startBurnParticleSystem() {
        const interval = setInterval(() => {
            if (!burnSection.classList.contains('burn-intro')) {
                clearInterval(interval);
                return;
            }
            
            const particle = document.createElement('div');
            particle.className = 'burn-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            burnEffects.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }, 800);
    }

    // ===== SECTION 8: HEART SECTION INTERACTIVE FEATURES =====
    
    // Get Section 8 elements
    const heartSection = document.querySelector('.heart-section');
    const heartImage = document.querySelector('.heart-image');
    const heartText = document.getElementById('heartText');
    
    // 1. Heart Image Click Effects
    if (heartImage) {
        heartImage.addEventListener('click', function() {
            console.log('Heart clicked!');
            this.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
    }
    
    // 2. Scroll-triggered Animations
    if (heartSection) {
        // Trigger heart intro when section comes into view
        const heartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add heart intro animation
                    heartSection.classList.add('heart-intro');
                    
                    // Trigger text reveal animation
                    if (heartText) {
                        heartText.classList.add('reveal');
                    }
                    
                    // Unobserve after first trigger
                    heartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        heartObserver.observe(heartSection);
    }
    
    // 3. Enhanced Text Hover Effects
    const heartPoemLines = document.querySelectorAll('.text-heart-line-1, .text-heart-line-2, .text-heart-line-3');
    heartPoemLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.filter = 'brightness(1.2)';
        });
        
        line.addEventListener('mouseleave', function() {
            // Remove the glow effect
            this.style.filter = 'none';
        });
    });

    // ===== SECTION 9: TREES AND BIRD SECTION INTERACTIVE FEATURES =====
    
    // Get Section 9 elements
    const treesBirdSection = document.querySelector('.trees-bird-section');
    const treesImage = document.getElementById('treesImage');
    const bird2Image = document.getElementById('bird2Image');
    const treesBirdText = document.querySelector('.trees-bird-text');
    
    // 1. Trees Image Click Effects - Toggle Night Mode
    if (treesImage) {
        let isNightMode = false;
        
        treesImage.addEventListener('click', function() {
            console.log('Trees clicked!');
            isNightMode = !isNightMode;
            
            if (isNightMode) {
                this.classList.add('night-mode');
                // Add stars effect
                createStarsEffect();
            } else {
                this.classList.remove('night-mode');
                // Remove stars
                const stars = document.querySelectorAll('.star');
                stars.forEach(star => star.remove());
            }
        });
    }
    
    // 2. Bird 2 Click Effects - Flying Animation
    if (bird2Image) {
        bird2Image.addEventListener('click', function() {
            console.log('Bird 2 clicked!');
            
            // Add flying animation
            this.classList.add('clicked');
            
            // Create bird trail particles
            createBirdTrailParticles(this);
            
            // Play bird chirping sound
            playAudio(birdChirpingAudio);
            
            // Reset after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 2000);
        });
    }
    
    // 3. Text Click Effects
    const treesPoemLines = document.querySelectorAll('.text-at-night, .text-when-everybody');
    treesPoemLines.forEach(line => {
        line.addEventListener('click', function() {
            // Add text glow effect
            this.style.textShadow = '0 0 20px rgba(225, 138, 95, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)';
            this.style.transform = 'scale(1.1)';
            
            // Create text particles
            createTextSparkles(this);
            
            setTimeout(() => {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    });
    
    // 4. Scroll-triggered Animations
    if (treesBirdSection) {
        const treesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add section intro animation
                    treesBirdSection.classList.add('trees-intro');
                    
                    // Trigger text reveal animation
                    if (treesBirdText) {
                        treesBirdText.classList.add('reveal');
                    }
                    
                    // Unobserve after first trigger
                    treesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        treesObserver.observe(treesBirdSection);
    }
    
    // Helper Functions for Trees and Bird Section
    
    function createStarsEffect() {
        const section = document.querySelector('.trees-bird-section');
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: twinkle 2s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                z-index: 25;
            `;
            section.appendChild(star);
        }
    }
    
    function createBirdTrailParticles(element) {
        const section = document.querySelector('.trees-bird-section');
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #87CEEB;
                border-radius: 50%;
                left: ${element.offsetLeft + Math.random() * 50}px;
                top: ${element.offsetTop + Math.random() * 50}px;
                animation: birdTrail 1.5s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                z-index: 20;
            `;
            section.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }
    
    function createTextSparkles(element) {
        const section = document.querySelector('.trees-bird-section');
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #FFD700;
                border-radius: 50%;
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation: sparkleFloat 2s ease-out forwards;
                z-index: 30;
            `;
            section.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // ===== SECTION 10: SPOTLIGHT SECTION INTERACTIVE FEATURES =====
    
    // Get Section 10 elements
    const spotlightSection = document.querySelector('.spotlight-section');
    const spotlightImage = document.getElementById('spotlightImage');
    const spotlightText = document.querySelector('.spotlight-text');
    
    // 1. Spotlight Image Click Effects - Focus Mode
    if (spotlightImage) {
        let isFocused = false;
        spotlightImage.addEventListener('click', function() {
            isFocused = !isFocused;
            if (isFocused) {
                this.classList.add('focused');
                createSpotlightBeams();
                playAudio(heAnunnakiAudio);
                setTimeout(() => {
                    this.style.animation = 'spotlightFocus 2s ease-in-out';
                }, 100);
            } else {
                this.classList.remove('focused');
                this.style.animation = 'none';
                const beams = document.querySelectorAll('.spotlight-beam');
                beams.forEach(beam => beam.remove());
            }
        });
    }
    
    // 2. Text Click Effects
    const spotlightPoemLines = document.querySelectorAll('.text-i-say-know, .text-put-him-back');
    spotlightPoemLines.forEach(line => {
        line.addEventListener('click', function() {
            // Add glow effect
            this.style.animation = 'textGlow 1.5s ease-in-out';
            this.style.transform = 'scale(1.1)';
            
            // Create sparkle effects
            createSpotlightSparkles(this);
            
            // Reset after animation
            setTimeout(() => {
                this.style.animation = 'none';
                this.style.transform = 'scale(1)';
            }, 1500);
        });
    });
    
    // 3. Scroll-triggered Animations
    if (spotlightSection) {
        const spotlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    spotlightSection.classList.add('spotlight-intro');
                    if (spotlightText) {
                        spotlightText.classList.add('reveal');
                    }
                    spotlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        spotlightObserver.observe(spotlightSection);
    }
    
    // Helper Functions for Spotlight Section
    function createSpotlightBeams() {
        const section = document.querySelector('.spotlight-section');
        for (let i = 0; i < 5; i++) {
            const beam = document.createElement('div');
            beam.className = 'spotlight-beam';
            beam.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent);
                left: ${20 + i * 15}%;
                top: 0;
                animation: spotlightBeam 3s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
                z-index: 15;
            `;
            section.appendChild(beam);
        }
    }
    
    function createSpotlightSparkles(element) {
        const section = document.querySelector('.spotlight-section');
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation: sparkleEffect 2s ease-out forwards;
                z-index: 25;
            `;
            section.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // ===== SECTION 10.5: BLOB SECTION INTERACTIVE FEATURES =====
    
    // Get Blob Section elements
    const blobSection = document.querySelector('.blob-section');
    const blobBackground = document.getElementById('blobBackground');
    const blobs = document.querySelectorAll('.blob');
    const blobText = document.querySelector('.blob-text');
    
    // 1. Blob Click Effects - Blend Mode Toggle
    blobs.forEach((blob, index) => {
        blob.addEventListener('click', function() {
            console.log(`Blob ${index + 1} clicked!`);
            
            // Add interaction animation
            this.classList.add('interacting');
            
            // Toggle blend mode
            this.classList.toggle('blending');
            
            // Create blob particles
            createBlobParticles(this);
            
            // Reset interaction class
            setTimeout(() => {
                this.classList.remove('interacting');
            }, 2000);
        });
    });
    
    // 2. Text Click Effects
    const blobPoemLines = document.querySelectorAll('.text-in-there, .text-die, .text-and-we-sleep, .text-that, .text-with-our, .text-secret-pact');
    blobPoemLines.forEach(line => {
        line.addEventListener('click', function() {
            // Add glow effect
            this.style.textShadow = '0 0 20px rgba(225, 138, 95, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)';
            this.style.transform = 'scale(1.1)';
            
            // Create text particles
            createBlobTextParticles(this);
            
            setTimeout(() => {
                this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    });
    
    // 3. Scroll-triggered Animations
    if (blobSection) {
        const blobObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add section intro animation
                    blobSection.classList.add('blob-intro');
                    
                    // Trigger text reveal animation
                    if (blobText) {
                        blobText.classList.add('reveal');
                    }
                    
                    // Unobserve after first trigger
                    blobObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        blobObserver.observe(blobSection);
    }
    
                    // Helper Functions for Blob Section
                function createBlobParticles(element) {
                    const section = document.querySelector('.blob-section');
                    for (let i = 0; i < 15; i++) {
                        const particle = document.createElement('div');
                        particle.className = 'blob-particle';
                        particle.style.cssText = `
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            background: rgba(255, 255, 255, 0.6);
                            border-radius: 50%;
                            filter: blur(2px);
                            left: ${element.offsetLeft + element.offsetWidth / 2 + (Math.random() - 0.5) * 120}px;
                            top: ${element.offsetTop + element.offsetHeight / 2 + (Math.random() - 0.5) * 120}px;
                            animation: blobParticleFloat 4s ease-out forwards;
                            z-index: 15;
                        `;
                        section.appendChild(particle);
                        
                        setTimeout(() => {
                            particle.remove();
                        }, 4000);
                    }
                }
    
    function createBlobTextParticles(element) {
        const section = document.querySelector('.blob-section');
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                left: ${element.offsetLeft + Math.random() * element.offsetWidth}px;
                top: ${element.offsetTop + Math.random() * element.offsetHeight}px;
                animation: sparkleEffect 2s ease-out forwards;
                z-index: 25;
            `;
            section.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // Crying Section
    const cryingImage = document.getElementById('cryingImage');
    const cryingText = document.querySelector('.text-nice-enough');
    const cryingSection = document.querySelector('.crying-section');
    const cryingTextContainer = document.querySelector('.crying-text');

    if (cryingImage) {
        cryingImage.addEventListener('click', function() {
            console.log('Crying image clicked!');
            this.classList.toggle('emotional');
            if (this.classList.contains('emotional')) {
                console.log('Creating tear drops and playing audio');
                createTearDrops();
                playAudio(thoseThingsFunAudio);
            }
        });
    } else {
        console.log('Crying image not found');
    }

    if (cryingText) {
        cryingText.addEventListener('click', function() {
            this.classList.add('emotional');
            createEmotionalSparkles();
            
            setTimeout(() => {
                this.classList.remove('emotional');
            }, 2000);
        });
    }

    // Intersection Observer for crying section
    if (cryingSection) {
        const cryingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cryingSection.classList.add('crying-intro');
                    cryingTextContainer.classList.add('reveal');
                }
            });
        }, { threshold: 0.3 });

        cryingObserver.observe(cryingSection);
    }

    // Helper functions for crying section
    function createTearDrops() {
        const container = document.querySelector('.crying-container');
        const tearCount = 15;
        
        for (let i = 0; i < tearCount; i++) {
            setTimeout(() => {
                const tear = document.createElement('div');
                tear.className = 'tear-drop';
                tear.style.left = Math.random() * 100 + '%';
                tear.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(tear);
                
                setTimeout(() => {
                    tear.remove();
                }, 3000);
            }, i * 200);
        }
    }

    function createEmotionalSparkles() {
        const container = document.querySelector('.crying-container');
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'emotional-sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 1 + 's';
                container.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 100);
        }
    }
});

// Additional keyframe for spotlight beam animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spotlightBeam {
        0%, 100% {
            opacity: 0.3;
            transform: scaleY(1);
        }
        50% {
            opacity: 0.8;
            transform: scaleY(1.2);
        }
    }
`;
document.head.appendChild(style);

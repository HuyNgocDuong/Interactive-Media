// Interactive Bluebird Poem JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const bird = document.getElementById('bird');
    
    let clickCount = 0;
    let isAnimating = false;
    
    // Bird click interaction
    bird.addEventListener('click', function() {
        if (isAnimating) return;
        
        isAnimating = true;
        clickCount++;
        
        // Add click animation class
        bird.classList.add('clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            bird.classList.remove('clicked');
            isAnimating = false;
        }, 800);
    });
    

    

    

    
    // Add floating leaves effect
    createFloatingLeaves();
    
    function createFloatingLeaves() {
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
                opacity: 0.8;
            `;
            container.appendChild(leaf);
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
});

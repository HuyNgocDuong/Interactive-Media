// Edge compatibility polyfills
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Slideshow Class
class InteractiveSlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.startAutoPlay();
        this.initializeGSAP();
    }

    // Create navigation dots
    createDots() {
        const dotsContainer = document.getElementById('dotsContainer');
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Bind event listeners
    bindEvents() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'Escape') this.closeModal();
        });

        // Slide click for modal
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.openModal(index));
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('imageModal').addEventListener('click', (e) => {
            if (e.target.id === 'imageModal') this.closeModal();
        });

        // Pause autoplay on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
        slideshowContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Initialize GSAP animations
    initializeGSAP() {
        try {
            // Set initial state for slides
            gsap.set(this.slides, {
                opacity: 0,
                scale: 1.1,
                rotationY: 15
            });

            // Set initial active slide
            gsap.set(this.slides[0], {
                opacity: 1,
                scale: 1,
                rotationY: 0
            });
        } catch (error) {
            console.warn('GSAP initialization failed, using CSS fallback:', error);
            // Fallback to CSS classes
            this.slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }
    }

    // Go to specific slide
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        const prevSlide = this.currentSlide;
        this.currentSlide = index;

        // Update dots
        this.updateDots();

        // GSAP animation for slide transition
        const tl = gsap.timeline({
            onComplete: () => {
                this.isTransitioning = false;
            }
        });

        // Animate current slide out
        tl.to(this.slides[prevSlide], {
            opacity: 0,
            scale: 0.9,
            rotationY: -15,
            duration: 0.8,
            ease: "power2.inOut"
        });

        // Animate new slide in
        tl.to(this.slides[this.currentSlide], {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");

        // Background transition effect
        this.triggerBackgroundTransition();
    }

    // Previous slide
    prevSlide() {
        const newIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.goToSlide(newIndex);
    }

    // Next slide
    nextSlide() {
        const newIndex = this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
        this.goToSlide(newIndex);
    }

    // Update navigation dots
    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
                // GSAP animation for active dot
                gsap.to(dot, {
                    scale: 1.3,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            } else {
                dot.classList.remove('active');
                gsap.to(dot, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });
    }

    // Background transition effect
    triggerBackgroundTransition() {
        const bgTransition = document.getElementById('bgTransition');
        
        // Create background transition animation
        gsap.timeline()
            .to(bgTransition, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.in"
            })
            .to(bgTransition, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                delay: 0.2
            });

        // Change body background gradient
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];

        gsap.to(document.body, {
            background: gradients[this.currentSlide],
            duration: 1,
            ease: "power2.inOut"
        });
    }

    // Open modal with image details
    openModal(slideIndex) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const imageResolution = document.getElementById('imageResolution');

        const slide = this.slides[slideIndex];
        const img = slide.querySelector('img');
        const title = slide.querySelector('h2').textContent;
        const description = slide.querySelector('p').textContent;

        // Set modal content
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        imageResolution.textContent = `${img.naturalWidth} × ${img.naturalHeight}`;

        // Show modal with GSAP animation
        modal.classList.add('active');
        gsap.fromTo(modal, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.fromTo(modal.querySelector('.modal-content'), {
            scale: 0.7,
            y: 50
        }, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
        });
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('imageModal');
        
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.7,
            y: 50,
            duration: 0.3,
            ease: "power2.in"
        });

        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            delay: 0.1,
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    }

    // Start autoplay
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    // Pause autoplay
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Add hover effects with GSAP
    addHoverEffects() {
        this.slides.forEach(slide => {
            const img = slide.querySelector('img');
            const content = slide.querySelector('.slide-content');

            // Image hover effect
            slide.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(content, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            slide.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(content, {
                    y: '100%',
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slideshow = new InteractiveSlideshow();
    slideshow.addHoverEffects();

    // Add loading animation
    gsap.from('.slide.active', {
        opacity: 0,
        scale: 1.2,
        duration: 1,
        ease: "power2.out"
    });

    // Animate controls in
    gsap.from('.slideshow-controls', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
    });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Preload images
function preloadImages() {
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });
}

// Call preload function
preloadImages(); 
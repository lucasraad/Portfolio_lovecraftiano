// ===== ADVANCED ANIMATIONS JAVASCRIPT =====

// Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }
    
    init() {
        this.initializeTextAnimations();
        this.initializeHoverEffects();
        this.initializeTentacleAnimations();
        this.initializeGlitchEffects();
        this.initializeCosmicAnimations();
        
        console.log('🌟 Sistema de animações inicializado');
    }
    
    // Text Animations
    initializeTextAnimations() {
        if (this.isReducedMotion) return;
        
        // Typewriter effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.typewriterEffect(heroTitle);
        }
        
        // Glitch effect for section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            this.addGlitchEffect(title);
        });
    }
    
    typewriterEffect(element) {
        const text = element.textContent;
        const lines = text.split('\n').filter(line => line.trim());
        element.innerHTML = '';
        
        lines.forEach((line, lineIndex) => {
            const lineSpan = document.createElement('span');
            lineSpan.className = 'title-line';
            lineSpan.style.opacity = '0';
            element.appendChild(lineSpan);
            
            setTimeout(() => {
                lineSpan.style.opacity = '1';
                this.typeText(lineSpan, line.trim(), 50);
            }, lineIndex * 1000);
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.add('typing-complete');
            }
        }, speed);
    }
    
    addGlitchEffect(element) {
        element.setAttribute('data-text', element.textContent);
        element.classList.add('glitch-text');
        
        element.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                element.style.animation = 'glitch-1 0.3s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            }
        });
    }
    
    // Hover Effects
    initializeHoverEffects() {
        // Tentacle hover for navigation items
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            this.addTentacleHover(link);
        });
        
        // Project card hover effects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            this.addProjectCardHover(card);
        });
        
        // Skill category hover effects
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            this.addSkillCategoryHover(category);
        });
    }
    
    addTentacleHover(element) {
        const icon = element.querySelector('.nav-icon');
        if (!icon) return;
        
        element.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                icon.style.animation = 'tentacleWiggle 0.5s ease-in-out';
                element.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            icon.style.animation = '';
            element.style.transform = '';
        });
    }
    
    addProjectCardHover(card) {
        const projectIcon = card.querySelector('.project-icon');
        
        card.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                if (projectIcon) {
                    projectIcon.style.animation = 'cosmic-drift 2s ease-in-out infinite';
                }
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            if (projectIcon) {
                projectIcon.style.animation = '';
            }
        });
    }
    
    addSkillCategoryHover(category) {
        const categoryIcon = category.querySelector('.category-icon');
        
        category.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                category.style.transform = 'translateY(-5px) scale(1.02)';
                if (categoryIcon) {
                    categoryIcon.style.animation = 'floating 1s ease-in-out infinite';
                }
            }
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = '';
            if (categoryIcon) {
                categoryIcon.style.animation = '';
            }
        });
    }
    
    // Tentacle Animations
    initializeTentacleAnimations() {
        if (this.isReducedMotion) return;
        
        // Create animated tentacles for decoration
        this.createFloatingTentacles();
        
        // Animate existing tentacle icons
        const tentacleIcons = document.querySelectorAll('img[src*="tentacle"]');
        tentacleIcons.forEach(icon => {
            this.animateTentacle(icon);
        });
    }
    
    createFloatingTentacles() {
        const tentacleCount = 3;
        
        for (let i = 0; i < tentacleCount; i++) {
            const tentacle = document.createElement('div');
            tentacle.className = 'floating-tentacle';
            tentacle.innerHTML = '<img src="assets/icons/tentacle.png" alt="" class="tentacle-decoration">';
            
            tentacle.style.position = 'fixed';
            tentacle.style.pointerEvents = 'none';
            tentacle.style.zIndex = '-1';
            tentacle.style.opacity = '0.1';
            tentacle.style.left = Math.random() * 100 + '%';
            tentacle.style.top = Math.random() * 100 + '%';
            tentacle.style.animation = `floating ${3 + Math.random() * 2}s ease-in-out infinite`;
            tentacle.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(tentacle);
        }
    }
    
    animateTentacle(tentacle) {
        tentacle.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                tentacle.style.animation = 'tentacleWiggle 1s ease-in-out';
            }
        });
        
        tentacle.addEventListener('animationend', () => {
            tentacle.style.animation = '';
        });
    }
    
    // Glitch Effects
    initializeGlitchEffects() {
        if (this.isReducedMotion) return;
        
        // Random glitch effects on scroll
        let glitchTimer;
        
        window.addEventListener('scroll', () => {
            clearTimeout(glitchTimer);
            glitchTimer = setTimeout(() => {
                this.triggerRandomGlitch();
            }, 100);
        });
    }
    
    triggerRandomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        if (glitchElements.length === 0) return;
        
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (Math.random() < 0.1) { // 10% chance
            randomElement.style.animation = 'glitch-1 0.2s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 200);
        }
    }
    
    // Cosmic Animations
    initializeCosmicAnimations() {
        if (this.isReducedMotion) return;
        
        // Create cosmic particles
        this.createCosmicParticles();
        
        // Animate elder signs
        const elderSigns = document.querySelectorAll('img[src*="elder_sign"]');
        elderSigns.forEach(sign => {
            this.animateElderSign(sign);
        });
    }
    
    createCosmicParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'cosmic-particles';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        
        document.body.appendChild(particleContainer);
        
        // Create particles periodically
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createCosmicParticle(particleContainer);
            }
        }, 2000);
    }
    
    createCosmicParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--color-green-phosphor)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.opacity = '0.7';
        particle.style.animation = 'mysticalParticles 8s linear forwards';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    animateElderSign(sign) {
        sign.addEventListener('click', () => {
            if (!this.isReducedMotion) {
                sign.style.animation = 'rotating 1s ease-in-out';
                setTimeout(() => {
                    sign.style.animation = '';
                }, 1000);
            }
        });
    }
    
    // Scroll-triggered animations
    initializeScrollAnimations() {
        if (this.isReducedMotion) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.about-entry, .skill-category, .project-card, .timeline-item, .contact-method'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    triggerElementAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add special effects based on element type
        if (element.classList.contains('project-card')) {
            setTimeout(() => {
                element.style.boxShadow = '0 10px 30px rgba(26, 74, 58, 0.3)';
            }, 400);
        }
        
        if (element.classList.contains('skill-category')) {
            const skillBars = element.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }, 600 + (index * 200));
            });
        }
    }
    
    // Mouse trail effect
    initializeMouseTrail() {
        if (this.isReducedMotion || window.innerWidth <= 768) return;
        
        const trail = [];
        const trailLength = 10;
        
        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.position = 'fixed';
            trailElement.style.width = '4px';
            trailElement.style.height = '4px';
            trailElement.style.background = 'var(--color-green-phosphor)';
            trailElement.style.borderRadius = '50%';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9999';
            trailElement.style.opacity = (trailLength - i) / trailLength * 0.5;
            trailElement.style.transform = 'scale(' + (trailLength - i) / trailLength + ')';
            
            document.body.appendChild(trailElement);
            trail.push(trailElement);
        }
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateTrail() {
            for (let i = trail.length - 1; i > 0; i--) {
                trail[i].style.left = trail[i - 1].style.left;
                trail[i].style.top = trail[i - 1].style.top;
            }
            
            trail[0].style.left = mouseX + 'px';
            trail[0].style.top = mouseY + 'px';
            
            requestAnimationFrame(updateTrail);
        }
        
        updateTrail();
    }
    
    // Performance monitoring
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30) {
                    console.warn('🐙 Performance baixa detectada, reduzindo animações');
                    document.body.classList.add('reduced-animations');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        }
        
        checkFPS();
    }
}

// Particle System Class
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'mystical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        
        this.container.appendChild(particle);
        
        return {
            element: particle,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            speed: 0.5 + Math.random() * 1.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.y -= particle.speed;
            particle.element.style.transform = `translateY(${particle.y}px)`;
            
            if (particle.y < -10) {
                particle.y = window.innerHeight + 10;
                particle.x = Math.random() * window.innerWidth;
                particle.element.style.left = particle.x + 'px';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Initialize scroll animations after a delay
    setTimeout(() => {
        animationController.initializeScrollAnimations();
    }, 1000);
    
    // Initialize mouse trail
    setTimeout(() => {
        animationController.initializeMouseTrail();
    }, 2000);
    
    // Start performance monitoring
    animationController.monitorPerformance();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        ParticleSystem
    };
}


// ===== PARTICLES.JS CONFIGURATION =====

// Lovecraftian Particles Configuration
const lovecraftianParticlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#39ff14', '#1a4a3a', '#d4af37']
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 6
            }
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#1a4a3a',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// Alternative minimal configuration for better performance
const minimalParticlesConfig = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: '#1a4a3a'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.2,
            random: true
        },
        size: {
            value: 2,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: '#1a4a3a',
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: false
            },
            onclick: {
                enable: false
            },
            resize: true
        }
    },
    retina_detect: true
};

// Cosmic horror themed configuration
const cosmicHorrorConfig = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 900
            }
        },
        color: {
            value: '#39ff14'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 1,
                color: '#1a4a3a'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.05,
                sync: false
            }
        },
        size: {
            value: 1.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: '#39ff14',
            opacity: 0.15,
            width: 0.5
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: true,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.5
                }
            },
            repulse: {
                distance: 150,
                duration: 0.8
            }
        }
    },
    retina_detect: true
};

// Initialize particles based on device performance
function initializeParticles() {
    // Check if particles.js is available
    if (typeof particlesJS === 'undefined') {
        console.warn('🐙 Particles.js não encontrado, pulando inicialização das partículas');
        return;
    }
    
    // Detect device performance
    const isLowEndDevice = detectLowEndDevice();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let config;
    
    if (prefersReducedMotion) {
        // No particles for users who prefer reduced motion
        return;
    } else if (isLowEndDevice) {
        config = minimalParticlesConfig;
        console.log('🐙 Dispositivo de baixa performance detectado, usando configuração mínima de partículas');
    } else {
        config = lovecraftianParticlesConfig;
        console.log('🐙 Inicializando sistema completo de partículas Lovecraftianas');
    }
    
    // Initialize particles
    particlesJS('particles-js', config);
    
    // Add custom behaviors
    setTimeout(() => {
        addCustomParticleBehaviors();
    }, 1000);
}

// Detect low-end devices
function detectLowEndDevice() {
    // Check various indicators of device performance
    const indicators = {
        // Hardware concurrency (CPU cores)
        lowCores: navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2,
        
        // Memory (if available)
        lowMemory: navigator.deviceMemory && navigator.deviceMemory <= 2,
        
        // Connection speed
        slowConnection: navigator.connection && 
                       (navigator.connection.effectiveType === 'slow-2g' || 
                        navigator.connection.effectiveType === '2g'),
        
        // Screen size (mobile devices)
        smallScreen: window.innerWidth <= 768,
        
        // Battery level (if available)
        lowBattery: navigator.getBattery && 
                   navigator.getBattery().then(battery => battery.level < 0.2)
    };
    
    // Count positive indicators
    const positiveIndicators = Object.values(indicators).filter(Boolean).length;
    
    return positiveIndicators >= 2;
}

// Add custom behaviors to particles
function addCustomParticleBehaviors() {
    if (typeof pJSDom === 'undefined' || !pJSDom.length) return;
    
    const pJS = pJSDom[0].pJS;
    
    // Custom particle behavior: Tentacle-like movement
    const originalUpdate = pJS.fn.particlesUpdate;
    
    pJS.fn.particlesUpdate = function() {
        originalUpdate.call(this);
        
        // Add tentacle-like swaying motion
        for (let i = 0; i < pJS.particles.array.length; i++) {
            const particle = pJS.particles.array[i];
            const time = Date.now() * 0.001;
            
            // Add subtle swaying motion
            particle.x += Math.sin(time + i) * 0.1;
            particle.y += Math.cos(time * 0.7 + i) * 0.05;
            
            // Boundary check
            if (particle.x < 0) particle.x = pJS.canvas.w;
            if (particle.x > pJS.canvas.w) particle.x = 0;
            if (particle.y < 0) particle.y = pJS.canvas.h;
            if (particle.y > pJS.canvas.h) particle.y = 0;
        }
    };
    
    // Custom interaction: Eldritch attraction
    pJS.interactivity.modes.eldritch = {
        distance: 200,
        duration: 2
    };
    
    console.log('🐙 Comportamentos customizados de partículas adicionados');
}

// Particle system performance monitor
function monitorParticlePerformance() {
    if (typeof pJSDom === 'undefined' || !pJSDom.length) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 5000) { // Check every 5 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 20) {
                console.warn('🐙 Performance das partículas baixa, reduzindo número de partículas');
                
                const pJS = pJSDom[0].pJS;
                const currentCount = pJS.particles.array.length;
                const newCount = Math.max(10, Math.floor(currentCount * 0.7));
                
                // Reduce particle count
                pJS.particles.array.splice(newCount);
                pJS.particles.nb = newCount;
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    setTimeout(checkPerformance, 5000);
}

// Responsive particle adjustment
function adjustParticlesForViewport() {
    if (typeof pJSDom === 'undefined' || !pJSDom.length) return;
    
    const pJS = pJSDom[0].pJS;
    const viewportWidth = window.innerWidth;
    
    let particleCount;
    
    if (viewportWidth <= 480) {
        particleCount = 15;
    } else if (viewportWidth <= 768) {
        particleCount = 25;
    } else if (viewportWidth <= 1024) {
        particleCount = 40;
    } else {
        particleCount = 60;
    }
    
    // Adjust particle count
    const currentCount = pJS.particles.array.length;
    
    if (currentCount > particleCount) {
        pJS.particles.array.splice(particleCount);
    } else if (currentCount < particleCount) {
        for (let i = currentCount; i < particleCount; i++) {
            pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
        }
    }
    
    pJS.particles.nb = particleCount;
    
    console.log(`🐙 Partículas ajustadas para viewport: ${particleCount} partículas`);
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(initializeParticles, 500);
    
    // Monitor performance after initialization
    setTimeout(monitorParticlePerformance, 3000);
});

// Adjust particles on window resize
window.addEventListener('resize', debounce(() => {
    adjustParticlesForViewport();
}, 250));

// Pause particles when tab is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (typeof pJSDom === 'undefined' || !pJSDom.length) return;
    
    const pJS = pJSDom[0].pJS;
    
    if (document.hidden) {
        pJS.fn.particlesEmpty();
        console.log('🐙 Partículas pausadas (aba não visível)');
    } else {
        pJS.fn.particlesRefresh();
        console.log('🐙 Partículas retomadas');
    }
});

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Export configurations for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        lovecraftianParticlesConfig,
        minimalParticlesConfig,
        cosmicHorrorConfig,
        initializeParticles,
        detectLowEndDevice
    };
}


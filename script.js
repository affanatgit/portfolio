// Global variables
let scenes = {};
let renderers = {};
let cameras = {};
let animationFrames = {};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initParticles();
    init3DScenes();
    initScrollAnimations();
    initTypingEffect();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Particle system
function initParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 6000);
    }

    setInterval(createParticle, 300);
}

// 3D Scene Initialization
function init3DScenes() {
    initHeroScene();
    initAboutScene();
    initSkillsScene();
    initProjectScenes();
    initLeadershipScene();
    initContactScene();
}

// Hero 3D Scene
function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create animated geometry
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 200;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 2,
        transparent: true,
        opacity: 0.8
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 50;

    scenes.hero = scene;
    cameras.hero = camera;
    renderers.hero = renderer;

    function animate() {
        animationFrames.hero = requestAnimationFrame(animate);
        
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        particles.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// About 3D Scene
function initAboutScene() {
    const canvas = document.getElementById('about-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating cubes
    const cubes = [];
    for (let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x00ff88 : 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = (Math.random() - 0.5) * 40;
        cube.position.y = (Math.random() - 0.5) * 40;
        cube.position.z = (Math.random() - 0.5) * 40;
        
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        cubes.push(cube);
        scene.add(cube);
    }

    camera.position.z = 30;

    scenes.about = scene;
    cameras.about = camera;
    renderers.about = renderer;

    function animate() {
        animationFrames.about = requestAnimationFrame(animate);
        
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01 + index * 0.001;
            cube.rotation.y += 0.01 + index * 0.001;
            cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Skills 3D Scene
function initSkillsScene() {
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create skill spheres
    const spheres = [];
    const skillColors = [0x00ff88, 0x00d4ff, 0xff6b6b, 0xffd93d, 0x6bcf7f];
    
    for (let i = 0; i < 8; i++) {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: skillColors[i % skillColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        
        const angle = (i / 8) * Math.PI * 2;
        sphere.position.x = Math.cos(angle) * 15;
        sphere.position.z = Math.sin(angle) * 15;
        sphere.position.y = (Math.random() - 0.5) * 10;
        
        spheres.push(sphere);
        scene.add(sphere);
    }

    camera.position.z = 25;
    camera.position.y = 5;

    scenes.skills = scene;
    cameras.skills = camera;
    renderers.skills = renderer;

    function animate() {
        animationFrames.skills = requestAnimationFrame(animate);
        
        spheres.forEach((sphere, index) => {
            const time = Date.now() * 0.001;
            sphere.position.y += Math.sin(time + index) * 0.02;
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Project 3D Scenes
function initProjectScenes() {
    const projectCanvases = document.querySelectorAll('.project-canvas');
    
    projectCanvases.forEach((canvas, index) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        // Create project-specific geometry
        let geometry, material, mesh;
        
        if (index === 0) { // TaskVault
            geometry = new THREE.CylinderGeometry(5, 5, 2, 8);
            material = new THREE.MeshBasicMaterial({ 
                color: 0x00ff88,
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
        } else { // FitCalc
            geometry = new THREE.OctahedronGeometry(6);
            material = new THREE.MeshBasicMaterial({ 
                color: 0x00d4ff,
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
        }
        
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 15;

        const sceneKey = `project${index}`;
        scenes[sceneKey] = scene;
        cameras[sceneKey] = camera;
        renderers[sceneKey] = renderer;

        function animate() {
            animationFrames[sceneKey] = requestAnimationFrame(animate);
            
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    });
}

// Leadership 3D Scene
function initLeadershipScene() {
    const canvas = document.getElementById('leadership-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create leadership network
    const nodes = [];
    const connections = [];
    
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8
        });
        const node = new THREE.Mesh(geometry, material);
        
        node.position.x = (Math.random() - 0.5) * 30;
        node.position.y = (Math.random() - 0.5) * 30;
        node.position.z = (Math.random() - 0.5) * 30;
        
        nodes.push(node);
        scene.add(node);
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[i].position,
                    nodes[j].position
                ]);
                const material = new THREE.LineBasicMaterial({ 
                    color: 0x00d4ff,
                    transparent: true,
                    opacity: 0.3
                });
                const line = new THREE.Line(geometry, material);
                connections.push(line);
                scene.add(line);
            }
        }
    }

    camera.position.z = 25;

    scenes.leadership = scene;
    cameras.leadership = camera;
    renderers.leadership = renderer;

    function animate() {
        animationFrames.leadership = requestAnimationFrame(animate);
        
        nodes.forEach((node, index) => {
            const time = Date.now() * 0.001;
            node.position.y += Math.sin(time + index) * 0.01;
            node.rotation.x += 0.01;
            node.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Contact 3D Scene
function initContactScene() {
    const canvas = document.getElementById('contact-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create communication waves
    const waves = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.RingGeometry(5 + i * 3, 6 + i * 3, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff88,
            transparent: true,
            opacity: 0.3 - i * 0.05,
            side: THREE.DoubleSide
        });
        const wave = new THREE.Mesh(geometry, material);
        wave.position.z = i * 2;
        waves.push(wave);
        scene.add(wave);
    }

    camera.position.z = 30;

    scenes.contact = scene;
    cameras.contact = camera;
    renderers.contact = renderer;

    function animate() {
        animationFrames.contact = requestAnimationFrame(animate);
        
        waves.forEach((wave, index) => {
            wave.rotation.z += 0.01 + index * 0.002;
            wave.scale.setScalar(1 + Math.sin(Date.now() * 0.001 + index) * 0.1);
        });
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards and items
    const cards = document.querySelectorAll('.about-card, .skill-category, .project-card, .leadership-card, .contact-item, .achievement-item, .trait-item');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 1000);
    });
}

// Mouse interaction effects
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move 3D scenes based on mouse position
    Object.keys(cameras).forEach(key => {
        if (cameras[key]) {
            cameras[key].position.x += (mouseX - 0.5) * 0.5;
            cameras[key].position.y += (mouseY - 0.5) * 0.5;
        }
    });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const canvas = card.querySelector('.project-canvas');
        if (canvas) {
            canvas.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const canvas = card.querySelector('.project-canvas');
        if (canvas) {
            canvas.style.transform = 'scale(1)';
        }
    });
});

// Social link animations
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) rotate(10deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
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

// Add ripple CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization: pause animations when not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        Object.keys(animationFrames).forEach(key => {
            if (animationFrames[key]) {
                cancelAnimationFrame(animationFrames[key]);
            }
        });
    } else {
        // Resume animations
        init3DScenes();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    Object.keys(animationFrames).forEach(key => {
        if (animationFrames[key]) {
            cancelAnimationFrame(animationFrames[key]);
        }
    });
    
    Object.keys(renderers).forEach(key => {
        if (renderers[key]) {
            renderers[key].dispose();
        }
    });
});
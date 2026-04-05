/**
 * Three.js Hero Scene - Solvix Website
 * Creates an interactive 3D geometric logo with idle animations and mouse parallax
 */

class ThreeHero {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn('Three.js container not found');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.mouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.time = 0;
    this.isInitialized = false;
    
    // Performance settings
    this.isMobile = window.innerWidth < 768;
    this.pixelRatio = this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    
    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.createGeometry();
    this.setupLights();
    this.setupEventListeners();
    this.animate();
    this.isInitialized = true;
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 8;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !this.isMobile,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
  }

  createGeometry() {
    // Create a complex geometric shape - Icosahedron with wireframe overlay
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    
    // Main solid mesh with gradient material
    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      specular: 0x60a5fa,
      shininess: 100,
      flatShading: true
    });
    
    this.mainMesh = new THREE.Mesh(geometry, material);
    
    // Wireframe overlay for premium look
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.05, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    this.wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    
    // Group both meshes
    this.geometry = new THREE.Group();
    this.geometry.add(this.mainMesh);
    this.geometry.add(this.wireframeMesh);
    
    this.scene.add(this.geometry);
  }

  setupLights() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
    
    // Point light for dynamic effect
    this.pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    this.pointLight.position.set(-5, 3, 5);
    this.scene.add(this.pointLight);
  }

  setupEventListeners() {
    // Mouse move for parallax
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    
    // Window resize
    window.addEventListener('resize', () => this.onWindowResize(), { passive: true });
    
    // Reduce motion support
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  onMouseMove(event) {
    if (this.prefersReducedMotion) return;
    
    // Normalize mouse position to -1 to 1
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Calculate target rotation based on mouse position
    this.targetRotation.y = this.mouse.x * 0.3;
    this.targetRotation.x = this.mouse.y * 0.3;
  }

  onWindowResize() {
    if (!this.isInitialized) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    
    // Update mobile detection
    this.isMobile = window.innerWidth < 768;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.geometry) return;
    
    this.time += 0.01;
    
    if (this.prefersReducedMotion) {
      // Minimal animation for reduced motion
      this.geometry.rotation.y += 0.001;
    } else {
      // Smooth lerp for mouse parallax
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
      
      // Idle floating animation
      const floatY = Math.sin(this.time * 0.5) * 0.2;
      this.geometry.position.y = floatY;
      
      // Idle rotation
      this.geometry.rotation.x = this.currentRotation.x + Math.sin(this.time * 0.3) * 0.1;
      this.geometry.rotation.y += 0.005;
      this.geometry.rotation.y += this.currentRotation.y * 0.02;
      
      // Animate point light
      this.pointLight.position.x = Math.sin(this.time * 0.7) * 5;
      this.pointLight.position.y = Math.cos(this.time * 0.5) * 3 + 3;
      
      // Subtle wireframe rotation offset
      if (this.wireframeMesh) {
        this.wireframeMesh.rotation.x += 0.002;
        this.wireframeMesh.rotation.z += 0.001;
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (!this.isInitialized) return;
    
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onWindowResize);
    
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
    
    this.isInitialized = false;
  }
}

// Initialize Three.js scene when DOM is ready and in viewport
function initThreeHero() {
  const heroContainer = document.getElementById('three-hero-container');
  
  if (!heroContainer) {
    console.warn('Three.js hero container not found');
    return;
  }
  
  // Lazy load - wait for container to be in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Check if Three.js is loaded
        if (typeof THREE !== 'undefined') {
          new ThreeHero('three-hero-container');
          observer.disconnect();
        } else {
          console.error('Three.js library not loaded');
        }
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(heroContainer);
}

// Auto-initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeHero);
} else {
  initThreeHero();
}

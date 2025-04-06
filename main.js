import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ModelsManager } from './models.js';

// Classe principale per gestire l'esperienza 3D
class Experience {
  constructor() {
    // Elementi DOM
    this.canvas = document.querySelector('#canvas');
    
    // Setup
    this.setupThree();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.setupControls();
    this.setupModels();
    this.setupEventListeners();
    
    // Avvio del loop di rendering
    this.render();
  }
  
  setupThree() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clock per le animazioni
    this.clock = new THREE.Clock();
  }
  
  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    
    // Nebbia per effetto di profondità
    this.scene.fog = new THREE.FogExp2(0x000000, 0.02);
  }
  
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 10);
    this.scene.add(this.camera);
  }
  
  setupLights() {
    // Luce ambientale
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Luce direzionale principale
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(1, 1, 1);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    this.scene.add(mainLight);
    
    // Luce puntuale per accenti
    const pointLight = new THREE.PointLight(0x3498db, 1, 10);
    pointLight.position.set(-2, 1, 3);
    this.scene.add(pointLight);
  }
  
  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.maxPolarAngle = Math.PI / 2;
  }
  
  setupModels() {
    // Crea il gestore dei modelli
    this.modelsManager = new ModelsManager(this.scene);
    
    // Crea tutti i modelli
    this.models = this.modelsManager.createAllModels();
    
    // Particelle di sfondo
    this.createParticles();
  }
  
  createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Posizioni
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
      
      // Colori
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }
  
  setupEventListeners() {
    // Ridimensionamento della finestra
    window.addEventListener('resize', () => {
      // Aggiornamento dimensioni camera
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      
      // Aggiornamento dimensioni renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Scroll per parallasse e navigazione tra sezioni
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / height;
      
      // Determina quale sezione è attualmente visibile
      const sections = document.querySelectorAll('.section');
      let currentSectionIndex = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });
      
      // Sposta la camera per mostrare il modello 3D corrispondente alla sezione
      this.navigateToSection(currentSectionIndex, progress);
    });
    
    // Movimento del mouse per interattività
    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Leggero movimento della camera in base alla posizione del mouse
      if (this.camera) {
        this.camera.position.x += (mouseX * 0.5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (mouseY * 0.5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(0, 0, 0);
      }
    });
    
    // Aggiunta della classe per mostrare il messaggio iniziale
    setTimeout(() => {
      document.body.classList.add('o-start');
    }, 1000);
  }
  
  navigateToSection(sectionIndex, progress) {
    // Posizioni target della camera per ogni sezione
    const cameraPositions = [
      { x: 0, y: 0, z: 10 }, // Home
      { x: -5, y: 0, z: 10 }, // Chi sono (avatar)
      { x: 0, y: 0, z: -10 }, // Progetti (showcase)
      { x: 5, y: 0, z: 10 }, // Esperienze (workspace)
      { x: 0, y: 5, z: 10 }, // Competenze
      { x: 0, y: -5, z: 10 }  // Contatti
    ];
    
    // Interpola la posizione della camera
    if (cameraPositions[sectionIndex]) {
      const position = cameraPositions[sectionIndex];
      
      // Transizione fluida
      this.controls.target.set(0, 0, 0);
      this.camera.position.x += (position.x - this.camera.position.x) * 0.05;
      this.camera.position.y += (position.y - this.camera.position.y) * 0.05;
      this.camera.position.z += (position.z - this.camera.position.z) * 0.05;
    }
    
    // Effetto parallasse generale basato sullo scroll
    if (this.models) {
      Object.values(this.models).forEach(model => {
        if (model) {
          model.rotation.y = progress * Math.PI * 2;
        }
      });
    }
  }
  
  render() {
    const elapsedTime = this.clock.getElapsedTime();
    
    // Anima i modelli
    if (this.modelsManager) {
      this.modelsManager.animateModels(elapsedTime);
    }
    
    // Animazione delle particelle
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.05;
    }
    
    // Aggiornamento controlli
    this.controls.update();
    
    // Rendering della scena
    this.renderer.render(this.scene, this.camera);
    
    // Chiamata al prossimo frame
    window.requestAnimationFrame(this.render.bind(this));
  }
}

// Avvio dell'esperienza quando il DOM è caricato
window.addEventListener('DOMContentLoaded', () => {
  new Experience();
});

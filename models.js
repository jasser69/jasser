// Modelli 3D per il sito di Jasser
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelsManager {
  constructor(scene) {
    this.scene = scene;
    this.models = {};
    this.loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  // Crea un avatar 3D stilizzato che rappresenta Jasser
  createAvatar() {
    // Gruppo per contenere tutte le parti dell'avatar
    const avatar = new THREE.Group();
    
    // Testa (sfera)
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d0c5,
      roughness: 0.7,
      metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.7;
    avatar.add(head);
    
    // Corpo (cilindro)
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      roughness: 0.5,
      metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.3;
    avatar.add(body);
    
    // Braccia
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d0c5,
      roughness: 0.7,
      metalness: 0.1
    });
    
    // Braccio sinistro
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 0, 0);
    leftArm.rotation.z = Math.PI / 3;
    avatar.add(leftArm);
    
    // Braccio destro
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0, 0);
    rightArm.rotation.z = -Math.PI / 3;
    avatar.add(rightArm);
    
    // Gambe
    const legGeometry = new THREE.CylinderGeometry(0.12, 0.1, 1, 16);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.6,
      metalness: 0.1
    });
    
    // Gamba sinistra
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -1.2, 0);
    avatar.add(leftLeg);
    
    // Gamba destra
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -1.2, 0);
    avatar.add(rightLeg);
    
    // Occhi
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
    
    // Occhio sinistro
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 0.8, 0.4);
    avatar.add(leftEye);
    
    // Occhio destro
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 0.8, 0.4);
    avatar.add(rightEye);
    
    // Bocca (curva)
    const mouthGeometry = new THREE.TorusGeometry(0.2, 0.03, 16, 16, Math.PI);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 0.5, 0.4);
    mouth.rotation.x = Math.PI / 2;
    avatar.add(mouth);
    
    // Aggiungi l'avatar alla scena
    this.models.avatar = avatar;
    this.scene.add(avatar);
    
    return avatar;
  }
  
  // Crea un simbolo 3D che rappresenta il percorso di Jasser
  createJourneyPath() {
    // Gruppo per contenere il percorso
    const journeyPath = new THREE.Group();
    
    // Percorso a spirale
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, -3, 0),
      new THREE.Vector3(-3, -2, 2),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(3, 2, 2),
      new THREE.Vector3(5, 3, 0)
    ]);
    
    const points = curve.getPoints(50);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    journeyPath.add(pathLine);
    
    // Aggiungi tappe significative lungo il percorso
    const milestoneGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const milestoneMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xe74c3c, emissive: 0xe74c3c, emissiveIntensity: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, emissive: 0xf1c40f, emissiveIntensity: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x2ecc71, emissive: 0x2ecc71, emissiveIntensity: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x3498db, emissive: 0x3498db, emissiveIntensity: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x9b59b6, emissive: 0x9b59b6, emissiveIntensity: 0.5 })
    ];
    
    // Posizioni delle tappe (indici dei punti del percorso)
    const milestonePositions = [0, 10, 20, 30, 40];
    
    milestonePositions.forEach((pos, index) => {
      const milestone = new THREE.Mesh(milestoneGeometry, milestoneMaterials[index]);
      milestone.position.copy(points[pos]);
      journeyPath.add(milestone);
    });
    
    // Aggiungi il percorso alla scena
    this.models.journeyPath = journeyPath;
    this.scene.add(journeyPath);
    
    return journeyPath;
  }
  
  // Crea un ambiente 3D che rappresenta lo spazio di lavoro di Jasser
  createWorkspace() {
    // Gruppo per contenere lo spazio di lavoro
    const workspace = new THREE.Group();
    
    // Piano di lavoro (scrivania)
    const deskGeometry = new THREE.BoxGeometry(4, 0.1, 2);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x795548,
      roughness: 0.8,
      metalness: 0.2
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    workspace.add(desk);
    
    // Computer (monitor)
    const monitorStandGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const monitorStandMaterial = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      roughness: 0.5,
      metalness: 0.8
    });
    const monitorStand = new THREE.Mesh(monitorStandGeometry, monitorStandMaterial);
    monitorStand.position.set(0, 0.3, 0);
    workspace.add(monitorStand);
    
    const monitorGeometry = new THREE.BoxGeometry(1.6, 0.9, 0.05);
    const monitorMaterial = new THREE.MeshStandardMaterial({
      color: 0x34495e,
      roughness: 0.5,
      metalness: 0.8
    });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.set(0, 0.8, 0);
    workspace.add(monitor);
    
    // Schermo del monitor (emissivo)
    const screenGeometry = new THREE.PlaneGeometry(1.5, 0.8);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x3498db,
      side: THREE.DoubleSide
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.8, 0.03);
    workspace.add(screen);
    
    // Tastiera
    const keyboardGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.3);
    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.5,
      metalness: 0.5
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.08, 0.5);
    workspace.add(keyboard);
    
    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.1, 0.03, 0.2);
    const mouseMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.5,
      metalness: 0.5
    });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(0.6, 0.07, 0.5);
    workspace.add(mouse);
    
    // Lampada
    const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.1, 16);
    const lampBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      roughness: 0.5,
      metalness: 0.8
    });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(-1.5, 0.05, -0.7);
    workspace.add(lampBase);
    
    const lampPoleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16);
    const lampPoleMaterial = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      roughness: 0.5,
      metalness: 0.8
    });
    const lampPole = new THREE.Mesh(lampPoleGeometry, lampPoleMaterial);
    lampPole.position.set(-1.5, 0.5, -0.7);
    workspace.add(lampPole);
    
    const lampHeadGeometry = new THREE.ConeGeometry(0.2, 0.3, 16);
    const lampHeadMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1c40f,
      roughness: 0.5,
      metalness: 0.5,
      emissive: 0xf1c40f,
      emissiveIntensity: 0.5
    });
    const lampHead = new THREE.Mesh(lampHeadGeometry, lampHeadMaterial);
    lampHead.position.set(-1.5, 0.9, -0.7);
    lampHead.rotation.x = Math.PI;
    workspace.add(lampHead);
    
    // Luce della lampada
    const lampLight = new THREE.PointLight(0xf1c40f, 1, 3);
    lampLight.position.set(-1.5, 0.8, -0.7);
    workspace.add(lampLight);
    
    // Aggiungi lo spazio di lavoro alla scena
    this.models.workspace = workspace;
    this.scene.add(workspace);
    
    return workspace;
  }
  
  // Crea un modello 3D che rappresenta i progetti di Jasser
  createProjectsShowcase() {
    // Gruppo per contenere la vetrina dei progetti
    const projectsShowcase = new THREE.Group();
    
    // Base della vetrina
    const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x34495e,
      roughness: 0.5,
      metalness: 0.5
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.1;
    projectsShowcase.add(base);
    
    // Progetti (cubi disposti in cerchio)
    const projectGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const projectMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5, metalness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.5, metalness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.5, metalness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5, metalness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x9b59b6, roughness: 0.5, metalness: 0.5 })
    ];
    
    // Disponi i progetti in cerchio
    const radius = 1.5;
    const numProjects = 5;
    
    for (let i = 0; i < numProjects; i++) {
      const angle = (i / numProjects) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const project = new THREE.Mesh(projectGeometry, projectMaterials[i]);
      project.position.set(x, 0.25, z);
      project.rotation.y = -angle + Math.PI / 2;
      projectsShowcase.add(project);
    }
    
    // Aggiungi la vetrina dei progetti alla scena
    this.models.projectsShowcase = projectsShowcase;
    this.scene.add(projectsShowcase);
    
    return projectsShowcase;
  }
  
  // Crea tutti i modelli
  createAllModels() {
    this.createAvatar();
    this.createJourneyPath();
    this.createWorkspace();
    this.createProjectsShowcase();
    
    // Posiziona i modelli in punti diversi dello spazio
    this.models.avatar.position.set(-5, 0, 0);
    this.models.journeyPath.position.set(0, 0, -5);
    this.models.workspace.position.set(5, 0, 0);
    this.models.projectsShowcase.position.set(0, 0, 5);
    
    return this.models;
  }
  
  // Anima i modelli
  animateModels(time) {
    if (this.models.avatar) {
      this.models.avatar.rotation.y = time * 0.5;
    }
    
    if (this.models.journeyPath) {
      // Fai pulsare le tappe del percorso
      this.models.journeyPath.children.forEach((child, index) => {
        if (index > 0) { // Salta la linea del percorso (primo figlio)
          child.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1);
        }
      });
    }
    
    if (this.models.workspace) {
      // Fai lampeggiare lo schermo del computer
      const screen = this.models.workspace.children[3];
      if (screen) {
        screen.material.color.setHSL(time * 0.1 % 1, 0.7, 0.5);
      }
    }
    
    if (this.models.projectsShowcase) {
      // Fai ruotare la vetrina dei progetti
      this.models.projectsShowcase.rotation.y = time * 0.2;
      
      // Fai fluttuare i progetti
      for (let i = 1; i < this.models.projectsShowcase.children.length; i++) {
        const project = this.models.projectsShowcase.children[i];
        project.position.y = 0.25 + Math.sin(time * 2 + i) * 0.1;
      }
    }
  }
}

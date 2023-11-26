import * as THREE from 'three';
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import Stats from "three/examples/jsm/libs/stats.module.js";
import Cube from './objects/Cube.js';
import Cover from './objects/Cover.js';
import Sphere from './objects/Sphere.js';
import Line from './objects/Line.js';
import LogoIut from './objects/LogoIut.js';
import pane from '../utils/Pane.js';

class SCENE {
    //classique, un constructor (délcarer les propriétés de base), une scene, un background
    //   constructor() {
    //     this.scene = new THREE.Scene();
    //     this.position = '...';
    //   }


    // methode setup
    setup(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = canvas;

        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupPostProcessing();
        this.setupTextureLoader();
        this.setupGLTFLoader();
        // this.setupStats();

        this.addObjects();
        this.addEvents();
    }

    setupTextureLoader() {
        this.textureLoader = new THREE.TextureLoader();
    }


    setupGLTFLoader() {
        this.gltfLoader = new GLTFLoader();

        this.gltfLoader.load('/logo-iut.glb', (gltf) => {
            console.log(gltf)
        } )
    }

    setupScene() {
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color('rgb(50,0,0)');

    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            28,
            this.width / this.height,
            0.1,
            10000
        );
        // this.camera.position.z = 10;
        // this.camera.position.set(0, 0, 100);
    }

    // setupStats() {
    //     this.stats = new Stats();
    //     this.stats.showPanel(0);
    //     document.body.appendChild(this.stats.dom);
    // }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.05;
        // this.controls.screenSpacePanning = false;
        // this.controls.minDistance = 100;
        // this.controls.maxDistance = 5000;
        // this.controls.maxPolarAngle = Math.PI / 2;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            alpha: true
        });

        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.setClearColor(0x000000);
        // this.renderer.setClearColor( 0xffffff, 0 ); // second param = opacity

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // setupPostProcessing() {
    //     this.composer = new EffectComposer(this.renderer);
    //     this.composer.addPass(new RenderPass(this.scene, this.camera));
    //     const bloomPass = new UnrealBloomPass(
    //         new THREE.Vector2(window.innerWidth, window.innerHeight),
    //         1,
    //         0,
    //         0
    //     );
    //     this.composer.addPass(bloomPass);
    // }

    setupPostProcessing() {
        this.BLOOM_PARAMS = {
            strength: 1,
            radius: 0,
            threshold: 0,
        }
        this.composer = new EffectComposer(this.renderer);
        this.scenePass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.width, this.height),
            this.BLOOM_PARAMS.strength,
            this.BLOOM_PARAMS.radius,
            this.BLOOM_PARAMS.threshold
        );

        this.composer.addPass(this.scenePass);
        this.composer.addPass(this.bloomPass);
        this.postProcessFolder = pane.addFolder({
            title: "Bloom",
            expanded: true,
            // hidden: true,
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "strength", {
            min: 0,
            max: 2,
            step: 0.1,
        }).on('change', () => {
            this.bloomPass.strength = this.BLOOM_PARAMS.strength;
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "radius", {
            min: 0,
            max: 20,
            step: 0.1,
        }).on('change', () => {
            this.bloomPass.radius = this.BLOOM_PARAMS.radius;
        });

        this.postProcessFolder.addBinding(this.BLOOM_PARAMS, "threshold", {
            min: 0,
            max: 20,
            step: 0.1,
        }).on('change', () => {
            this.bloomPass.threshold = this.BLOOM_PARAMS.threshold;
        });

    }

    addObjects() {
        this.cube = new Cube();
        // this.cube2 = new Cube();
        this.scene.add(this.cube.group);
        this.cover = new Cover();
        this.sphere = new Sphere();
        this.line = new Line();
        this.logoIut = new LogoIut();

        // this.scene.add(this.sphere.mesh);
        // this.scene.add(this.line.group);
        this.selectedObject = this.cube;
        this.camera.position.set(0, 0, 8);
    }

    changeVisualizer(index) {
        this.scene.remove(this.selectedObject.group);
        switch (index) {
            case 'cube':
                this.selectedObject = this.cube;
                this.camera.position.set(0, 0, 8);
                break;
            case 'cover':
                this.selectedObject = this.cover;
                this.camera.position.set(0, 0, 30);
                this.bloomPass.strength = 0;
                break;
            case 'line':
                this.selectedObject = this.line;
                this.camera.position.set(0, 0, 500);
                break;
            case 'sphere':
                this.selectedObject = this.sphere;
                this.camera.position.set(0, 0, 10);
                break;
            case 'logoiut':
                this.selectedObject = this.logoIut;
                this.camera.position.set(0, 0, 20);
                break;
            default:
                break;
        }
        this.scene.add(this.selectedObject.group);
    }

    addEvents() {
        gsap.ticker.add(this.tick);
        // gsap.ticker.fps(60);
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        console.log('resize executed');
    }

    tick = (time, deltaTime, frame) => {
        // this.stats.begin();
        // this.cube.tick(deltaTime);
        // this.sphere.tick();
        this.selectedObject.tick(deltaTime);

        this.controls.update();

        // executé à chaque frame 
        // this.renderer.render(this.scene, this.camera);
        this.composer.render();

        // dessiner 60 fois par seconde
        // this.stats.end();
    }
}

const Scene = new SCENE(); //création d'une instance de la classe Scene
export default Scene; //exporte une instance de la classe Scene, concept de SINGLETON

//export default Scene; //exporte la classe Scene
// en résumé class SCENE puis const Scene = new SCENE(); export default Scene;
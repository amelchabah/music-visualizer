import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import EdgeShader from '../../shaders/EdgeShader.js';
import AudioController from '../../utils/AudioController';
import Scene from '../Scene';

export default class LogoIut {
    constructor() {
        this.group = null;
        this.circles = [];

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const textureCube = cubeTextureLoader.load([
            'icon.jpg', 'icon.png',
            'icon.jpg', 'icon.png',
            'icon.jpg', 'icon.png'
        ]);

        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            reflectivity: 1,
            envMap: textureCube,
        });

        Scene.gltfLoader.load('/logo-iut.glb', (gltf) => {
            console.log(gltf.scene);
            this.group = gltf.scene;

            this.group.traverse((object) => {
                if (object.type === 'Mesh') {
                    object.material = this.material;
                }
            });

            this.icosphere = this.group.getObjectByName('Icosphere');
            this.circle1 = this.group.getObjectByName('BezierCircle');
            this.circle2 = this.group.getObjectByName('BezierCircle001');
            this.circle3 = this.group.getObjectByName('BezierCircle002');
            this.circle4 = this.group.getObjectByName('BezierCircle003');

            this.circles = [this.circle1, this.circle2, this.circle3, this.circle4];

            this.group.rotation.x = Math.PI / 2;
        });

        // Créer un effet de bord avec lueur
        this.composer = new EffectComposer(Scene.renderer);
        const renderPass = new RenderPass(Scene.scene, Scene.camera);
        this.composer.addPass(renderPass);

        // Pass pour le filtre de bord
        const edgePass = new ShaderPass(EdgeShader);
        edgePass.renderToScreen = true;
        this.composer.addPass(edgePass);
    }

    tick(deltaTime) {
        if (this.icosphere && this.circles) {
            const remapped = 1 + AudioController.dataArray[0] / 255;
            this.icosphere.scale.set(remapped, remapped, remapped);
    
            for (let i = 0; i < this.circles.length; i++) {
                const circle = this.circles[i];
                const scale = 1 + AudioController.dataArray[i + 1] / 255;
                circle.scale.set(scale, scale, scale);
            }
    
            // Réduire la vitesse de rotation
            this.group.rotation.y += 0.0005 * deltaTime;
            this.group.rotation.x += 0.0005 * deltaTime;
            this.group.rotation.z += 0.0005 * deltaTime;
        }
    }
    
}

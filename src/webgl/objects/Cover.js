import * as THREE from 'three';
import AudioController from '../../utils/AudioController';
import Scene from '../Scene.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from "!!raw-loader!!glslify-loader!../../shaders/cover/fragment.glsl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertexShader from "!!raw-loader!!glslify-loader!../../shaders/cover/vertex.glsl";
import pane from '../../utils/Pane.js';

export default class Cover {
    constructor() {
        this.geometry = new THREE.PlaneGeometry(10, 10, 512, 512);
        // this.material = new THREE.MeshBasicMaterial({
        this.material = new THREE.ShaderMaterial({
            // wireframe: true,
            uniforms: {
                uMap: {
                    value: null
                },
                uBassFrequency: {
                    value: 0
                },
                uTime: {
                    value: 0
                },
                uNoiseFrequency: {
                    value: 1
                }
            },
            side: THREE.DoubleSide,
            fragmentShader,
            vertexShader
        });
        // this.material = new THREE.MeshNormalMaterial({ wireframe: true });
        this.mesh = new THREE.Points(this.geometry, this.material);
        this.group = new THREE.Group();
        this.group.add(this.mesh);

        this.folder = pane.addFolder({
            title: "Cover",
            // expanded: true,
            // hidden: true,
        });

        this.folder.addBinding(this.material.uniforms.uNoiseFrequency, "value", {
            min: -5,
            max: 5,
            step: 0.001,
            label: "uNoiseFrequency"
        });
    }

    updateCover(src) {
        Scene.textureLoader.load(src, (texture) => {
            // this.material.map = texture;
            this.material.uniforms.uMap.value = texture;
            this.material.needsUpdate = true;
        }
        );
    }

    tick(deltaTime) {
        this.material.uniforms.uTime.value += deltaTime * 0.001;
        this.material.uniforms.uBassFrequency.value = AudioController.dataArray[0];
    
        // Réduire la vitesse de rotation
        // this.group.rotation.z += 0.0005 * deltaTime;
        // this.group.rotation.z += 0.0005 * deltaTime;
    }
    
}
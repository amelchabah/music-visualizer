import * as THREE from 'three';
import AudioController from '../../utils/AudioController';
import Scene from '../Scene'

export default class LogoIut {
    constructor() {
        this.group = null;
        this.material = new THREE.MeshNormalMaterial();
        this.circles = [];
        
        Scene.gltfLoader.load('/logo-iut.glb', (gltf) => {
            console.log(gltf.scene);
            this.group = gltf.scene;
            this.group.traverse((object) => {
                if (object.type === 'Mesh') {
                    object.material = this.material;
                }
            })


            this.icosphere = this.group.getObjectByName('Icosphere');
            this.circle1 = this.group.getObjectByName('BezierCircle');
            this.circle2 = this.group.getObjectByName('BezierCircle001');
            this.circle3 = this.group.getObjectByName('BezierCircle002');
            this.circle4 = this.group.getObjectByName('BezierCircle003');

            this.circles = [this.circle1, this.circle2, this.circle3, this.circle4];
            
            this.group.rotation.x = Math.PI / 2;
        })
    }

    tick(deltaTime) {
        const remapped = 1 + AudioController.dataArray[0] / 255;
        this.icosphere.scale.set(remapped, remapped, remapped); 

        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            const scale = 1 + AudioController.dataArray[i+1] / 255;
            circle.scale.set(scale, scale, scale);
            
        }
    }
}
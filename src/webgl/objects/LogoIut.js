import * as THREE from 'three';
import AudioController from '../../utils/AudioController';
import Scene from '../Scene'

export default class LogoIut {
    constructor() {
        this.group = null;
        this.material = new THREE.MeshNormalMaterial();
        Scene.gltfLoader.load('/logo-iut.glb', (gltf) => {
            console.log(gltf.scene);
            this.group = gltf.scene;
            this.group.traverse((object) => {
                if (object.type === 'Mesh') {
                    object.material = this.material;
                }
            })
            this.group.rotation.x = Math.PI / 2;
        })
    }

    tick(deltaTime) {
        this.group.rotation.x += 0.001 * deltaTime;
        this.group.rotation.z += 0.001 * deltaTime;

        const rescale = 1 + AudioController.dataArray[0] / 255;

        this.group.scale.set(rescale, rescale, rescale)
    }
}
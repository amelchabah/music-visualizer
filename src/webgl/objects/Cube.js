import * as THREE from 'three';
import AudioController from '../../utils/AudioController';

export default class Cube {
    constructor() {
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const textureCubes = cubeTextureLoader.load([
            'textures/posx.jpg', 'textures/posx.jpg',
            'textures/posx.jpg', 'textures/posx.jpg',
            'textures/posx.jpg', 'textures/posx.jpg'
        ]);

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            envMap: textureCubes,
            reflectivity: 1,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.group = new THREE.Group();
        this.group.add(this.mesh);
    }

    tick(deltaTime) {
        this.mesh.rotation.x += 0.001 * deltaTime;
        this.mesh.rotation.z += 0.001 * deltaTime;

        const rescale = 1 + AudioController.dataArray[0] / 255;

        this.mesh.scale.set(rescale, rescale, rescale)
    }
}
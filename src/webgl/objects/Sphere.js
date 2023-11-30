import * as THREE from 'three';
import Noise from 'noisejs';
import AudioController from '../../utils/AudioController';

export default class Sphere {
    constructor() {
        this.geometry = new THREE.SphereGeometry(6, 20, 20);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            wireframe: true
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.group = new THREE.Group();
        this.group.add(this.mesh);

        this.group.position.set(0, 0, 0);
        this.noiseScale = 1;
        this.bassMultiplier = 4;

        // sauvegarder la position originale de chaque sommet pour la déformation
        this.originalPositions = this.geometry.attributes.position.array.slice();
        // calculer les normales des faces pour chaque face dans la géométrie
        this.geometry.computeVertexNormals();
    }

    tick(deltaTime) {
        // déformer la sphère en fonction de la musique
        const bassFrequency = AudioController.dataArray[0];
        const noise = new Noise.Noise();

        const displacement = new THREE.Vector3();

        for (let i = 0; i < this.geometry.attributes.position.array.length; i += 3) {
            const x = this.originalPositions[i];
            const y = this.originalPositions[i + 1];
            const z = this.originalPositions[i + 2];

            const xDisplacement = noise.simplex3(x * this.noiseScale, y * this.noiseScale, z * this.noiseScale);
            const yDisplacement = noise.simplex3(y * this.noiseScale, z * this.noiseScale, x * this.noiseScale);
            const zDisplacement = noise.simplex3(z * this.noiseScale, x * this.noiseScale, y * this.noiseScale);

            displacement.set(xDisplacement, yDisplacement, zDisplacement);
            displacement.multiplyScalar(bassFrequency / 255 * this.bassMultiplier);

            // appliquer le déplacement le long de la normale de la face
            const normal = this.geometry.attributes.normal.array.slice(i, i + 3);
            displacement.applyAxisAngle(new THREE.Vector3(normal[0], normal[1], normal[2]), Math.PI / 2);

            this.geometry.attributes.position.array[i] = this.originalPositions[i] + displacement.x;
            this.geometry.attributes.position.array[i + 1] = this.originalPositions[i + 1] + displacement.y;
            this.geometry.attributes.position.array[i + 2] = this.originalPositions[i + 2] + displacement.z;
        }

        this.geometry.attributes.position.needsUpdate = true;

        // augmenter la taille de la boule en fonction de la musique
        this.mesh.scale.x = 1 + AudioController.dataArray[0] / 255;
        this.mesh.scale.y = 1 + AudioController.dataArray[0] / 255;
        this.mesh.scale.z = 1 + AudioController.dataArray[0] / 255;

        this.mesh.rotation.x += 0.0005 * deltaTime;
        this.mesh.rotation.z += 0.0005 * deltaTime;
    }
}

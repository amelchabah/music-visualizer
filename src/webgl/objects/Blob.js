import * as THREE from 'three';
import AudioController from '../../utils/AudioController';

export default class Blob {
    constructor() {
        // Créez une géométrie personnalisée pour le blob
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        // Ajoutez les sommets du blob à la géométrie (personnalisez-les selon vos besoins)
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            vertices.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Créez un matériau pour le blob (vous pouvez utiliser un ShaderMaterial)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // Créez un objet Mesh en utilisant la géométrie et le matériau
        this.mesh = new THREE.Mesh(geometry, material);
    }

    tick() {
        // Mettez à jour la position, l'échelle, la rotation, ou tout autre aspect du blob ici
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.z += 0.01;

        const rescale = 1 + AudioController.dataArray[0] / 255;
        this.mesh.scale.set(rescale, rescale, rescale);
    }
}

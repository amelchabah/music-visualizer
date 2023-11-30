import * as THREE from 'three';
import AudioController from '../../utils/AudioController';

export default class Line {
    constructor() {
        this.colors = [
            0xFFFFFF, 0xF3F3F3, 0xEBEBEB, 0xE0E0E0,
        ];

        // Couleurs intermédiaires de blanc à noir
        const numberOfSteps = 20; // Le nombre de couleurs intermédiaires que vous souhaitez
        const startColor = 0xFFFFFF; // Blanc
        // const endColor = 0x000000; // Noir

        for (let i = 1; i <= numberOfSteps; i++) {
            const r = Math.round(((startColor >> 16) & 0xFF) * (1 - i / numberOfSteps));
            const g = Math.round(((startColor >> 8) & 0xFF) * (1 - i / numberOfSteps));
            const b = Math.round((startColor & 0xFF) * (1 - i / numberOfSteps));

            const color = (r << 16) | (g << 8) | b;
            this.colors.push(color);
        }


        this.group = new THREE.Group();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial();
        this.materials = [];
        this.colors.forEach(color => {
            const material = new THREE.MeshBasicMaterial({
                color: color,
            })
            this.materials.push(material)
        })

        let n = -1; // pour aller de 0 a 6 et pas 1 a 7
        const MODULO = Math.round(256 / this.colors.length);
        this.SPACING = 2;

        for (let i = 0; i < 256; i++) {
            if (i % MODULO === 0) {
                n++;
            }

            this.mesh = new THREE.Mesh(this.geometry, this.materials[n]);
            this.mesh.position.x = i * this.SPACING;
            // this.mesh.scale.y = 0.1;
            this.group.add(this.mesh);
        }
        this.group.position.set(-this.SPACING * 256 / 2, 0, 0);
    }

    tick() {
        for (let i = 0; i < this.group.children.length; i++) {
            const child = this.group.children[i];
            child.scale.y = AudioController.dataArray[i] + 0.00000001;
        }

    }
}
import styles from './Canvas.module.scss'
import Scene from '../../webgl/Scene'
import { useEffect, useRef } from 'react';

const Canvas = () => {
    const canvasRef = useRef();


    useEffect(() => {
        // Initialize the Three.js scene on component mount
        Scene.setup(canvasRef.current);
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}

export default Canvas;
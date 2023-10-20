import styles from './Picker.module.scss';
import Scene from '../../webgl/Scene';

const Picker = () => {

    const pickVisualizer = (index) => {
        Scene.changeVisualizer(index)
    }
    return (
        <>
        <div className={styles.picker}>
            <h4>Pick a visualizer</h4>
            <div onClick={() => pickVisualizer('cube')}>Cube</div>
            <div onClick={() => pickVisualizer('line')}>Line</div>
            <div onClick={() => pickVisualizer('sphere')}>Sphere</div>
            <div onClick={() => pickVisualizer('logoiut')}>IUT</div>


        </div>
        </>
    )
};

export default Picker;
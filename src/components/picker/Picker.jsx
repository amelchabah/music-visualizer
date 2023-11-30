import styles from './Picker.module.scss';
import Scene from '../../webgl/Scene';

const Picker = () => {
    const pickVisualizer = (index) => {
        Scene.changeVisualizer(index)
    }
    return (
        <>
            <div className={styles.picker}>
                <h4 className='grey'>Pick a visualizer</h4>
                <div onClick={() => pickVisualizer('cube')}>Cube</div>
                <div onClick={() => pickVisualizer('logoiut')}>Eiffel</div>
                <div onClick={() => pickVisualizer('cover')}>Cover</div>
                <div onClick={() => pickVisualizer('line')}>Beats</div>
                <div onClick={() => pickVisualizer('sphere')}>Cotton</div>
                <div onClick={() => pickVisualizer('bouncingsphere')}>Sphere</div>

            </div>
        </>
    )
};

export default Picker;
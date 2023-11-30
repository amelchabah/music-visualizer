import styles from './Picker.module.scss';
import Scene from '../../webgl/Scene';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useRef } from 'react';

const Picker = ({ showPicker }) => {
    const pickerRef = useRef(null);

    const pickVisualizer = (index) => {
        Scene.changeVisualizer(index);
    };

    useEffect(() => {
        if (showPicker) {
            const pickerElements = pickerRef.current.children;
            gsap.fromTo(pickerElements, {
                opacity: 0,
            }, {
                opacity: 0.3,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    }, [showPicker]);

    return showPicker ? (
        <div className={styles.picker} ref={pickerRef}>
            <h4 className='grey'>Pick a visualizer</h4>
            <div onClick={() => pickVisualizer('cube')}>Cube</div>
            <div onClick={() => pickVisualizer('logoiut')}>Eiffel</div>
            <div onClick={() => pickVisualizer('cover')}>Cover</div>
            <div onClick={() => pickVisualizer('line')}>Beats</div>
            <div onClick={() => pickVisualizer('cotton')}>Cotton</div>
            <div onClick={() => pickVisualizer('sphere')}>Sphere</div>
        </div>
    ) : null;
};

export default Picker;

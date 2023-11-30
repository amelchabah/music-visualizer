import styles from "./Song.module.scss";
import AudioController from "../../utils/AudioController";
import { useRef } from "react";
import Scene from "../../webgl/Scene";

const Song = ({ data, setCurrentSong }) => {
    const songRef = useRef(null);
    const handleClick = () => {
        AudioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_xl)
        setCurrentSong(data);
        console.log(data);
        const activeSong = document.querySelector(`.${styles.active}`);
        if (activeSong) {
            activeSong.classList.remove(styles.active);
        }
        songRef.current.classList.add(styles.active);
    }

    return (
        <div className={styles.song} onClick={handleClick} ref={songRef}>
            <img src={data.album.cover_medium} alt="" />
            <div className={styles.title}>
                <h4>{data.title}</h4>
                <h5>{data.artist.name}</h5>
            </div>
        </div>
    );
};

export default Song;
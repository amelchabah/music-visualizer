import styles from "./Song.module.scss";
import AudioController from "../../utils/AudioController";
import { useRef } from "react";

const Song = ({ data, setCurrentSong }) => {
    const songRef = useRef(null);
    const handleClick = () => {
        AudioController.updateSong(data.preview);
        setCurrentSong(data);
        console.log(data);
        const activeSong = document.querySelector(`.${styles.active}`);
        if (activeSong) {
            activeSong.classList.remove(styles.active);
        }
        songRef.current.classList.add(styles.active);
    }
    
    // const convertTime = (time) => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
    //     return `${minutes}:${seconds}`;
    // }

    return (
        <div className={styles.song} onClick={handleClick} ref={songRef}>
            <img src={data.album.cover_medium} alt="" />
            <div className={styles.title}>
                <h4>{data.title}</h4>
                <h5>{data.artist.name}</h5>
                {/* <h6>{convertTime(data.duration)}</h6> */}
            </div>
        </div>
    );
};

export default Song;
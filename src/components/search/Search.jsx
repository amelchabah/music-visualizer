import fetchJsonp from "fetch-jsonp";
import styles from "./Search.module.scss";
import useCustomStore from "../../customStore";
import { useEffect, useState } from "react";
import AudioController from "../../utils/AudioController";

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore((state) => state.setSongs);

    useEffect(() => {
        AudioController.setup();
    }, []);

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value !== "") {
            getSongs();
        }
    }

    const getSongs = async () => {
        let response = await fetchJsonp(`https://api.deezer.com/search?q=${artist}&output=jsonp`);
        response = await response.json();
        // const shortData = response.data.slice(0, 10);
        console.log(response);
        AudioController.ctx.resume();
        setSongs(response.data);
        setArtist("");
    };

    return (
        <>
            <div className={styles.searchWrapper}>
                <input type="text" placeholder="Search a song" onChange={(e) => setArtist(e.target.value)} onKeyDown={onKeyDown} />
                <h4 className="grey">by <a href="https://github.com/amelchabah/" title="author" target="_blank" rel="noreferrer">@amelchabah</a>  &lt;&lt;</h4>
            </div>
        </>

    );
};

export default Search;
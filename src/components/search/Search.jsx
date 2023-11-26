import fetchJsonp from "fetch-jsonp";
import styles from "./Search.module.scss";
import useCustomStore from "../../customStore";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AudioController from "../../utils/AudioController";

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore((state) => state.setSongs);

    const onDrop = (audio) => {
        // console.log(audio);
        const src = URL.createObjectURL(audio[0]);
        console.log(src);

        const audioObject = {
            title: audio[0].name,
            album: {
                cover_small: "",
            },
            preview: src,
        };

        setSongs([audioObject]);


    };

    const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
        onDrop,
        accept: "audio/*",
        minSize: 0,
        maxSize: 10000000,
        multiple: false,
        noClick: true,
    });

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
            <div className={styles.dragZone} {...getRootProps()}>
                {
                    isDragActive &&
                    <input className={styles.inputDropzone}  {...getInputProps} />
                }

            </div>
        </>

    );
};

export default Search;
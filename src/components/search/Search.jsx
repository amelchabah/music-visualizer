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
        const src = URL.createObjectURL(audio[0]);
        console.log(src);
        console.log("Dropped audio:", audio);

        const audioObject = {
            album: {
                cover_medium: "yoursong.jpg",
                cover: "yoursong.jpg",
                cover_big: "yoursong.jpg",
                cover_small: "yoursong.jpg",
                cover_xl: "yoursong.jpg",
                id: "idk",
                title: "Your album",
                type: "album"
            },
            artist: {
                name: "idk, it's your song",
                id: "idk",
                link: "yourartist.jpg",
                picture: "yourartist.jpg",
                picture_big: "yourartist.jpg",
                picture_medium: "yourartist.jpg",
                picture_small: "yourartist.jpg",
                picture_xl: "yourartist.jpg",
                type: "artist",
            },
            preview: src,
            title: audio[0].name,
            id: 'idk'
        };

        setSongs([audioObject]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "audio/mp3",
        minSize: 0,
        // maxSize: 10000000,
        multiple: false,
        noClick: true,
    });

    // when is active console log active
    useEffect(() => {
        console.log(isDragActive);
    }, [isDragActive]);

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
                <div className={styles.allzone} {...getRootProps()}>

                    <div className={styles.dragZone} style={isDragActive ? { visibility: "visible" } : { visibility: "hidden" }}>
                        <input className={styles.inputDropzone}  {...getInputProps()} />
                    </div>
                </div>

            </div>
        </>

    );
};

export default Search;
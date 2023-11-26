import './index.scss';
import styles from './components/song/Song.module.scss';
import Search from './components/search/Search';
import Canvas from './components/canvas/Canvas';
import Song from './components/song/Song';
import Picker from './components/picker/Picker';
import fetchJsonp from 'fetch-jsonp';
import { useEffect, useState, useRef } from 'react';
import useCustomStore from './customStore';
import gsap from 'gsap';

function App() {
  const songsRef = useRef(null);
  const songs = useCustomStore((state) => state.songs);
  const [tracklist, setTracklist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  // Utilisez un effet pour surveiller les changements de currentSong
  useEffect(() => {
    if (currentSong) {
      // Mise à jour du titre de la page avec le titre de la chanson actuelle
      document.title = currentSong.title;
      // document.artist = currentSong.artist;
    } else {
      document.title = 'music visualizer ✩°｡⋆⸜ 🎧';
    }
  }, [currentSong]);


  useEffect(() => {
    if (songsRef.current) {
      songsRef.current.scrollTop = 0;
    }
    animateSongs();
  }, [songs]);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
    return `${minutes}:${seconds}`;
  }

  const animateSongs = () => {
    const songElements = songsRef.current.children;
    gsap.from(songElements,
      {
        opacity: 0,
        x: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      });
  };



  return (
    <>
      {currentSong ? (
        <div style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${currentSong.artist.picture_xl})` }} className='maintitle'></div>
      ) : null}

      <main>

        <Search />

        {
          currentSong ? (
            <div className='infos'>
              {/* <ul className='tracklist'>{tracklist.map(title => ( */}
              {/* <li key={title}>{title}</li> */}
              {/* ))}</ul> */}
              {/* <h4 className='grey tracks'>Last tracks</h4> */}

              <br />
              <div className='cover'>
                <img src={currentSong.album.cover_big} alt="album cover" />
              </div>
              {/* <h2 className='grey'>// PLAYING</h2> */}
              <h2>{currentSong.title}</h2>
              <h2>{currentSong.artist.name}</h2>
              {
                // only if current song duration is defined
                currentSong.duration
                  ? (
                    <h3 className='grey'>{convertTime(currentSong.duration)}</h3>
                  )
                  : null
              }
            </div>
          )
            : null
        }

        <div className='songs' ref={songsRef}>
          {songs.map((song) => (
            <Song key={song.id} data={song} setCurrentSong={setCurrentSong} />
          ))}
        </div>

        <Picker />
        <Canvas />
      </main>

    </>
  );
}
export default App;

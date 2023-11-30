import './index.scss';
import Search from './components/search/Search';
import Canvas from './components/canvas/Canvas';
import Song from './components/song/Song';
import Picker from './components/picker/Picker';
import { useEffect, useState, useRef } from 'react';
import useCustomStore from './customStore';
import gsap from 'gsap';

function App() {
  const songsRef = useRef(null);
  const songs = useCustomStore((state) => state.songs);
  const [currentSong, setCurrentSong] = useState(null);
  useEffect(() => {
    if (currentSong) {
      // mise à jour du titre de la page avec le titre de la chanson actuelle
      document.title = currentSong.title;
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
              <br />
              <div className='cover'>
                <img src={currentSong.album.cover_big} alt="album cover" />
              </div>
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

        <Picker showPicker={songs.length > 0} />
        <Canvas />
      </main>

    </>
  );
}
export default App;

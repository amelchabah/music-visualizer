import { create } from 'zustand';

// const useCustomStore = create((set) => ({
//     songs: [],
//     setSongs: (value) => set({ songs: value }),
// }));

const useCustomStore = create((set) => ({
    songs: [],
    currentSong: null, // Ajoutez l'état pour la chanson actuellement en cours
    setSongs: (value) => set({ songs: value }),
    // setCurrentSong: (song) => set({ currentSong: song }), // Ajoutez un moyen de mettre à jour la chanson actuelle
  }));
  

export default useCustomStore;
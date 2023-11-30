import { create } from 'zustand';

const useCustomStore = create((set) => ({
    songs: [],
    currentSong: null, // Ajoutez l'état pour la chanson actuellement en cours
    setSongs: (value) => set({ songs: value }),
  }));
  

export default useCustomStore;
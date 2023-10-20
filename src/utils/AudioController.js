import { gsap } from "gsap";

class AUDIO_CONTROLLER {
    setup() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.audio = new Audio();
        this.audio.volume = 0.1;
        this.audio.crossOrigin = "anonymous";

        this.audioSource = this.ctx.createMediaElementSource(this.audio);
        // créer la source pour les ondes

        this.analyser = new AnalyserNode(this.ctx, {
            fftSize: 1024,
            // nombre de fréquences analysées
            smoothingTimeConstant: 0.8,
            // lissage des données
          });
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        // créer un tableau de données   
        

        this.audioSource.connect(this.analyser);
        // connecter la source à l'analyseur
        this.analyser.connect(this.ctx.destination);
        // connecter l'analyseur à la destination (les hauts parleurs)

        gsap.ticker.add(this.tick);
    }

    updateSong(preview) {
        this.audio.src = preview;
        this.audio.currentTime = 0;
        // this.audio.load();
        this.audio.play();
    }

    tick = () => {
        this.analyser.getByteFrequencyData(this.dataArray);
        // récupérer les données de fréquence
        // console.log(this.dataArray);
    }

}

const AudioController = new AUDIO_CONTROLLER();
export default AudioController;

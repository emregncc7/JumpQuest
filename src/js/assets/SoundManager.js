class SoundManager {
    constructor() {
        this.sounds = new Map();
    }

    load(name, src) {
        const audio = new Audio(src);
        this.sounds.set(name, audio);
    }

    play(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

export const soundManager = new SoundManager(); 
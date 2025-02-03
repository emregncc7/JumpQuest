export const Storage = {
    saveHighScore(score) {
        localStorage.setItem('highScore', score);
    },

    getHighScore() {
        return localStorage.getItem('highScore') || 0;
    }
}; 
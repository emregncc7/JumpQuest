export const Debug = {
    enabled: false,
    
    log(...args) {
        if (this.enabled) {
            console.log(...args);
        }
    },

    drawCollisionBoxes(context, gameObjects) {
        if (!this.enabled) return;
        
        context.strokeStyle = 'red';
        gameObjects.forEach(obj => {
            context.strokeRect(
                obj.position.x,
                obj.position.y,
                obj.width,
                obj.height
            );
        });
    }
}; 
class GodRays extends MovableObject {
    y = 0;
    width = 300;
    height = 400;
    
    constructor(){
        super().loadImage('img/3. Background/Layers/1. Light/1.png');
        this.x = Math.random() * 500;
    }
}
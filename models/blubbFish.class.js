class BlubbFish extends MovableObject{
    width= 70;
    height = 70;
    y = 250
    
    IMAGES_SWIMMING_ENEMIES = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING_ENEMIES)
        this.x = 400 + Math.random() * 720 * 5;
        this.y = Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
        this.getRealFrame()
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING_ENEMIES);
        }, 150);

        this.moveLeft()
    }
}
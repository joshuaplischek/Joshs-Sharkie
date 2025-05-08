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

    IMAGES_DEAD_BLUBBFISCH = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
    ]

    IMAGES_AGRESSIV_BLUBBFISH = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ];

    world;

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING_ENEMIES)
        this.x = 400 + Math.random() * 3200;
        this.y = this.minY + Math.random() * (this.maxY - this.minY);
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
        this.offset = {
            top: 0,
            right: 0,
            bottom: 20,
            left: 0,
        };
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING_ENEMIES);
        }, 150);

        this.moveLeft()
    }
}
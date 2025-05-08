class JellyFish extends MovableObject {
    height = 125;
    width = 80;

    IMAGES_JELLYFISH = [
        'img/2.Enemy/2 Jelly fish/Swim/1.png',
        'img/2.Enemy/2 Jelly fish/Swim/2.png',
        'img/2.Enemy/2 Jelly fish/Swim/3.png',
        'img/2.Enemy/2 Jelly fish/Swim/4.png',
        'img/2.Enemy/2 Jelly fish/Swim/5.png',
        'img/2.Enemy/2 Jelly fish/Swim/6.png',
        'img/2.Enemy/2 Jelly fish/Swim/7.png',
        'img/2.Enemy/2 Jelly fish/Swim/8.png',
        'img/2.Enemy/2 Jelly fish/Swim/9.png',
        'img/2.Enemy/2 Jelly fish/Swim/10.png',
        'img/2.Enemy/2 Jelly fish/Swim/11.png',
        'img/2.Enemy/2 Jelly fish/Swim/12.png',
        'img/2.Enemy/2 Jelly fish/Swim/13.png',
        'img/2.Enemy/2 Jelly fish/Swim/14.png',
        'img/2.Enemy/2 Jelly fish/Swim/15.png',
        'img/2.Enemy/2 Jelly fish/Swim/16.png',
        'img/2.Enemy/2 Jelly fish/Swim/17.png',
    ];

    IMAGES_DEAD_JELLY = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_JELLYFISH)
        this.x = 400 + Math.random() * 3200;
        this.y = this.minY + Math.random() * (this.maxY - this.minY);
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_JELLYFISH);
        }, 100);
        this.moveDirection()
    }

}
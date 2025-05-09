class BlubbFish extends MovableObject {
    width = 70;
    height = 70;
    y = 250
    energy = 100;
    angryFish = false;
    count = 0;
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

    IMAGES_IS_AGRESSIV_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ];

    world;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING_ENEMIES)
        this.loadImages(this.IMAGES_AGRESSIV_BLUBBFISH)
        this.loadImages(this.IMAGES_IS_AGRESSIV_SWIM)
        this.loadImage(this.IMAGES_DEAD_BLUBBFISCH)
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

    animate() {
        setInterval(() => {
            if (this.isAngry() && !this.angryFish) {
                this.playAnimation(this.IMAGES_AGRESSIV_BLUBBFISH)
                this.angryFish = true;
                this.speed = 2;
            } else if (this.isAgressif) {
                this.playAnimation(this.IMAGES_IS_AGRESSIV_SWIM)
            } else if (!this.angryFish) {
                this.playAnimation(this.IMAGES_SWIMMING_ENEMIES);
            }
        }, 150);
        this.moveLeft()
    };

    reduceEnergy(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        this.speed = -25;
        this.loadImage(this.IMAGES_DEAD_BLUBBFISCH)
    }
    
};
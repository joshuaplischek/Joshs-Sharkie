class Character extends MovableObject{

    width = 200;
    height = 200;
    y = 150;
    speed = 7
    IMAGES_SWIMMING = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIMMING_FORWARD = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ]

    world;

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SWIMMING_FORWARD)
        this.animate();
    }

    animate(){

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && this.y > -80) {
                this.y -= this.speed;
            }

            if (this.world.keyboard.DOWN && 280 > this.y) {
                this.y += this.speed;
            }
            this.world.camera_x = -this.x +100;
        }, 1000/60);
        
        setInterval(() => {
                
            if (this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.DOWN) {
                    
                //swimming animation
                let i = this.currentImage % this.IMAGES_SWIMMING_FORWARD.length;
                let path = this.IMAGES_SWIMMING_FORWARD[i];
                this.img = this.imageCash[path];
                this.currentImage++;
            }else{ //standing
                let i = this.currentImage % this.IMAGES_SWIMMING.length;
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCash[path];
                this.currentImage++;
            }
            }, 150);


    }

    jump(){

    }
}
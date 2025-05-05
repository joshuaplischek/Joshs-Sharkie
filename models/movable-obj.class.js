class MovableObject extends DawableObject {
    speed = 0.3;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    deathCounter = 0;

    /**
     * 
     * @param {Array} arr - [...] 
     */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCash[path];
        this.currentImage++;
    };

    playOneTimeDeadAnimation(image) {
        if (this.deathCounter == image.length - 1) {
            this.loadImage('img/1.Sharkie/6.dead/1.Poisoned/12.png');
        } else {
            let i = this.deathCounter % image.length;
            let path = image[i];
            this.img = this.imageCash[path];
            this.currentImage++;
            this.deathCounter++;
        }
    };

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    };

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };

}
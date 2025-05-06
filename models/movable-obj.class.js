class MovableObject extends DrawableObject {
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
        //funktioniert 
        return this.x + this.offset.left +this.width -this.offset.right - this.offset.left > mo.x + mo.offset.left &&
        this.y + this.offset.top + this.height-this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left -mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;

        //funktioniert nicht
        // return this.rX + this.rW > mo.rX &&
        //     this.rY + this.rH > mo.rY &&
        //     this.rX < mo.rX + mo.rW &&
        //     this.rY < mo.rY + mo.rH;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };

}
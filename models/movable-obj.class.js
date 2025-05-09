class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    energy = 100;
    lifePoints = 100;
    lastHit = 0;
    lastShock = 0;
    deathCounter = 0;
    isAttacking = false;
    isAgressif = false;
    pos = 0;
    direction = false;
    minY = 20;
    maxY = 440;

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

    characterAttackMove(image) {
        if (this.pos != 0 || this.currentImage != 0) {
            this.pos = 0;
            this.currentImage = 0;
        }
        this.attackIntervalId = setInterval(() => {
            if (this.pos >= image.length) {
                clearInterval(this.attackIntervalId);
                this.attackIntervalId = null;
                this.isAttacking = false;
                this.pos = 0;
            } else {
                let i = this.currentImage % image.length;
                let path = image[i];
                this.img = this.imageCash[path];
                this.currentImage++;
                this.pos++;
            }
        }, 70);
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    enemyHit(enemyIndex) {
        this.lifePoints = 0
    };


    shock() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastShock = new Date().getTime();
        }
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    }

    isShocked() {
        let timepassed = new Date().getTime() - this.lastShock; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    }

    isAngry() {
        return this.isAgressif == true;
    }

    isDead() {
        return this.energy == 0;
    };

    isDefeated() {
        return this.lifePoints == 0;
    };

    isColliding(mo) {
        //funktioniert 
        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
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


    moveDirection() {
        setInterval(() => {
            if (this.y <= 20) {
                this.direction = true; // Richtung: nach unten
            }
            if (this.y >= 460 - 125) {
                this.direction = false; // Richtung: nach oben
            }

            if (this.direction) {
                this.moveDown();
            } else {
                this.moveUp();
            }
        }, 1000 / 60);
    }


    moveUp() {
        this.y -= this.speed;
    };

    moveDown() {
        this.y += this.speed;
    }
    dead() {
        setInterval(() => {
            this.y -= 0.2;
        }, 1000 / 60);
    }

}
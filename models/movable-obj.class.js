/**
 * @fileoverview Defines the MovableObject base class for all movable objects in the Sharkie game.
 * Handles movement, animation, collision detection, energy, attack, and interval logic.
 * @author Joshua Plischek
 */

/**
 * Base class for all movable objects in the game world.
 * Inherits from DrawableObject.
 */
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
    poisenBubble = false;
    intervalIds = [];
    intervalMap = {};

    /**
     * Plays an animation from the given image array.
     * @param {string[]} image - Array of image paths.
     */
    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCash[path];
        this.currentImage++;
    };

    /**
     * Plays a one-time dead animation and sets the final image.
     * @param {string[]} image - Array of image paths.
     * @param {string} finalImagePath - Path to the final dead image.
     */
    playOneTimeDeadAnimation(image, finalImagePath) {
        if (this.deathCounter == image.length - 1) {
            this.loadImage(finalImagePath);
        } else {
            let i = this.deathCounter % image.length;
            let path = image[i];
            this.img = this.imageCash[path];
            this.currentImage++;
            this.deathCounter++;
        }
    };

    /**
     * Handles the character's attack animation.
     * @param {string[]} image - Array of image paths for the attack.
     */
    characterAttackMove(image) {
        if (this.pos != 0 || this.currentImage != 0) {
            this.pos = 0;
            this.currentImage = 0;
        }
        this.attackIntervalId = setInterval(() => {
            if (this.gameIsOver) return;
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

    /**
     * Reduces energy by 10 and plays damage sound.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.world.playSoundOnce('damage');
            this.lastHit = new Date().getTime();
        }
    };

    /**
     * Handles enemy hit logic.
     * @param {number} enemyIndex
     */
    enemyHit(enemyIndex) {
        this.lifePoints = 0
    };


    /**
     * Reduces energy by 5 and plays shock sound.
     */
    shock() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.world.playSoundOnce('damage');
            this.lastShock = new Date().getTime();
        }
    };

    /**
     * Sets the attacking state for a short duration.
     */
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 500);
    }

    /**
     * Returns true if the object was recently hurt.
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    };

    /**
     * Returns true if the object was recently shocked.
     * @returns {boolean}
     */
    isShocked() {
        let timepassed = new Date().getTime() - this.lastShock; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    };

    /**
     * Returns true if the object is aggressive.
     * @returns {boolean}
     */
    isAngry() {
        return this.isAgressif == true;
    };

    /**
     * Returns true if the object is dead (energy is 0).
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    };

    /**
     * Returns true if the object is defeated (lifePoints is 0).
     * @returns {boolean}
     */
    isDefeated() {
        return this.lifePoints == 0;
    };

    /**
     * Checks collision with another movable object.
     * @param {MovableObject} mo - The other object.
     * @returns {boolean}
     */
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

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.setStoppableInterval(() => {
            if (this.gameIsOver) return;
            this.x -= this.speed;
        }, 1000 / 60);
    };

    /**
     * Moves the object up or down automatically (for jellyfish etc.).
     */
    moveDirection() {
        this.setStoppableInterval(() => {
            if (this.gameIsOver) return;
            if (!this.inBubble) {
                if (this.y <= 20) {
                    this.direction = true;
                }
                if (this.y >= 460 - 125) {
                    this.direction = false;
                }

                if (this.direction) {
                    this.moveDown();
                } else {
                    this.moveUp();
                }
            } else {
                this.moveUp();
            }
        }, 1000 / 60);
    }
    /**
     * Moves the object up.
     */
    moveUp() {
        this.y -= this.speed;
    };

    /**
     * Moves the object down.
     */
    moveDown() {
        this.y += this.speed;
    };

    /**
     * Handles the dead floating animation.
     */
    dead() {
        this.setStoppableInterval(() => {
            if (this.gameIsOver) return;
            this.y -= 0.2;
        }, 1000 / 60);
    };

    /**
     * Sets an interval that can be stopped by key.
     * @param {Function} func - The function to run.
     * @param {number} interval - The interval in ms.
     * @param {string|null} key - Optional key for the interval.
     * @returns {number} The interval ID.
     */
    setStoppableInterval(func, interval, key = null) {
        if (key && this.intervalMap[key]) {
            clearInterval(this.intervalMap[key]);
        }
        let id = setInterval(func, interval);
        if (key) this.intervalMap[key] = id;
        this.intervalIds.push(id);
        return id;
    }

    /**
     * Clears all intervals for this object.
     */
    clearAllIntervals() {
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
        this.intervalMap = {};
    }
}
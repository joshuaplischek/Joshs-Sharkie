/**
 * @fileoverview Defines the JellyFish class, representing a jellyfish enemy in the Sharkie game.
 * Handles animation, movement, and defeat logic for the jellyfish.
 * @author Joshua Plischek
 */

/**
 * Represents a jellyfish enemy in the game world.
 * Inherits from MovableObject.
 */
class JellyFish extends MovableObject {
    /**
     * The height of the jellyfish.
     * @type {number}
     */
    height = 125;

    /**
     * The width of the jellyfish.
     * @type {number}
     */
    width = 80;

    /**
     * Indicates if the jellyfish is trapped in a bubble (defeated).
     * @type {boolean}
     */
    inBubble = false;

    /**
     * Array of image paths for the swimming animation.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD_JELLY = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];


    /**
     * Creates a new JellyFish instance, loads images, sets position and starts animation.
     */
    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_JELLYFISH);
        this.loadImages(this.IMAGES_DEAD_JELLY);
        this.x = 400 + Math.random() * 3200;
        this.y = this.minY + Math.random() * (this.maxY - this.minY);
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
        this.offset = {
            top: 10,
            bottom: 15,
            left: 0,
            right: 0
        };
    }

    /**
     * Handles the animation state of the jellyfish and triggers movement.
     */
    animate() {
        this.setStoppableInterval(() => {
            if (this.isDefeated()) {
                this.playAnimation(this.IMAGES_DEAD_JELLY);
                this.inBubble = true;
            } else {
                this.playAnimation(this.IMAGES_JELLYFISH);
            }
        }, 100);
        this.moveDirection();
    }

    /**
     * Returns true if the jellyfish is defeated (trapped in a bubble).
     * @returns {boolean}
     */
    isDefeated() {
        return this.inBubble;
    }
}
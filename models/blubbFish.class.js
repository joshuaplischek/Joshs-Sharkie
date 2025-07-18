/**
 * @fileoverview Defines the BlubbFish class, representing a puffer fish enemy in the Sharkie game.
 * Handles animation states, movement, and energy logic for the enemy.
 * @author Joshua Plischek
 */

/**
 * Represents a BlubbFish enemy in the game world.
 * Inherits from MovableObject.
 */
class BlubbFish extends MovableObject {
    /**
     * The width of the BlubbFish.
     * @type {number}
     */
    width = 70;

    /**
     * The height of the BlubbFish.
     * @type {number}
     */
    height = 70;

    /**
     * The vertical position of the BlubbFish.
     * @type {number}
     */
    y = 250;

    /**
     * The current energy of the BlubbFish.
     * @type {number}
     */
    energy = 100;

    /**
     * Indicates if the BlubbFish is angry.
     * @type {boolean}
     */
    angryFish = false;

    /**
     * Counter for animation or state changes.
     * @type {number}
     */
    count = 0;

    /**
     * Array of image paths for swimming animation.
     * @type {string[]}
     */
    IMAGES_SWIMMING_ENEMIES = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD_BLUBBFISCH = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
    ];

    /**
     * Array of image paths for aggressive transition animation.
     * @type {string[]}
     */
    IMAGES_AGRESSIV_BLUBBFISH = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ];

    /**
     * Array of image paths for aggressive swimming animation.
     * @type {string[]}
     */
    IMAGES_IS_AGRESSIV_SWIM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ];

    /**
     * Reference to the game world.
     * @type {World}
     */
    world;

    /**
     * Creates a new BlubbFish instance and initializes its images, position, and animation.
     */
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING_ENEMIES);
        this.loadImages(this.IMAGES_AGRESSIV_BLUBBFISH);
        this.loadImages(this.IMAGES_IS_AGRESSIV_SWIM);
        this.loadImage(this.IMAGES_DEAD_BLUBBFISCH);
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

    /**
     * Handles the animation state of the BlubbFish.
     */
    animate() {
        this.setStoppableInterval(() => {
            if (this.isAngry() && !this.angryFish) {
                this.playAnimation(this.IMAGES_AGRESSIV_BLUBBFISH);
                this.angryFish = true;
                this.speed = 2;
            } else if (this.isAgressif) {
                this.playAnimation(this.IMAGES_IS_AGRESSIV_SWIM);
            } else if (!this.angryFish) {
                this.playAnimation(this.IMAGES_SWIMMING_ENEMIES);
            }
        }, 150);
        this.moveLeft();
    }

    /**
     * Reduces the energy of the BlubbFish.
     * @param {number} amount - The amount of energy to reduce.
     */
    reduceEnergy(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.die();
        }
    }

    /**
     * Handles the death of the BlubbFish.
     */
    die() {
        this.speed = -25;
        this.loadImage(this.IMAGES_DEAD_BLUBBFISCH)
    }
    
};
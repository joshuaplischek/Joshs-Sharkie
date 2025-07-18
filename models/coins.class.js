/**
 * @fileoverview Defines the Coin class, representing a collectable coin object in the Sharkie game.
 * Handles animation and positioning logic for coins.
 * @author Joshua Plischek
 */

/**
 * Represents a collectable coin in the game world.
 * Inherits from CollectableObjects.
 */
class Coin extends CollectableObjects {
    /**
     * The width of the coin.
     * @type {number}
     */
    width = 40;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 40;

    /**
     * Array of image paths for the coin animation.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    /**
     * Creates a new Coin instance, initializes its images, position, and animation.
     */
    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 400 + Math.random() * 3200;
        this.y = this.minY + Math.random() * (this.maxY - this.minY);
        this.animate();
        this.offset = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
    }

    /**
     * Handles the animation of the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 100);
    }
}
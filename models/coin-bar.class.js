/**
 * @fileoverview Defines the CoinBar class, representing the UI bar for collected coins in the Sharkie game.
 * Handles image loading, percentage logic, and visual updates for the coin bar.
 * @author Joshua Plischek
 */

/**
 * Represents the coin collection bar in the game UI.
 * Inherits from DrawableObject.
 */
class CoinBar extends DrawableObject {
    /**
     * Array of image paths for the coin bar states.
     * @type {string[]}
     */
    IMAGES = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_  copia.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png',
    ];

    /**
     * Creates a new CoinBar instance, loads images, and sets initial state.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 55;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the coin bar and updates the displayed image.
     * @param {number} percentage - The new percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Increases the coin bar by a given amount, up to a maximum of 100.
     * @param {number} amount - The amount to increase.
     */
    increase(amount) {
        this.percentage = Math.min(100, this.percentage + amount);
        this.setPercentage(this.percentage);
    }
}
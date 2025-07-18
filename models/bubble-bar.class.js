/**
 * @fileoverview Defines the BubbleBar class, representing the UI bar for bubble ammo in the Sharkie game.
 * Handles image loading, percentage logic, and visual updates for the bubble bar.
 * @author Joshua Plischek
 */

/**
 * Represents the bubble ammo bar in the game UI.
 * Inherits from DrawableObject.
 */
class BubbleBar extends DrawableObject {
    /**
     * Array of image paths for the bubble bar states.
     * @type {string[]}
     */
    IMAGES = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png',
    ];

    /**
     * Creates a new BubbleBar instance, loads images, and sets initial state.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the bubble bar and updates the displayed image.
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
     * Increases the bubble bar by a given amount, up to a maximum of 100.
     * @param {number} amount - The amount to increase.
     */
    increase(amount) {
        this.percentage = Math.min(100, this.percentage + amount);
        this.setPercentage(this.percentage); // If you have a method to update the bar visually
    }
}
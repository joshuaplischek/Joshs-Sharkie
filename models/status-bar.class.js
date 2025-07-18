/**
 * @fileoverview Defines the StatusBar class, representing the UI bar for player health in the Sharkie game.
 * Handles image loading, percentage logic, and visual updates for the health bar.
 * @author Joshua Plischek
 */

/**
 * Represents the health status bar in the game UI.
 * Inherits from DrawableObject.
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths for the health bar states.
     * @type {string[]}
     */
    IMAGES = [
        'img/4. Marcadores/green/Life/0_life-points.png',
        'img/4. Marcadores/green/Life/20_life-points.png',
        'img/4. Marcadores/green/Life/40_life-points.png',
        'img/4. Marcadores/green/Life/60_life-points.png',
        'img/4. Marcadores/green/Life/80_life-points.png',
        'img/4. Marcadores/green/Life/100_life-points.png',
    ];

    /**
     * Creates a new StatusBar instance, loads images, and sets initial state.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 8;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value of the health bar and updates the displayed image.
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
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
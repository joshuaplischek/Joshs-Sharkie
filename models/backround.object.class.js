/**
 * @fileoverview Defines the BackroundObject class for background layers in the Sharkie game.
 * Handles positioning and image loading for background elements.
 * @author Joshua Plischek
 */

/**
 * Represents a background object in the game world.
 * Inherits from MovableObject.
 */
class BackroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x position of the background object.
     * @param {number} [y] - The y position (optional, defaults to bottom aligned).
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
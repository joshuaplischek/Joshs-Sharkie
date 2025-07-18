/**
 * @fileoverview Defines the GodRays class, representing animated light rays in the Sharkie game background.
 * Handles image loading and random positioning for visual effects.
 * @author Joshua Plischek
 */

/**
 * Represents animated god rays (light beams) in the game world.
 * Inherits from MovableObject.
 */
class GodRays extends MovableObject {
    /**
     * The y position of the god rays.
     * @type {number}
     */
    y = 0;

    /**
     * The width of the god rays.
     * @type {number}
     */
    width = 300;

    /**
     * The height of the god rays.
     * @type {number}
     */
    height = 400;

    /**
     * Creates a new GodRays instance with a random x position and loads its image.
     */
    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/1.png');
        this.x = Math.random() * 500;
    }
}
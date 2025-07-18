/**
 * @fileoverview Defines the Bottle class, representing a collectable bottle object in the Sharkie game.
 * Handles animation and positioning logic for bottles.
 * @author Joshua Plischek
 */

/**
 * Represents a collectable bottle in the game world.
 * Inherits from CollectableObjects.
 */
class Bottle extends CollectableObjects {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 65;

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 60;

    /**
     * The vertical position of the bottle.
     * @type {number}
     */
    y = 400;

    /**
     * Array of image paths for the bottle animation.
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];

    /**
     * Creates a new Bottle instance, initializes its images, position, and animation.
     */
    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 400 + Math.random() * 3200;
        this.animate();
        this.offset = {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10,
        };
    }

    /**
     * Handles the animation of the bottle.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 100);
    }
}
/**
 * @fileoverview Defines the ShootableObject class, representing objects that can be shot (like bubbles) in the Sharkie game.
 * Handles initialization, image loading, and shooting logic for shootable objects.
 * @author Joshua Plischek
 */

/**
 * Represents a shootable object (e.g., bubble) in the game world.
 * Inherits from MovableObject.
 */
class ShootableObject extends MovableObject {

    /**
     * Array of image paths for the poisoned bubble.
     * @type {string[]}
     */
    IMAGE_POISEN_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'
    ];

    /**
     * Creates a new ShootableObject instance at the given position.
     * @param {number} x - The x position where the object is created.
     * @param {number} y - The y position where the object is created.
     */
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.loadImages(this.IMAGE_POISEN_BUBBLE);
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
    }

    /**
     * Shoots the object in the direction Sharkie is facing.
     */
    shoot() {
        if (this.otherDirection === true) {
            this.speedX = -30;
            setInterval(() => {
                if (this.gameIsOver) return;
                this.x -= 10;
            }, 25);
        } else {
            this.speedX = 30;
            setInterval(() => {
                if (this.gameIsOver) return;
                this.x += 10;
            }, 25);
        }
    }
}
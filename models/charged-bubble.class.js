/**
 * @fileoverview Defines the ChargedBubble class, representing a charged (poisoned) bubble projectile in the Sharkie game.
 * Handles initialization, image loading, and shooting logic for the charged bubble.
 * @author Joshua Plischek
 */

/**
 * Represents a charged (poisoned) bubble projectile in the game world.
 * Inherits from MovableObject.
 */
class ChargedBubble extends MovableObject {

    /**
     * Creates a new ChargedBubble instance at the given position.
     * @param {number} x - The x position where the bubble is created.
     * @param {number} y - The y position where the bubble is created.
     */
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
    }

    /**
     * Shoots the charged bubble in the direction Sharkie is facing.
     */
    shoot() {
        if (this.otherDirection === true) {
            this.speedX = -30;
            setInterval(() => {
                this.x -= 10;
            }, 25);
        } else {
            this.speedX = 30;
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
    }
}
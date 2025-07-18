/**
 * @fileoverview Defines the DrawableObject base class for all drawable objects in the Sharkie game.
 * Handles image loading, drawing, and frame calculation for rendering.
 * @author Joshua Plischek
 */

/**
 * Base class for all drawable objects in the game world.
 */
class DrawableObject {
    /**
     * The image element for the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for loaded images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCash = {};

    /**
     * The index of the current image (for animations).
     * @type {number}
     */
    currentImage = 0;

    /**
     * The x position of the object.
     * @type {number}
     */
    x = 120;

    /**
     * The y position of the object.
     * @type {number}
     */
    y = 250;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * The offset for collision or frame calculation.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    /**
     * Real frame coordinates for collision or debugging.
     * @type {number}
     */
    rX;
    rY;
    rW;
    rH;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from the given array of paths.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
    }

    /**
     * Calculates the real frame for collision or debugging based on offsets.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Draws the collision/debug frame on the canvas context for certain object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Coin ||
            this instanceof Bottle ||
            this instanceof Endboss ||
            this instanceof JellyFish ||
            this instanceof Blubbfish
        ) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}

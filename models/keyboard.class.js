/**
 * @fileoverview Defines the Keyboard class, representing the current state of keyboard controls for the Sharkie game.
 * Stores the pressed state of each relevant key for player input.
 * @author Joshua Plischek
 */

/**
 * Represents the current state of keyboard controls.
 */
class Keyboard {
    /**
     * Indicates if the left arrow key is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates if the right arrow key is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates if the up arrow key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates if the down arrow key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates if the space bar is pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates if the 'D' key is pressed.
     * @type {boolean}
     */
    D = false;
}
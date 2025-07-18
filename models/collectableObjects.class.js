/**
 * @fileoverview Defines the CollectableObjects base class for collectable items in the Sharkie game.
 * Provides shared logic for collectable objects and static utility methods.
 * @author Joshua Plischek
 */

/**
 * Base class for collectable objects in the game world.
 * Inherits from MovableObject.
 */
class CollectableObjects extends MovableObject {

    /**
     * Creates a new collectable object.
     */
    constructor() {
        super();
    }

    /**
     * Generates random collectable objects and adds them to the provided array.
     * Ensures a minimum distance between each collectable.
     * @param {Array} array - The array to which collectables will be added.
     * @param {Function} CollectableClass - The class constructor for the collectable.
     * @param {number} maxCount - The maximum number of collectables to generate.
     * @param {number} y - The vertical position for all collectables.
     * @param {number} minDistance - The minimum distance between collectables.
     */
    static generateRandomCollectables(array, CollectableClass, maxCount, y, minDistance) {
        while (array.length < maxCount) {
            let valid = false;
            let obj;
            while (!valid) {
                obj = new CollectableClass();
                obj.y = y;
                obj.x = 400 + Math.random() * 3200;
                valid = array.every(existing => Math.abs(existing.x - obj.x) >= minDistance);
            }
            array.push(obj);
        }
    }

}
/**
 * @fileoverview Defines the Level class, representing a game level in Sharkie.
 * Stores all objects, enemies, collectibles, and configuration for a level.
 * @author Joshua Plischek
 */

/**
 * Represents a game level in Sharkie.
 */
class Level {
    /**
     * Array of enemy objects in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * Array of jellyfish objects in the level.
     * @type {MovableObject[]}
     */
    jellys;

    /**
     * Array containing the boss object(s) for the level.
     * @type {MovableObject[]}
     */
    boss;

    /**
     * Array of god ray objects for background effects.
     * @type {MovableObject[]}
     */
    godRays;

    /**
     * Array of background objects for the level.
     * @type {MovableObject[]}
     */
    backroundObjects;

    /**
     * Array of coin objects in the level.
     * @type {CollectableObjects[]}
     */
    coins;

    /**
     * The x position where the level ends.
     * @type {number}
     */
    level_end_x = 720 * 5;

    /**
     * Creates a new Level instance with all required objects.
     * @param {MovableObject[]} enemies - Array of enemy objects.
     * @param {MovableObject[]} jellys - Array of jellyfish objects.
     * @param {MovableObject[]} boss - Array containing the boss object(s).
     * @param {MovableObject[]} godRays - Array of god ray objects.
     * @param {MovableObject[]} backroundObjects - Array of background objects.
     * @param {CollectableObjects[]} coins - Array of coin objects.
     */
    constructor(enemies, jellys, boss, godRays, backroundObjects, coins) {
        this.enemies = enemies;
        this.jellys = jellys;
        this.boss = boss;
        this.godRays = godRays;
        this.backroundObjects = backroundObjects;
        this.coins = coins;
    }
}
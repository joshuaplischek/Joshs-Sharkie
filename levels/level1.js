/**
 * @fileoverview Defines and initializes the levels for the Sharkie game.
 * Level 1 and Level 2 are configured with their respective enemies, objects, backgrounds, and collectibles.
 * @author Joshua Plischek
 */

/**
 * Initializes Level 1 with its enemies, jellyfish, boss, god rays, backgrounds, and coins.
 * Sets the global variable `level1`.
 */
let level1 
function initLevelOne() {
    level1 = new Level(
        [
            new BlubbFish(),
            new BlubbFish(),
            new BlubbFish(),
            new BlubbFish(),

        ],

        [
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
        ],

        [
            new Endboss()
        ],

        [
            new GodRays()
        ],

        [
            new BackroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),
            new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
            new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
            new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2),
            new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3),
            new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 4),
            new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 5),
            new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 5),
            new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 5),
            new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 5),
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
    
    );
}

/**
 * Level 2 configuration for demonstration or future use.
 * Not initialized by default.
 * @type {Level}
 */

const level2 = new Level(
    [
        new BlubbFish(),
        new BlubbFish(),
        new BlubbFish(),
        new BlubbFish(), 
        new BlubbFish(),
        new BlubbFish(),
        new BlubbFish(),
        new BlubbFish(),

    ],

    [
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
    ],

    [
        new Endboss()
    ],

    [
        new GodRays()
    ],

    [
        new BackroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
        new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),
        new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
        new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
        new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
        new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2),
        new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
        new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3),
        new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 4),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
        new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 4),
        new BackroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 5),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 5),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 5),
        new BackroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 5),
    ],
);
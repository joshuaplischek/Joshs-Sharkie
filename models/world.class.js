/**
 * @fileoverview Defines the World class, representing the main game world for Sharkie.
 * Handles game state, drawing, sound, collision detection, collectibles, and game loop logic.
 * @author Joshua Plischek
 */

/**
 * Represents the main game world for Sharkie.
 */
class World {
  character = new Character();
  blubbfish = new BlubbFish();
  endboss = new Endboss();
  level = level1;
  jelly = new JellyFish();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar;
  bubbleBar = new BubbleBar;
  coinbar = new CoinBar;
  gameIsOver = false;
  shootableObjects = [];
  sounds = {
    start: new Audio('../sounds/game start sound.mp3'),
    coin: new Audio('../sounds/collect coin.mp3'),
    damage: new Audio('../sounds/damage.mp3'),
    bubble: new Audio('../sounds/bubbles.mp3'),
    swim: new Audio('../sounds/swim.mp3'),
    bottle: new Audio('../sounds/collect bottle.mp3'),
    death: new Audio('../sounds/death.mp3'),
    win: new Audio('../sounds/win sound.mp3'),
    music: new Audio('../sounds/backround-music.mp3'), // Hintergrundmusik
  };

  /**
   * Creates a new World instance, initializes game objects, spawns bottles, sets up the game loop, and starts music.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.bottles = [];
    this.spawnBottles();
    this.checkAndRefill();
    this.draw();
    this.connectCharactertoEnemies();
    this.setWorld();
    this.character.animate();
    this.character.getRealFrame();
    this.run();
    this.sounds.music.loop = true; // Musik soll sich wiederholen
    this.sounds.music.volume = 0.25; // Lautstärke auf 50%
  };

  /**
   * Plays a sound by name.
   * @param {string} name - The key of the sound in the sounds object.
   */
  playSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].currentTime = 0;
      this.sounds[name].play();
    }
  }

  /**
   * Plays a sound only if it is not already playing.
   * @param {string} name - The key of the sound in the sounds object.
   */
  playSoundOnce(name) {
    const sound = this.sounds[name];
    if (sound && sound.paused) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays or stops a sound in a loop while a key is pressed.
   * @param {string} name - The key of the sound in the sounds object.
   * @param {boolean} isPressed - Whether the key is pressed.
   */
  playSoundWhileKey(name, isPressed) {
    const sound = this.sounds[name];
    if (!sound) return;
    if (isPressed) {
      sound.loop = true;
      if (sound.paused) {
        sound.currentTime = 0;
        sound.play();
      }
    } else {
      sound.loop = false;
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Spawns bottles at random positions in the world.
   */
  spawnBottles() {
    CollectableObjects.generateRandomCollectables(this.bottles, Bottle, 10, 360, 150);
  }

  /**
   * Checks and refills bottles if none are left.
   */
  checkAndRefill() {
    setInterval(() => {
      if (this.bottles.length <= 0) {
        this.spawnBottles();
      } else { return; }
    }, 1000);
  }

  /**
   * Sets references to the world for all major game objects.
   */
  setWorld() {
    this.character.world = this;
    this.blubbfish.world = this;
    this.endboss.world = this;
    this.jelly.world = this;
  };

  /**
   * Starts the main collision detection loop.
   */
  run() {
    setInterval(() => {
      if (this.gameIsOver) return;
      this.character.getRealFrame();
      this.checkCollisionsBlubbfish();
      this.checkCollisionsJellyFish();
      this.checkCollisionsEndboss();
    }, 200);
  };

  /**
   * Handles shooting of normal bubbles.
   */
  checkShootingObjects() {
    let offsetX = this.character.otherDirection ? 10 : 140;
    let bubble = new ShootableObject(this.character.x + offsetX, this.character.y + 100);
    bubble.otherDirection = this.character.otherDirection;
    bubble.shoot();
    this.shootableObjects.push(bubble)
  };

  /**
   * Handles shooting of charged (poisoned) bubbles.
   */
  checkChargedBuuble() {
    if (this.character.poisenBubble) {
      let offsetX = this.character.otherDirection ? 10 : 140;
      let chargedBubble = new ChargedBubble(this.character.x + offsetX, this.character.y + 100);
      chargedBubble.otherDirection = this.character.otherDirection;
      chargedBubble.shoot();
      this.shootableObjects.push(chargedBubble);
      this.bubbleBar.increase(-20);
    }
  };

  /**
   * Connects the character to enemy references.
   */
  connectCharactertoEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  };

  /**
   * Checks collisions between the character and BlubbFish enemies.
   */
  checkCollisionsBlubbfish() {
    this.checkCharacterEnemyCollisions();
    this.checkBubbleEnemyCollisions();
  }

  /**
   * Checks collisions between the character and all enemies.
   */
  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isAttacking && this.character.isColliding(enemy)) {
        enemy.reduceEnergy(100);
      }
      if (!this.character.isAttacking && this.character.isColliding(enemy)) {
        this.character.hit();
        // this.playSoundOnce('damage');
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks collisions between bubbles and enemies.
   */
  checkBubbleEnemyCollisions() {
    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          this.level.enemies[enemyIndex].isAgressif = true;
          this.blubbfish.enemyHit(enemyIndex);
          this.shootableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks collisions between the character and jellyfish.
   */
  checkCollisionsJellyFish() {
    this.checkCharacterJellyFishCollisions();
    this.checkBubbleJellyFishCollisions();
  }

  /**
   * Checks collisions between the character and jellyfish.
   */
  checkCharacterJellyFishCollisions() {
    this.level.jellys.forEach((jelly) => {
      if (!jelly.isDefeated() && this.character.isColliding(jelly)) {
        this.character.shock();
        // this.playSoundOnce('damage');
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks collisions between bubbles and jellyfish.
   */
  checkBubbleJellyFishCollisions() {
    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.jellys.forEach((jelly, jellyIndex) => {
        if (bubble.isColliding(jelly)) {
          this.level.jellys[jellyIndex].inBubble = true;
          this.shootableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks collisions with the endboss.
   */
  checkCollisionsEndboss() {
    this.checkChargedBubbleEndbossCollisions();
    this.checkCharacterEndBossCollisions();
  }

  /**
   * Checks collisions between charged bubbles and the endboss.
   */
  checkChargedBubbleEndbossCollisions() {
    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.boss.forEach((boss) => {
        if (boss instanceof Endboss && bubble instanceof ChargedBubble && bubble.isColliding(boss)) {
          boss.reduceEnergy(20);
          this.shootableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }

  /**
   * Checks collisions between the character and the endboss.
   */
  checkCharacterEndBossCollisions() {
    this.level.boss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.hit();
        // this.playSoundOnce('damage');
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks and handles coin collection.
   */
  checkCollectCoin() {
    if (!this.collectedCoins) this.collectedCoins = 0;

    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.coinbar.increase(20);
        this.collectedCoins++;
        this.playSound('coin');
        if (this.collectedCoins >= 5) {
          this.character.energy = 100;
          this.statusBar.setPercentage(100);
          this.coinbar.setPercentage(0);
          this.collectedCoins = 0;
        }
      }
    }
  }

  /**
   * Draws all game objects and UI elements to the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backroundObjects);
    this.addObjectsToMap(this.level.godRays);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bubbleBar);
    this.addToMap(this.coinbar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.jellys);
    this.addObjectsToMap(this.level.boss);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.shootableObjects)
    this.checkCollectBottle();
    this.checkCollectCoin();

    this.level.boss.forEach((boss) => {
      if (boss instanceof Endboss) {
        boss.checkCharacterPosition(this.character);
      };
    });

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this; // wir müssen this in der varibale self speichern, da this in "requestAnimationFrame" nicht mehr funktioniert?
    requestAnimationFrame(function () {
      self.draw();
    });
  };

  /**
   * Checks and handles bottle collection.
   */
  checkCollectBottle() {
    if (this.bubbleBar.percentage >= 100) {
      this.character.poisenBubble = true;
      return;
    }
    if (this.bubbleBar.percentage <= 0) {
      this.character.poisenBubble = false;
    }

    this.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.playSound('bottle');
        this.bottles.splice(index, 1);
        this.bubbleBar.increase(20);
      }
    });
  }

  /**
   * Adds an array of objects to the map (canvas).
   * @param {DrawableObject[]} objects - The objects to add.
   */
  addObjectsToMap(objects) {
    if (!objects) return;
    objects.forEach((o) => {
      this.addToMap(o);
    });
  };

  /**
   * Adds a single object to the map (canvas).
   * @param {DrawableObject} mo - The object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    };
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx); turn on to see the frames
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    };
  };
  /**
   * Flips the image horizontally for mirrored drawing.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  };

  /**
   * Restores the image orientation after flipping.
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  };

  /**
   * Ends the game and clears all intervals.
   */
  gameOver() {
    this.character.clearAllIntervals();
    this.level.jellys.forEach(jelly => jelly.clearAllIntervals && jelly.clearAllIntervals());
    this.level.enemies.forEach(enemy => enemy.clearAllIntervals && enemy.clearAllIntervals());
    this.level.boss.forEach(boss => boss.clearAllIntervals && boss.clearAllIntervals());
  }

  /**
   * Pauses the game and clears all intervals.
   */
  pauseGame() {
    this.character.clearAllIntervals();
    this.level.enemies.forEach(enemy => enemy.clearAllIntervals && enemy.clearAllIntervals());
    this.level.jellys.forEach(jelly => jelly.clearAllIntervals && jelly.clearAllIntervals());
    this.level.boss.forEach(boss => boss.clearAllIntervals && boss.clearAllIntervals());
    this.bottles.forEach(bottle => bottle.clearAllIntervals && bottle.clearAllIntervals());
    this.shootableObjects.forEach(obj => obj.clearAllIntervals && obj.clearAllIntervals());
  }

  /**
   * Resumes the game and restarts all animations.
   */
  resumeGame() {
    this.character.animate();
    this.level.enemies.forEach(enemy => enemy.animate && enemy.animate());
    this.level.jellys.forEach(jelly => jelly.animate && jelly.animate());
    this.level.boss.forEach(boss => {
        boss.animate && boss.animate();
        // Endboss folgt nur, wenn er wirklich gespawnt ist!
        if (
            boss instanceof Endboss &&
            !boss.endbossIsDead &&
            boss.isSpawned
        ) {
            boss.moveToCharacter(this.character);
        }
    });
    this.shootableObjects.forEach(obj => obj.animate && obj.animate());
}
};

class World {
  character = new Character();
  blubbfish = new BlubbFish();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar;
  bubbleBar = new BubbleBar;
  coinbar = new CoinBar;
  shootableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coins = [];
    this.bottles = [];
    this.spawnBottles();
    this.populateCoins();
    this.checkAndRefill();
    this.draw();
    this.connectCharactertoEnemies();
    this.setWorld();
    this.character.animate();
    this.character.getRealFrame();
    this.run();
  };

  populateCoins() {
    // CollectableObjects.generateRandomCollectables(this.coins, Coin, 20, 250);
  }

  spawnBottles(){
    CollectableObjects.generateRandomCollectables(this.bottles, Bottle, 10, 360, 150);
  }

  checkAndRefill() {
    setInterval(() => {
      if (this.bottles.length <= 0) {
        this.spawnBottles();
      } else{ return; }
    }, 1000);
  }


  setWorld() {
    this.character.world = this;
    this.blubbfish.world = this;
  };

  run() {
    setInterval(() => {
      this.character.getRealFrame();
      this.checkCollisionsBlubbfish();
      this.checkCollisionsJellyFish();
      this.checkCollisionsEndboss();
    }, 200);
  };

  checkShootingObjects() {
    let offsetX = this.character.otherDirection ? 10 : 140;
    let bubble = new ShootableObject(this.character.x + offsetX, this.character.y + 100);
    bubble.otherDirection = this.character.otherDirection;
    bubble.shoot();
    this.shootableObjects.push(bubble)
  };

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

  connectCharactertoEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  };

  checkCollisionsBlubbfish() {
    this.checkCharacterEnemyCollisions();
    this.checkBubbleEnemyCollisions();
  }

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isAttacking && this.character.isColliding(enemy)) {
        enemy.reduceEnergy(100);
      }
      if (!this.character.isAttacking && this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

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

  checkCollisionsJellyFish() {
    this.checkCharacterJellyFishCollisions();
    this.checkBubbleJellyFishCollisions();
  }

  checkCharacterJellyFishCollisions() {
    this.level.jellys.forEach((jelly) => {
      if (!jelly.isDefeated() && this.character.isColliding(jelly)) {
        this.character.shock();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

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

  checkCollisionsEndboss() {
    this.checkChargedBubbleEndbossCollisions();
    this.checkCharacterEndBossCollisions();
  }

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

  checkCharacterEndBossCollisions() {
    this.level.boss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
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
    this.addToMap(this.character);
    this.addObjectsToMap(this.shootableObjects)
    this.checkCollectBottle();

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
        this.bottles.splice(index, 1);
        this.bubbleBar.increase(20);
      }
    });
  }

  addObjectsToMap(objects) {
    if (!objects) return;
    objects.forEach((o) => {
      this.addToMap(o);
    });
  };

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    };
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    };
  };
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  };

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  };

};


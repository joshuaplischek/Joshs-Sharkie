class World {
  character = new Character();
  blubbfish = new BlubbFish();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar;
  shootableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.connectCharactertoEnemies();
    this.setWorld();
    this.character.animate();
    this.character.getRealFrame();
    this.run();
  };

  setWorld() {
    this.character.world = this;
    this.blubbfish.world = this;
  };

  run() {
    setInterval(() => {
      this.character.getRealFrame();
      this.checkCollisionsBlubbfish();
      this.checkCollisionsJellyFish();
      // this.checkCollisionsEndboss();
    }, 200);
  };

  checkShootingObjects() {
      let bubble = new ShootableObject(this.character.x + 140, this.character.y + 100);
      this.shootableObjects.push(bubble)
  };

  connectCharactertoEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  };

  checkCollisionsBlubbfish() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        console.log('blubbfish', this.character.energy)
        this.statusBar.setPercentage(this.character.energy);
      };
    });
    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          this.level.enemies[enemyIndex].isAgressif = true;
          this.blubbfish.enemyHit(enemyIndex);
          this.shootableObjects.splice(bubbleIndex, 1);
        };
      });
    });
  };

  checkCollisionsJellyFish() {
    this.level.jellys.forEach((jelly) => {
      if (this.character.isColliding(jelly)) {
        this.character.shock();
        this.statusBar.setPercentage(this.character.energy);
      };
    });
    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.jellys.forEach((jelly, jellyIndex) => {
        if (bubble.isColliding(jelly)) {
          this.level.jellys[jellyIndex].lifePoints = 0;
          this.shootableObjects.splice(bubbleIndex, 1);
        };
      });
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backroundObjects);
    this.addObjectsToMap(this.level.godRays);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.jellys);
    this.addObjectsToMap(this.level.boss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.shootableObjects)

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

  addObjectsToMap(objects) {
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


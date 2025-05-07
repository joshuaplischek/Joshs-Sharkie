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
  }

  setWorld() {
    this.character.world = this;
    this.blubbfish.world = this;
  }

  run() {
    setInterval(() => {
      this.character.getRealFrame();
      this.checkCollisions();
      this.checkShootingObjects();
    }, 200);
  }

  checkShootingObjects() {
    if (this.keyboard.D) {
      let bubble = new ShootableObject(this.character.x + 140, this.character.y + 100);
      this.shootableObjects.push(bubble)
    }
  }

  connectCharactertoEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character;
      }
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        console.log('BOOM', 'energy', this.character.energy)
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    this.shootableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          this.level.enemies[enemyIndex].energy = 0;
          console.log('Treffer!', this.level.enemies[enemyIndex].energy);
          
          // Beispielverhalten: Gegner entfernen
          this.level.enemies.splice(enemyIndex, 1);

          // Bubble ebenfalls entfernen (wenn z. B. nur einmal schießen)
          this.shootableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backroundObjects);
    this.addObjectsToMap(this.level.godRays);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.shootableObjects)

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.checkCharacterPosition(this.character);
      }
    });

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this; // wir müssen this in der varibale self speichern, da this in "requestAnimationFrame" nicht mehr funktioniert?
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}


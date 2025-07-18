/**
 * @fileoverview Defines the Endboss class, representing the final boss enemy in the Sharkie game.
 * Handles spawning, animation, movement, energy, and win logic.
 * @author Joshua Plischek
 */

/**
 * Represents the final boss enemy in the game world.
 * Inherits from MovableObject.
 */
class Endboss extends MovableObject {
   character;
   width = 300;
   height = 300;
   y = 60;
   spawnEventTriggered = false;
   energy = 100;
   endbossIsDead = false;
   world;

   /**
    * Array of image paths for the spawn animation.
    * @type {string[]}
    */
   IMAGES_SPAWN = [
      'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
   ];

   /**
    * Array of image paths for floating animation.
    * @type {string[]}
    */
   IMAGES_FLOATING = [
      'img/2.Enemy/3 Final Enemy/2.floating/1.png',
      'img/2.Enemy/3 Final Enemy/2.floating/2.png',
      'img/2.Enemy/3 Final Enemy/2.floating/3.png',
      'img/2.Enemy/3 Final Enemy/2.floating/4.png',
      'img/2.Enemy/3 Final Enemy/2.floating/5.png',
      'img/2.Enemy/3 Final Enemy/2.floating/6.png',
      'img/2.Enemy/3 Final Enemy/2.floating/7.png',
      'img/2.Enemy/3 Final Enemy/2.floating/8.png',
      'img/2.Enemy/3 Final Enemy/2.floating/9.png',
      'img/2.Enemy/3 Final Enemy/2.floating/10.png',
      'img/2.Enemy/3 Final Enemy/2.floating/11.png',
      'img/2.Enemy/3 Final Enemy/2.floating/12.png',
      'img/2.Enemy/3 Final Enemy/2.floating/13.png',
   ];

   /**
    * Array of image paths for attack animation.
    * @type {string[]}
    */
   IMAGES_ENDBOSS_ATTACK = [
      'img/2.Enemy/3 Final Enemy/Attack/1.png',
      'img/2.Enemy/3 Final Enemy/Attack/2.png',
      'img/2.Enemy/3 Final Enemy/Attack/3.png',
      'img/2.Enemy/3 Final Enemy/Attack/4.png',
      'img/2.Enemy/3 Final Enemy/Attack/5.png',
      'img/2.Enemy/3 Final Enemy/Attack/6.png',
   ];

   /**
    * Array of image paths for defeated animation.
    * @type {string[]}
    */
   IMAGES_DEFEADED_ENDBOSS = [
      'img/2.Enemy/3 Final Enemy/Dead/1.png',
      'img/2.Enemy/3 Final Enemy/Dead/2.png',
      'img/2.Enemy/3 Final Enemy/Dead/3.png',
      'img/2.Enemy/3 Final Enemy/Dead/4.png',
      'img/2.Enemy/3 Final Enemy/Dead/5.png',
   ];

   /**
    * Array of image paths for hurt animation.
    * @type {string[]}
    */
   IMAGES_ENBOSS_EARN_DAMAGE = [
      'img/2.Enemy/3 Final Enemy/Hurt/1.png',
      'img/2.Enemy/3 Final Enemy/Hurt/2.png',
      'img/2.Enemy/3 Final Enemy/Hurt/3.png',
      'img/2.Enemy/3 Final Enemy/Hurt/4.png',
   ];

   isSpawned = false;
   isVisible = false;
   minY = -80;   // same as Sharkie
   maxY = 200;   // same as Sharkie

   /**
    * Creates a new Endboss instance, loads images, and sets initial state.
    */
   constructor() {
      super().loadImage(this.IMAGES_SPAWN[0]);
      this.loadImages(this.IMAGES_SPAWN)
      this.loadImages(this.IMAGES_FLOATING)
      this.loadImages(this.IMAGES_ENDBOSS_ATTACK)
      this.loadImages(this.IMAGES_DEFEADED_ENDBOSS)
      this.loadImages(this.IMAGES_ENBOSS_EARN_DAMAGE)
      this.x = 720 * 5;
      this.offset = {
         top: 95,
         right: 20,
         bottom: 50,
         left: 20,
      };
      this.isVisible = false;
   }

   /**
    * Checks if the character has reached the boss area and triggers the spawn event.
    * @param {Character} character - The player character.
    */
   checkCharacterPosition(character) {
      if (character.x >= 3116 && !this.spawnEventTriggered) {
         this.spawnEndboss(character);
         this.spawnEventTriggered = true;
      }
   }

   /**
    * Spawns the endboss with an intro animation and starts following the character.
    * @param {Character} character - The player character.
    */
   spawnEndboss(character) {
      this.character = character;
      this.isVisible = true;
      this.currentImages = this.IMAGES_SPAWN;
      this.currentImage = 0;
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.currentImages);

         if (this.currentImage >= this.IMAGES_SPAWN.length) {
            clearInterval(this.animationInterval);
            this.isSpawned = true;
            this.animate(); 
            this.moveToCharacter(character); 
         }
      }, 150);
   }

   /**
    * Clears all animation and movement intervals for the endboss.
    */
   clearAllIntervals() {
      if (this.animationInterval) {
          clearInterval(this.animationInterval);
          this.animationInterval = null;
      }
      if (this.moveInterval) {
          clearInterval(this.moveInterval);
          this.moveInterval = null;
      }
      if (this.stoppableIntervals) {
          this.stoppableIntervals.forEach(id => clearInterval(id));
          this.stoppableIntervals = [];
      }
   }

   /**
    * Handles the animation state of the endboss.
    */
   animate() {
      if (!this.isSpawned) return;
      this.clearAllIntervals();
      this.animationInterval = this.setStoppableInterval(() => {
         if (this.isDead()) {
            this.character.world.playSoundOnce('win');
            this.playOneTimeDeadAnimation(this.IMAGES_DEFEADED_ENDBOSS, 'img/2.Enemy/3 Final Enemy/Dead/5.png');
            this.dead()
            setTimeout(() => {
               this.character.world.gameOver();
            }, 500);
         }  else if (this.isHurt() && !this.endbossIsDead) {
            this.playAnimation(this.IMAGES_ENBOSS_EARN_DAMAGE);
         } else if (!this.endbossIsDead) {
            this.playAnimation(this.IMAGES_FLOATING);
         }
      }, 150);
   }

   /**
    * Reduces the endboss's energy and handles death logic.
    * @param {number} [amount=20] - The amount of energy to reduce.
    */
   reduceEnergy(amount = 20) {
      this.energy -= amount;
      if (this.energy < 0) this.energy = 0;
      this.lastHit = new Date().getTime();
      if (this.energy <= 0) {
         this.isDead();
         this.endbossIsDead = true;
         displayWinScreen();
         document.getElementById('pauseButtonContainer').style.display = 'none';
         document.getElementById('touchOverlay').style.display = 'none';
         this.character.world.sounds.music.pause();
         this.character.world.sounds.music.currentTime = 0;
      }
   }

   /**
    * Checks if the endboss is currently hurt.
    * @returns {boolean} True if hurt, false otherwise.
    */
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 0.5;
   }

   /**
    * Draws the endboss on the canvas if visible.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
   draw(ctx) {
      if (!this.isVisible) return;
      super.draw(ctx);
   }

   /**
    * Makes the endboss follow the character within minY and maxY bounds.
    * @param {Character} character - The player character.
    */
   moveToCharacter(character) {
      if (!this.isSpawned) return;
      this.moveInterval = this.setStoppableInterval(() => {
         if (this.endbossIsDead) return;
         if (this.x < character.x) this.x += 5;
         else if (this.x > character.x) this.x -= 5;

         let targetY = character.y;
         if (targetY < this.minY) targetY = this.minY;
         if (targetY > this.maxY) targetY = this.maxY;

         if (this.y < targetY) this.y += 5;
         else if (this.y > targetY) this.y -= 5;

         if (this.y < this.minY) this.y = this.minY;
         if (this.y > this.maxY) this.y = this.maxY;
      }, 40, "move");
   }
}

class Endboss extends MovableObject {
   character;
   width = 300;
   height = 300;
   y = 60;
   spawnEventTriggered = false;
   energy = 100;
   endbossIsDead = false;
   world;
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

   IMAGES_ENDBOSS_ATTACK = [
      'img/2.Enemy/3 Final Enemy/Attack/1.png',
      'img/2.Enemy/3 Final Enemy/Attack/2.png',
      'img/2.Enemy/3 Final Enemy/Attack/3.png',
      'img/2.Enemy/3 Final Enemy/Attack/4.png',
      'img/2.Enemy/3 Final Enemy/Attack/5.png',
      'img/2.Enemy/3 Final Enemy/Attack/6.png',
   ];

   IMAGES_DEFEADED_ENDBOSS = [
      'img/2.Enemy/3 Final Enemy/Dead/1.png',
      'img/2.Enemy/3 Final Enemy/Dead/2.png',
      'img/2.Enemy/3 Final Enemy/Dead/3.png',
      'img/2.Enemy/3 Final Enemy/Dead/4.png',
      'img/2.Enemy/3 Final Enemy/Dead/5.png',
   ];

   IMAGES_ENBOSS_EARN_DAMAGE = [
      'img/2.Enemy/3 Final Enemy/Hurt/1.png',
      'img/2.Enemy/3 Final Enemy/Hurt/2.png',
      'img/2.Enemy/3 Final Enemy/Hurt/3.png',
      'img/2.Enemy/3 Final Enemy/Hurt/4.png',
   ];

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
   }

   checkCharacterPosition(character) {
      if (character.x >= 3116 && !this.spawnEventTriggered) {
         this.spawnEndboss(character);
         this.spawnEventTriggered = true;
      }
   }

   spawnEndboss(character) {
      this.character = character;
      this.currentImages = this.IMAGES_SPAWN;
      this.currentImage = 0;
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.currentImages);

         if (this.currentImage >= this.IMAGES_SPAWN.length) {
            clearInterval(this.animationInterval);
            this.animate();
         }
      }, 150);
      this.moveToCharacter(world.character);

   }

   animate() {
      this.setStoppableInterval(() => {
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

   reduceEnergy(amount = 20) {
      this.energy -= amount;
      if (this.energy < 0) this.energy = 0;
      this.lastHit = new Date().getTime();
      console.log('Energy:', this.energy);
      if (this.energy <= 0) {
         this.isDead();
         this.endbossIsDead = true;
         displayWinScreen();
      }
   }

   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 0.5;
   }

   moveToCharacter(character) {
       this.setStoppableInterval(() => {
           if (this.endbossIsDead) {
               return;
           }
   
           if (this.x < character.x) {
               this.x += 5;
           } else if (this.x > character.x) {
               this.x -= 5;
           }
   
           if (this.y < character.y) {
               this.y += 2;
           } else if (this.y > character.y) {
               this.y -= 2;
           }
       }, 40, "move");
   }
}

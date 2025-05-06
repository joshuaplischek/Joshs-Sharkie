class Endboss extends MovableObject{
   character;
   width = 300;
   height = 300;
   y = 60;
   spawnEventTriggered = false;
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

     constructor(){
        super().loadImage(this.IMAGES_SPAWN[0]);
        this.loadImages(this.IMAGES_SPAWN)
        this.loadImages(this.IMAGES_FLOATING)
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
         this.spawnEndboss();
         this.spawnEventTriggered = true;
      }
   }

   spawnEndboss() {
      this.currentImages = this.IMAGES_SPAWN;
      this.currentImage = 0;
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.currentImages);

         if (this.currentImage >= this.IMAGES_SPAWN.length) {
            clearInterval(this.animationInterval);
            this.animate();
         }
      }, 150);
   }

   animate(){
      setInterval(() => {
         this.playAnimation(this.IMAGES_FLOATING)
      }, 150);
   }
}
class Character extends MovableObject {
    width = 200;
    height = 200;
    y = 150;
    speed = 7
    lastInputTime = Date.now();
    isSleeping = false;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIMMING_FORWARD = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_HURT_BY_BLUBBFISH = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];

    IMAGES_HURT_BY_JELLYFISH = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_SHOOTING_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_SHOOTING_CHARCHED_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    IMAGES_FIN_SLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    IMAGES_SLEEPING = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png',
    ];

    world;

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SWIMMING_FORWARD)
        this.loadImages(this.IMAGES_HURT_BY_JELLYFISH)
        this.loadImages(this.IMAGES_HURT_BY_BLUBBFISH)
        this.loadImages(this.IMAGES_SHOOTING_BUBBLE)
        this.loadImages(this.IMAGES_FIN_SLAP)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_SHOOTING_CHARCHED_BUBBLE)
        this.loadImages(this.IMAGES_SLEEPING)
        this.offset = {
            top: 90,
            right: 35,
            bottom: 40,
            left: 40,
        };
    };


    animate() {
        this.setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isAttacking && !this.isDead()) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isAttacking && !this.isDead()) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && this.y > -80 && !this.isAttacking && !this.isDead()) {
                this.y -= this.speed;
            }
            if (this.world.keyboard.DOWN && 280 > this.y && !this.isAttacking && !this.isDead()) {
                this.y += this.speed;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.setStoppableInterval(() => {
            if (Date.now() - this.lastInputTime > 15000 && !this.isSleeping) {
                this.isSleeping = true;
            }
        }, 1000);

        this.setStoppableInterval(() => {
            if (this.isDead()) {
                this.deadcharacter();
            } else if (this.isSleeping) {
                this.playAnimation(this.IMAGES_SLEEPING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_BY_BLUBBFISH)
            } else if (this.isShocked()) {
                this.playAnimation(this.IMAGES_HURT_BY_JELLYFISH)
            } else if (!this.isAttacking && this.world.keyboard.RIGHT || !this.isAttacking && this.world.keyboard.UP || !this.isAttacking && this.world.keyboard.LEFT || !this.isAttacking && this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING_FORWARD)
                if (world) world.playSoundWhileKey('swim', true);
                // this.world.playSoundOnce('swim');
            } else if (!this.isAttacking) {
                this.playAnimation(this.IMAGES_SWIMMING)
            };
        }, 150);

        this.setStoppableInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAttacking) {
                this.isAttacking = true;
                this.characterAttackMove(this.IMAGES_FIN_SLAP);
            };

            if (this.world.keyboard.D && !this.isAttacking && !this.poisenBubble) {
                this.isAttacking = true;
                this.characterAttackMove(this.IMAGES_SHOOTING_BUBBLE);
                this.world.playSound('bubble');
                setTimeout(() => {
                    this.world.checkShootingObjects();
                }, 450);
            };

            if (this.world.keyboard.D && !this.isAttacking && this.poisenBubble) {
                this.isAttacking = true;
                this.characterAttackMove(this.IMAGES_SHOOTING_CHARCHED_BUBBLE);
                setTimeout(() => {
                    this.world.playSound('bubble');
                    this.world.checkChargedBuuble();
                }, 450);
            };
        }, 50);
    };

    deadcharacter() {
        this.world.playSoundOnce('death');
        this.playOneTimeDeadAnimation(this.IMAGES_DEAD, 'img/1.Sharkie/6.dead/1.Poisoned/12.png')
        this.dead()
        displayGameOverScreen();
        setTimeout(() => {
            this.world.gameOver()
        }, 2000);
    }
};
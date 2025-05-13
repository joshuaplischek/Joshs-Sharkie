class ShootableObject extends MovableObject {

    IMAGE_POISEN_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'
    ];

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.loadImages(this.IMAGE_POISEN_BUBBLE);
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
    }

    shoot() {
        if (this.otherDirection === true) {
            this.speedX = -30;
            setInterval(() => {
                if (this.gameIsOver) return;
                this.x -= 10;
            }, 25);
        } else {
            this.speedX = 30;
            setInterval(() => {
                if (this.gameIsOver) return;
                this.x += 10;
            }, 25);
        }
    }
}
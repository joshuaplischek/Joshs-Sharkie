class CoinBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_  copia.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png',
    ];

    constructor() {
        super()
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 55;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // 0 => 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }

    increase(amount) {
        this.percentage = Math.min(100, this.percentage + amount);
        this.setPercentage(this.percentage); // If you have a method to update the bar visually
    }
}
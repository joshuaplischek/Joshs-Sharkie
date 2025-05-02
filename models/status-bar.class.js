class StatusBar extends DawableObject {
    IMAGES = [
        'img/4. Marcadores/green/Life/0_life-points.png',
        'img/4. Marcadores/green/Life/20_life-points.png',
        'img/4. Marcadores/green/Life/40_life-points.png',
        'img/4. Marcadores/green/Life/60_life-points.png',
        'img/4. Marcadores/green/Life/80_life-points.png',
        'img/4. Marcadores/green/Life/100_life-points.png',
    ];

    constructor() {
        super()
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // 0 => 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }
    }
}
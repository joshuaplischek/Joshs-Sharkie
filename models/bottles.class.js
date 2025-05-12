class Bottle extends CollectableObjects {
    height = 65;
    width = 60;
    y = 400;

    IMAGES_BOTTLES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ]
    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 400 + Math.random() * 3200;
        this.animate();
        this.offset = {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10,
        };
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 100);
    }
}
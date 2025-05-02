class DawableObject {
    img;
    imageCash = {};
    currentImage = 0;
    x = 120;
    y = 250;
    width = 150;
    height = 150;

    loadImage(path) {
        this.img = new Image(); // this.img ist das gleiche wie document.get...Id("...")
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
    };

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof BlubbFish) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}

class DrawableObject {
    img;
    imageCash = {};
    currentImage = 0;
    x = 120;
    y = 250;
    width = 150;
    height = 150;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    rX;
    rY;
    rW;
    rH;

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

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof BlubbFish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}

class MovableObject{
    x = 120;
    y = 250;
    img;
    width = 150;
    height = 150;
    imageCash = {};
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    energy = 100;
    

    loadImage(path){
        this.img = new Image(); // this.img ist das gleiche wie document.get...Id("...")
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - [...] 
     */

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;   
        }); 

    };

    playAnimation(image){
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCash[path];
        this.currentImage++;
    };

    moveRight() {
        console.log('...moved in the right...')
    };

    hit(){
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        };
    };

    isDead(){
        return this.energy == 0;
    };

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    drawFrame(ctx){
        if (this instanceof Character || this instanceof BlubbFish) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo){
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };
}
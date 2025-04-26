class World{
    charackter = new Character();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.charackter.world = this;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backroundObjects);
        this.addObjectsToMap(this.level.godRays);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.charackter);
        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this; // wir müssen this in der waribale self speicher, da this in "requestAnimationFrame" nicht mehr funktioniert?
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o)
        });
    };

    addToMap(mo){
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1
        }
    };
}
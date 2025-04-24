class World{
    charackter = new Character();
    enemies = [
    new BlubbFish(),
    new BlubbFish(),
    new BlubbFish(),
];
    godRays = [
        new GodRays()
    ];

    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
        this.ctx.drawImage(this.charackter.img, this.charackter.x, this.charackter.y, this.charackter.height, this.charackter.width);
        this.enemies.forEach(enemy => { // forEach sorgt für jedes Element innerhalb eines Ararys. In diesem Falle dem "enemies"
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.width);
            
            
        });

        this.godRays.forEach(godRay => { // forEach sorgt für jedes Element innerhalb eines Ararys. In diesem Falle dem "enemies"
            this.ctx.drawImage(godRay.img, godRay.x, godRay.y, godRay.height, godRay.width);
            
            
        });

        // draw() wird immer wieder aufgerufen
        let self = this; // wir müssen this in der waribale self speicher, da this in "requestAnimationFrame" nicht mehr funktioniert?
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}
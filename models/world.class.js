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

    backroundObjects = [
        new BackroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
    ]

    canvas;
    ctx;
    keyboard;

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
        this.addObjectsToMap(this.backroundObjects);
        this.addObjectsToMap(this.godRays);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.charackter);
        
        

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
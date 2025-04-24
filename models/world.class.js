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

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart
        this.addObjectsToMap(this.backroundObjects);
        this.addObjectsToMap(this.godRays);
        this.addToMap(this.charackter);
        this.addObjectsToMap(this.enemies);
        

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    };
}
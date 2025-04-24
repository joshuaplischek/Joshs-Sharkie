class BlubbFish extends MovableObject{
    width= 70;
    height = 70;
    y = 250

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 250 + Math.random() * 500;
    }
}
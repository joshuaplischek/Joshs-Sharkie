class Level{
    enemies;
    godRays;
    backroundObjects;
    level_end_x = 720 * 5;
    constructor(enemies, godRays, backroundObjects){
        this.enemies = enemies;
        this.godRays = godRays;
        this.backroundObjects =backroundObjects;
    }
}
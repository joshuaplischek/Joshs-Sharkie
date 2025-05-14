class Level{
    enemies;
    jellys;
    boss;
    godRays;
    backroundObjects;
    coins;
    level_end_x = 720 * 5;
    constructor(enemies, jellys, boss, godRays, backroundObjects, coins){
        this.enemies = enemies;
        this.jellys = jellys;
        this.boss = boss;
        this.godRays = godRays;
        this.backroundObjects = backroundObjects;
        this.coins = coins;
    }
}
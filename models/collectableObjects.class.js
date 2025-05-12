class CollectableObjects extends MovableObject {

    constructor() {
        super();
    }

    static generateRandomCollectables(array, CollectableClass, maxCount, y, minDistance) {
        while (array.length < maxCount) {
            let valid = false;
            let obj;
            while (!valid) {
                obj = new CollectableClass();
                obj.y = y;
                obj.x = 400 + Math.random() * 3200;
                valid = array.every(existing => Math.abs(existing.x - obj.x) >= minDistance);
            }
            array.push(obj);
        }
    }

}
class MovableObject{
    x = 120;
    y = 250;
    img;
    width = 150;
    height = 150;
    imageCash = {};
    

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

    }

    moveRight() {
        console.log('...moved in the right...')
    }

    moveLeft(){
        
    }
}
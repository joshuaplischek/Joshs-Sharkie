let canvas;
let world;
let keyboard = new Keyboard;
let isPaused = false;

function init() {
    initLevelOne();
    canvas = document.getElementById('canvas');
    canvasDiv = document.getElementById('divCanvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    displayTitleScreen();
    document.getElementById('tryAgainLooseImg').classList.remove('visible');
    document.getElementById('tryAgainWinImg').classList.remove('visible');
    document.getElementById('looseEndScreen').classList.remove('active');
    document.getElementById('winEndScreen').classList.remove('active');
    canvasDiv.style.display = 'block';

}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true
        // if (world) world.playSoundWhileKey('swim', true);
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true
        // if (world) world.playSoundWhileKey('swim', true);
    }

    if (e.keyCode == 38) {
        keyboard.UP = true
        // if (world) world.playSoundWhileKey('swim', true);
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true
        // if (world) world.playSoundWhileKey('swim', true);
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true
    }

    if (e.keyCode == 68) {
        keyboard.D = true
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false
        if (world) world.playSoundWhileKey('swim', false);
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false
        if (world) world.playSoundWhileKey('swim', false);
    }

    if (e.keyCode == 38) {
        keyboard.UP = false
        if (world) world.playSoundWhileKey('swim', false);
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false
        if (world) world.playSoundWhileKey('swim', false);
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false
    }

    if (e.keyCode == 68) {
        keyboard.D = false
    }
});

window.addEventListener('keydown', () => {
    if (world && world.character) {
        world.character.lastInputTime = Date.now();
        world.character.isSleeping = false;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pauseButton').addEventListener('click', () => {
        isPaused = !isPaused;
        document.getElementById('pauseOverlay').style.display = isPaused ? 'flex' : 'none';
        if (world) {
            if (isPaused) {
                world.pauseGame();
            } else {
                world.resumeGame();
            }
        }
    });

    document.getElementById('resumeButton').addEventListener('click', () => {
        isPaused = false;
        document.getElementById('pauseOverlay').style.display = 'none';
        if (world) {
            world.resumeGame();
        }
    });
});

function restartGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window.world) window.world.clearAllIntervals();
    if (window.character) window.character.clearAllIntervals();
    init();

}

// In deiner World-Klasse, in der run()-Methode:
function run() {
    setInterval(() => {
        if (this.gameIsOver || window.isPaused) return;
        this.character.getRealFrame();
        this.checkCollisionsBlubbfish();
        this.checkCollisionsJellyFish();
        this.checkCollisionsEndboss();
    }, 200);
}

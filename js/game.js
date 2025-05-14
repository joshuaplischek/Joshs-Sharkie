let canvas;
let world;
let keyboard = new Keyboard;

function init() {
    initLevelOne();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    displayTitleScreen();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true
    }

    if (e.keyCode == 38) {
        keyboard.UP = true
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true
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
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false
    }

    if (e.keyCode == 38) {
        keyboard.UP = false
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false
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

function restartGame() {
    document.getElementById('looseEndScreen').classList.remove('active');
    document.getElementById('winEndScreen').classList.remove('active');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window.world) window.world.clearAllIntervals();
    if (window.character) window.character.clearAllIntervals();
    init();
}
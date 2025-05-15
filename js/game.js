let canvas;
let world;
let keyboard = new Keyboard;

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

function restartGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window.world) window.world.clearAllIntervals();
    if (window.character) window.character.clearAllIntervals();
    init();

}

// function checkOrientation() {
//     const overlay = document.getElementById('rotateOverlay');
//     const canvas = document.getElementById('canvas');
//     // Prüfe: Portrait-Modus auf kleinen Geräten
//     const isPortrait = window.matchMedia("(orientation: portrait)").matches;
//     const isMobile = window.matchMedia("(max-width: 800px)").matches;

//     if (isPortrait && isMobile) {
//         overlay.style.display = 'flex';
//         document.body.style.overflow = 'hidden';
//     } else {
//         overlay.style.display = 'none';
//         document.body.style.overflow = '';
//     }
// }

// function resizeCanvas() {
//     const canvas = document.getElementById('canvas');
//     // Beispiel: Fülle den Viewport, halte Seitenverhältnis 3:2
//     let width = window.innerWidth;
//     let height = width * 2 / 3;
//     if (height > window.innerHeight) {
//         height = window.innerHeight;
//         width = height * 3 / 2;
//     }
//     canvas.width = Math.round(width);
//     canvas.height = Math.round(height);
//     // Optional: CSS-Größe anpassen, damit es nicht verzerrt wird
//     canvas.style.width = width + 'px';
//     canvas.style.height = height + 'px';
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();

// window.addEventListener('resize', checkOrientation);
// window.addEventListener('orientationchange', checkOrientation);
// window.addEventListener('DOMContentLoaded', checkOrientation);
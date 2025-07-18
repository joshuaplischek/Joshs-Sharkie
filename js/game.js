/**
 * @fileoverview Main game logic for Sharkie, including initialization, input handling,
 * sound/mute state, pause/resume, overlays, and UI controls.
 * @author Joshua Plischek
 */

let canvas;
let world;
let keyboard = new Keyboard;
let isPaused = false;
let isMuted = localStorage.getItem('isMuted') === 'true';

/**
 * Initializes the game, sets up the world, canvas, and resets end screens.
 */
function init() {
    initLevelOne();
    canvas = document.getElementById('canvas');
    canvasDiv = document.getElementById('divCanvas');
    world = new World(canvas, keyboard);
    updateMuteState();
    world.sounds.music.play(); // Musik starten
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

    const muteBtn = document.getElementById('muteButton');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            localStorage.setItem('isMuted', isMuted);
            updateMuteState();
        });
        updateMuteState();
    }

    setupTouchControls();
    setupControllerButton();
});

/**
 * Updates the mute state for all game sounds and updates the mute button icon.
 */
function updateMuteState() {
    if (world && world.sounds) {
        Object.values(world.sounds).forEach(audio => {
            audio.muted = isMuted;
        });
    }
    // Optional: Icon ändern
    const muteBtn = document.getElementById('muteButton');
    if (muteBtn) {
        muteBtn.src = isMuted ? 'img/6.Botones/sound-off-removebg-preview.png' : 'img/6.Botones/sound-on-removebg-preview.png';
    }
}


/**
 * Restarts the game by clearing the canvas, intervals, and re-initializing.
 */
function restartGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let pauseButton = document.getElementById('pauseButtonContainer');
    pauseButton.style.display = 'flex';
    document.getElementById('touchOverlay').style.display = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window.world) window.world.clearAllIntervals();
    if (window.character) window.character.clearAllIntervals();
    init();

}

/**
 * Main game loop for collision checks and frame updates.
 */
function run() {
    setInterval(() => {
        if (this.gameIsOver || window.isPaused) return;
        this.character.getRealFrame();
        this.checkCollisionsBlubbfish();
        this.checkCollisionsJellyFish();
        this.checkCollisionsEndboss();
    }, 200);
}

/**
 * Shows the controls overlay and hides it on click.
 */
function showControls() {
    const overlay = document.getElementById('controlsOverlay');
    overlay.style.display = 'flex';
    overlay.onclick = function() {
        overlay.style.display = 'none';
    };
}

/**
 * Sets up touch controls for mobile devices and wakes up the character on input.
 */
function setupTouchControls() {
  function wakeUpCharacter() {
    if (world && world.character) {
      world.character.lastInputTime = Date.now();
      world.character.isSleeping = false;
    }
  }

  document.getElementById('touchLeft').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
    wakeUpCharacter();
  });
  document.getElementById('touchLeft').addEventListener('touchend', () => keyboard.LEFT = false);

  document.getElementById('touchRight').addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
    wakeUpCharacter();
  });
  document.getElementById('touchRight').addEventListener('touchend', () => keyboard.RIGHT = false);

  document.getElementById('touchUp').addEventListener('touchstart', () => {
    keyboard.UP = true;
    wakeUpCharacter();
  });
  document.getElementById('touchUp').addEventListener('touchend', () => keyboard.UP = false);

  document.getElementById('touchDown').addEventListener('touchstart', () => {
    keyboard.DOWN = true;
    wakeUpCharacter();
  });
  document.getElementById('touchDown').addEventListener('touchend', () => keyboard.DOWN = false);

  document.getElementById('touchAttack').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
    wakeUpCharacter();
  });
  document.getElementById('touchAttack').addEventListener('touchend', () => keyboard.SPACE = false);

  document.getElementById('touchBubble').addEventListener('touchstart', () => {
    keyboard.D = true;
    wakeUpCharacter();
  });
  document.getElementById('touchBubble').addEventListener('touchend', () => keyboard.D = false);
}

/**
 * Sets up the controller button to toggle the touch overlay.
 */
function setupControllerButton() {
    const controllerBtn = document.getElementById('controllerButton');
    const touchOverlay = document.getElementById('touchOverlay');
    controllerBtn.addEventListener('click', () => {
        if (touchOverlay.style.display === 'none' || touchOverlay.style.display === '') {
            touchOverlay.style.display = 'block';
        } else {
            touchOverlay.style.display = 'none';
        }
    });
}

/**
 * Opens the legal notice overlay.
 */
function openLegalNoticeOverlay() {
  document.getElementById('legalNoticeOverlay').style.display = 'flex';
}

/**
 * Closes the legal notice overlay.
 */
function closeLegalNoticeOverlay() {
  document.getElementById('legalNoticeOverlay').style.display = 'none';
}

/**
 * Returns to the home/title screen, hides end screens and canvas, and shows the pause button.
 */
function backHome() {
    document.getElementById('winEndScreen').classList.remove('active');
    document.getElementById('looseEndScreen').classList.remove('active');
    document.getElementById('titleScreen').style.display = 'block';
    document.getElementById('divCanvas').style.display = 'none';
    document.getElementById('pauseButtonContainer').style.display = 'flex';
}

let canvas;
let world;
let keyboard = new Keyboard;
let isPaused = false;
let isMuted = localStorage.getItem('isMuted') === 'true';

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
});

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

function displayGameOverScreen() {
    document.getElementById('looseEndScreen').classList.add('active');
    document.getElementById('pauseButtonContainer').style.display = 'none';
    document.getElementById('touchOverlay').style.display = 'none';

}

function displayWinScreen() {
    document.getElementById('winEndScreen').classList.add('active');
    document.getElementById('pauseButtonContainer').style.display = 'none';
    document.getElementById('touchOverlay').style.display = 'none';

}

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

function run() {
    setInterval(() => {
        if (this.gameIsOver || window.isPaused) return;
        this.character.getRealFrame();
        this.checkCollisionsBlubbfish();
        this.checkCollisionsJellyFish();
        this.checkCollisionsEndboss();
    }, 200);
}

function showControls() {
    const overlay = document.getElementById('controlsOverlay');
    overlay.style.display = 'flex';
    overlay.onclick = function() {
        overlay.style.display = 'none';
    };
}

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

function openLegalNoticeOverlay() {
  document.getElementById('legalNoticeOverlay').style.display = 'flex';
}

function closeLegalNoticeOverlay() {
  document.getElementById('legalNoticeOverlay').style.display = 'none';
}

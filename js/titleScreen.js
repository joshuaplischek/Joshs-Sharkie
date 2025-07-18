/**
 * @fileoverview Handles the display and logic for the title screen and start sound.
 * @author Joshua Plischek
 */

/**
 * Hides the title screen and shows the game canvas.
 */
function displayTitleScreen() {
    let canvas = document.getElementById('canvas');
    let titleScreen = document.getElementById('titleScreen');
    titleScreen.style.display = 'none';
    canvas.style.display = 'block';
}

/**
 * Plays the start sound if the game is not muted.
 */
function playStartSound() {
    if (typeof isMuted !== 'undefined' && isMuted) return;
    let audio = new Audio('../sounds/game start sound.mp3');
    audio.play();
}
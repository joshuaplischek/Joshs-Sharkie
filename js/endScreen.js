/**
 * @fileoverview Handles the display logic for the win and game over (loose) end screens,
 * including delayed appearance of buttons and hiding of controls.
 * @author Joshua Plischek
 */

/**
 * Displays the game over screen with a delay.
 * Hides the pause button and touch controls, then shows the "try again" and "home" buttons after a delay.
 */
function displayGameOverScreen() {
    let looseScreen = document.getElementById('looseEndScreen');
    let pauseButton = document.getElementById('pauseButtonContainer');
    let touchOverlay = document.getElementById('touchOverlay');
    pauseButton.style.display = 'none';
    if (touchOverlay) touchOverlay.style.display = 'none';
    setTimeout(() => {
        looseScreen.classList.add('active');
        setTimeout(() => {
            document.getElementById('tryAgainLooseImg').classList.add('visible');
            document.getElementById('homeButton').classList.add('visible');
        }, 2500);
    }, 1500);
}

/**
 * Displays the win screen with a delay.
 * Hides the pause button and touch controls, then shows the "try again" and "home" buttons after a delay.
 */
function displayWinScreen() {
    let winScreen = document.getElementById('winEndScreen');
    let pauseButton = document.getElementById('pauseButtonContainer');
    let touchOverlay = document.getElementById('touchOverlay');
    pauseButton.style.display = 'none';
    if (touchOverlay) touchOverlay.style.display = 'none';
    setTimeout(() => {
        winScreen.classList.add('active');
        setTimeout(() => {
            document.getElementById('tryAgainWinImg').classList.add('visible');
            document.getElementById('homeButton').classList.add('visible');
        }, 2500);
    }, 1500); 
}


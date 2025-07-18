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


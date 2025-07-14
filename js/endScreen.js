function displayGameOverScreen() {
    let looseScreen = document.getElementById('looseEndScreen');
    let pauseButton = document.getElementById('pauseButtonContainer');
    pauseButton.style.display = 'none';
    looseScreen.classList.add('active');
    setTimeout(() => {
        document.getElementById('tryAgainLooseImg').classList.add('visible');
    }, 2500);
}

function displayWinScreen() {
    let winScreen = document.getElementById('winEndScreen');
    let pauseButton = document.getElementById('pauseButtonContainer');
    pauseButton.style.display = 'none';
    winScreen.classList.add('active');
    setTimeout(() => {
        document.getElementById('tryAgainWinImg').classList.add('visible');
    }, 2500);
}


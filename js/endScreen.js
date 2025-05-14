function displayGameOverScreen() {
    let looseScreen = document.getElementById('looseEndScreen');
    looseScreen.classList.add('active');
    setTimeout(() => {
        document.getElementById('tryAgainLooseImg').classList.add('visible');
    }, 2500);
}

function displayWinScreen() {
    let winScreen = document.getElementById('winEndScreen');
    winScreen.classList.add('active');
    setTimeout(() => {
        document.getElementById('tryAgainWinImg').classList.add('visible');
    }, 2500);
}


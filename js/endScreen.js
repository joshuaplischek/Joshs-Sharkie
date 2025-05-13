function displayGameOverScreen() {
    let looseScreen = document.getElementById('looseEndScreen');
    looseScreen.style.display = 'block';
}

function displayWinScreen() {
    let winScreen = document.getElementById('winEndScreen');
    winScreen.style.display = 'block';
    console.log('You Win');
}
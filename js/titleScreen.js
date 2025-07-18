function displayTitleScreen() {
    let canvas = document.getElementById('canvas')
    let titleScreen = document.getElementById('titleScreen')
    titleScreen.style.display = 'none';
    canvas.style.display = 'block';
}

function playStartSound() {
    if (typeof isMuted !== 'undefined' && isMuted) return;
    let audio = new Audio('../sounds/game start sound.mp3');
    audio.play();
}
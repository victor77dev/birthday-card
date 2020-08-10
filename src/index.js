import {Torch} from './torch.js';

function enableScreenLog() {
    const log = document.querySelector('#log');
    window.console.log = (msg) => {
        log.innerHTML += (typeof(msg) === 'object' ? JSON.stringify(msg) : msg) + '<br>';
    }
}

function runTorch() {
    Torch.lightSeq([
        [2, 3],
        [7, 0.2],
        [10, 0.1],
        [13, 1],
        [16, 2],
    ])
}

function startVideo() {
    const video = document.querySelector('#video');
    const isIOS = !video.requestFullscreen;
    if (isIOS) {
        video.webkitEnterFullscreen();
    } else {
        video.requestFullscreen();
    }
    video.play();
    runTorch();
}

const start = document.querySelector('#start');
start.addEventListener('click', function() {
    console.log('start clicked');
    startVideo();
});

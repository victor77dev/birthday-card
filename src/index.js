import {Torch} from './torch.js';

function enableScreenLog() {
    const log = document.querySelector('#log');
    window.console.log = (msg) => {
        log.innerHTML += (typeof(msg) === 'object' ? JSON.stringify(msg) : msg) + '<br>';
    }
}

function runTorch() {
    Torch.turnOn();
    Torch.turnOff();
    Torch.lightSeq([
        [2, 3],
        [7, 2],
        [10, 2],
        [13, 2],
        [16, 2],
        [20, 2],
        [24, 2],
    ])
}

function startVideo() {
    const video = document.querySelector('#video');
    video.requestFullscreen();
    video.play();
    runTorch();
}

const start = document.querySelector('#start');
start.addEventListener('click', function() {
    enableScreenLog();
    console.log('start clicked');
    startVideo();
});

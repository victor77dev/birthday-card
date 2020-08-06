import {Torch} from './torch.js';

function runTorch() {
    Torch.turnOn();
}

function startVideo() {
    const video = document.querySelector('#video');
    video.requestFullscreen();
    video.play();
    runTorch();
}

const start = document.querySelector('#start');
start.addEventListener('click', function() {
    console.log('start clicked');
    startVideo();
});

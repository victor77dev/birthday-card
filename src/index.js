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

function timeUpdated(torchSeq, event) {
    const {index, seq} = torchSeq;
    if (!seq[index] || event.target.currentTime < seq[index]) return;

    if (index % 2 === 0) {
        Torch.isOff && Torch.turnOn();
    } else {
        !Torch.isOff && Torch.turnOff();
    }
    torchSeq.index++;
}

function playVideoWithTorch(src, torchSeq) {
    const video = document.querySelector('#video');
    video.src = src;

    const isIOS = !video.requestFullscreen;
    if (isIOS) {
        video.webkitEnterFullscreen();
    } else {
        video.requestFullscreen();
    }

    video.addEventListener('timeupdate', timeUpdated.bind(this, torchSeq));

    video.play();
}

async function startVideo(video) {
    const {seq} = await import(`./songs/${video}.js`);
    const torchSeq = {
        index: 0,
        seq,
    };
    playVideoWithTorch(`songs/${video}.mp4`, torchSeq);
}

const start = document.querySelector('#start');
start.addEventListener('click', function() {
    console.log('start clicked');
    startVideo('birthday-song');
});

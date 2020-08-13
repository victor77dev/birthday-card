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
    if (!seq[index] || event.target.currentTime < seq[index].start) return;

    Torch.isOff && Torch.turnOn(seq[index].duration);
    torchSeq.index++;
}

function projectFullscreen(video) {
    video.classList.remove('hidden');
    video.classList.add('fullscreen');
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

    projectFullscreen(video);
    video.play();
}

function convertToDuration(seq) {
    const output = [];
    for (let i = 0; i < seq.length; i += 2) {
        output.push({
            start: seq[i],
            duration: seq[i + 1] - seq[i],
        });
    }
    return output;
}

async function startVideo(video) {
    const {seq} = await import(`./songs/${video}.js`);
    playVideoWithTorch(`songs/${video}.mp4`, {
        index: 0,
        seq: convertToDuration(seq),
    });
}

const start = document.querySelector('#start');
start.addEventListener('click', function() {
    console.log('start clicked');
    startVideo('birthday-song');
});

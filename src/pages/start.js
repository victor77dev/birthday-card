import {Torch} from '../torch.js';

function fullscreen(ele) {
    if (ele.requestFullscreen) return ele.requestFullscreen();

    if (ele.webkitEnterFullscreen) return ele.webkitEnterFullscreen();
}

function lockOrientation(target) {
    const {orientation} = window.screen;
    if (orientation) orientation?.lock(target);
}

async function startVideo(video) {
    const {seq} = await import(`../songs/${video}.js`);
    playVideoWithTorch(`songs/${video}.mp4`, {
        index: 0,
        seq: convertToDuration(seq),
    });
}

function timeUpdated(torchSeq, event) {
    const {index, seq} = torchSeq;
    if (!seq[index] || event.target.currentTime < seq[index].start) return;

    Torch.isOff && Torch.turnOn(seq[index].duration);
    torchSeq.index++;
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

function projectFullscreen(video) {
    video.classList.remove('hidden');
    video.classList.add('fullscreen');
}

function playVideoWithTorch(src, torchSeq) {
    const video = document.querySelector('#video');
    video.src = src;

    video.addEventListener('timeupdate', timeUpdated.bind(this, torchSeq));

    projectFullscreen(video);
    video.play();
}

export const init = () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function() {
        console.log('start clicked');

        const app = document.querySelector('#app');
        fullscreen(app);
        lockOrientation('portrait-primary');
        startVideo('birthday-song');
    });
};

export const element =
'<div class="page">\
    <button id="start">Start</button>\
</div>';

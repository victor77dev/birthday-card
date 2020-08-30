import {Torch} from '../torch.js';
import {More} from './more.js';
import * as Utils from '../utils.js';

export class Video {
    constructor(song='birthday-song-english') {
        this.element =
        '<div class="page">\
            <div id="count-down-container">\
                <h1 id="count-down"></h1>\
            </div>\
            <div id="close" class="hidden close-icon"></div>\
            <video id="video" width="100%" class="hidden" playsinline></video>\
            <div class="hidden buttons">\
                <div id="replay" class="replay-icon"></div>\
                <div id="more" class="more-icon"></div>\
            </div>\
            <audio id="audio"></audio>\
        </div>';
        this.song = song;
    }

    async init() {
        const app = document.querySelector('#app');
        this.addCloseButton();
        this.fullscreen(app);
        this.lockOrientation('portrait-primary');
        await this.loadVideo('happy-birthday-video')
        this.loadAudio(this.song);
        await this.startCountDown();
        this.playAudioVideo();
    };

    startCountDown() {
        return new Promise((resolve) => {
            const countDown = document.querySelector('#count-down');
            const countDownContainer = document.querySelector('#count-down-container');
            let count = 3;
            countDown.innerHTML = count;
            const updateCountDown = setInterval(() => {
                countDown.innerHTML = --count;
                if (count <= 0) {
                    clearInterval(updateCountDown);
                    countDownContainer.classList.add('remove');
                    resolve();
                }
            }, 1000);
        })
    }

    fullscreen(ele) {
        if (ele.requestFullscreen) return ele.requestFullscreen();

        if (ele.webkitEnterFullscreen) return ele.webkitEnterFullscreen();
    }

    exitFullscreen() {
        if (document.exitFullscreen) return document.exitFullscreen();

        if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    }

    lockOrientation(target) {
        const {orientation} = window.screen;
        if (orientation && orientation.lock) orientation.lock(target);
    }

    async loadVideo(song) {
        this.video = document.querySelector('#video');
        const {seq} = await import(`../songs/${song}.js`);
        this.loadVideoWithTorch(`songs/${song}.mp4`, {
            index: 0,
            seq: this.convertToDuration(seq),
        });
    }

    timeUpdated(torchSeq, event) {
        const {index, seq} = torchSeq;
        if (!seq[index] || event.target.currentTime < seq[index].start) return;

        Torch.isOff && Torch.turnOn(seq[index].duration);
        torchSeq.index++;
    }

    convertToDuration(seq) {
        const output = [];
        for (let i = 0; i < seq.length; i += 2) {
            output.push({
                start: seq[i],
                duration: seq[i + 1] - seq[i],
            });
        }
        return output;
    }

    projectFullscreen() {
        this.video.classList.add('project');
    }

    exitProjectFullscreen() {
        this.video.classList.remove('project');
    }

    loadVideoWithTorch(src, torchSeq) {
        const {video} = this;

        video.src = src;

        this.timeUpdatedWithTorchSeq = this.timeUpdated.bind(this, torchSeq);
        video.addEventListener('timeupdate', this.timeUpdatedWithTorchSeq);
        video.addEventListener('ended', this.showNext);

        this.projectFullscreen();
    }

    showNext() {
        const buttons = document.querySelector('.buttons');
        buttons.classList.remove('hidden');

        const replay = document.querySelector('#replay');
        replay.addEventListener('click', () => {
            Utils.goTo(new Video());
        });

        const more = document.querySelector('#more');
        more.addEventListener('click', () => {
            Utils.goTo(new More());
        });
    }

    loadAudio(song) {
        this.audio = document.querySelector('#audio');
        this.audio.src = `songs/${song}.mp3`;
    }

    playAudioVideo() {
        this.video.classList.remove('hidden');
        this.startAudio = this.startAudio.bind(this);
        this.video.addEventListener('timeupdate', this.startAudio);
        this.video.play();
    }

    startAudio(event) {
        if (event.target.currentTime >= 1.5) {
            this.audio.play();
            this.video.removeEventListener('timeupdate', this.startAudio);
        }
    }

    closeVideo() {
        const {video} = this;

        video.removeEventListener('timeupdate', this.timeUpdatedWithTorchSeq);
        video.pause();
        this.exitProjectFullscreen();
        this.exitFullscreen();
    }
    
    showButton(button) {
        button.classList.remove('hidden');
        button.classList.add('shown');

        if (this.showTimeout) clearTimeout(this.showTimeout);

        this.showTimeout = setTimeout(() => {
            button.classList.add('hidden');
            button.classList.remove('shown');
            this.showTimeout = null;
        }, 4000);
    }

    addCloseButton() {
        const page = document.querySelector('.page');
        const close = document.querySelector('#close.hidden');
        page.addEventListener('touchstart', this.showButton.bind(this, close));
        close.addEventListener('click', this.closeVideo.bind(this));
    }
}

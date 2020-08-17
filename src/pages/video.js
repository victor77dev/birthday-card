import {Torch} from '../torch.js';

export class Video {
    init() {
        const app = document.querySelector('#app');
        this.addCloseButton();
        this.fullscreen(app);
        this.lockOrientation('portrait-primary');
        this.startVideo('birthday-song');
    };

    element =
    '<div class="page">\
        <button id="close" class="hidden">close</button>\
        <video id="video" width="100%" playsinline controls></video>\
    </div>';

    fullscreen(ele) {
        if (ele.requestFullscreen) return ele.requestFullscreen();

        if (ele.webkitEnterFullscreen) return ele.webkitEnterFullscreen();
    }

    lockOrientation(target) {
        const {orientation} = window.screen;
        if (orientation) orientation?.lock(target);
    }

    async startVideo(video) {
        const {seq} = await import(`../songs/${video}.js`);
        this.playVideoWithTorch(`songs/${video}.mp4`, {
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

    projectFullscreen(video) {
        video.classList.add('project');
    }

    playVideoWithTorch(src, torchSeq) {
        const video = document.querySelector('#video');
        video.src = src;

        this.timeUpdatedWithTorchSeq = this.timeUpdated.bind(this, torchSeq);
        video.addEventListener('timeupdate', this.timeUpdatedWithTorchSeq);

        this.projectFullscreen(video);
        video.play();
    }

    closeVideo() {
        const {video} = this;

        video.removeEventListener('timeupdate', this.timeUpdatedWithTorchSeq);
        video.pause();
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

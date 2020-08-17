import {Torch} from '../torch.js';

export class Video {
    init() {
        const app = document.querySelector('#app');
        this.fullscreen(app);
        this.lockOrientation('portrait-primary');
        this.startVideo('birthday-song');
    };

    element =
    '<div class="page">\
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

        video.addEventListener('timeupdate', this.timeUpdated.bind(this, torchSeq));

        this.projectFullscreen(video);
        video.play();
    }
}

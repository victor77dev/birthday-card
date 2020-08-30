import * as Utils from '../utils.js';
import {More} from './more.js';

export class Song {
    constructor(song='birthday-song-english') {
        this.element =
        '<div class="page">\
            <button id="close" class="hidden">close</button>\
            <video id="song-video" width="100%" playsinline></video>\
            <audio id="audio"></audio>\
            <div class="hidden buttons">\
                <div id="replay" class="replay-icon"></div>\
                <div id="more" class="more-icon"></div>\
            </div>\
        </div>';
        this.song = song;
    }

    init() {
        this.loadVideo('happy-birthday-video');
        this.loadAudio(this.song);
        this.playAudioVideo();
    };

    loadVideo(video) {
        this.video = document.querySelector('#song-video');
        this.video.src = `songs/${video}.mp4`;
        this.video.addEventListener('ended', this.showNext);
    }

    loadAudio(song) {
        this.audio = document.querySelector('#audio');
        this.audio.src = `songs/${song}.mp3`;
    }

    playAudioVideo() {
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

    showNext() {
        const buttons = document.querySelector('.buttons');
        buttons.classList.remove('hidden');

        const replay = document.querySelector('#replay');
        replay.addEventListener('click', () => {
            Utils.goTo(new Song());
        });

        const more = document.querySelector('#more');
        more.addEventListener('click', () => {
            Utils.goTo(new More('song'));
        });
    }
}

import {Video} from './video.js';
import {Song} from './song.js';
import * as Utils from '../utils.js';

export class More {
    constructor(from='video') {
        this.element =
        '<div class="page">\
            <div class="more-container">\
                <h1>Select song</h1>\
                <div class="buttons">\
                    <button class="button" id="english">English</button>\
                    <button class="button" id="putonghua">普通話</button>\
                    <button class="button" id="cantonese">粵語</button>\
                </div>\
            </div>\
        </div>';
        this.from = from;
    }

    init() {
        const english = document.querySelector('#english');
        english.addEventListener('click', this.goTo.bind(this, 'birthday-song-english'));

        const putonghua = document.querySelector('#putonghua');
        putonghua.addEventListener('click', this.goTo.bind(this, 'birthday-song-putonghua'));

        const cantonese = document.querySelector('#cantonese');
        cantonese.addEventListener('click', this.goTo.bind(this, 'birthday-song-cantonese'));
    }

    goTo(song) {
        if (this.from === 'song') {
            Utils.goTo(new Song(song));
        } else {
            Utils.goTo(new Video(song));
        }
    }
}

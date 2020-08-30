import {Video} from './video.js';
import * as Utils from '../utils.js';

export class More {
    constructor() {
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
    }

    init() {
        const english = document.querySelector('#english');
        english.addEventListener('click', function() {
            Utils.goTo(new Video('birthday-song-english'));
        });

        const putonghua = document.querySelector('#putonghua');
        putonghua.addEventListener('click', function() {
            Utils.goTo(new Video('birthday-song-putonghua'));
        });

        const cantonese = document.querySelector('#cantonese');
        cantonese.addEventListener('click', function() {
            Utils.goTo(new Video('birthday-song-cantonese'));
        });
    };
}

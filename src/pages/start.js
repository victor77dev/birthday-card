import {Video} from './video.js';
import * as Utils from '../utils.js';

export class Start {
    constructor() {
        this.element =
        '<div class="page">\
            <div class="start-container">\
                <img src="images/start.jpg" class="start image" alt="Ready to start" />\
            </div>\
            <button id="start">Start</button>\
        </div>';
    }

    init() {
        const start = document.querySelector('#start');
        start.addEventListener('click', function() {
            Utils.goTo(new Video());
        });
    };

}

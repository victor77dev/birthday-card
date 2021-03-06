import {Video} from './video.js';
import * as Utils from '../utils.js';

export class Start {
    constructor() {
        this.element =
        '<div class="page">\
            <div class="start-container">\
                <h1>Click Start &</h1>\
                <h1>Put your phone on the card</h1>\
                <img src="images/start.jpg" class="start image" alt="Ready to start" />\
            </div>\
            <button class="button" id="start">Start</button>\
        </div>';
    }

    init() {
        const start = document.querySelector('#start');
        start.addEventListener('click', function() {
            Utils.goTo(new Video());
        });
    };

}

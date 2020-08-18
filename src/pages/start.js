import {Video} from './video.js';
import * as Utils from '../utils.js';

export class Start {
    init = () => {
        const start = document.querySelector('#start');
        start.addEventListener('click', function() {
            Utils.goTo(new Video());
        });
    };

    element =
    '<div class="page">\
        <button id="start">Start</button>\
    </div>';
}

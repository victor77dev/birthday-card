import {Video} from './video.js';
import * as Utils from '../utils.js';

export const init = () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function() {
        Utils.goTo(new Video());
    });
};

export const element =
'<div class="page">\
    <button id="start">Start</button>\
</div>';

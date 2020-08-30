import {Torch} from './torch.js';
import * as Utils from './utils.js';

import {Welcome} from './pages/welcome.js';

const images = [
    'images/base-1.jpg',
    'images/card.jpg',
    'images/moon.jpg',
    'images/parts-2.jpg',
    'images/parts-4.jpg',
    'images/start.jpg',
    'images/base-2.jpg',
    'images/light.jpg',
    'images/parts-1.jpg',
    'images/parts-3.jpg',
    'images/project.jpg',
];

window.onload = () => {
    Utils.goTo(new Welcome());
    Utils.preloadImages(images);
}

function enableScreenLog() {
    const log = document.querySelector('#log');
    window.console.log = (msg) => {
        log.innerHTML += (typeof(msg) === 'object' ? JSON.stringify(msg) : msg) + '<br>';
    }
}

function runTorch() {
    Torch.lightSeq([
        [2, 3],
        [7, 0.2],
        [10, 0.1],
        [13, 1],
        [16, 2],
    ])
}

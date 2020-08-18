import {Torch} from './torch.js';
import * as Utils from './utils.js';

import {Welcome} from './pages/welcome.js';

window.onload = () => {
    Utils.goTo(new Welcome());
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

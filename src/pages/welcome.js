import {Start} from './start.js';
import * as Utils from '../utils.js';

export class Welcome {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new Start());
        });
    };

    element =
    '<div class="page">\
        <h1>Happy Birthday<h1>\
        <button id="next">Next</button>\
    </div>';
}

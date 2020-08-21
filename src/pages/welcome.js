import {OpenBox} from './open-box.js';
import * as Utils from '../utils.js';

export class Welcome {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new OpenBox());
        });
    };

    element =
    '<div class="page">\
        <h1>Happy Birthday</h1>\
        <button id="next">Next</button>\
    </div>';
}

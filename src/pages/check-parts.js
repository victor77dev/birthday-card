import {GuideBase} from './guide-base.js';
import * as Utils from '../utils.js';

export class CheckParts {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideBase());
        });
    };

    element =
    '<div class="page">\
        <h1>Make sure you have all the parts!</h1>\
        <button id="next">Next</button>\
    </div>';
}

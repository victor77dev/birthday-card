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
        <div class="parts-container">\
            <img src="images/parts-1.jpg" class="parts image" alt="Four base" />\
            <img src="images/parts-2.jpg" class="parts image" alt="Project & Star Moon" />\
            <img src="images/parts-3.jpg" class="parts image" alt="Reflect card" />\
            <img src="images/parts-4.jpg" class="parts image" alt="Phone card" />\
        </div>\
        <button id="next">Next</button>\
    </div>';
}

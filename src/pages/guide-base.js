import {GuideCard} from './guide-card.js';
import * as Utils from '../utils.js';

export class GuideBase {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideCard());
        });
    };

    element =
    '<div class="page">\
        <h1>Assemble 4 triangles base</h1>\
        <button id="next">Next</button>\
    </div>';
}

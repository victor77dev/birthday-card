import {GuideLight} from './guide-light.js';
import * as Utils from '../utils.js';

export class GuideCard {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideLight());
        });
    };

    element =
    '<div class="page">\
        <h1>Put card for phone base.</h1>\
        <button id="next">Next</button>\
    </div>';
}

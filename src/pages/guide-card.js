import {GuideLight} from './guide-light.js';
import * as Utils from '../utils.js';

export class GuideCard {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Put card on the base</h1>\
            <div class="guide-container">\
                <img src="images/card.jpg" class="card image" alt="Phone card" />\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideLight());
        });
    };
}

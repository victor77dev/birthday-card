import {GuideCard} from './guide-card.js';
import * as Utils from '../utils.js';

export class GuideBase {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Assemble 4 triangles base</h1>\
            <div class="guide-container">\
                <img src="images/base-1.jpg" class="base image" alt="Step 1" />\
                <img src="images/base-2.jpg" class="base image" alt="Step 2" />\
            </div>\
            <button id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideCard());
        });
    };
}

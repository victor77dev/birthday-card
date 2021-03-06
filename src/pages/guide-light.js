import {GuideMoon} from './guide-moon.js';
import * as Utils from '../utils.js';

export class GuideLight {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Put reflect card under the base</h1>\
            <div class="guide-container">\
                <img src="images/light.jpg" class="light image" alt="Reflect card" />\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideMoon());
        });
    };
}

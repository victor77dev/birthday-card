import {OpenBox} from './open-box.js';
import * as Utils from '../utils.js';

export class Welcome {
    constructor() {
        this.element =
        '<div class="page">\
            <h1 class="gold-text">Happy Birthday</h1>\
            <div id="star"></div>\
            <div id="moon"></div>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new OpenBox());
        });
    };

}

import {GuideProject} from './guide-project.js';
import * as Utils from '../utils.js';

export class GuideMoon {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Put star moon card</h1>\
            <div class="guide-container">\
                <img src="images/moon.jpg" class="light image" alt="Star Moon" />\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideProject());
        });
    };
}

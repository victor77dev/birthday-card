import {Start} from './start.js';
import * as Utils from '../utils.js';

export class GuideProject {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Put project card</h1>\
            <div class="guide-container">\
                <img src="images/project.jpg" class="project-card image" alt="Project card" />\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new Start());
        });
    };
}

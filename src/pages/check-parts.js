import {GuideBase} from './guide-base.js';
import * as Utils from '../utils.js';

const LEFT = -1;
const RIGHT = 1;
export class CheckParts {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Make sure you have all the parts!</h1>\
            <div class="parts-container">\
                <img src="images/parts-1.jpg" class="active parts image" alt="Four base" />\
                <img src="images/parts-2.jpg" class="parts image" alt="Project & Star Moon" />\
                <img src="images/parts-3.jpg" class="parts image" alt="Reflect card" />\
                <img src="images/parts-4.jpg" class="parts image" alt="Phone card" />\
                <button class="left">❮</button>\
                <button class="right">❯</button>\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
        this.index = 0;
        this.length = 4;
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideBase());
        });

        const left = document.querySelector('.left');
        left.addEventListener('click', this.updateImage.bind(this, LEFT));
        const right = document.querySelector('.right');
        right.addEventListener('click', this.updateImage.bind(this, RIGHT));
    };

    updateImage(direction) {
        const imageList = document.querySelectorAll('.parts.image');

        imageList[this.index].classList.remove('active');

        this.index = (this.index + direction + this.length) % this.length;
        imageList[this.index].classList.add('active');
    }
}

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
                <div class="slide-bar">\
                    <span class="active dot"></span>\
                    <span class="dot"></span>\
                    <span class="dot"></span>\
                    <span class="dot"></span>\
                </div>\
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

        const dots = document.querySelectorAll('span.dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', this.setImage.bind(this, i));
        }
    };

    updateImage(direction) {
        this.setImage((this.index + direction + this.length) % this.length);
    }

    setImage(index) {
        const imageList = document.querySelectorAll('.parts.image');
        const dots = document.querySelectorAll('span.dot');

        imageList[this.index].classList.remove('active');
        dots[this.index].classList.remove('active');

        this.index = index;
        imageList[this.index].classList.add('active');
        dots[this.index].classList.add('active');
    }
}

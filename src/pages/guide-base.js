import {GuideCard} from './guide-card.js';
import * as Utils from '../utils.js';

export class GuideBase {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Assemble 4 triangles base</h1>\
            <div class="guide-container">\
                <img src="images/base-1.jpg" class="active base image" alt="Step 1" />\
                <img src="images/base-2.jpg" class="base image" alt="Step 2" />\
            </div>\
            <button class="button" id="next">Next</button>\
        </div>';
        this.index = 0;
        this.length = 2;
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', this.goNextPage.bind(this));
        this.interval = setInterval(this.updateImage.bind(this), 5000);
    };

    goNextPage() {
        clearInterval(this.interval);
        Utils.goTo(new GuideCard());
    }

    updateImage() {
        this.setImage((this.index + 1) % this.length);
    }

    setImage(index) {
        const imageList = document.querySelectorAll('.base.image');

        imageList[this.index].classList.remove('active');

        this.index = index;
        imageList[this.index].classList.add('active');
    }
}

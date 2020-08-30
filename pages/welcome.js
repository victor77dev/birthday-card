import {OpenBox} from './open-box.js';
import * as Utils from '../utils.js';

export class Welcome {
    constructor() {
        this.element =
        '<div class="page">\
            <h1 class="gold-text">Happy Birthday</h1>\
            <div id="star"></div>\
            <div id="moon"></div>\
            <div id="gift"></div>\
        </div>';
    }

    init() {
        const star = document.querySelector('#star');
        star.addEventListener('animationend', this.startPack.bind(this));
    };

    startPack(event) {
        if (event.animationName === 'track-x') {
            setTimeout(() => {
                const star = document.querySelector('#star');
                const moon = document.querySelector('#moon');

                star.classList.add('packing');
                moon.classList.add('packing');

                star.addEventListener('animationend', this.packToBox.bind(this));
            }, 2000);
        }
    }

    packToBox(event) {
        if (event.animationName === 'packing') {
            this.addGiftButton();
        }
    }

    addGiftButton() {
        const gift = document.querySelector('#gift');
        gift.addEventListener('click', function() {
            Utils.goTo(new OpenBox());
        });
    }
}

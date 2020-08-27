import {Question} from './question.js';
import * as Utils from '../utils.js';

export class OpenBox {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Songs?</h1>\
            <div id="gift" class="open-gift"></div>\
            <img id="cake" src="birthday-cake.svg" />\
        </div>';
    }

    init() {
        this.cake = document.querySelector('#cake');
        this.cake.addEventListener('animationend', this.opened.bind(this));
    };

    opened(event) {
        if (event.animationName === 'cake-opening') {
            this.cake.classList.add('enlarge');
        }
        if (event.animationName === 'cake-enlarge') {
            setTimeout(() => {
                Utils.goTo(new Question());
            }, 1000)
        }
    }
}

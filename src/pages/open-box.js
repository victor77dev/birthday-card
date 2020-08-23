import {Question} from './question.js';
import * as Utils from '../utils.js';

export class OpenBox {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Songs?</h1>\
            <button class="button" id="next">Next</button>\
        </div>';
    }

    init() {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new Question());
        });
    };
}

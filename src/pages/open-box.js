import {Question} from './question.js';
import * as Utils from '../utils.js';

export class OpenBox {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new Question());
        });
    };

    element =
    '<div class="page">\
        <h1>Songs?<h1>\
        <button id="next">Next</button>\
    </div>';
}

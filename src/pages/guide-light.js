import {GuideMoon} from './guide-moon.js';
import * as Utils from '../utils.js';

export class GuideLight {
    init = () => {
        const next = document.querySelector('#next');
        next.addEventListener('click', function() {
            Utils.goTo(new GuideMoon());
        });
    };

    element =
    '<div class="page">\
        <h1>Put reflect card under base.</h1>\
        <div class="guide-container">\
            <img src="images/light.jpg" class="light image" alt="Reflect card" />\
        </div>\
        <button id="next">Next</button>\
    </div>';
}

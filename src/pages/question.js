import {CheckParts} from './check-parts.js';
import {Song} from './song.js';
import * as Utils from '../utils.js';

export class Question {
    constructor() {
        this.element =
        '<div class="page">\
            <h1>Did you receive the 3D card?</h1>\
            <div class="answers">\
                <button class="button" id="yes">Yes</button>\
                <button class="button" id="no">No</button>\
            </div>\
        </div>';
    }

    init() {
        const yes = document.querySelector('#yes');
        yes.addEventListener('click', function() {
            Utils.goTo(new CheckParts());
        });
        const no = document.querySelector('#no');
        no.addEventListener('click', function() {
            Utils.goTo(new Song());
        });
    };
}

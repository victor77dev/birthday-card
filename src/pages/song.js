export class Song {
    constructor() {
        this.element =
        '<div class="page">\
            <button id="close" class="hidden">close</button>\
            <video id="video" width="100%" playsinline controls></video>\
        </div>';
    }

    init() {
        this.playVideo('happy-birthday-song-only');
    };

    playVideo(song) {
        const video = document.querySelector('#video');
        video.src = `songs/${song}.mp4`;
        video.play();
    }
}

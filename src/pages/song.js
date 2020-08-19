export class Song {
    init() {
        this.playVideo('birthday-song');
    };

    element =
    '<div class="page">\
        <button id="close" class="hidden">close</button>\
        <video id="video" width="100%" playsinline controls></video>\
    </div>';

    playVideo(song) {
        const video = document.querySelector('#video');
        video.src = `songs/${song}.mp4`;
        video.play();
    }
}

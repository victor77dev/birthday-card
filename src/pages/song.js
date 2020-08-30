export class Song {
    constructor(song='birthday-song-english') {
        this.element =
        '<div class="page">\
            <button id="close" class="hidden">close</button>\
            <video id="video" width="100%" playsinline controls></video>\
            <audio id="audio"></audio>\
        </div>';
        this.song = song;
    }

    init() {
        this.loadVideo('happy-birthday-video');
        this.loadAudio(this.song);
        this.playAudioVideo();
    };

    loadVideo(video) {
        this.video = document.querySelector('#video');
        this.video.src = `songs/${video}.mp4`;
    }

    loadAudio(song) {
        this.audio = document.querySelector('#audio');
        this.audio.src = `songs/${song}.mp3`;
    }

    playAudioVideo() {
        setTimeout(() => {
            this.audio.play();
        }, 1000);
        this.video.play();
    }
}

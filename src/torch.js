const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let tracks;
let torchOff = true;
let trackId = 0;

const isOff = () => torchOff;

const turnOff = (id) => {
    console.log('Turn Off')
    if (torchOff || !track) return;
    torchOff = true;
    tracks[id].stop();
}

const _turnOn = () => {
    console.log('Turn On')
    if (!SUPPORTS_MEDIA_DEVICES) {
        console.error('mediaDevices is not supported.');
        return null;
    }

    if (!torchOff) return;
    torchOff = false;

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {exact: 'environment'},
            height: {ideal: 720},
            width: {ideal: 1280},
        },
    }).then((stream) => {
        const debugVideo = document.querySelector('#camera');
        debugVideo.srcObject = stream;
        debugVideo.play();

        tracks[trackId] = stream.getVideoTracks()[0];

        const track = tracks[trackId];
        console.log('Constraints: ' + JSON.stringify(track.getConstraints()));
        console.log('Settings: ' + JSON.stringify(track.getSettings()));

        const imageCapture = new ImageCapture(track);
        imageCapture.getPhotoCapabilities().then(() => {
            track.applyConstraints({
                advanced: [{torch: true}]
            }).then(() => {
                console.log('start torch success')
            }).catch((error) => {
                console.log('applyConstraints error: ' + JSON.stringify(error.message))
                console.log('Constraints: ' + JSON.stringify(track.getConstraints()));
                console.log('Settings: ' + JSON.stringify(track.getSettings()));
            });
        });
    });

    return trackId++;
}

const turnOn = (duration) => {
    let trackId = null;
    setTimeout(() => {
        turnOff(trackId);
    }, duration);
    trackId = _turnOn();
    console.log(trackId)
}

const lightSeq = (times) => {
    for (let i = 0; i < times.length; i++) {
        const [start, duration] = times[i];
        setTimeout(() => {
            turnOn(duration * 1000);
        }, start * 1000)
    }
}

export const Torch = {
    isOff,
    lightSeq,
    turnOff,
    turnOn,
};

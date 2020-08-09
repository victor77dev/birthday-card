const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let tracks = {};
let trackId = 0;
window.tracks = tracks;

let torchOff = true;

const isOff = () => torchOff;

const turnOff = (id) => {
    console.log('Turn Off', id)
    const track = tracks[id];
    if (!track) return;
    torchOff = true;
    console.log(track)
    console.log(track.enabled, track.readyState)
    track.stop();
    console.log(track.enabled, track.readyState)
    setTimeout(() => {
        console.log('after 2s')
        console.log(track.enabled, track.readyState)
        // track.stop();
        // console.log(track.enabled, track.readyState)
    }, 2000);
}

const _turnOn = () => {
    console.log('Turn On', trackId)
    if (!SUPPORTS_MEDIA_DEVICES) {
        console.error('mediaDevices is not supported.');
        return null;
    }

    if (!torchOff) return Promise.reject('Torch is on');

    return navigator.mediaDevices.getUserMedia({
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
                torchOff = false;
                return Promise.resolve(trackId++);
            }).catch((error) => {
                console.log('applyConstraints error: ' + JSON.stringify(error.message))
                console.log('Constraints: ' + JSON.stringify(track.getConstraints()));
                console.log('Settings: ' + JSON.stringify(track.getSettings()));
                return Promise.reject(trackId++);
            });
        });
    });
}

const turnOn = (duration) => {
    _turnOn().then((id) => {
        console.log(id)
        setTimeout(() => {
            turnOff(id);
        }, duration);
    }).catch((error) => {
        console.log('_turnOn failed!', error)
    })
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

const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let tracks = {};
let trackId = 0;

let torchOff = true;

const isOff = () => torchOff;

const turnOff = (id) => {
    console.log('Turn Off', id, tracks)
    torchOff = true;
    const track = tracks[id];
    if (track) {
        track.stop();
        delete tracks[id];
        return;
    };

    for (let key in tracks) {
        tracks[key].stop();
        delete tracks[key];
    };
}

const _turnOn = () => {
    console.log('Turn On', trackId)
    if (!SUPPORTS_MEDIA_DEVICES) {
        return Promise.reject('mediaDevices is not supported.');
    }

    if (!torchOff) return Promise.reject('Torch is on!');

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
        window.track = track;
        console.log('Constraints: ' + JSON.stringify(track.getConstraints()));
        console.log('Capabitlities: ' + JSON.stringify(track.getCapabilities()));
        console.log('Settings: ' + JSON.stringify(track.getSettings()));

        const imageCapture = new ImageCapture(track);
        return imageCapture.getPhotoCapabilities().then(() => {
            return track.applyConstraints({
                advanced: [{torch: true}]
            }).then(() => {
                console.log('start torch success')
                torchOff = false;
                return Promise.resolve(trackId++);
            }).catch((error) => {
                console.log('applyConstraints error: ' + JSON.stringify(error.message))
                console.log('Constraints: ' + JSON.stringify(track.getConstraints()));
                console.log('Settings: ' + JSON.stringify(track.getSettings()));
                track.stop();
                return Promise.reject(trackId);
            });
        });
    });
}

const turnOn = (duration) => {
    const start = performance.now();
    _turnOn().then((id) => {
        const end = performance.now();
        console.log(`${id}: took ${end - start} to turn on`);
        if (duration) {
            setTimeout(() => {
                turnOff(id);
            }, duration);
        }
    }).catch((error) => {
        console.error(error)
    });
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

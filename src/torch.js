const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
let torchOff = true;

const isOff = () => torchOff;

const turnOn = () => {
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

        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track)
        imageCapture.getPhotoCapabilities().then(() => {
            track.applyConstraints({
                advanced: [{torch: true}]
            }).then(() => {
                console.log('start torch success')
            }).catch((error) => {
                console.log('applyConstraints error: ' + JSON.stringify(error.message))
            });
        });
    });
}


export const Torch = {
    isOff,
    turnOn,
};

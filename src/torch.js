const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

const turnOn = () => {
    console.log('Turn On')
    if (!SUPPORTS_MEDIA_DEVICES) {
        console.error('mediaDevices is not supported.');
        return null;
    }
    const {mediaDevices} = navigator;

    //Get the environment camera (usually the second one)
    mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter(
            (device) => device.kind === 'videoinput'
        );
        if (cameras.length === 0) {
            throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];

        mediaDevices.getUserMedia({
            video: {
                deviceId: camera.deviceId,
                facingMode: ['environment'],
                height: {ideal: 720},
                width: {ideal: 1280},
            }
        }).then((stream) => {
            const track = stream.getVideoTracks()[0];
            //Create image capture object and get camera capabilities
            const imageCapture = new ImageCapture(track)
            imageCapture.getPhotoCapabilities().then(() => {
                //todo: check if camera has a torch
                track.applyConstraints({
                    advanced: [{torch: true}]
                }).then(() => {
                    console.log('start torch success')
                }).catch((error) => {
                    console.log('applyConstraints error: ' + JSON.stringify(error.message))
                });
            });
        });
    });
}

export const Torch = {
    turnOn,
};

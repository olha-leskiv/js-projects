const video = document.getElementById('video');
const button = document.getElementById('button');

async function setUpMediaStream() {
    try {
        let mediaStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStream;
        video.addEventListener('loadedmetadata', () => 
        video.play())
    } catch (error) {
        console.log(error)
    }
}

async function showPopedVideo(){
    button.disabled = true;
    await video.requestPictureInPicture();
    button.disabled = false;
}

button.addEventListener('click', showPopedVideo);


setUpMediaStream()
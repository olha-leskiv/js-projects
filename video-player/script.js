const video = document.querySelector('video');
const videoContainer = document.querySelector('.video-container');
const playBtn = document.getElementById('play');
const expandBtn = document.getElementById('expand');
const currentTimeEl = document.getElementById('current-time');
const progressline = document.getElementById('progressline');
const timeline = document.getElementById('timeline');
const duration = document.getElementById('duration');
const volumeRange = document.getElementById('volume-range');
const volumeContainer = document.getElementById('volume-container');
const volumeIcon = document.getElementById('volume-icon');
// const volumeToggle = document.getElementById('volume-toggle');
// const volumelineContainer = document.getElementById('volumeline-container');
// const volumeline = document.getElementById('volumeline');

// volumeline.style.width = video.volume * 100 + "%";

function updateVolumeRange() {
    volumeRange.value = video.volume * 100;
}

function videoIsPlaying() {
    return !video.paused
}

function playVideo() {
    video.play()
    changePlayIcon()
}

function pauseVideo() {
    video.pause()
    changePlayIcon()
}

function changePlayIcon() {
    if(videoIsPlaying()) {
        playBtn.classList.replace('fa-play', 'fa-pause');     
    } else {
        playBtn.classList.replace('fa-pause', 'fa-play');
    }
}

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
      }
}

function updateProgress() {
    updateTime();
    updateProgressline();
}

function updateTime() {
    currentTimeEl.textContent = formateTime(video.currentTime);
}

function updateProgressline() {
    progressline.style.width = (video.currentTime * timeline.offsetWidth / video.duration) + 'px';
}

function setDuration() {
    duration.textContent = formateTime(video.duration)
}

function formateTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`
}

function toggleMute() {
    if(video.muted) {
        video.muted = false;
        updateVolumeRange()
    } else {
        video.muted = true;
        volumeRange.value = 0;
    }
    changeVolumeIcon();
}

function changeVolumeIcon() {
    let volume = video.volume;
    console.log(volumeRange.value, video.volume)

    if(volume > 0.5) {
        volumeIcon.className = 'fa-solid fa-volume-high volume';
    } else if (0.5 > volume && volume > 0) {
        volumeIcon.className = 'fa-solid fa-volume-low volume';
    } else if (video.muted) {
        console.log(video.muted)
        volumeIcon.className = 'fa-solid fa-volume-mute volume';
    }
}

function changeVolume(e) {

    // let offsetX = e.clientX - volumelineContainer.getBoundingClientRect().left;
    // let containerWidth = volumelineContainer.offsetWidth;

    // if(offsetX < 0) {
    //     offsetX = 0;
    // }
    // if(offsetX > containerWidth) {
    //     offsetX = containerWidth;
    // }


    // volumeline.style.width = offsetX + "px";
    // volumeToggle.style.left = offsetX + "px";
    video.volume = e.target.value / 100;
}

// function changeVolume(e) {
//     console.log(e)
//     let offsetX = e.clientX - volumelineContainer.getBoundingClientRect().left;
//     let containerWidth = volumelineContainer.offsetWidth;

//     if(offsetX < 0) {
//         offsetX = 0;
//     }
//     if(offsetX > containerWidth) {
//         offsetX = containerWidth;
//     }

//     let volume = offsetX / containerWidth;

//     volumeline.style.width = offsetX + "px";
//     volumeToggle.style.left = offsetX + "px";
//     video.volume = volume;
// }

// function setVolumeToggle() {
//     let offsetX = video.volume * volumelineContainer.offsetWidth;
//     volumeline.style.width = offsetX + "px";
//     volumeToggle.style.left = offsetX + "px";
// }

playBtn.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());
expandBtn.addEventListener('click', openFullscreen);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadeddata', setDuration);
video.addEventListener('ended', pauseVideo);
volumeRange.addEventListener('input', changeVolumeIcon);
// video.addEventListener('loadeddata', setVolumeToggle)

volumeIcon.addEventListener('click', toggleMute);
volumeRange.addEventListener('input', changeVolume);
// volumelineContainer.addEventListener('change', changeVolume);

// volumeToggle.addEventListener('drag', changeVolume)

updateVolumeRange();

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

    if(volume > 0.5 && !video.muted) {
        volumeIcon.className = 'fa-solid fa-volume-high volume';
    } else if (0.5 > volume && volume > 0.05 && !video.muted) {
        volumeIcon.className = 'fa-solid fa-volume-low volume';
    } else if (volume < 0.05 || video.muted) {
        volumeIcon.className = 'fa-solid fa-volume-mute volume';
    }
}

function changeVolume(e) {
    video.volume = e.target.value / 100;
    if (video.volume < 0.05) {
        video.muted = true;
    } else {
        video.muted = false;
    }
}

function updateVolumeRange() {
    volumeRange.value = video.volume * 100;
    if(video.volume < 0.05) {
        video.volume = 0.5;
    }
}

playBtn.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());
expandBtn.addEventListener('click', openFullscreen);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadeddata', setDuration);
video.addEventListener('ended', pauseVideo);
volumeRange.addEventListener('input', changeVolumeIcon);

volumeIcon.addEventListener('click', toggleMute);
volumeRange.addEventListener('input', changeVolume);


updateVolumeRange();

const video = document.querySelector('video');
const videoContainer = document.querySelector('.video-container');
const playBtn = document.getElementById('play');
const expandBtn = document.getElementById('expand');
const currentTimeEl = document.getElementById('current-time');
const progressline = document.getElementById('progressline');
const timeline = document.getElementById('timeline-container');
const duration = document.getElementById('duration');
const volumeRange = document.getElementById('volume-range');
const volumeContainer = document.getElementById('volume-container');
const volumeIcon = document.getElementById('volume-icon');
const speedDropdown = document.getElementById('speed-dropdown');
const speedControl = document.getElementById('speed-control');
const hoverInfo = document.getElementById('hover-info');

speedDropdown.hidden = true;

let volume = video.volume;
let range = video.volume * 100;
let mouseOnVideo = Boolean;

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
    duration.textContent = formateTime(video.duration);
}

function formateTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`
}

function changeVolume() {
    range = volumeRange.value;
    volume = range / 100;
    
    if (volume < 0.02) {
        mute();
        volume = 0.5;
    } else {
        unmute();
    }
    updateVideoVolume();
}

function toggleMute() {
    if(!video.muted) {
        mute();
    } else {
        unmute();
    }
    updateVolumeRange();
}

function unmute() {
    video.muted = false;
    range = volume * 100;

    if (volume > 0.4) {
        volumeIcon.className = "fa-solid fa-volume-high volume";
    } else {
        volumeIcon.className = "fa-solid fa-volume-low volume";
    }
    volumeIcon.setAttribute('title', 'Mute');
}

function mute() {
    video.muted = true;
    range = 0;

    volumeIcon.className = "fa-solid fa-volume-mute volume";
    volumeIcon.setAttribute('title', 'Unmute');
}

function updateVolumeRange() {
    volumeRange.value = range;
}

function updateVideoVolume() {
    video.volume = volume;
}

function showSpeedDropdown() {
    speedDropdown.hidden = false;
    speedControl.lastElementChild.classList.replace('fa-chevron-down', 'fa-chevron-up');
}

function hideSpeedDropdown() {
    speedDropdown.hidden = true;
    speedControl.lastElementChild.classList.replace('fa-chevron-up','fa-chevron-down');
}

function selectSpeed(e) {
    if(!e.target.closest('.speed-dropdown p')) {
        speedDropdown.hidden = true;
        return   
    }

    let item = e.target;
    let speed = item.textContent.slice(0,-1);
    speedControl.firstElementChild.textContent = speed + 'x';

    for(let child of speedDropdown.children) {
        child.classList.remove('selected');
    }
    item.classList.add('selected');

    video.playbackRate = speed;
    hideSpeedDropdown()
}

function setControlsVisibility(event) {
    let hoverVideo = event.target.closest('.video-container');

    if(hoverVideo) {
        hoverInfo.hidden = false;
    } else {
        hoverInfo.hidden = true;
    }
}

function setNewTime(event) {
    let clickedX = event.offsetX;
    progressline.style.width = clickedX + 'px';
}


playBtn.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());
expandBtn.addEventListener('click', openFullscreen);

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', setDuration);
video.addEventListener('ended', pauseVideo);
video.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());

window.addEventListener('mouseover', setControlsVisibility)

volumeRange.addEventListener('input', changeVolume);
volumeIcon.addEventListener('click', toggleMute)
speedControl.addEventListener('click', () => speedDropdown.hidden ? showSpeedDropdown() : hideSpeedDropdown());
window.addEventListener('click', selectSpeed);

timeline.addEventListener('click', setNewTime);

updateVolumeRange();
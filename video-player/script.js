const video = document.querySelector('video');
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
const previewTime = document.getElementById('preview-time')
const hoveredTime = document.getElementById('hovered-time')
const canvasEl = document.getElementById('canvas');
const preview = document.getElementById('preview');
const fakeVideo = document.querySelector('.fake-video');


let volume = video.volume;
let range = video.volume * 100;


playBtn.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());
video.addEventListener('click', () => videoIsPlaying() ? pauseVideo() : playVideo());
video.addEventListener('ended', pauseVideo);

function videoIsPlaying() {
    return !video.paused
}

function playVideo() {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');     
}

function pauseVideo() {
    video.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
}


expandBtn.addEventListener('click', openFullscreen);

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
      }
}


video.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    updateCurrentTime();
    updateProgressline();
}

function updateCurrentTime() {
    currentTimeEl.textContent = formateTime(video.currentTime);
}

function updateProgressline() {
    progressline.style.width = (video.currentTime * timeline.offsetWidth / video.duration) + 'px';
}

function formateTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`
}


video.addEventListener('canplay', setDuration);

function setDuration() {
    duration.textContent = formateTime(video.duration);
}


volumeRange.addEventListener('input', changeVolume);

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


volumeIcon.addEventListener('click', toggleMute)

function toggleMute() {
    if(video.muted) {
        unmute();
    } else {
        mute();
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


speedControl.addEventListener('click', () => speedDropdown.hidden ? showSpeedDropdown() : hideSpeedDropdown());

function showSpeedDropdown() {
    speedDropdown.hidden = false;
    speedControl.lastElementChild.classList.replace('fa-chevron-down', 'fa-chevron-up');
}

function hideSpeedDropdown() {
    speedDropdown.hidden = true;
    speedControl.lastElementChild.classList.replace('fa-chevron-up','fa-chevron-down');
}


window.addEventListener('click', selectSpeed);

function selectSpeed(e) {
    if(e.target.closest('.speed-container')) {
        return   
    }
    if(!e.target.closest('.speed-dropdown')) { 
        speedDropdown.hidden = true;
        return   
    }
    
    let item = e.target.closest('.speed-dropdown p');
    let speed = item.textContent.slice(0,-1);
    
    video.playbackRate = speed;
    speedControl.firstElementChild.textContent = speed + 'x';

    for(let child of speedDropdown.children) {
        child.classList.remove('selected');
    }
    item.classList.add('selected');

    hideSpeedDropdown()
}


window.addEventListener('mouseover', setControlsVisibility);

function setControlsVisibility(event) {
    let hoverVideo = event.target.closest('.video-container');
    hoverVideo ? showControls() : hideControls();
}

function showControls() {
    hoverInfo.hidden = false;
}

function hideControls() {
    hoverInfo.hidden = true;
}


timeline.addEventListener('click', setNewTime);

function setNewTime(event) {
    let clickedX = event.offsetX;
    let newTime = clickedX * video.duration / timeline.offsetWidth;
    progressline.style.width = clickedX + 'px';
    video.currentTime = newTime;
    updateCurrentTime();
}


window.addEventListener('mousemove', showThumbnail);

function showThumbnail(e) {
    if(!e.target.closest('.timeline-container')) {
        preview.hidden = true;
        hoveredTime.hidden = true;
        return
    }
    preview.hidden = false;
    hoveredTime.hidden = false;

    let hoveredX = e.offsetX;
    let newTime = hoveredX * video.duration / timeline.offsetWidth;

    hoveredTime.style.left = hoveredX + 'px';
    canvasEl.closest('.preview-container').style.left = hoveredX + 'px';
    fakeVideo.currentTime = newTime;
    previewTime.textContent = formateTime(newTime);
}

requestAnimationFrame(updateCanvas);

function updateCanvas() {
    let context = canvasEl.getContext('2d');
    context.drawImage(fakeVideo, 0, 0, canvasEl.width, canvasEl.height);
    window.requestAnimationFrame(updateCanvas);
}


updateVolumeRange();










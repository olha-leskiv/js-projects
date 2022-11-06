const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const cover = document.querySelector('.img-container img');
const artist = document.getElementById('artist');
const name = document.getElementById('name');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const audio = document.querySelector('audio');

let isPlaying = false;
let index = 0;

function formateTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`
}

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.setAttribute('src', `img/${song.name}.jpg`);
    audio.src = `music/${song.name}.mp3`; 
}

function updateProgressBar() {
    currentTime.textContent = formateTime(audio.currentTime);
    let progressPercent = 100 * (audio.currentTime / audio.duration);
    progress.style.width = progressPercent + '%';
}

function setDuration() {
    duration.textContent = formateTime(audio.duration);
}

function playSong() {
    audio.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaying = true;
}

function pauseSong() {
    audio.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    isPlaying = false;
}

function playPrevSong() {
    index == 0 ? index = songs.length - 1 : index--;
    loadSong(songs[index]);
    playSong();
}

function playNextSong() {
    index == songs.length - 1 ? index = 0 : index++;
    loadSong(songs[index]);
    playSong();
}

function playFromPoint(event) {
    let progressWidth = progressContainer.clientWidth;
    let clickX = event.offsetX;
    let newTime = clickX * audio.duration / progressWidth;
    audio.currentTime = newTime;
}

loadSong(songs[index]);

playBtn.addEventListener('click', function() {isPlaying ? pauseSong() : playSong()});
progressContainer.addEventListener('click', playFromPoint);
audio.addEventListener('loadeddata', setDuration);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', playNextSong);
prevBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);

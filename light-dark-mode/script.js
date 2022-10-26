let themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
let themeSwitchIcon = document.querySelector('#toggle-icon i');
let themeSwitchText = document.querySelector('.toggle-text');
let nav = document.getElementById('nav');
let textbox = document.getElementById('text-box');
let image1 =  document.getElementById('image1');
let image2 =  document.getElementById('image2');
let image3 =  document.getElementById('image3');
let mode = 'light';

// Local Storage Update
function updateLocalStorage() {
    localStorage.setItem('theme', mode);
}

// Modes Description
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function lightMode() {
    mode = 'light';
    document.body.removeAttribute('data-theme');
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'
    textbox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
    themeSwitchIcon.classList.replace('fa-moon','fa-sun');
    themeSwitchText.textContent = "Light Mode";
    imageMode(mode);
}

function darkMode() {
    mode = 'dark';
    document.body.setAttribute('data-theme', "dark");
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textbox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    themeSwitchIcon.classList.replace('fa-sun','fa-moon');
    themeSwitchText.textContent = "Dark Mode";
    imageMode(mode);
}

// Change Theme Function
function setTheme() {
    if(mode === 'dark') {

        lightMode();
    } else {
        darkMode();
    }
    updateLocalStorage()
}

// First Load Theme Check
function initThemeCheck() {
    if(localStorage.getItem('theme') === 'dark') {
        themeSwitch.checked = true;
        darkMode();
    } else {
        themeSwitch.checked = false;
        lightMode();
    }
    updateLocalStorage();
}

// On Load
document.addEventListener('DOMContentLoaded', initThemeCheck)

// Event Listener
themeSwitch.addEventListener('change', setTheme)




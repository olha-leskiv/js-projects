const countdownForm = document.getElementById('countdown-form');
const inputContainer = document.getElementById('input-container');
const datePicker = document.getElementById('date-picker');


const countdownTitle = document.getElementById('countdown-title');
const resetBtn = document.getElementById('countdown-button');
const countdown = document.getElementById('countdown');
const countdownElements = document.querySelectorAll('.countdown span')
const completeContainer = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');

let newCoundownInterval;
let titleValue;
let timeValue;
let today = new Date().toISOString().slice(0, 10);

let second = 1000;
let minute = 60 * second;
let hour = 60 * minute;
let day = 24 * hour;
let savedCountdown = {
    title: titleValue,
    time: timeValue
}

datePicker.setAttribute('min', today)

function submitForm(event) {
    clearValidation()
    titleValue = countdownForm.elements[0].value + " in";
    timeValue = countdownForm.elements[1].value;
    if(titleValue && timeValue) {
        savedCountdown = {
            title: titleValue,
            time: timeValue
        }
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));
        newCoundownInterval = setInterval(setCountdown, 1000);
    } else {
        showValidation() 
    }
    event.preventDefault();
}

function showValidation() {
    if(!titleValue) {
        countdownForm.elements[0].classList.add('input-error');
        document.querySelectorAll('#countdown-form p')[0].hidden = false;
    }
    if(!timeValue) {
        countdownForm.elements[1].classList.add('input-error');
        document.querySelectorAll('#countdown-form p')[1].hidden = false;
    }
    for(i = 0; i < countdownForm.elements.length; i++) {
        if(!countdownForm.elements[i].value) {
            countdownForm.elements[i].focus();
            break;
        }
    }  
}

function clearValidation() {
    countdownForm.elements[0].classList.remove('input-error');
    countdownForm.elements[1].classList.remove('input-error');
    document.querySelectorAll('#countdown-form p')[0].hidden = true;
    document.querySelectorAll('#countdown-form p')[1].hidden = true;
}

function setCountdown() {
    countdownTitle.textContent = titleValue;
    inputContainer.hidden = true;
    countdown.hidden = false;
    let future = Date.parse(timeValue);
    let now = Date.parse(new Date());
    let difference = future - now;
    if(difference < 0) {
        showComplete()
    } else {
        updateCoundown(difference)
    }
}

function updateCoundown(difference) {
    let days = Math.trunc(difference / day); 
    let hours = Math.trunc((difference % day) / hour);
    let minutes =  Math.trunc((difference % hour) / minute);
    let seconds =  Math.trunc((difference % minute) / second);
    countdownElements[0].textContent = days;
    countdownElements[1].textContent = hours;
    countdownElements[2].textContent = minutes;
    countdownElements[3].textContent = seconds;
}

function showComplete() {
    clearInterval(newCoundownInterval);
    countdown.hidden = true;
    completeContainer.hidden = false;
    completeContainer.children[1].textContent = `Countdown Finished on ${timeValue}`;
}

function resetForm() {
    clearInterval(newCoundownInterval);
    inputContainer.hidden = false;
    completeContainer.hidden = true;
    countdown.hidden = true;
    titleValue = '';
    timeValue = '';
    countdownForm.elements[0].value = titleValue;
    countdownForm.elements[1].value = timeValue;
    localStorage.removeItem('countdown');
}

window.addEventListener('load', initLocalStorage) 

function initLocalStorage() {
    console.log('worked')
    if(localStorage.getItem('countdown')) {
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        timeValue = savedCountdown.time;
        titleValue = savedCountdown.title;
        console.log(timeValue, titleValue)
        newCoundownInterval = setInterval(setCountdown, 1000);
    } else {
        inputContainer.hidden = false;
    }
}

countdownForm.addEventListener('submit', submitForm);
resetBtn.addEventListener('click', resetForm);
completeBtn.addEventListener('click', resetForm);


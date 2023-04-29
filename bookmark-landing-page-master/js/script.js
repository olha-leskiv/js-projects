const tabs = document.querySelectorAll('.tab');
const tabNames = document.querySelector('.tab-names').children;

function displayTab(event, tabTitle) {
    for(let tabName of tabNames) {
        tabName.classList.remove('active');
        if(tabName == event.currentTarget) {
            tabName.classList.add('active');
        }
    }

    for(let tab of tabs) {
        tab.classList.remove('active');
        if(tab.title === tabTitle) {
            tab.classList.add('active');
        }
    }
}

const FAQAccordion = document.querySelector('.accordion');
const list = FAQAccordion.querySelectorAll('li');
FAQAccordion.onclick = (event) => {
    let clickedItem = event.target.closest('li');
    for(let item of list) {
    let panel = item.querySelector('.panel');
        if(item == clickedItem) {
            clickedItem.classList.toggle('active');
            panel.style.height = parseInt(panel.style.height) ? 0 : (panel.scrollHeight + 50) + "px";
        } else {
            item.classList.remove('active');
            panel.style.height = 0;
        }
    }
}

let inputWrapper = document.querySelector('.form-group');

function showErrorMessage(event) {
    event.preventDefault();
    event.target.classList.add('invalid');
    inputWrapper.classList.add('error');
}

function clearErrorMassage(event) {
    event.target.classList.remove('invalid');
    inputWrapper.classList.remove('error');
}

const form = document.forms[0];
form.onsubmit = (event) => {
    formIsValid = form.checkValidity();
    if(formIsValid) {
        clearErrorMassage();
    } else {
        showErrorMessage();
    }
    event.preventDefault();
}





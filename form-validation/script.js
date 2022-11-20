const form = document.forms.form;
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
const password1Elem = form.elements.password1;
const password2Elem = form.elements.password2;
const visbilityIcons = document.querySelectorAll('.visibility-icon');
const inputs = document.querySelectorAll('input');

let formIsValid = false;
let passwordsMatch = false;

new InputMask().Initialize(document.querySelectorAll("#phone"),{
    mask: InputMaskDefaultMask.Phone, 
    placeHolder: "(555) 555-5555" 
  });

function processFormData(event) {
    event.preventDefault();
    
    validateForm();
    if(formIsValid && passwordsMatch) {
        storeFormData();
        updateMessage('Ha-ha! Got you. </br> Now we know everything about you &#128520 </br> Just loot at the console', 'valid')
    }
}

function validateForm() {
    formIsValid = form.checkValidity();
    
    if(!formIsValid) {
        updateMessage('Please fill out all inputs', 'invalid');
        return
    }

    if(password1Elem.value !== password2Elem.value) {
        passwordsMatch = false;
        updateMessage('Passwords must match', 'invalid');
        return
    } else {
        passwordsMatch = true;
    }
}

function updateMessage(text, color) {
    message.innerHTML = text;
    messageContainer.style.color = `var(--${color})`;
    messageContainer.style.borderColor = `var(--${color})`;
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password1.value
    }

    console.log(user)
}

function toggleVisibility(event) {
    const icon = event.target;
    const input = icon.previousElementSibling;

    if(input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// function showTooltip(event) {
//     let tooltip = document.createElement('div');
//     let message = event.target.getAttribute('title');
//     tooltip.innerHTML = `<p>${message}</p>`;
//     tooltip.className = 'tooltip';
//     event.target.closest('.form-group').prepend(tooltip);
// }

form.addEventListener('submit', processFormData);

for(let icon of visbilityIcons) {
    icon.addEventListener('click', toggleVisibility);
}

// for(let input of inputs) {
//     input.addEventListener('invalid', showTooltip);
// }


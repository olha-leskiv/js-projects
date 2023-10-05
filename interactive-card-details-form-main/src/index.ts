const cardNumberInput = document.getElementById("cardNumberInput") as HTMLInputElement;
const cardExpMonthInput = document.getElementById("cardExpMonthInput") as HTMLInputElement;
const cardExpYearInput = document.getElementById("cardExpYearInput") as HTMLInputElement;
const cardCVCInput = document.getElementById("cardCVCInput") as HTMLInputElement;
const cardNameInput = document.getElementById("cardNameInput") as HTMLInputElement;
const form = document.forms[0] as HTMLFormElement;

const cardNumber = document.getElementById("cardNumber") as HTMLParagraphElement;
const cardName = document.getElementById("cardName") as HTMLParagraphElement;
const cardExpMonth = document.getElementById("cardExpMonth") as HTMLParagraphElement;
const cardExpYear = document.getElementById("cardExpYear") as HTMLParagraphElement;
const cardCVC = document.getElementById("cardCVC") as HTMLParagraphElement;

const inputs = document.querySelectorAll("input");

const resetBtn = document.getElementById("resetBtn") as HTMLInputElement;
const thankYouSection = document.getElementById("thankYouSection") as HTMLInputElement;

let cardNumberMask = {mask: '0000 0000 0000 0000'};
let mask1 = IMask(cardNumberInput, cardNumberMask);

let cardExpMomthMask = {mask: '00'};
let mask2 = IMask(cardExpMonthInput, cardExpMomthMask);

let cardExpYearMask = {mask: '00'};
let mask3 = IMask(cardExpYearInput, cardExpYearMask);

let cardCVCMask = {mask: '000'};
let mask4 = IMask(cardCVCInput, cardCVCMask);

cardExpMonthInput.addEventListener("input", () => { 
    if(Number(cardExpMonthInput.value) > 12) {
        cardExpMonthInput.value = "12";
    }
})

cardNameInput.oninput = (event : any) => {
    let output: string;
    if(!cardNameInput.value) {
        output = 'JANE APPLESEED';
    } else {
        output = cardNameInput.value;
    }
    cardName.textContent = output
}

cardNumberInput.oninput = () => {
    let output: string;
    if(!cardNumberInput.value) {
        output = '0000 0000 0000 0000';
    } else {
        output = cardNumberInput.value;
    }
    cardNumber.textContent = output
}

cardExpMonthInput.oninput = (event : any) => {

    let newMonth = cardExpMonthInput.value;
    if(Number(newMonth) < 10  && newMonth.length < 2) {
        newMonth = "0" + newMonth
    }
    if(!cardExpMonthInput.value) {
        newMonth = "00";
    }

    cardExpMonth.textContent = newMonth;
};

cardExpYearInput.oninput = (event) => {

    let newYear = cardExpYearInput.value;
    if(Number(newYear) < 10 && newYear.length < 2) {
        newYear = "0" + newYear

    }
    if(!cardExpYearInput.value) {
        newYear = "00";
    }

    cardExpYear.textContent = newYear;
};

cardCVCInput.oninput = (event) => {

    let newCVC = cardCVCInput.value;
    if(newCVC.length == 0) {
        newCVC = "000";
    }
    cardCVC.textContent = newCVC;
};



form.onsubmit = (e) => {
    e.preventDefault();

    if(validate()) {
        changeScreens();
    }
}

function showError(input : HTMLInputElement, errorText : string) {
    input.classList.add("invalid");
    const errorMessage = document.createElement("div");
    errorMessage.textContent = errorText;
    errorMessage.classList.add("errorMessage")
    if(input.classList.contains("common")) {
        if(input.parentElement?.parentElement?.querySelector(".errorMessage")) return;
        input.parentElement?.after(errorMessage);
    } else {
        input.after(errorMessage);
    }
}

function validate() : boolean {
    let result = true;

    const errors = document.querySelectorAll(".errorMessage");
    for(let error of errors) {
        error.remove();
    }

    for(let input of inputs) {
        input.classList.remove("invalid")

        if(!input.checkValidity()) {
            if(!input.value) {
                showError(input, "Can’t be blank");
                result = false;
            }
        }
    }

    if(cardNumberInput.value.length < 16 && cardNumberInput.value) {
        showError(cardNumberInput, "Enter full card number");
        result = false;
    }

    if(cardCVCInput.value.length < 3 && cardCVCInput.value) {
        showError(cardCVCInput, "Enter full CVC");
        result = false;
    }

    return result;
}

resetBtn.onclick = () => {
    changeScreens();
    clearInputs();
};

function changeScreens() {
    thankYouSection.classList.toggle("hidden");
    form.classList.toggle("hidden");
}

function clearInputs() {
    cardNameInput.value = "";
    cardName.textContent = 'JANE APPLESEED';
    cardNumberInput.value = "";
    cardNumber.textContent = '0000 0000 0000 0000';
    cardExpMonthInput.value = "";
    cardExpMonth.textContent = "00";
    cardExpYearInput.value = "";
    cardExpYear.textContent = "00";
    cardCVCInput.value = "";
    cardCVC.textContent = "000";
}
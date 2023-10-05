"use strict";
const cardNumberInput = document.getElementById("cardNumberInput");
const cardExpMonthInput = document.getElementById("cardExpMonthInput");
const cardExpYearInput = document.getElementById("cardExpYearInput");
const cardCVCInput = document.getElementById("cardCVCInput");
const cardNameInput = document.getElementById("cardNameInput");
const form = document.forms[0];
const cardNumber = document.getElementById("cardNumber");
const cardName = document.getElementById("cardName");
const cardExpMonth = document.getElementById("cardExpMonth");
const cardExpYear = document.getElementById("cardExpYear");
const cardCVC = document.getElementById("cardCVC");
const inputs = document.querySelectorAll("input");
const resetBtn = document.getElementById("resetBtn");
const thankYouSection = document.getElementById("thankYouSection");
let cardNumberMask = { mask: '0000 0000 0000 0000' };
let mask1 = IMask(cardNumberInput, cardNumberMask);
let cardExpMomthMask = { mask: '00' };
let mask2 = IMask(cardExpMonthInput, cardExpMomthMask);
let cardExpYearMask = { mask: '00' };
let mask3 = IMask(cardExpYearInput, cardExpYearMask);
let cardCVCMask = { mask: '000' };
let mask4 = IMask(cardCVCInput, cardCVCMask);
cardExpMonthInput.addEventListener("input", () => {
    if (Number(cardExpMonthInput.value) > 12) {
        cardExpMonthInput.value = "12";
    }
});
cardNameInput.oninput = (event) => {
    let output;
    if (!cardNameInput.value) {
        output = 'JANE APPLESEED';
    }
    else {
        output = cardNameInput.value;
    }
    cardName.textContent = output;
};
cardNumberInput.oninput = () => {
    let output;
    if (!cardNumberInput.value) {
        output = '0000 0000 0000 0000';
    }
    else {
        output = cardNumberInput.value;
    }
    cardNumber.textContent = output;
};
cardExpMonthInput.oninput = (event) => {
    let newMonth = cardExpMonthInput.value;
    if (Number(newMonth) < 10 && newMonth.length < 2) {
        newMonth = "0" + newMonth;
    }
    if (!cardExpMonthInput.value) {
        newMonth = "00";
    }
    cardExpMonth.textContent = newMonth;
};
cardExpYearInput.oninput = (event) => {
    let newYear = cardExpYearInput.value;
    if (Number(newYear) < 10 && newYear.length < 2) {
        newYear = "0" + newYear;
    }
    if (!cardExpYearInput.value) {
        newYear = "00";
    }
    cardExpYear.textContent = newYear;
};
cardCVCInput.oninput = (event) => {
    let newCVC = cardCVCInput.value;
    if (newCVC.length == 0) {
        newCVC = "000";
    }
    cardCVC.textContent = newCVC;
};
form.onsubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        changeScreens();
    }
};
function showError(input, errorText) {
    var _a, _b, _c;
    input.classList.add("invalid");
    const errorMessage = document.createElement("div");
    errorMessage.textContent = errorText;
    errorMessage.classList.add("errorMessage");
    if (input.classList.contains("common")) {
        if ((_b = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector(".errorMessage"))
            return;
        (_c = input.parentElement) === null || _c === void 0 ? void 0 : _c.after(errorMessage);
    }
    else {
        input.after(errorMessage);
    }
}
function validate() {
    let result = true;
    const errors = document.querySelectorAll(".errorMessage");
    for (let error of errors) {
        error.remove();
    }
    for (let input of inputs) {
        input.classList.remove("invalid");
        if (!input.checkValidity()) {
            if (!input.value) {
                showError(input, "Can’t be blank");
                result = false;
            }
        }
    }
    if (cardNumberInput.value.length < 16 && cardNumberInput.value) {
        showError(cardNumberInput, "Enter full card number");
        result = false;
    }
    if (cardCVCInput.value.length < 3 && cardCVCInput.value) {
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
//# sourceMappingURL=index.js.map
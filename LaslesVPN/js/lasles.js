const cards = document.querySelector('.customer_stack');
const card = document.querySelector('.customer_card');
const cardsWidth = cards.offsetWidth;

const testimonialLeftBtn = document.getElementById('testimonial-left');
const testimonialRightBtn = document.getElementById('testimonial-right');

testimonialLeftBtn.addEventListener('click', shiftTestimonialsLeft);
testimonialRightBtn.addEventListener('click', shiftTestimonialsRight);

function shiftTestimonialsRight() {
    if(cards.style.marginLeft >= cardsWidth) {
        return
    }

    let shift;
    if(!cards.style.marginLeft) {
        shift = -card.offsetWidth - 50;
    } else {
        shift = parseInt(cards.style.marginLeft) - card.offsetWidth - 50;
    }
    cards.style.marginLeft = shift + `px`;

    // cards.scroll(shift + `px`, 0)
}

function shiftTestimonialsLeft() {
    if(!cards.style.marginLeft) {
        return
    }
    let shift;
    if(!cards.style.marginLeft) {
        shift = card.offsetWidth + 50;
    } else {
        shift = parseInt(cards.style.marginLeft) + card.offsetWidth + 50;
    }
    cards.style.marginLeft = shift + `px`;
}
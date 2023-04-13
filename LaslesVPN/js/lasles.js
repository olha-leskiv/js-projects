const cards = document.querySelector('.customer_stack').children;
const card = document.querySelector('.customer_card');
const cardsWidth = cards.offsetWidth;
const gap = 50
const dots = document.querySelector('.customer_dots').children;

let activeCard = 1;

const testimonialLeftBtn = document.getElementById('testimonial-left');
const testimonialRightBtn = document.getElementById('testimonial-right');

testimonialLeftBtn.addEventListener('click', shiftTestimonialsLeft);
testimonialRightBtn.addEventListener('click', shiftTestimonialsRight);

function shiftTestimonialsRight() {
    if(activeCard >= cards.length) {
        return
    }
    activeCard++;
    translateCards();
}

function shiftTestimonialsLeft() {
    if(activeCard == 1) return
    activeCard--;
    translateCards();
}

function translateCards(cardNumber) {
    if(cardNumber) {
        activeCard = cardNumber;
    }
    for(let i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translateX(-${(card.offsetWidth + gap) * (activeCard - 1)}px)`
        cards[i].classList.remove('card-active');
        if(i === activeCard - 1) {
            cards[i].classList.add('card-active');
        }
    }
    for(let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('dot-active');
        if(i === activeCard - 1) {
            dots[i].classList.add('dot-active');
        }
    }
}

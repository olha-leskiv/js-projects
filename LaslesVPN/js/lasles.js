const cards = document.querySelector('.customer_stack').children;
let customersStuck =  document.querySelector('.customer_stack');
const dots = document.querySelector('.customer_dots').children;
const networkDots = document.querySelectorAll('.network-dot');
const networkSection =document.getElementById('network');
const customerSection =document.getElementById('testimonials');
const networkPosition = networkSection.getBoundingClientRect();
const customersPosition = customerSection.getBoundingClientRect();
const cardGap = 50

let activeCard = 1;

const testimonialRightBtn = document.getElementById('testimonial-right');
testimonialRightBtn.addEventListener('click', shiftTestimonialsRight);

function shiftTestimonialsRight() {
    if(activeCard >= cards.length) return;
    activeCard++;
    updateCustomerSection();
}

const testimonialLeftBtn = document.getElementById('testimonial-left');
testimonialLeftBtn.addEventListener('click', shiftTestimonialsLeft);

function shiftTestimonialsLeft() {
    if(activeCard == 1) return
    activeCard--;
    updateCustomerSection();
}

function updateCustomerSection(cardNumber) {
    if(cardNumber) activeCard = cardNumber;
    let shiftWidth = (cards[0].offsetWidth + cardGap) * (activeCard - 1);

    for(let i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translateX(-${shiftWidth}px)`
        cards[i].classList.remove('card-active');
        if(i === activeCard - 1) cards[i].classList.add('card-active');
    }

    for(let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('dot-active');
        if(i === activeCard - 1) dots[i].classList.add('dot-active');
    }
}

function sizeCSS(cssName, leftPX, topPX, sizePX) {
    let left = (leftPX * 100 / 1060).toFixed(2);
    let top = (topPX * 100 / 537).toFixed(2);
    return (
        console.log(`
            .${cssName} {
                left: ${left}%;
                top: ${top}%;
                max-width: ${sizePX}px;
            }
        `)
    )
}

window.addEventListener('scroll', makeDotsAppear);

function makeDotsAppear() {
    if(networkSection.offsetTop - networkSection.clientHeight/2  < window.scrollY) {
        for(let dot of networkDots) {
            let delay = Math.floor(((Math.random() * networkDots.length * 50)))
            dot.style.transitionDelay = delay + 'ms';
            setTimeout(() => {dot.style = ''}, delay)

            dot.classList.add('visible');
        }
	}

    if(customerSection.offsetTop - customerSection.clientHeight < window.scrollY) {
        customersStuck.classList.remove('shifted');
        window.removeEventListener('scroll', makeDotsAppear);
    }
}

const numbersValue = document.querySelectorAll('.numbers h4');
let interval = 2000;

numbersValue.forEach((value) => {
    let startValue = 0;
    let endValue = parseInt(value.getAttribute('data-value'));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
        startValue++;
        value.textContent = startValue;
        if(startValue == endValue) {
            value.textContent = startValue + "+"
            clearInterval(counter);
        }
    }, duration);
})


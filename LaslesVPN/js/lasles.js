const cards = document.querySelector('.customer_stack').children;
const dots = document.querySelector('.customer_dots').children;
const networkDots = document.querySelectorAll('.network-dot');
const networkSection =document.getElementById('network');
let networkPosition = networkSection.getBoundingClientRect();
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
            `
        )
    )
}

window.addEventListener('scroll', dotsAppears);

function dotsAppears() {
    if(networkPosition.top < window.scrollY && networkPosition.bottom >= 0) {
		window.removeEventListener('scroll', dotsAppears);

        for(let dot of networkDots) {
            let delay = Math.floor(((Math.random() * networkDots.length * 50)))
            dot.style.transitionDelay = delay + 'ms';
            setTimeout(() => {dot.style = ''}, delay)

            dot.classList.add('visible');
            
        }

	}
}

let mobileNav = document.getElementById('mobileNav');
burgerIcon = document.getElementById('burgerIcon');

burgerIcon.onclick = () => {
    mobileNav.classList.toggle('nav-mobile');
}

window.onresize = () => {
    if(window.visualViewport.width > 850) {
        mobileNav.classList.remove('nav-mobile');
    }
}

window.ons = () => {
    if(window.visualViewport.width > 850) {
        mobileNav.classList.remove('nav-mobile');
    }
}


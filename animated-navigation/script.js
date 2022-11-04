const menuIcon = document.getElementById('menu-icon');
const overlay = document.querySelector('.overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

function slideInNav(navItem, navNumber) {
    navItem.classList.add(`slide-in-${navNumber}`);
    navItem.classList.remove(`slide-out-${navNumber}`); 
}

function slideOutNav(navItem, navNumber) {
    navItem.classList.remove(`slide-in-${navNumber}`);
    navItem.classList.add(`slide-out-${navNumber}`);
}

function animateNavItems(isOverlayHidden) {
    let navItemsArray = [nav1, nav2, nav3, nav4, nav5];
    for(let i = 0; i < 5; i++) {
        let navItem = navItemsArray[i];
        let navNumber = i + 1;
        isOverlayHidden ? slideInNav(navItem, navNumber) : slideOutNav(navItem, navNumber); 
    }
}

function toggleOverlay(event) {
    overlay.classList.toggle('overlay-slide-right')
    if(event.target.id !== 'menu-icon') {
        menuIcon.checked ? menuIcon.checked = false : menuIcon.checked = true; 
    }
    animateNavItems(menuIcon.checked)
}

menuIcon.addEventListener('change', toggleOverlay);
nav1.addEventListener('click', toggleOverlay);
nav2.addEventListener('click', toggleOverlay);
nav3.addEventListener('click', toggleOverlay);
nav4.addEventListener('click', toggleOverlay);
nav5.addEventListener('click', toggleOverlay);

const menuIcon = document.getElementById('menu-icon');
const overlay = document.querySelector('.overlay');
const numberOfMenuItems = 5;
let navItemsArray = [];

function slideInNav(navItem, navNumber) {
    navItem.classList.add(`slide-in-${navNumber}`);
    navItem.classList.remove(`slide-out-${navNumber}`); 
}

function slideOutNav(navItem, navNumber) {
    navItem.classList.remove(`slide-in-${navNumber}`);
    navItem.classList.add(`slide-out-${navNumber}`);
}

function animateNavItems(isOverlayHidden) {
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

for (let i = 1; i <= numberOfMenuItems; i++) {
    let navItem = document.getElementById(`nav-${i}`);
    navItem.addEventListener('click', toggleOverlay);
    navItemsArray.push(navItem);
}

menuIcon.addEventListener('change', toggleOverlay);
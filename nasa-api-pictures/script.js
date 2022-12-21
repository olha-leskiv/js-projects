const apiKey = 'yhXXL435RG7zOb89gTrYfNJcdsoPgKPfHKWJg56F';
const apiCount = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?count=${apiCount}&api_key=${apiKey}`;

const loader = document.querySelector('.loader');
const imageContainer = document.querySelector('.images-container');
const pop = document.querySelector('.save-confirmed');
const loadMoreBtn = document.getElementById('loadMore');
const emptyState = document.getElementById('emptyState');
const favouritesNav = document.getElementById('favouritesNav');
const resultNav = document.getElementById('resultNav');

let favourite = [];
let allImages = [];

async function getImageUrlFromApi() {
    display(loader);
    try {
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((imageCollection) => processImages(imageCollection));
        hide(loader);
        display(loadMoreBtn);
    } catch (error) {
        throw error;
    }
}

function processImages(collection) {
    addToImages(collection);
    displayCardsFrom(collection);
}

function addToImages(images) {
    for(let image of images) {
        allImages.push(image);
    };
}

function displayCardsFrom(images) {
    for(let image of images) {
        createCard(image);
    }
}

function createCard(image) {
    let card = document.createElement('div');
    card.className = 'card';
    
    let a = document.createElement('a');
    a.target = "_blank";
    a.href = image.hdurl;
    a.title = "View Full Image";
    
    let topImage = '';
    topImage.className = 'card-img-top';
    if(image['url'].includes('youtube')) {
        topImage = document.createElement('iframe');
        topImage.width = '100%';
        topImage.height = 'auto';
        topImage.maxHeight = '60vh';
        topImage.src = image.url;
        topImage.title = "Geostationary Highway Through Orion";
        topImage.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        topImage.setAttribute('allowfullscreen', true);
        topImage.setAttribute('frameborder', "0");
        a.href = image.url;
    } else {
        topImage = document.createElement('img');
        topImage.src = image.url;
        topImage.alt = image.title;
        topImage.loading = 'lazy';
    }

    let copyright = image.copyright === undefined ? '' : image.copyright;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = `
        <p class="card-text">${image.explanation}</p>
        <small class="text-muted">
            <strong>${image.date}</strong>
            <span>${copyright}</span>
        </small>
    `;

    let favouriteBtn = document.createElement('div');
    favouriteBtn.className = 'card-favourite clickable';
    if(image.favourite) {
        favouriteBtn.innerHTML = `
        <i class="fa-solid fa-heart"></i><p>Remove from Favourites</p>`; 
    } else {
        favouriteBtn.innerHTML = `
        <i class="fa-regular fa-heart"></i><p>Add to Favourites</p>`;
    }
    favouriteBtn.addEventListener('click', (e) => {
        let item = {
            icon: e.currentTarget.firstElementChild,
            text: e.currentTarget.lastElementChild,
            card: e.currentTarget.closest('.card'),
            image: image,
        }
        toggleFavourite(item);
        updateLocalStorage();
    });
    
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = image.title;
    
    a.append(topImage);
    cardBody.prepend(favouriteBtn);
    cardBody.prepend(title);
    card.append(a);
    card.append(cardBody);
    imageContainer.append(card);

    enableLoadMoreBtn();
}

function toggleFavourite(item) {
    if(itemExist()) {
        removeFromFavourites();
        if(favourite.length == 0 && isFavouritesPage()) {
            display(emptyState);
        }
    } else {
        addToFavourites();
    }

    function itemExist() {
        return favourite.indexOf(item.image) > -1;
    }

    function removeFromFavourites() {
        let index = favourite.indexOf[item.image];
        favourite.splice(index, 1);
        item['icon'].classList.replace('fa-solid', 'fa-regular');
        item['text'].textContent = 'Add to Favourites';
        item['image'].favourite = false;
        if(isFavouritesPage()) {
            item['card'].remove();
        }
    }

    function isFavouritesPage() {
        return favouritesNav.classList.contains('active');
    }

    function addToFavourites() {
        favourite.push(item.image);
        item['icon'].classList.replace('fa-regular', 'fa-solid');
        item['text'].innerHTML = 'Remove from Favourites';
        display(pop);
        item['image'].favourite = true;
        setTimeout(() => {
            hide(pop);
        }, 3000)
    }
}

function loadFavourites() {
    removeCards();
    hide(loadMoreBtn);
    updateNavState();
    if(!favourite.length) { 
        display(emptyState);
        return;
    }
    scrollTo({top: 0, behavior: 'smooth'});
    displayCardsFrom(favourite);
}

function loadMain() {
    removeCards();
    displayCardsFrom(allImages);
    hide(emptyState);
    display(loadMoreBtn);
    updateNavState();
}

function removeCards() {
    let allCards = document.querySelectorAll('.card');
    for(let card of allCards) {
        card.remove();
    }
}

function hide(element) {
    element.classList.add('hidden');
}

function display(element) {
    element.classList.remove('hidden');
}

function updateNavState() {
    resultNav.classList.toggle('active');
    favouritesNav.classList.toggle('active');
}

function initStateFromLocalStorage() {
    if(localStorage['favourite']) {
        favourite = JSON.parse(localStorage.getItem('favourite'));
    }
}

function updateLocalStorage() {
    localStorage.setItem('favourite',JSON.stringify(favourite));
}

function loadMore() {
    disableLoadMoreBtn();
    getImageUrlFromApi();
}

function disableLoadMoreBtn() {
    loadMoreBtn.innerHTML = '<i class="fa-solid fa-spinner"></i>';
    loadMoreBtn.firstElementChild.classList.add('loading');
    loadMoreBtn.disabled = true;
}

function enableLoadMoreBtn() {
    loadMoreBtn.innerHTML = 'Load more';
    loadMoreBtn.classList.remove('loading');
    loadMoreBtn.disabled = false;
}

loadMoreBtn.addEventListener('click', loadMore);
favouritesNav.addEventListener('click', loadFavourites);
resultNav.addEventListener('click', loadMain);
emptyState.lastElementChild.addEventListener('click', loadMain);

getImageUrlFromApi();
initStateFromLocalStorage();


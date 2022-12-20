const apiKey = 'yhXXL435RG7zOb89gTrYfNJcdsoPgKPfHKWJg56F';
const apiCount = 3;
const apiUrl = `https://api.nasa.gov/planetary/apod?count=${apiCount}&api_key=${apiKey}`;

const loader = document.querySelector('.loader')
const imageContainer = document.querySelector('.images-container');
const pop = document.querySelector('.save-confirmed');
const loadMoreNav = document.getElementById('loadMore');
const favouritesNav = document.getElementById('favouritesNav');

let favourite = {};
let images = {};

async function getImageUrlFromApi() {
    showLoader()
    try {
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((imageCollection) => displayCards(imageCollection));
        hideLoader();
        showLoadMore();
    } catch (error) {
        throw error
    }
}

function displayCards(collection) {
    for(image of collection) {
        createCard(image);
        images[image.title] = image; 
    }
}

function createCard(image) {
    let card = document.createElement('div');
    card.className = 'card';
    
    let a = document.createElement('a');
    a.setAttribute('target',"_blank");
    a.setAttribute('href',image.hdurl);
    a.setAttribute('title',"View Full Image");

    
    let topImage = document.createElement('img');
    // topImage.addEventListener('load', hideLoader);
    topImage.src = image.url;
    topImage.setAttribute('alt', image.title);
    topImage.className = 'card-img-top';
    topImage.loading = 'lazy';
    
    a.append(topImage);

    card.append(a);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = `
    <p class="card-text">${image.explanation}</p>
    <small class="text-muted">
        <strong>${image.date}</strong>
        <span>Copyright Info</span>
    </small>`

    let favouriteBtn = document.createElement('div');
    favouriteBtn.className = 'card-favourite clickable'
    favouriteBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i><p>Add to Favourites</p>`;

    favouriteBtn.addEventListener('click', (e) => {
        let icon = e.currentTarget.firstElementChild;
        let text = e.currentTarget.lastElementChild
        if(favourite[image.title]) {
            delete favourite[image.title];
            icon.classList.replace('fa-solid', 'fa-regular');
            text.textContent = 'Add to Favourites';
        } else {
            favourite[image.title] = image;
            icon.classList.replace('fa-regular', 'fa-solid');
            text.innerHTML = 'Added to your Favourites';
            pop.classList.remove('hidden');
            setTimeout(() => {
                pop.classList.add('hidden')
            }, 3000)

        }
        console.log(favourite)
    });

    cardBody.prepend(favouriteBtn);
    
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = image.title;

    cardBody.prepend(title);

    card.append(cardBody);

    imageContainer.append(card);
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showLoadMore() {
    loadMoreNav.classList.remove('hidden')
}

loadMoreNav.addEventListener('click', getImageUrlFromApi);
favouritesNav.addEventListener('click', loadFavourites)

function loadFavourites() {
    let allCards = document.querySelectorAll('.card');
    for(let card of allCards) {
        card.remove();
    }
    displayCards(favourite)
}

getImageUrlFromApi()


// Global Declarations
const imageContainer = document.getElementById('image-container')

let loaderContainer = document.getElementById('loader')
let photosList = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash Api
let count = 5;
const apiKey = 'XQioKgO0640K6bSNfE2PaX_F8NFqNdK30rMnUCg-kNo';
let urlApi = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&`;

function updateImagesCount() {
    count = 30;
    urlApi = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&`
}

// Get Photos From Unsplash Api
async function getPhotosFromUnsplash() {
    try {
        let response = await fetch(urlApi);
        let allPhotos = await response.json()
        photosList = allPhotos;
        displayPhotos();
    } catch (error) {
        alert('There is an error. Check code')
    }
}

// Display Photos
function displayPhotos() {
    totalImages = totalImages + photosList.length;
    // Run Function for Each Object in the Array
    photosList.forEach((photo) => {
        // Create <a> Element
        let item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> Element
        let img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        // Check if there is a description on image. Otherwise put 'image from Unsplash'
        if(!photo.alt_description) {
            img.setAttribute('alt', 'image from Unsplash');
            img.setAttribute('title', 'image from Unsplash');
        } else {
            img.setAttribute('alt', photo.alt_description);
            img.setAttribute('title', photo.alt_description);
        }
        // Put <img> into <a> and both into imageContainer
        item.append(img);
        imageContainer.append(item)
        // Check if image is loaded
        img.addEventListener('load', imageLoaded)
    });
}

window.addEventListener('scroll', getNewImages)

function getNewImages(){
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        getPhotosFromUnsplash()
        ready = false;
    } 
}

function imageLoaded() {
    imagesLoaded++;
if(imagesLoaded === totalImages) {
    updateImagesCount()
    ready = true;
    loaderContainer.classList.add('hidden');
}
}

// On Load
getPhotosFromUnsplash()
// Global Declarations
const imageContainer = document.getElementById('image-container')
let loaderContainer = document.getElementById('loader')

// Unsplash Api
const count = 10;
const apiKey = 'XQioKgO0640K6bSNfE2PaX_F8NFqNdK30rMnUCg-kNo';
const urlApi = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}&`;

let photosList = [];

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
    });
}


// On Load
getPhotosFromUnsplash()
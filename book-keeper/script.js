const modal = document.getElementById('modal');
const closeModalIcon = document.getElementById('close-modal');
const addBookmarkBtn = document.getElementById('show-modal');
const form = document.getElementById('bookmark-form');
const bookmarksContainer = document.getElementById('bookmarks-container');
const inputName = document.getElementById('website-name');
const inputUrl = document.getElementById('website-url');
const deleteBookmarkBtn = document.getElementById('delete-bookmark');

let bookmark = {
    name: '',
    url: ''
};

function showModal() {
    modal.classList.add('show-modal')   
}

function hideModal() {
    modal.classList.remove('show-modal');
    inputName.value = '';
    inputUrl.value = '';
}

function addNewBookmark(event) {
    event.preventDefault()
    getValues()
    createBookmark()
    addToLocalStorage()
    hideModal()
}

function getValues() {
    bookmark.name = inputName.value;
    bookmark.url = inputUrl.value;
}

function createBookmark() {
    let item = document.createElement('div');
    item.classList.add('item');
    domain = bookmark.url.split('/')[2];
    item.innerHTML =  `
    <i class="fa-solid fa-trash-can hidden" id="delete-bookmark" title="Delete Bookmark"></i>
    <div class="name">
        <img src="http://s2.googleusercontent.com/s2/favicons?domain=${domain}" alt="favicon">
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
    </div>`
    item.addEventListener('mouseenter', showDeleteIcon);
    item.addEventListener('mouseleave', showDeleteIcon);
    item.children[0].addEventListener('click', deleteBookmark);
    bookmarksContainer.append(item);
}

function addToLocalStorage() {
    localStorage.setItem(`b-${bookmark.name}`, JSON.stringify(bookmark))
}

function loadStorage() {
    for(i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if('b-' == key.slice(0, 2)) {
            bookmark = JSON.parse(localStorage.getItem(key));
            createBookmark();
        }
    }
}

function showDeleteIcon() {
    this.children[0].classList.toggle('hidden');
}

function deleteBookmark() {
    let name = this.nextElementSibling.children[1].innerText;
    console.log(name)
    this.closest('.item').remove();
    localStorage.removeItem(`b-${name}`)
}

closeModalIcon.addEventListener('click', hideModal);
addBookmarkBtn.addEventListener('click', showModal);
form.addEventListener('submit', addNewBookmark);
window.addEventListener('load', loadStorage);


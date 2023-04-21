const modal = document.getElementById('modal');
const closeModalIcon = document.getElementById('close-modal');
const addBookmarkBtn = document.getElementById('show-modal');
const form = document.getElementById('bookmark-form');
const bookmarksContainer = document.getElementById('bookmarks-container');
const inputName = document.getElementById('website-name');
const inputUrl = document.getElementById('website-url');
const deleteBookmarkBtn = document.getElementById('delete-bookmark');
const inputs = document.querySelectorAll('input');

let bookmark = {
    name: '',
    url: ''
}

function showModal() {
    modal.classList.add('show-modal');
    inputName.focus(); 
}

function hideModal() {
    modal.classList.remove('show-modal');
    resetForm()
}

function resetForm() {
    inputName.value = '';
    inputUrl.value = '';
    inputName.classList.remove('input-error');
    inputUrl.classList.remove('input-error')
}

function addNewBookmark(event) {
    event.preventDefault()
    if(formIsValid()) {
        getValuesFromForm()
        createBookmark()
        hideModal()
        addToLocalStorage()
    } else {
        focusError()
    }
}

function focusError() {
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === '') {
            inputs[i].focus();
            break
        }
    }
}

function formIsValid() {
    let result = true;
    inputName.classList.remove('input-error');
    inputUrl.classList.remove('input-error')
    if(!inputName.value) {
        inputName.classList.add('input-error');
        result = false;
    }
    if(!inputUrl.value) {
        inputUrl.classList.add('input-error');
        result = false;
    }
    return result
}

function getValuesFromForm() {
    bookmark.name = inputName.value;
    bookmark.url = inputUrl.value;
    if(!bookmark.url.includes('http://') || !bookmark.url.includes('https://')) {
        bookmark.url = 'https://' + bookmark.url
    }
}

function createBookmark() {
    let item = document.createElement('div');
    item.classList.add('item');
    // domain = bookmark.url.split('/')[2];
    // let image = `<img src="http://s2.googleusercontent.com/s2/favicons?domain=${domain}" alt="favicon">`;
    item.innerHTML =  `
    <i class="fa-solid fa-trash-can hidden" id="delete-bookmark" title="Delete Bookmark"></i>
    <div class="name">
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
        <i class="fa-solid fa-up-right-from-square"></i>
    </div>`
    item.addEventListener('mouseenter', showDeleteIcon);
    item.addEventListener('mouseleave', showDeleteIcon);
    item.children[0].addEventListener('click', deleteBookmark);
    bookmarksContainer.append(item);
}

function addToLocalStorage() {
    let key = `b-${bookmark.name}`;
    let value = JSON.stringify(bookmark);
    localStorage.setItem(key, value)
}

function loadStorage() {
    for(i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key.slice(0, 2) === 'b-') {
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
    this.closest('.item').remove();
    localStorage.removeItem(`b-${name}`)
}

closeModalIcon.addEventListener('click', hideModal);
addBookmarkBtn.addEventListener('click', showModal);
form.addEventListener('submit', addNewBookmark);
window.addEventListener('load', loadStorage);
window.addEventListener('click', (e) => e.target === modal ? hideModal() : false)


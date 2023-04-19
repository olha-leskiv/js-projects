const toggle = document.getElementById('themeToggle');
const textarea = document.querySelector('textarea');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const counter = document.getElementById('counter');
const filterBtns = document.querySelectorAll('.filter h2');
const listContainer = document.querySelector('ul');
const emptyState = document.getElementById('emptyState');
const clearBtn = document.getElementById('clearBtn');
let listContainerY = listContainer.getBoundingClientRect().y;

let list = [];
let filter = 'all';
let dragId = null;
let prevSibling = null;

let draggingObj = null;
let draggingIndex = null;
let draggingItem = null;


window.onload = () => {
    if(localStorage.getItem('list')) {
        list = JSON.parse(localStorage.getItem('list'));
    }
    if(localStorage.getItem('dark') === 'true') {
        document.body.classList.toggle('dark');
    }
    updateListDisplay();
}

toggle.onclick = () => {
    document.body.classList.toggle('dark');
    document.body.classList.add('transition');
    localStorage.setItem('dark', document.body.classList.contains('dark'))
}

textarea.onkeydown = (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        submitInput();
        return
    };
    adjustTextareaHeight()
}

clearBtn.onclick = () => {
    list = [];
    updateListDisplay();
}

function adjustTextareaHeight() {
    textarea.style.height = '100%';
    if(textarea.scrollHeight <= textarea.offsetHeight) return;
    let difference = textarea.scrollHeight - textarea.offsetHeight;
    textarea.style.height = textarea.offsetHeight + difference + 'px';
}

function submitInput() {
    if(!textarea.value) return;
    list.push({
        value: textarea.value,
        complete: false,
    });
    updateListDisplay();
    clearTextarea();
    updateLocalStorage();
    textarea.focus();
}

function clearTextarea() {
    textarea.value = '';
    textarea.blur();
}


function updateListDisplay() {
    hide(emptyState);
    updateLocalStorage();
    if(!list.length) {
        hide(main, footer);
        show(emptyState)
        return;
    }
    show(main, footer);
    createLiElements()
    updateCounter();
}

function createLiElements() {
    listContainer.innerHTML = '';
    for(let item of list) {
        if(filter === 'active') {
            if(item.complete == true) continue;
        }
        if(filter === 'completed') {
            if(item.complete == false) continue;
        }
        let li = document.createElement('li');
        li.draggable = true;
        li.ondragstart = dragStart;
        li.ondrag = drag;
        li.ondragover = highlight; 
        // li.id = item.value.split(' ')[0];
        if(item.complete) li.classList.add('complete');
        li.innerHTML = `
            <div class="check" title="Mark as done" onclick="markAsComplete(event)"></div>
            <p>${item.value}</p>
            <img class="delete" src="images/icon-cross.svg" alt="Delete" title="Delete item" onclick="deleteItem(event)">
        `;
        listContainer.append(li)
    }
}

function applyFilter(type) {
    filter = type;
    for(let btn of filterBtns) {
            btn.classList.remove('active');
        if(btn.title == type) {
            btn.classList.add('active');
        }
    }
    updateListDisplay();
}

function markAsComplete(event) {
    const item = event.target.closest('li');
    let index = getIndex(item);
    list[index].complete = !list[index].complete;
    updateListDisplay();
}

function deleteItem(event) {
    const item = event.target.closest('li');
    let index = getIndex(item);
    list.splice(index, 1);
    console.log(list);
    updateListDisplay();
}

function getIndex(itemLi) {
    let value = itemLi.querySelector('p').textContent;
    return list.findIndex((item) => item.value == value);
}

function updateCounter() {
    let noun = list.length == 1 ? 'item' : 'items';
    counter.textContent = `${list.length} ${noun} left`;
}

function updateLocalStorage() {
    let formattedList = JSON.stringify(list);
    localStorage.setItem('list', formattedList)
}

function hide(...elements) {
    for(let element of elements) {
        element.classList.add('hidden');
    }
}

function show(...elements) {
    for(let element of elements) {
        element.classList.remove('hidden');
    }
}

hide(main, footer);

textarea.ondrop = () => false;
textarea.ondragstart = () => false;
textarea.ondragover = () => false;

function dragStart(e) {
    let item = e.target;
    let index = getIndex(item);
    draggingObj = list[index];
    draggingIndex = index;
}

function drag(e) {
    let item = e.target;
    hide(item);
    draggingItem = item;
}

let higlightLine = document.createElement('div');
higlightLine.className = 'highlight';

function highlight(e) {
    let itemDragOver = e.currentTarget;
    itemDragOver.before(higlightLine);
}

function allowDrop(e) {
    e.preventDefault()
}

window.ondragend = () => {
    show(draggingItem);
    updateListDisplay();
}

function drop(e) {
    e.preventDefault();

    let itemToPut
    if(e.target.closest('.highlight')) {
        itemToPut = e.target.nextElementSibling;
    } else { 
        itemToPut = e.target.closest('li');
    }
    console.log(itemToPut)

    list.splice(draggingIndex, 1);
    let toIndex = getIndex(itemToPut);
    list.splice(toIndex, 0, draggingObj);
    updateListDisplay();

}
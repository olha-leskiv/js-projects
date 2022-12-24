

for(let addText of document.querySelectorAll('.add-text')) {
  addText.onclick = openEditor;
};

for(let btn of document.querySelectorAll('.dismiss-btn')) {
  btn.onclick = hideEditor;
};

for(let btn of document.querySelectorAll('.add-btn')) {
  btn.onclick = addCard;
};

for(let board of document.querySelectorAll('.board')) {
  let cards = board.querySelector('.cards');
  let otherCards = document.querySelectorAll('.cards');

  board.ondragover = (e) => {
    e.preventDefault();
  }

  board.ondrop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let card = document.getElementById(data);
    card.removeAttribute('id');
    cards.append(card);

    setTimeout(() => {
      for(let cards of otherCards) {
        cards.classList.remove('drop-expect');
      }
    }, 0);

    updateLocalStorage()
  }

  board.ondragenter = () => {
    for(let cards of otherCards) {
      cards.classList.remove('drop-expect');
    };
    cards.classList.add('drop-expect');
  }
}

function openEditor(e) {
  let board = getBoardElements(e);
  display(board.editor);
  hide(board.addText);
  board.textarea.focus();
}

function hideEditor(e) {
  let board = getBoardElements(e);
  hide(board.editor);
  display(board.addText);
  board.textarea.value = '';
  hideError(board.textarea);
}

function hideError(textarea) {
  let error = textarea.nextElementSibling;
  hide(error);
  textarea.classList.remove('error');
}

function addCard(e) {
  let board = getBoardElements(e);
  let value = board.textarea.value;

  if(!value) {
    showErrorState(board.textarea)
  } else {
    let card = createCard(value);
    board.cardsContainer.append(card);
    hide(board.editor);
    clearErrorState(board.textarea);
    display(board.addText);
    updateCounters();
    updateLocalStorage();
  }
}

function createCard(value) {

  let editIcon = document.createElement('i');
  editIcon.className = "fa-solid fa-pen-clip";
  editIcon.title = 'Edit';
  editIcon.onclick = editCard;

  let deleteIcon = document.createElement('i');
  deleteIcon.className = "fa-solid fa-trash-can";
  deleteIcon.title = 'Delete';
  deleteIcon.onclick = deleteCard;

  let textarea = document.createElement('textarea')
  let card = document.createElement('div');

  card.className = 'card';
  card.draggable = true;
  textarea.readOnly = true;
  textarea.disabled = true;
  textarea.textContent = value;
  card.append(editIcon, deleteIcon, textarea)

  card.ondragstart = (e) => {
    card.id = 'dragging';
    e.dataTransfer.setData("text", e.currentTarget.id);
    setTimeout(() => {
      hide(card)
    }, 0);
  };

  card.ondragend = () => display(card);

  return card
}

function deleteCard(e) {
  e.target.closest('.card').remove();
  updateLocalStorage();
}

function getBoardElements(e) {
  let board = e.currentTarget.closest('.board');
  let item = {
    'self': board,
    'editor': board.querySelector('.editor'),
    'textarea': board.querySelector('.editor textarea'),
    'cardsContainer': board.querySelector('.cards'),
    'addText': board.querySelector('.add-text'),
    'cards': [],
  }
  return item
}

function updateCounters() {
  const counters = document.querySelectorAll('.card-counter');
  counters.forEach(counter => {
    let board = counter.closest('.board');
    let cards = board.querySelector('.cards');
    counter.textContent = cards.children.length;
  })
}

function editCard(e) {
  let card = e.currentTarget.closest('.card');
  let textarea = card.querySelector('textarea');
  let icons = card.querySelectorAll('i');
  icons.forEach(icon => icon.style.display = 'none')
  textarea.disabled = false;
  textarea.readOnly = false;
  const end = textarea.value.length;
  textarea.setSelectionRange(end, end);
  textarea.focus();
  let originalValue = textarea.value;
  let buttons = document.createElement('div');
  buttons.className = 'buttons';

  let saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
      unselectTextarea(textarea);
    }
  )
  
  let cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'secondary'
  cancelBtn.addEventListener('click', () => {
      textarea.value = originalValue;
      unselectTextarea(textarea);
    }
  )

  function unselectTextarea(textarea) {
    textarea.blur();
    textarea.disabled = true;
    textarea.readOnly = true;
    buttons.remove();
    icons.forEach(icon => icon.style.display = 'block');
    updateLocalStorage()
  }

  buttons.append(saveBtn, cancelBtn);

  textarea.after(buttons);  
}



function showErrorState(textarea) {
  let error = textarea.nextElementSibling;
  display(error);
  textarea.classList.add('error');
  textarea.focus();
}

function clearErrorState(textarea) {
  let error = textarea.nextElementSibling;
  hide(error);
  textarea.classList.remove('error');
  textarea.value = '';
}

function display(element) {
  element.classList.remove('hidden');
}
function hide(element) {
  element.classList.add('hidden');
}

function updateLocalStorage() {
  let boardsContent = {
    'backlog': [],
    'In progress': [],
    'complete': [],
    'on hold': [],
  }
  for(let board of document.querySelectorAll('.board')) {
    let cardsArray = [];
    for(let card of board.querySelectorAll('.cards textarea')) {
      cardsArray.push(card.value);
    }
    boardsContent[board.id] = cardsArray;
  }
  localStorage.setItem('boards', JSON.stringify(boardsContent));
  updateCounters();
}

window.onload = () => {
  if(!localStorage.getItem('boards')) {
    return
  }
  let boardsContent = JSON.parse(localStorage.getItem('boards'));
  for(let boardName in boardsContent) {
    if(boardsContent[boardName].length > 0) {
      let board = document.getElementById(boardName);
      let cardsContainer = board.querySelector('.cards');
      for(let item of boardsContent[boardName]) {
        let card = createCard(item);
        cardsContainer.append(card);
      }
    }
  }
  updateCounters();
}
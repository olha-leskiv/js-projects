function display(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function addEventListenerToElements(selector, type, func) {
  for(let item of document.querySelectorAll(selector)) {
    item.addEventListener(type, func);
  };
}

function getBoardObjectFrom(element) {
  let boardEl = element.closest('.board');
  let board = {
    'self': boardEl,
    'editor': boardEl.querySelector('.editor'),
    'textarea': boardEl.querySelector('.editor textarea'),
    'cardStack': boardEl.querySelector('.cardstack'),
    'addTextBtn': boardEl.querySelector('.add-text'),
    'cards': [],
    'counter': boardEl.querySelector('.card-counter'),
  };
  return board;
}

function updateCounters() {
  const counters = document.querySelectorAll('.card-counter');
  counters.forEach(counter => {
    counter.textContent = getBoardObjectFrom(counter).cardStack.children.length;
  });
}

addEventListenerToElements('.board', 'dragover', (e) => e.preventDefault());
addEventListenerToElements('.board', 'drop', dropCard);

function dropCard(e) {
  e.preventDefault();

  let board = getBoardObjectFrom(e.currentTarget);
  let cardId = e.dataTransfer.getData("text");
  let card = document.getElementById(cardId);
  card.removeAttribute('id');
  board.cardStack.append(card);

  setTimeout(() => removeCardStacksHighlight(), 0);

  updateLocalStorage();
}

addEventListenerToElements('.board', 'dragenter', boardDragEnter);

function getCardStacks() {
  return document.querySelectorAll('.cardstack');
}

function boardDragEnter(e) {
  let board = getBoardObjectFrom(e.currentTarget);
  removeCardStacksHighlight();
  board.cardStack.classList.add('drop-expect');
}

function removeCardStacksHighlight() {
  for (let cardStack of getCardStacks()) {
    cardStack.classList.remove('drop-expect');
  };
}

addEventListenerToElements('.add-text', 'click', openEditor);

function openEditor(e) {
  let board = getBoardObjectFrom(e.currentTarget);
  display(board.editor);
  hide(board.addTextBtn);
  board.textarea.focus();
}

addEventListenerToElements('.dismiss-btn', 'click', closeEditor);

function closeEditor(e) {
  let board = getBoardObjectFrom(e.currentTarget);

  hide(board.editor);
  display(board.addTextBtn);
  // if (isErrorState()) {
    clearErrorState(board.textarea);
    board.textarea.value = '';

  // }
}

addEventListenerToElements('.add-btn', 'click', addCardToCardStack);
addEventListenerToElements('textarea', 'keypress', addCardToCardStack);

function addCardToCardStack(e) {
  if(!isBtnClicked(e) && !isEnterPressed(e)) {
    return;
  }

  let board = getBoardObjectFrom(e.currentTarget);
  let cardText = board.textarea.value;

  if(!cardText) {
    showErrorState(board.textarea)
  } else { 
    board.cardStack.append(createCard(cardText));
    closeEditor(e);
    updateLocalStorage();
  }
}

function isBtnClicked(e) {
  return e.type === 'click';
}

function isEnterPressed(e) {
  return e.type === 'keypress' && e.key === 'Enter';
}

function showErrorState(textarea) {
  let errorEl = textarea.nextElementSibling;
  display(errorEl);
  textarea.classList.add('error');
  textarea.focus();
}

function clearErrorState(textarea) {
  let errorEl = textarea.nextElementSibling;
  hide(errorEl);
  textarea.classList.remove('error');
}

function createCard(cardText) {
  let card = document.createElement('div');
  card.className = 'card';
  card.draggable = true;

  let editIcon = document.createElement('i');
  editIcon.className = "fa-solid fa-pen-clip";
  editIcon.title = 'Edit';
  editIcon.onclick = editCard;

  let deleteIcon = document.createElement('i');
  deleteIcon.className = "fa-solid fa-trash-can";
  deleteIcon.title = 'Delete';
  deleteIcon.onclick = deleteCard;

  let textarea = document.createElement('textarea')
  textarea.readOnly = true;
  textarea.disabled = true;
  textarea.textContent = cardText;
  textarea.setAttribute('rows', getRows(textarea));
  textarea.oninput = ((e) => changeRows(e));


  card.append(editIcon, deleteIcon, textarea)

  card.ondragstart = (e) => {
    card.id = 'dragging';
    e.dataTransfer.setData("text", card.id);
    setTimeout(() => hide(card), 0);
  };

  card.ondragend = () => display(card);

  return card;
}

function editCard(e) {
  let card = e.currentTarget.closest('.card');
  let textarea = card.querySelector('textarea');
  let originalValue = textarea.value;

  textarea.onkeypress = blurTextarea;
  
  focusTextarea();

  let icons = card.querySelectorAll('i');
  icons.forEach(icon => icon.style.display = 'none')

  let buttons = document.createElement('div');
  buttons.className = 'buttons';

  let saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', (event) => {
    let cardText = textarea.value;
    if(!cardText) {
      showErrorState(textarea);
    } else {
      originalValue = textarea.value;
      blurTextarea(event);
    }
  });
  
  let cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'secondary';
  cancelBtn.addEventListener('click', (event) => {
      textarea.value = originalValue;
      clearErrorState(textarea);
      blurTextarea(event);
    }
  )
  
  function focusTextarea() {
    textarea.disabled = false;
    textarea.readOnly = false;
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
    textarea.focus();
  }

  function blurTextarea(event) {
    if(!isBtnClicked(event) && !isEnterPressed(event)) {
      return;
    }
    textarea.blur();
    textarea.disabled = true;
    textarea.readOnly = true;
    buttons.remove();
    icons.forEach(icon => icon.removeAttribute('style'));
    updateLocalStorage();
  }

  buttons.append(saveBtn, cancelBtn);
  textarea.after(buttons);
}

function deleteCard(e) {
  e.target.closest('.card').remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  let boardsContent = {};
  for(let board of document.querySelectorAll('.board')) {
    let cardsValues = [];
    for(let card of board.querySelectorAll('.cardstack textarea')) {
      cardsValues.push(card.value);
    }
    boardsContent[board.id] = cardsValues;
  }
  localStorage.setItem('boards', JSON.stringify(boardsContent));
  updateCounters();
}

window.onload = initBoards;

function initBoards() {
  if (!localStorage.getItem('boards')) {
    return;
  }

  let boardsContent = JSON.parse(localStorage.getItem('boards'));
  for (let boardId in boardsContent) {
    if (boardHasCards(boardsContent[boardId])) {
      let board = document.getElementById(boardId);
      let cardStackEl = board.querySelector('.cardstack');
      for (let cardText of boardsContent[boardId]) {
        let card = createCard(cardText);
        cardStackEl.append(card);
        let textarea = card.querySelector('textarea');
        textarea.setAttribute('rows', `${getRows(textarea)}`);
      }
    }
  }
  
  updateCounters();
}

function boardHasCards(board) {
  return board.length > 0;
}

addEventListenerToElements('textarea', 'input', changeRows);

function changeRows(e) {
  getRows(e.currentTarget);
}

function getRows(textarea) {
  textarea.rows = 1;
  let scroll = textarea.scrollHeight;
  let height = textarea.clientHeight;

  while(scroll > height){
    textarea.rows++;
    scroll = textarea.scrollHeight;
    height = textarea.clientHeight;
  }
  return textarea.rows
}

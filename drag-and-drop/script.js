

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

    updateCounters();
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
  let card = document.createElement('textarea');
  card.className = 'card';
  card.draggable = true;
  card.readOnly = true;
  card.disabled = true;
  card.textContent = value;

  card.ondragstart = (e) => {
    card.id = 'dragging';
    e.dataTransfer.setData("text", e.currentTarget.id);
    setTimeout(() => {
      hide(card)
    }, 0);
  };

  card.ondragend = () => display(card);

  // card.addEventListener('focus', changeContent);

  return card
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

// function changeContent(e) {
//   let textarea = e.currentTarget;
//   let originalValue = textarea.value;
//   let buttons = document.createElement('div');
//   buttons.className = 'buttons';

//   let saveBtn = document.createElement('button');
//   saveBtn.textContent = 'Save';
//   saveBtn.addEventListener('click', () => {
//       textarea.blur();
//       buttons.remove();
//     }
//   )
  
//   let cancelBtn = document.createElement('button');
//   cancelBtn.textContent = 'Cancel';
//   cancelBtn.className = 'secondary'
//   cancelBtn.addEventListener('click', () => {
//       textarea.value = originalValue;
//       textarea.blur();
//       buttons.remove();
//     }
//   )

//   buttons.append(saveBtn, cancelBtn);
//   textarea.after(buttons);  
// }

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
    for(let card of board.querySelector('.cards').children) {
      cardsArray.push(card.value);
    }
    boardsContent[board.id] = cardsArray;
  }
  console.log(boardsContent)
  localStorage.setItem('boards', JSON.stringify(boardsContent));
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
      console.log(boardsContent, board, cardsContainer)
      for(let item of boardsContent[boardName]) {
        let card = createCard(item);
        cardsContainer.append(card);
      }
    }
  }
  updateCounters();
}

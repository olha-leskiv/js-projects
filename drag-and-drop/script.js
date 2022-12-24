const addTexts = document.querySelectorAll('.add-text');
addTexts.forEach(item => {
  item.addEventListener('click', openEditor);
});

const dismissBtns = document.querySelectorAll('.dismiss-btn');
dismissBtns.forEach(item => {
  item.addEventListener('click', hideEditor);
});

const addBtns = document.querySelectorAll('.add-btn');
addBtns.forEach(item => {
  item.addEventListener('click', addCard);
});


function openEditor(e) {
  let board = e.currentTarget.closest('.board');
  let addText = board.querySelector('.add-text');
  let editor = board.querySelector('.editor');
  display(editor);
  hide(addText);
}

function hideEditor(e) {
  let board = e.currentTarget.closest('.board');
  let addText = board.querySelector('.add-text');
  let editor = board.querySelector('.editor');
  hide(editor);
  display(addText);
}

function addCard(e) {

  let board = e.currentTarget.closest('.board');
  let editor = board.querySelector('.editor');
  let textarea = board.querySelector('.editor textarea');
  let value = textarea.value;
  if(!value) {
    showErrorState(textarea)
  } else {
    let card = document.createElement('textarea');
    card.className = 'card';
    card.draggable = true;
    card.textContent = value;
    card.addEventListener('focus', changeContent);
    
    
    let cardsContainer = board.querySelector('.cards');
    cardsContainer.append(card);

    let addText = board.querySelector('.add-text');  
    hide(editor);
    display(addText);

    let counter = board.querySelector('.card-counter');
    counter.textContent++;
    
    clearErrorState(textarea)
  }
}

function changeContent(e) {
  let textarea = e.currentTarget;
  let originalValue = textarea.value;
  let buttons = document.createElement('div');
  buttons.className = 'buttons';

  let saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
      textarea.blur();
      buttons.remove();
    }
  )
  
  let cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'secondary'
  cancelBtn.addEventListener('click', () => {
      textarea.value = originalValue;
      textarea.blur();
      buttons.remove();
    }
  )

  buttons.append(saveBtn, cancelBtn);
  textarea.after(buttons);  
}

function showErrorState(textarea) {
  let error = textarea.nextElementSibling;
  display(error);
  textarea.classList.add('error')
  textarea.focus()
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
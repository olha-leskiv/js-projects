import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const computerIcons = document.querySelectorAll('#computer i');
const resetBtn = document.getElementById('reset');

const player = 'player';
const computer = 'computer';

function battle(event) {
  let chosenElements = {
    player: event.target,
    computer: getComputerChoiceEl(),
  }
  
  stopConfetti();

  switch(getWinner(chosenElements)) {
    case player:
      increaseScore(player);
      setResult('You won!');
      startConfetti();
      break;
    case computer:
      increaseScore(computer);
      setResult('You lost!');
      break;
    case 'nobody':
      setResult("it's a tie.");
      break;
  }
  updateStyles(chosenElements);
  showResetBtn();
}

window.battle = battle;

function updateStyles(chosenElements) {
  resetStyles();

  makeH2Black();
  highlightSelectedElements(chosenElements);
  displayChoiceNames(chosenElements);
}

function makeH2Black() {
  const h2 = document.querySelector('.computer h2');
  h2.style.color = 'black';
}

function getComputerChoiceEl() {
  let computerChoiceEl = computerIcons[Math.floor(Math.random() * 5)];
  return computerChoiceEl;
}

function getWinner(chosenElements) {
  let playerChoice = getChoice(chosenElements.player);
  let computerChoice = getChoice(chosenElements.computer);

  function playerWins() {
    return choices[playerChoice].defeats.some(type => type === computerChoice);
  }
  
  function computerWins() {
    return choices[computerChoice].defeats.some(type => type === playerChoice);
  }

  if(playerWins()) {
    return player
  } else if(computerWins()) {
    return computer
  } else {
    return 'nobody'
  }
}

function highlightSelectedElements(elements) {
  for (let key in elements) {
    elements[key].classList.add('selected');
  }
}

function displayChoiceNames(chosenElements) {
  displayChoiceName(chosenElements.player, document.getElementById('player-choice'));
  displayChoiceName(chosenElements.computer, document.getElementById('computer-choice'));
}

function displayChoiceName(choiceEl, choiceContainer) {
  if(choiceEl) {
    choiceContainer.textContent = getChoice(choiceEl) + '!';
    choiceContainer.style.marginLeft = '24px';
  } else {
    choiceContainer.textContent = '';
  }
}

function removeChoiceNames() {
  displayChoiceName('', document.getElementById('player-choice'));
  displayChoiceName('', document.getElementById('computer-choice'));
}

function increaseScore(combatant) {
  const scoreCont = document.getElementById(`${combatant}-score`);
  let score = Number(scoreCont.textContent);
  score++;
  scoreCont.textContent = score;
}

function getChoice(element) {
  return element.dataset.type
}

function resetStyles() {
  const allIcons = document.querySelectorAll('.player-container i');
  for(let icon of allIcons) {
    icon.classList.remove('selected');
  } 
}

function setResult(result) {
  const resultText = document.getElementById('result-text');
  resultText.textContent = result;
}

function showResetBtn() {
  resetBtn.addEventListener('click', resetGame);
  resetBtn.classList.add('show');
}

function resetGame() {
  resetStyles();
  resetScore();
  hideResetBtn();
  setResult("Choose your hand!");
  removeConfetti();
  removeChoiceNames();
  makeH2Gray()
}

function makeH2Gray() {
  const h2 = document.querySelector('.computer h2');
  h2.style.color = 'rgba(0, 0, 0, 0.4)';
}

function resetScore() {
  const playerScoreCont = document.getElementById(`player-score`)
  const computerScoreCont = document.getElementById(`computer-score`)
  playerScoreCont.textContent = 0;
  computerScoreCont.textContent = 0;
}

function hideResetBtn() {
  resetBtn.classList.remove('show');
}

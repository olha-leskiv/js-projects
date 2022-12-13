const playerIcons = document.querySelectorAll('#player i');
const playerScoreCont = document.getElementById('player-score');
const computerScoreCont = document.getElementById('computer-score');
const playerChoice = document.getElementById('player-choice');
const computerChoice = document.getElementById('computer-choice');
const computerIcons = document.querySelectorAll('#computer i');
const resultText = document.getElementById('result-text');
const resetBtn = document.getElementById('reset');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScore = 0;
let computerScore = 0;
let playerChoiceEl = Element;
let computerChoiceEl = Element;

function battle(event) {
  playerChoiceEl = event.target;
  computerChoiceEl = computerIcons[Math.floor(Math.random() * 5)];

  if(playerWins()) {
    playerScore++;
    setResult('You won!');
  } else if(computerWins()) {
    computerScore++;
    setResult('computer won!');
  } else {
    setResult("it's a tie.");
  }

  updateStyles();
  showResetBtn();
}

function playerWins() {
  let playerType = playerChoiceEl.dataset.type;
  let computerType = computerChoiceEl.dataset.type;
  return choices[playerType].defeats.some(type => type === computerType)
}

function computerWins() {
  let playerType = playerChoiceEl.dataset.type;
  let computerType = computerChoiceEl.dataset.type;
  return choices[computerType].defeats.some(type => type === playerType)
}

function updateStyles() {
  for(let icon of playerIcons) {
    icon.classList.remove('selected');
  }
  for(let icon of computerIcons) {
    icon.classList.remove('selected');
  }
  playerChoiceEl.classList.add('selected');
  computerChoiceEl.classList.add('selected');
  playerScoreCont.textContent = playerScore;
  computerScoreCont.textContent = computerScore;
  playerChoice.textContent = " --- " + playerChoiceEl.dataset.type;
  computerChoice.textContent =  " --- " + computerChoiceEl.dataset.type;
}

function setResult(result) {
  resultText.textContent = result;
}

function showResetBtn() {
  resetBtn.parentElement.classList.add('show');
}

function hideResetBtn() {
  resetBtn.parentElement.classList.remove('show');
}
resetBtn.addEventListener('click', resetGame);

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  hideResetBtn();
  updateStyles();
  playerChoice.textContent = '';
  computerChoice.textContent = '';
  setResult("Let's battle!");
}



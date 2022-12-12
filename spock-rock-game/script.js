const playerIcons = document.querySelectorAll('#player i');
const playerScoreCont = document.getElementById('player-score');
const computerScoreCont = document.getElementById('computer-score');
const computerIcons = document.querySelectorAll('#computer i');
const playerChoice = document.getElementById('player-choice');
const computerChoice = document.getElementById('computer-choice');
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
let result = "Let's battle!";
let computerSelection;

function getComputerSelection() {
  computerSelection =  Object.keys(choices)[Math.floor(Math.random() * 5)];
}
  
function select(playerSelection) {
  getComputerSelection();

  for(let choice in choices) {
    let choiceName = choices[choice].name.toLowerCase();

    if(choiceName == playerSelection) {

      if(choices[choice].defeats.some((elem) => elem ===   computerSelection)) {
          playerScore++          
      }
    }

    if(choiceName == computerSelection) {
      if(choices[choice].defeats.some((elem) => elem === playerSelection)) {
          computerScore++
      }
    } 
  }

  for(let icon of playerIcons) {
    let type = icon.id.split('-')[1];

    if(type == playerSelection) {
      icon.classList.add('selected');
      playerChoice.textContent = " --- " + playerSelection;
    } else {
      icon.classList.add('disabled');
      icon.classList.remove('selected');
    }
  }
  
  for(let icon of computerIcons) {
    let type = icon.id.split('-')[1];

    if(type == computerSelection) {
      icon.classList.add('selected');
      computerChoice.textContent = " --- " + computerSelection;
    } else {
      icon.classList.add('disabled');
      icon.classList.remove('selected');
    }
  }

  resetBtn.parentElement.classList.add('show');

  if(playerScore > computerScore) {
    result = 'You won!'
  } else if(playerScore < computerScore) {
    result = 'Computer won!'
  } else {
    result = 'Draw!'
  }

  updateUI();

}

function updateUI() {
  computerScoreCont.textContent = computerScore;
  playerScoreCont.textContent = playerScore;
  resultText.textContent = result;
  console.log(result)
}

resetBtn.addEventListener('click', reset);

function reset() {
  playerScore = 0;
  computerScore = 0;
  result = "Let's battle!";
  resetBtn.parentElement.classList.remove('show');
  updateUI();
}
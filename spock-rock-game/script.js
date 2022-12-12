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

// let playerScore = 0;
// let computerScore = 0;
// let result = "Let's battle!";
// let computerSelection;
// let playerSelection;

// function getComputerSelection() {
//   computerSelection = choices[Math.floor(Math.random() * 5)];
// }
  
// function select(event, playerInput) {
//   playerSelection = playerInput;    
//   getComputerSelection();

//   for(let icon of playerIcons) {
//     icon.classList.remove('selected');
//   }
//   event.target.classList.add('selected');

//   for(let choice in choices) {
//     let choiceName = choices[choice].name.toLowerCase();

//     if(choiceName == playerSelection) {

//       if(choices[choice].defeats.some((elem) => elem ===   computerSelection)) {
//         result = 'You won!'         
//       }
//     }

//     if(choiceName == computerSelection) {
//       if(choices[choice].defeats.some((elem) => elem === playerSelection)) {
//         result = 'Computer won!'    
//       }
//     } 
//   }

//   updateUI();
// }

// function updateUI() {
  
//   for(let icon of computerIcons) {
//     let type = icon.id.split('-')[1];

//     if(type == computerSelection) {
//       icon.classList.add('selected');
//       computerChoice.textContent = " --- " + computerSelection;
//     } else {
//       icon.classList.add('disabled');
//       icon.classList.remove('selected');
//     }
//   }

//   resetBtn.parentElement.classList.add('show');

//   computerScoreCont.textContent = computerScore;
//   playerScoreCont.textContent = playerScore;
//   resultText.textContent = result;
//   console.log(result)
// }

// resetBtn.addEventListener('click', reset);

// function reset() {
//   playerScore = 0;
//   computerScore = 0;
//   playerSelection = '';
//   computerSelection = '';
//   result = "Let's battle!";
//   resetBtn.parentElement.classList.remove('show');
//   updateUI();
// }
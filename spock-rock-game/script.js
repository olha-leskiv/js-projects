const playerIcons = document.querySelectorAll('#player i');
const playerScoreCont = document.getElementById('player-score');
const computerScoreCont = document.getElementById('computer-score');
const computerIcons = document.querySelectorAll('#computer i');
const playerChoice = document.getElementById('player-choice');
const computerChoice = document.getElementById('computer-choice');
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};


let playerScore = 0;
let computerScore = 0;

// function select(playerSelection) {
//   let keys = Object.keys(choices);
//   let computerSelection = keys[Math.floor(Math.random() * 5)];


//   for(let icon of playerIcons) {
//     if(icon.title.toLowerCase() == playerSelection) {
//       icon.classList.add('selected');
//       playerChoice.textContent = " --- " + playerSelection;
//     } else {
//       icon.classList.add('disabled');
//       icon.classList.remove('selected');
//     }
//   }
  
//   for(let icon of computerIcons) {
//     if(icon.title.toLowerCase() == computerSelection) {
//       icon.classList.add('selected');
//       computerChoice.textContent = " --- " + computerSelection;
//     } else {
//       icon.classList.add('disabled');
//       icon.classList.remove('selected');
//     }
//   }

//   for(let choice in choices) {
//     if(choice == playerSelection) {
//       if(playerSelection === computerSelection) {
//         return
//       }
//       if(choices[choice].defeats.some(equal)) {
//         playerScore++
//         playerScoreCont.textContent = playerScore;
//           console.log('win')
//       } else {
//         computerScore++
//         computerScoreCont.textContent = computerScore;
//       }

//       function equal(elem) {
//         return elem === computerSelection;
//       }
//     }
//   }
// }
  
function select(playerSelection) {
  let computerSelection =  Object.keys(choices)[Math.floor(Math.random() * 5)];
  for(let choice in choices) {
    let choiceName = choices[choice].name.toLowerCase();

    if(choiceName == playerSelection) {

      if(choices[choice].defeats.some((elem) => elem ===   computerSelection)) {
          playerScore++
          playerScoreCont.textContent = playerScore;
      }
    }
    if(choiceName == computerSelection) {
      if(choices[choice].defeats.some((elem) => elem === playerSelection)) {
          computerScore++
          computerScoreCont.textContent = computerScore;
      }
    }
  }
  console.log(playerSelection, playerScore, computerSelection, computerScore)
}
const playerIcons = document.querySelectorAll('#player i');
const playerChoice = document.getElementById('player-choice');
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

function select(playerSelection) {
  for(let icon of playerIcons) {
    if(icon.title.toLowerCase() == playerSelection) {
      icon.classList.add('selected');
      playerChoice.textContent = " --- " + playerSelection;
    } else {
      icon.classList.add('disabled');
    }
  }
  
  console.log(choices.playerSelection)
  
  console.log(choices.playerSelection.defeats.some(computerSelection))

  let computerSelection = playerIcons[Math.floor(Math.random() * 5)];
  computerSelection = computerSelection.title.toLowerCase();
  if(choices.playerSelection.defeats.some(computerSelection)) {
    console.log('win')
  }
}


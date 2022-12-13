function battle(event) {

  let playerChoiceEl = event.target;
  let computerChoiceEl = getComputerChoiceEl();

  switch(getWinner(playerChoiceEl, computerChoiceEl)) {
    case 'player':
      increaseScore('player')
      setResult('You won!');
      break;
    case 'computer':
      increaseScore('computer');
      setResult('Computer won!');
      break;
    case 'nobody':
      setResult("it's a tie.");
      break;
  }
  resetStyles();
  showSelection(playerChoiceEl, computerChoiceEl)
  showType(playerChoiceEl, computerChoiceEl)
  showResetBtn();
}

function getComputerChoiceEl() {
  const computerIcons = document.querySelectorAll('#computer i');
  let computerChoiceEl = computerIcons[Math.floor(Math.random() * 5)];
  return computerChoiceEl
}

function getWinner(playerChoiceEl, computerChoiceEl) {

  const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
  };

  let playerType = getType(playerChoiceEl);
  let computerType = getType(computerChoiceEl);

  const playerWins = choices[playerType].defeats.some(type => type === computerType);

  const computerWins = choices[computerType].defeats.some(type => type === playerType);

  if(playerWins) {
    return 'player'
  } else if(computerWins) {
    return 'computer'
  } else {
    return 'nobody'
  }
}

function showSelection(playerChoiceEl, computerChoiceEl) {
  playerChoiceEl.classList.add('selected');
  computerChoiceEl.classList.add('selected');    
}

function showType(playerChoiceEl, computerChoiceEl) {

  let playerType = getType(playerChoiceEl);
  let computerType = getType(computerChoiceEl);

  if(playerChoiceEl && computerChoiceEl) {
    playerType = " --- " + playerType;
    computerType =  " --- " + computerType;
  } else {
    playerType = '';
    computerType = '';
  }

  const playerChoiceCont = document.getElementById('player-choice');
  const computerChoiceCont = document.getElementById('computer-choice');
  playerChoiceCont.textContent = playerType;
  computerChoiceCont.textContent = computerType;
}

function increaseScore(combatant) {
  const scoreCont = document.getElementById(`${combatant}-score`);
  let score = Number(scoreCont.textContent);
  score++;
  scoreCont.textContent = score;
}

function getType(element) {
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
  const resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', resetGame);
  resetBtn.parentElement.classList.add('show');
}

function resetGame() {
  resetStyles();
  resetScore();
  hideResetBtn();
  setResult("Let's battle!");
}

function resetScore() {
  const playerScoreCont = document.getElementById(`player-score`)
  const computerScoreCont = document.getElementById(`computer-score`)
  playerScoreCont.textContent = 0;
  computerScoreCont.textContent = 0;
}

function hideResetBtn() {
  const resetBtn = document.getElementById('reset');
  resetBtn.parentElement.classList.remove('show');
}



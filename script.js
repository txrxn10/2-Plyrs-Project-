const timerElement = document.getElementById('timer');
const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-btn');
const playerScoresElement = document.getElementById('player-scores');

let timeLeft = 60;
let intervalId;
let playerScores = {};

function startGame() {
  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(intervalId);
  wordInput.disabled = true;
  submitButton.disabled = true;
  // Calculate and display the winner
  const winner = calculateWinner();
  const resultMessage = winner ? `Player ${winner} wins!` : 'It\'s a tie!';
  playerScoresElement.textContent = resultMessage;
}

function calculateWinner() {
  let maxScore = 0;
  let winner = null;
  for (const player in playerScores) {
    if (playerScores[player] > maxScore) {
      maxScore = playerScores[player];
      winner = player;
    } else if (playerScores[player] === maxScore) {
      winner = null; // It's a tie
    }
  }
  return winner;
}

function handleSubmit() {
  const word = wordInput.value.trim().toLowerCase();
  if (word.length > 0) {
    // Increment the score for the current player
    playerScores['currentPlayer'] = (playerScores['currentPlayer'] || 0) + 1;
    wordInput.value = '';
    updatePlayerScores();
  }
}

function updatePlayerScores() {
  playerScoresElement.innerHTML = '';
  for (const player in playerScores) {
    const playerScoreElement = document.createElement('div');
    playerScoreElement.textContent = `Player ${player}: ${playerScores[player]}`;
    playerScoresElement.appendChild(playerScoreElement);
  }
}

// Add event listeners
submitButton.addEventListener('click', handleSubmit);

// Start the game
startGame();

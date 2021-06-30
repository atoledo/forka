const socket = io("http://localhost:3000");
const gameWord = document.getElementById("game-word");
const maxAttempts = 10;

socket.on('connect', () => {
  console.log(`Socket ID: ${socket.id}`)
});

socket.on('setup', (state) => {  
  const wordLength = state.length;
  const result = state.gameResult;
  
  setupWord(wordLength);
  checkGameComplete(result);
});

socket.on("update-game", (state) => {
  console.log(state);
  
  updateWord(state.word);
  updateWrongGuesses(state.wrongGuesses);
  checkGameComplete( state.gameResult);
});

// const word = [
//   "b",
//   "a",
//   "n",
//   "a",
//   "n",
//   "a"
// ];

function setupWord(wordLength) {
  gameWord.innerHTML = "";

  for (let i = 0; i < wordLength; i++) {
    gameWord.innerHTML += `<p id="game-letter-${i}" class="game-letter">_</p>`;
  }
}

function updateWord(wordArray) {
  for (var i = 0; i < wordArray.length; i++) {
    document.getElementById(`game-letter-${i}`).textContent = wordArray[i] ? wordArray[i] : "_";
  }
}

function updateWrongGuesses(wrongLettersArray) {
  const wrongGuesses = document.getElementById("wrong-guesses");
  wrongGuesses.innerHTML = "";
  for (var i = 0; i < wrongLettersArray.length; i++) {
    wrongGuesses.innerHTML += `<p id="wrong-letter-${i}" class="game-letter">${wrongLettersArray[i]}</p>`;
  }
}

function guessLetter(letter) {
  socket.emit("guess-letter", letter);
}

function newGame(word) {
  socket.emit("new-game", word);
}

function checkGameComplete(result) {
  document.getElementById("game-status-result").textContent = result ? "Complete" : "In Progress";
}

window.guessLetter = guessLetter;
window.newGame = newGame;

// setTimeout(() => {
//   const wrongGuesses = document.getElementById("wrong-guesses");
//   wrongGuesses.innerHTML += `<p id="wrong-letter-0" class="game-letter">z</p>`;
//   wrongGuesses.innerHTML += `<p id="wrong-letter-1" class="game-letter">p</p>`;
// }, 3000)
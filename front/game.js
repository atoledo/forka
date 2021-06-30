import createKeyboardListener from './keybinds.js'

const socket = io("http://localhost:3000");
const keyboardListener = createKeyboardListener(document)
const gameWord = document.getElementById("game-word");

keyboardListener.setupBtn("guess-letter-btn", "guess-letter-text", guessLetter);
keyboardListener.setupBtn("new-game-btn", "new-game-text", newGame);

socket.on('connect', () => {
  console.log(`Socket ID: ${socket.id}`)
});

socket.on('setup', (state) => {  
  console.log(state);

  setupWord(state.length);
  updateWrongGuesses(state.wrongGuesses);
  updatePlayers(state.players);
  setGameComplete(state.gameResult, state.word);
});

socket.on("update-game", (state) => {
  console.log(state);
  
  updateWord(state.word);
  updateWrongGuesses(state.wrongGuesses);
  updatePlayers(state.players);
  setGameComplete(state.gameResult, state.word);
});

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

function updatePlayers(players) {
  const wrongGuesses = document.getElementById("game-players-container");
  wrongGuesses.innerHTML = "";
  for (var i = 0; i < players.length; i++) {
    wrongGuesses.innerHTML += `<p id="player-${i}" class="player">${players[i]}</p>`;
  }
}

function guessLetter(letter) {
  if (isGameComplete()) {
    alert("Game is already complete! Please start a new game.");
    return;
  }

  socket.emit("guess-letter", letter);
}

function newGame(word) {
  if (word.length <= 0) {
    alert("Please enter a valid word!");
    return;
  }

  if (!isGameComplete()) {
    alert("Game not complete yet!");
    return;
  }

  socket.emit("new-game", word);
}

function setGameComplete(result, word) {
  if (word.length > 0) {
    document.getElementById("game-status-result").textContent = result ? "Complete" : "In Progress";
  }
}

function isGameComplete() {
  return document.getElementById("game-status-result").textContent === "In Progress" ? false : true;
}
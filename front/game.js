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
  updateWord(state.word);
  updateWrongGuesses(state.wrongGuesses);
  updatePlayers(socket.id, state.players);
  setGameComplete(state.gameResult, state.word);
});

socket.on("update-game", (state) => {
  console.log(state);
  
  updateWord(state.word);
  updateWrongGuesses(state.wrongGuesses);
  updatePlayers(socket.id, state.players);
  setGameComplete(state.gameResult, state.word);
});

function setupWord(wordLength) {
  gameWord.innerHTML = "";

  for (let i = 0; i < wordLength; i++) {
    gameWord.innerHTML += `<p id="game-letter-${i}" class="game-letter">_</p>`;
  }
}

function updateWord(wordArray) {
  const gameWord = document.getElementById("game-word");

  for (var i = 0; i < wordArray.length; i++) {
    const content = wordArray[i] ? wordArray[i] : "_";
    const letterElement = document.getElementById(`game-letter-${i}`);

    if (letterElement === null) {
      gameWord.innerHTML += `<p id="game-letter-${i}" class="game-letter">${content}</p>`;
    }
    else {
      letterElement.textContent = content;
    }
  }
}

function updateWrongGuesses(wrongLettersArray) {
  const wrongGuesses = document.getElementById("wrong-guesses");
  wrongGuesses.innerHTML = "";
  for (var i = 0; i < wrongLettersArray.length; i++) {
    wrongGuesses.innerHTML += `<p id="wrong-letter-${i}" class="game-letter">${wrongLettersArray[i]}</p>`;
  }
}

function updatePlayers(activePlayer, players) {
  const wrongGuesses = document.getElementById("game-players-container");
  wrongGuesses.innerHTML = "";
  for (var i = 0; i < players.length; i++) {
    let activePlayerClass = players[i] === activePlayer ? " active-player" : "";
    wrongGuesses.innerHTML += `<p id="player-${i}" class="player${activePlayerClass}">${players[i]}</p>`;
  }
}

function guessLetter(letter) {
  if (letter <= 0) {
    alert("Please enter a letter!");
    return;
  }

  if (isGameComplete()) {
    alert("Game is already complete! Please start a new game.");
    return;
  }
  
  if (!isGameStarted()) {
    alert("Game is not started! Please start a new game.");
    return;
  }

  socket.emit("guess-letter", letter);
}

function newGame(word) {
  if (word.length <= 0) {
    alert("Please enter a word!");
    return;
  }

  if (!isGameComplete()) {
    alert("Game not complete yet!");
    return;
  }

  socket.emit("new-game", word);
}

function setGameComplete(result, word) {
  if (word.length == 0) {
    document.getElementById("game-status-result").textContent = "Loading...";
    return;
  }

  if (result) {
    document.getElementById("game-status-result").textContent = "Complete";
    document.getElementById("new-game-container").classList.remove("hidden");
    document.getElementById("guess-letter-container").classList.add("hidden");
    return
  }
  
  document.getElementById("game-status-result").textContent = "In Progress";
  document.getElementById("new-game-container").classList.add("hidden");
  document.getElementById("guess-letter-container").classList.remove("hidden");
}

function isGameComplete() {
  return document.getElementById("game-status-result").textContent === "Complete"
    || document.getElementById("game-status-result").textContent === "Loading...";
}

function isGameStarted() {
  return document.getElementById("game-status-result").textContent === "In Progress" ? true : false;
}
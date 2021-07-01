import { GameState } from "./types/GameState";
import { GameStateResponse } from "./types/GameStateResponse";
import LetterGuessService from "./LetterGuessService";

export default class Forka {
  private letterGuessService: LetterGuessService;
  public state: GameState;

  constructor() {
    this.letterGuessService = new LetterGuessService();
    this.state = {
      selectedWord: "",
      public: {
        length: 0,
        word: [],
        wrongGuesses: [],
        gameResult: false,
        players: [],
      },
    };
  }

  addPlayer(playerId: string): GameStateResponse {
    this.state.public.players.push(playerId);
    return { ...this.state.public, actionResult: null };
  }

  removePlayer(playerId: string): GameStateResponse {
    console.log(`Removing player: ${playerId}`);
    this.state.public.players = this.state.public.players.filter(
      (item) => item !== playerId
    );
    return { ...this.state.public, actionResult: null };
  }

  generateGame(selectedWord: string): GameStateResponse {
    const len = selectedWord.length;

    this.state.selectedWord = selectedWord.toLowerCase();
    this.state.public.length = len;
    this.state.public.word = new Array<string>(len);
    this.state.public.wrongGuesses = [];
    this.state.public.gameResult = false;

    return { ...this.state.public, actionResult: null };
  }

  guessLetter(letter: string): GameStateResponse {
    console.log(
      `Guessing letter [${letter}] of selected word [${this.state.selectedWord}]`
    );

    if (this.isGameInitialized()) {
      return {
        ...{
          length: 0,
          word: [],
          wrongGuesses: [],
          gameResult: false,
          players: [],
        },
        actionResult: false,
      };
    }

    if (
      this.letterGuessService.isDuplicatedLetterGuess(letter, this.state.public)
    ) {
      return { ...this.state.public, actionResult: null };
    }

    const indexesFound = this.letterGuessService.findLetter(
      letter,
      this.state.selectedWord
    );
    const actionResult = indexesFound.length > 0 ? true : false;

    actionResult
      ? this.letterGuessService.updateLetterFound(
          indexesFound,
          this.state.public,
          letter
        )
      : this.letterGuessService.updateWrongGuess(this.state.public, letter);

    this.state.public.gameResult = this.letterGuessService.isAllLettersFound(
      this.state.public.word,
      this.state.public.length
    );

    return { ...this.state.public, actionResult: actionResult };
  }

  private isGameInitialized(): boolean {
    return this.state.selectedWord.length === 0;
  }
}

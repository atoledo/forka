import { GameState } from "./types/GameState";
import { GameStateResponse } from "./types/GameStateResponse";
import LetterGuessService from "./LetterGuessService";

const emptyGamePublic = {
  length: 0,
  word: [],
  wrongGuesses: [],
  gameResult: false,
};

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
      },
    };
  }

  generateGame(selectedWord: string) {
    const len = selectedWord.length;

    this.state.selectedWord = selectedWord;
    this.state.public.length = len;
    this.state.public.word = new Array<string>(len);
    this.state.public.wrongGuesses = [];
    this.state.public.gameResult = false;

    return this.state.public;
  }

  isGameInitialized(): boolean {
    return this.state.selectedWord.length === 0;
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

    indexesFound.forEach((item) => {
      this.state.public.word[item] = letter;
    });

    this.state.public.gameResult = this.letterGuessService.isAllLettersFound(
      this.state.public.word,
      this.state.public.length
    );

    return { ...this.state.public, actionResult: actionResult };
  }
}

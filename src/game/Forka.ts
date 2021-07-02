import { GameState, GameStatePublic } from "./types/GameState";
import { GameStateResponse } from "./types/GameStateResponse";
import LetterGuessService from "./service/LetterGuessService";
import PlayerService from "./service/PlayerService";

export default class Forka {
  private letterGuessService: LetterGuessService;
  private playerService: PlayerService;
  public state: GameState;

  constructor() {
    this.letterGuessService = new LetterGuessService();
    this.playerService = new PlayerService();

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
    this.playerService.addPlayer(playerId, this.state.public.players);
    return { ...this.state.public, actionResult: null };
  }

  removePlayer(playerId: string): GameStateResponse {
    this.playerService.removePlayer(playerId, this.state.public.players);
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

  guessLetter(playerId: string, letter: string): GameStateResponse {
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

    const indexesFound: number[] = this.letterGuessService.findLetter(
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

    this.checkGameComplete(playerId, this.state.public);

    return { ...this.state.public, actionResult: actionResult };
  }

  private checkGameComplete(playerId: string, statePublic: GameStatePublic) {
    const isGameCompleted: boolean = this.letterGuessService.isAllLettersFound(
      this.state.public.word,
      this.state.public.length
    );
    this.state.public.gameResult = isGameCompleted;
    if (isGameCompleted) {
      this.playerService.scorePointToPlayer(playerId, statePublic.players);
    }
  }

  private isGameInitialized(): boolean {
    return this.state.selectedWord.length === 0;
  }
}

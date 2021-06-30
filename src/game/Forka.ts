import { GameState } from "./types/GameState";

export default class Forka {
  public state: GameState;

  constructor() {
    this.state = {
      selectedWord: "",
      public: {
        length: 0,
        word: [],
        result: false,
      },
    };
  }

  generateGame(selectedWord: string) {
    const len = selectedWord.length;

    this.state.selectedWord = selectedWord;
    this.state.public.length = len;
    this.state.public.word = new Array<string>(len);

    return this.state.public;
  }

  guessLetter(letter: string) {
    console.log(
      `Guessing letter [${letter}] of selected word [${this.state.selectedWord}]`
    );
    // TODO how to treat error of game not initialized???
    if (this.state.selectedWord.length === 0) {
      return {};
    }
    const indexesFound = this.getIndexesOf(letter, this.state.selectedWord);

    indexesFound.forEach((item) => {
      this.state.public.word[item] = letter;
    });

    const lettersFound = this.state.public.word.filter(
      (item) => item.length > 0
    ).length;

    this.state.public.result = lettersFound === this.state.public.length;
    return this.state.public;
  }

  private getIndexesOf(search: string, word: string) {
    let startIndex = 0,
      index,
      indexes = [];

    while ((index = word.indexOf(search, startIndex)) > -1) {
      indexes.push(index);
      startIndex = index + 1;
    }

    console.log(`Indexes found: ${indexes}`);
    return indexes;
  }
}

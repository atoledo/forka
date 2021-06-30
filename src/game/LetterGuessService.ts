import { GameStatePublic } from "./types/GameState";

export default class LetterGuessService {
  public findLetter(letter: string, word: string): number[] {
    return this.getIndexesOfLetter(letter, word);
  }

  public isDuplicatedLetterGuess(
    letter: string,
    statePublic: GameStatePublic
  ): boolean {
    const correctGuessFound = statePublic.word.find((item) => item === letter);
    const wrongGuessFound = statePublic.wrongGuesses.find(
      (item) => item === letter
    );
    return (
      typeof correctGuessFound !== "undefined" ||
      typeof wrongGuessFound !== "undefined"
    );
  }

  public updateLetterFound(
    indexesFound: number[],
    statePublic: GameStatePublic,
    letter: string
  ) {
    indexesFound.forEach((item) => {
      statePublic.word[item] = letter;
    });
  }

  public updateWrongGuess(statePublic: GameStatePublic, letter: string) {
    statePublic.wrongGuesses.push(letter);
  }

  public isAllLettersFound(word: string[], wordLength: number): boolean {
    const lettersFound = word.filter((item: string) => item.length > 0).length;

    return lettersFound === wordLength;
  }

  private getIndexesOfLetter(search: string, word: string): number[] {
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

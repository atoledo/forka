export type GameState = {
  selectedWord: string;
  public: GameStatePublic;
};

export type GameStatePublic = {
  length: number;
  word: Array<string>;
  wrongGuesses: Array<string>;
  gameResult: boolean;
  players: string[];
};

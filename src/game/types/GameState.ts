export type GameState = {
  selectedWord: string;
  public: {
    length: number;
    word: Array<string>;
    result: boolean;
  };
};

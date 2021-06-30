import { GameStatePublic } from "./GameState";

export type GameStateResponse = GameStatePublic & {
  actionResult: boolean | null;
};

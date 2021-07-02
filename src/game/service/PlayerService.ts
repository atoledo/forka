import { Player } from "../types/Player";

export default class PlayerService {
  addPlayer(username: string, playerState: Player[]) {
    const player = { username: username, points: 0 };

    playerState.push(player);
  }

  removePlayer(username: string, playerState: Player[]) {
    const playerIndex = playerState.findIndex(
      (item) => item.username === username
    );

    if (playerIndex >= 0) {
      playerState.splice(playerIndex, 1);
    }
  }

  scorePointToPlayer(username: string, playerState: Player[]) {
    const player = playerState.find((item) => item.username === username);

    if (typeof player === "undefined") {
      throw new Error("Player not found");
    }

    player.points++;
  }
}

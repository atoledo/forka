import PlayerService from "../../../game/service/PlayerService";
import { Player } from "../../../game/types/Player";

const playerService = new PlayerService();

describe("Test add/remove Player Service", () => {
  const playerState: Player[] = [];
  it("should add a new player to empty list", () => {
    playerService.addPlayer("username1", playerState);
    expect(playerState.length).toBe(1);
    expect(playerState[0].points).toBe(0);
  });

  it("should add a new player to existing list", () => {
    playerService.addPlayer("username2", playerState);
    expect(playerState.length).toBe(2);
  });

  it("should not fail when removing unexisting player from list", () => {
    playerService.removePlayer("not-present-username", playerState);
    expect(playerState.length).toBe(2);
  });

  it("should remove an existing player from list", () => {
    playerService.removePlayer("username2", playerState);
    expect(playerState.length).toBe(1);
  });

  it("should remove the last player from list", () => {
    playerService.removePlayer("username1", playerState);
    expect(playerState.length).toBe(0);
  });

  it("should not fail when removing unexisting player from empty list", () => {
    playerService.removePlayer("not-exists", playerState);
    expect(playerState.length).toBe(0);
  });
});

describe("Test score points from Player Service", () => {
  const playerState: Player[] = [
    {
      username: "username1",
      points: 0,
    },
  ];
  it("should add score a point to existing player", () => {
    playerService.scorePointToPlayer("username1", playerState);
    playerService.scorePointToPlayer("username1", playerState);
    expect(playerState.length).toBe(1);
    expect(playerState[0].points).toBe(2);
  });
  it("should throw exception when username is not found", () => {
    const t = () => {
      playerService.scorePointToPlayer("not-exists", playerState);
    };
    expect(t).toThrowError(Error);
  });
});

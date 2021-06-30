import * as SocketIO from "socket.io";
import Forka from "./game/Forka";

export default class GameServer {
  private forka: Forka;

  constructor(private io: any) {
    console.log("Constructing Game Server");
    this.io = io;
    this.forka = new Forka();

    this.setupSocketActions();
  }

  private setupSocketActions() {
    console.log("Setup Socket Actions");
    this.io.on("connection", (socket: any) => {
      console.log(socket.id);

      socket.on("guess-letter", (letter: string) => {
        const state = this.forka.guessLetter(letter.toLowerCase());
        socket.emit("update-game", state);
      });

      socket.on("new-game", (word: string) => {
        const state = this.forka.generateGame(word);
        socket.emit("setup", state);
      });

      socket.on("disconnect", (socket: any) => {
        console.log(`Player disconnected: ${socket.id}`);
      });
    });
  }
}

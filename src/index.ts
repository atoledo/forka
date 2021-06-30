import express from "express";
import { createServer } from "http";
import cors from "cors";
import { gameRoutes } from "./controller/gameRoutes";
import { Server, Socket } from "socket.io";
import GameServer from "./GameServer";

const app = express();
app.use(cors());
const server = createServer(app);
export const sockets = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:8080",
    methods: ["GET", "POST"],
  },
});

const port = 3000;
app.use("/game", gameRoutes);

const gameServer = new GameServer(sockets);
// gameServer.setupSocketActions();

server.listen(port, () => console.log(`Server started on port ${port}`));

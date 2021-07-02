import { Request, Response, Router } from "express";
import Forka from "../game/Forka";

const gameRoutes = Router();
const forka = new Forka();
forka.generateGame("banana");

gameRoutes.get("/", (_: Request, res: Response) => {
  return res.json({ state: forka.generateGame("banana") });
});

gameRoutes.post("/guess/:letter", (req: Request, res: Response) => {
  const { letter } = req.params;
  let username = req.get("username");
  if (typeof username === "undefined") {
    username = "";
  }
  return res.json(forka.guessLetter(username, letter));
});

export { gameRoutes };

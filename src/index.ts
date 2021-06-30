import express from "express";
import { gameRoutes } from "./controller/gameRoutes";

const app = express();
const port = 3000;
app.use("/game", gameRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));

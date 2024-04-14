import cors from "cors";
import express, { Request, Response } from "express";
import { Dealer } from "./dealer";

// Create Express server
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
const dealer = new Dealer();

app.get("/v1/games", (req: Request, res: Response) => {
  const response = {
    message: "Hello, World! How are you",
  };
  // console.log(req.body);
  res.json(response);
});

app.post("/v1/games", (req: Request, res: Response) => {
  const teams = req.body.teams;
  console.log(teams);
  for (let team of teams) for (let player of team.players) console.log(player);
  const game = dealer.startNewGame(teams);
  res.json(game);
});

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

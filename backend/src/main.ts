import cors from "cors";
import express from "express";
import http from "http";
import WebSocket from "ws";
import { PlayerMessagePayload } from "../../common/types";
import { Dealer } from "./dealer";
import {
  handleOnClose,
  handleOnConnection,
  socketMessageHandlers,
} from "./socket-helpers";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
export const wss = new WebSocket.Server({ server });
export const dealer = new Dealer();

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// const messageActionMap: Map<PlayerAction, Function> = new Map([
//   [PlayerAction.CREATE_GAME, createNewGame],
// ]);

wss.on("connection", (ws) => {
  handleOnConnection(ws);

  ws.onmessage = (event) => {
    console.log("got message");
    const payload: PlayerMessagePayload = JSON.parse(
      event.data.toString("utf-8")
    );
    const handler = socketMessageHandlers.get(payload.event);

    if (!handler)
      throw ReferenceError(
        `No handler defined for player event: ${payload.event}`
      );

    const response = handler(payload.body);
    ws.send(JSON.stringify(response));

    console.log("Active games:", dealer.getActiveGames.size);
  };

  ws.onclose = handleOnClose;
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

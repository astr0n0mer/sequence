import WebSocket from "ws";
import { PlayerEvent, ServerEvent } from "../../common/enums";
import { Team } from "../../common/types";
import { dealer, wss } from "./main";

export const handleOnConnection = (ws: WebSocket) => {
  console.log(`+ connected users: ${wss.clients.size}`);
  // inform all players that someone joined
  //   wss.clients.forEach((client) => {
  //     if (client === ws) return;

  //     const payload: ServerMessagePayload = {
  //       event: ServerEvent.PLAYER_JOINED,
  //       body: {
  //         message: "A new player joined",
  //       },
  //     };
  //     client.send(JSON.stringify(payload));
  //   });
  //   console.log(`Connected players: ${Array.from(wss.clients).length}`);
};

export const handleOnClose = (event: WebSocket.CloseEvent) => {
  console.log(`- connected users: ${wss.clients.size}`);
  // inform all players that someone left
  //   wss.clients.forEach((client) => {
  //     if (client === event.target) return;

  //     const payload: ServerMessagePayload = {
  //       event: ServerEvent.PLAYER_LEFT,
  //       body: {
  //         message: "A player left",
  //       },
  //     };
  //     client.send(JSON.stringify(payload));
  //   });
};

export const handleCreateGame = (payloadData: any) => {
  // console.log("handleCreateGame", payloadData);
  const teams: Team[] = payloadData.teams;
  // console.log(teams);
  // for (let team of teams) for (let player of team.players) console.log(player);
  const game = dealer.startNewGame(teams);
  // console.log(game.teams);
  // game.teams.forEach((team) =>
  //   console.log(JSON.stringify(team.players, null, 2))
  // );
  return { event: ServerEvent.GAME_CREATED, body: game };
};

export const socketMessageHandlers: Map<PlayerEvent, Function> = new Map([
  [PlayerEvent.CREATE_GAME, handleCreateGame],
  // [ServerEvent.PLAYER_JOINED, handlePlayerJoined],
]);

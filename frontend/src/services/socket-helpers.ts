import { PlayerEvent, ServerEvent } from "../../../common/enums";
import { Game, PlayerMessagePayload } from "../../../common/types";
import { Screen } from "../types";

export const handleGameCreated = (payloadData: Game, setState: any) => {
  const { board, teams } = payloadData;
  console.info(typeof setState);

  setState((prevState: any) => ({
    ...prevState,
    board,
    teams,
    playerCards: teams[0].players[0].cards,
    chipColor: teams[0].chipColor,
    gameStatus: Screen.BOARD,
  })); // TODO: use proper type here instead of any
};

export const handlePlayerJoined = (payloadData: object) => {
  console.info(payloadData);
};

export const socketMessageHandlers: Map<ServerEvent, Function> = new Map([
  [ServerEvent.GAME_CREATED, handleGameCreated],
  [ServerEvent.PLAYER_JOINED, handlePlayerJoined],
]);

export const createNewGame = ({ globalState, setGlobalState }) => {
  const { teams } = globalState;

  console.log("about to submit create game message");
  const { websocket } = globalState;
  if (websocket.readyState === WebSocket.OPEN) {
    const payload: PlayerMessagePayload = {
      event: PlayerEvent.CREATE_GAME,
      body: {
        message: "Request to create game",
        teams,
      }, // TODO: need to add some players and teams here
    };

    websocket.send(JSON.stringify(payload));
  } else {
    console.error("Could not establish connection with the server");
    console.error(websocket);
  }
};

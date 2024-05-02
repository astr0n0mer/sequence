import { Dispatch, SetStateAction } from "react";
import { PlayerEvent, ServerEvent } from "../../../common/enums";
import { PlayerMessagePayload } from "../../../common/types";
import { GlobalStateType } from "../types";

export const handlePlayerJoined = (payloadData: object) => {
  console.info(payloadData);
};

export const socketMessageHandlers: Map<ServerEvent, Function> = new Map([
  //   [ServerEvent.GAME_CREATED, handleGameCreated],
  [ServerEvent.PLAYER_JOINED, handlePlayerJoined],
]);

export const createNewGame = ({
  globalState,
  setGlobalState,
}: {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
}) => {
  const { teams } = globalState;

  console.log("about to submit create game message");
  const { websocket } = globalState;
  if (!websocket) {
    console.error("No connection found");
    return;
  }

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

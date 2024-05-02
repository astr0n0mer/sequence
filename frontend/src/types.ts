import { Dispatch, SetStateAction } from "react";
import { PlayerEvent, ServerEvent } from "../../common/enums";
import { Card, CardOnBoard, Team } from "../../common/types";

export enum Screen {
  MENU,
  BOARD,
}

export type GlobalStateType = {
  websocket?: WebSocket;
  playerEvent?: PlayerEvent;
  serverEvent?: ServerEvent;
  gameId?: string;

  gameStatus: Screen; // TODO: check if this can be removed
  board: CardOnBoard[];
  teams: Team[]; // TODO: check if this can be removed
  playerCards: Card[];
  chipColor: string;
};

export type GlobalContextType = {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
};

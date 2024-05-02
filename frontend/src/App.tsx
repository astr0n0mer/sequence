import { createContext, useEffect, useState } from "react";
import { PlayerEvent } from "../../common/enums";
import {
  Card,
  CardOnBoard,
  ServerMessagePayload,
  Team,
} from "../../common/types";
import "./App.css";
import { Board } from "./components/Board";
import { Form } from "./components/Form";
import { Hand } from "./components/Hand";
import {
  createNewGame,
  socketMessageHandlers,
} from "./services/socket-helpers";
import { Screen } from "./types";

export const GlobalContext: React.Context<any> = createContext({}); // TODO: need to use better typing here instead of any
const API_URL = import.meta.env.VITE_SEQUENCE_API_WEBSOCKET_URL;

function App() {
  const [globalState, setGlobalState] = useState(() => ({
    // websocket: getWebSocket(API_URL),
    teams: [] as Team[],
    board: [] as CardOnBoard[],
    playerCards: [] as Card[],
    chipColor: "",
    gameStatus: Screen.MENU,
  }));
  const [event, setEvent] = useState<PlayerEvent>();

  const getWebSocket = (url: string, setGlobalState: any) => {
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      console.info("Connected to server");
      console.info(event);
    };

    ws.onclose = (event) => {
      console.info("Connection closed");
      console.info(event);
    };

    ws.onerror = (event) => {
      console.error("An error occurred");
      console.info(event);
    };

    ws.onmessage = (event) => {
      console.info("Message arrived");
      console.info(event);
      const payload: ServerMessagePayload = JSON.parse(event.data);
      const handler = socketMessageHandlers.get(payload.event);

      if (!handler)
        throw ReferenceError(
          `No handler defined for server event: ${payload.event}`
        );

      console.info({ body: payload.body, setGlobalState });
      handler(payload.body, setGlobalState);
    };

    return ws;
  };

  useEffect(() => {
    setGlobalState((prevGlobalState) => ({
      ...prevGlobalState,
      websocket: getWebSocket(API_URL, setGlobalState),
    }));

    return () => {
      console.log("empty effect cleanup");
    };
  }, []);

  useEffect(() => {
    console.info({ event });
    if (event === undefined) return;

    if (event === PlayerEvent.CREATE_GAME) {
      // we will have more event handlers here later
      console.count("I'll be creating the game now");
      createNewGame({ globalState, setGlobalState });
    }
    setEvent(() => undefined);
  }, [event, setEvent]);

  {
    if (globalState.gameStatus === Screen.MENU) {
      return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
          <Form setEvent={setEvent} />
        </GlobalContext.Provider>
      );
    } else if (globalState.gameStatus === Screen.BOARD) {
      return (
        <>
          <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            <Board />
            <Hand />
          </GlobalContext.Provider>
        </>
      );
    } else {
      return (
        <h3>
          Sequence is not available at the moment. Please check again later.
        </h3>
      );
    }
  }
}

export default App;

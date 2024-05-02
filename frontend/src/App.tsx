import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Card,
  CardOnBoard,
  ServerMessagePayload,
  Team,
} from "../../common/types";
import "./App.css";
import { Form } from "./components/Form";
import { Game } from "./components/Game";
import { GlobalContextType, GlobalStateType, Screen } from "./types";

const API_URL = import.meta.env.VITE_SEQUENCE_API_WEBSOCKET_URL;
export const GlobalContext: React.Context<GlobalContextType> = createContext(
  {} as GlobalContextType
);

function App() {
  console.info("%cMounting App", "font-size: 1.5em");
  const [globalState, setGlobalState] = useState<GlobalStateType>(() => ({
    // websocket: getWebSocket(API_URL),
    teams: [] as Team[],
    board: [] as CardOnBoard[],
    playerCards: [] as Card[],
    chipColor: "",
    gameStatus: Screen.MENU,
  }));
  // const [event, setEvent] = useState<PlayerEvent>();

  const setupWebSocket = (
    url: string,
    setGlobalState: Dispatch<SetStateAction<GlobalStateType>>
  ) => {
    console.info("Getting web socket");
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      console.info(event);
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        websocket: ws,
      }));
      console.info("%cConnected to server", "color: green");
    };

    ws.onclose = (event) => {
      // console.info("Connection closed");
      console.info(event);
    };

    ws.onerror = (event) => {
      // console.error("An error occurred");
      console.error(event);
    };

    ws.onmessage = (event) => {
      console.info("%cMessage arrived", "color: dodgerblue");
      console.info(event);
      const payload: ServerMessagePayload = JSON.parse(event.data);
      setGlobalState((prevGlobalState) => ({
        ...prevGlobalState,
        ...payload.body,
        serverEvent: payload.event,
      }));
      // const handler = socketMessageHandlers.get(payload.event);

      // if (!handler)
      //   throw ReferenceError(
      //     `No handler defined for server event: ${payload.event}`
      //   );

      // console.info({ body: payload.body, setGlobalState });
      // handler(payload.body, setGlobalState);
    };

    // return ws;
  };

  useEffect(() => {
    console.info("Making socket connection");
    setupWebSocket(API_URL, setGlobalState);
    // console.info({ websocket });
    // setGlobalState((prevGlobalState) => ({ ...prevGlobalState, websocket }));

    return () => {
      if (globalState.websocket) globalState.websocket.close();
    };
  }, []);

  // useEffect(() => {
  //   console.info({ event });
  //   if (event === undefined) return;

  //   if (event === PlayerEvent.CREATE_GAME) {
  //     // we will have more event handlers here later
  //     console.count("I'll be creating the game now");
  //     createNewGame({ globalState, setGlobalState });
  //   }
  //   setEvent(() => undefined);
  // }, [event, setEvent]);

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/games/:gameId" element={<Game />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;

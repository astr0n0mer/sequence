import { useEffect, useState } from "react";
import { Card, CardOnBoard, Team } from "../../common/types";
import "./App.css";
import Board from "./components/Board";
import Form from "./components/Form";
import { Hand } from "./components/Hand";

enum Screen {
  MENU,
  BOARD,
}

const API_URL = "http://localhost:3000";

function App() {
  const [gameStatus, setGameStatus] = useState(Screen.MENU);
  const [teams, setTeams] = useState<Team[]>([]);
  const [board, setBoard] = useState<CardOnBoard[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);

  const startNewGame = async () => {
    const response = await fetch(`${API_URL}/v1/games`, {
      method: "POST",
      body: JSON.stringify({ teams }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    console.info(data.board);
    console.info(data.teams);

    setBoard(() => data.board);
    setPlayerCards(() => data.teams[0].players[0].cards);
    setGameStatus(() => Screen.BOARD);
  };

  useEffect(() => {
    console.count("Teams changed");
    console.table(teams);

    // TODO: ideally this check should not be needed, find out why it is needed
    if (teams.length === 0) return;
    startNewGame();
  }, [teams]);

  {
    if (gameStatus === Screen.MENU) {
      return <Form setTeams={setTeams} />;
    } else if (gameStatus === Screen.BOARD) {
      return (
        <>
          <Board board={board} playerCards={playerCards} />
          <Hand cards={playerCards} />
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

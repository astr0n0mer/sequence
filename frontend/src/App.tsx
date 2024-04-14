import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Form from "./components/Form";

export type Player = {
  id?: string;
  name: string;
};

export type Team = {
  id?: string;
  name: string;
  players: Player[];
  chipColor: string;
};

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    console.count("Teams changed");
    console.info("Teams changed");
    console.table(teams);
  }, [teams]);

  return (
    <>
      <Form setTeams={setTeams} />
      <Board />
    </>
  );
}

export default App;

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Team } from "../../../common/types";
import IndividualForm from "./IndividualForm";
import TeamForm from "./TeamForm";

type GameMode = "individual" | "team";

type FormProps = {
  setTeams: Dispatch<SetStateAction<Team[]>>;
};

export const Form: FC<FormProps> = ({ setTeams }) => {
  const [gameMode, setGameMode] = useState<GameMode>("individual");
  const [numberOfEntities, setNumberOfEntities] = useState(2);

  return (
    <section>
      <fieldset>
        <legend>Game Mode</legend>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="individual"
            checked={gameMode === "individual"}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />
          Individual
        </label>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="team"
            checked={gameMode === "team"}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />
          Team
        </label>

        <br />
        <label>
          Number of {gameMode === "individual" ? "Players" : "Teams"}:
          <input
            type="number"
            min="2"
            max="96" // since there are only 48 * 2 = 96 cards in a sequence deck
            value={numberOfEntities}
            onChange={(e) => setNumberOfEntities(() => e.target.valueAsNumber)}
          />
        </label>
      </fieldset>

      {gameMode === "individual" ? (
        <IndividualForm
          numberOfPlayers={numberOfEntities}
          setTeams={setTeams}
        />
      ) : (
        <TeamForm numberOfTeams={numberOfEntities} setTeams={setTeams} />
      )}
    </section>
  );
};

export default Form;

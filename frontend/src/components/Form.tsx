import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerEvent, ServerEvent } from "../../../common/enums";
import { GlobalContext } from "../App";
import { createNewGame } from "../services/socket-helpers";
import { IndividualForm } from "./IndividualForm";
import { TeamForm } from "./TeamForm";

type GameMode = "individual" | "team";

export const Form: FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>("individual");
  const [numberOfEntities, setNumberOfEntities] = useState(2);
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const { playerEvent, serverEvent, gameId, teams } = globalState;

    // console.info(globalState);
    if (playerEvent === PlayerEvent.CREATE_GAME && gameId === undefined) {
      console.info("Submitting generic form");
      createNewGame({ globalState, setGlobalState });
    }

    if (
      playerEvent === PlayerEvent.CREATE_GAME &&
      serverEvent === ServerEvent.GAME_CREATED &&
      gameId !== undefined
    ) {
      console.info(globalState);
      console.table(
        globalState.teams
          .flatMap((team) => team.players)
          .flatMap((player) =>
            player.cards.map((card) => ({ id: player.id, ...card }))
          )
      );

      console.log("%cNavigating", "font-size: 2em");
      navigate(`/games/${gameId}`);
    }
  }, [globalState]);

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
            max="24" // since there are only 48 * 2 = 96 cards in a sequence deck
            value={numberOfEntities}
            onChange={(e) => setNumberOfEntities(() => e.target.valueAsNumber)}
          />
        </label>
      </fieldset>

      {gameMode === "individual" ? (
        <IndividualForm numberOfPlayers={numberOfEntities} />
      ) : (
        <TeamForm numberOfTeams={numberOfEntities} />
      )}
    </section>
  );
};

export default Form;

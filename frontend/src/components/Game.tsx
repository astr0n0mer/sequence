import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlayerEvent } from "../../../common/enums";
import { GlobalContext } from "../App";
import Board from "./Board";
import Hand from "./Hand";

export const Game = () => {
  const { globalState } = useContext(GlobalContext);
  const { gameId } = useParams();

  useEffect(() => {
    // throw Error("handle PlayerEvent.JOIN_GAME event");
  }, [globalState]);

  useEffect(() => {
    if (globalState.gameId === undefined) {
      // TODO: get game details from BE
    }

    // TODO: from a call to BE, update which players have already entered this game
    // TODO: handle the case if user has already selected a player, then store that playerId in localStorage and/or sessionStorage (along with the gameId for unique identification) so that player cannot join one game, see cards and then try to join as another
  }, []);

  if (globalState.teams.length === 0)
    return <div>We're getting info from the server</div>;
  if (globalState.playerCards.length === 0) return <ChoosePlayerMenu />;

  return (
    <>
      <Board />
      <Hand />
    </>
  );
};

export default Game;

export const ChoosePlayerMenu = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const playerId = formData.get("playerId");

    const team = globalState.teams.find((team) =>
      team.players.some((player) => player.id === playerId)
    );
    if (!team) throw ReferenceError(`Cannot find player with id=${playerId}`);

    const player = team.players.find((player) => player.id === playerId);
    if (!player) throw ReferenceError(`Cannot find player with id=${playerId}`);

    setGlobalState((prevGlobalState) => ({
      ...prevGlobalState,
      playerCards: player.cards,
      chipColor: team.chipColor,
      playerEvent: PlayerEvent.JOIN_GAME,
    }));
  };

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <label htmlFor="playerId">
        I am
        <select name="playerId" id="playerId" required={true}>
          {globalState.teams
            .flatMap((team) => team.players)
            .map((player) => (
              // TODO: disabled={true}
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
        </select>
      </label>
      <input type="submit" value="Enter" />
    </form>
  );
};

import { FC, useContext, useRef } from "react";
import { PlayerEvent } from "../../../common/enums";
import { Team } from "../../../common/types";
import { GlobalContext } from "../App";

export type IndividualFormProps = {
  numberOfPlayers: number | null;
};

export const IndividualForm: FC<IndividualFormProps> = ({
  numberOfPlayers,
}) => {
  if (!numberOfPlayers) return;
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const playerIdRef = useRef(1e2);
  const localPlayers = new Array(numberOfPlayers)
    .fill(null)
    .map((_, index) => ({
      id: (index + ++playerIdRef.current).toString(),
      name: `Player ${index + 1}`,
      cards: [],
      // chipColor is derived using the unix timestamp in milliseconds but subtracting ${index} days from it
      chipColor:
        "#" + (Date.now() - index * 24 * 60 * 60 * 1000).toString(16).slice(-6),
    }));

  // @ts-ignore
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const localTeams: Team[] = localPlayers.map((player) => {
      const team: Team = {
        id: player.id.toString(),
        name: player.name,
        chipColor: player.chipColor,
        players: [player],
      };
      return team;
    });

    setGlobalState((prevGlobalState) => ({
      ...prevGlobalState,
      teams: localTeams,
      playerEvent: PlayerEvent.CREATE_GAME,
    }));

    console.info("Submitting indi form");
  };

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Players</legend>
        {localPlayers.map((player) => (
          <fieldset key={player.id}>
            <legend>Player ID: {player.id}</legend>
            <label>
              Player Name:
              <input
                type="text"
                required={true}
                name={`player-${player.id}-name`}
                id={`player-${player.id}-name`}
                pattern="[\w\d\s]+"
                defaultValue={player.name}
              />
            </label>
            <label>
              Chip color:
              <input
                type="color"
                required={true}
                name={`player-${player.id}-chip-color`}
                id={`player-${player.id}-chip-color`}
                defaultValue={player.chipColor}
              />
            </label>
          </fieldset>
        ))}
      </fieldset>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default IndividualForm;

import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Team } from "../App";

export type IndividualFormProps = {
  numberOfPlayers: number | null;
  setTeams: Dispatch<SetStateAction<Team[]>>;
};

export const IndividualForm: FC<IndividualFormProps> = ({
  numberOfPlayers,
  setTeams,
}) => {
  if (!numberOfPlayers) return;

  const playerIdRef = useRef(1e2);
  const localPlayers = new Array(numberOfPlayers)
    .fill(null)
    .map((_, index) => ({
      id: (index + ++playerIdRef.current).toString(),
      name: `Player ${index + 1}`,
      // chipColor is derived using the unix timestamp in milliseconds but subtracting ${index} days from it
      chipColor:
        "#" + (Date.now() - index * 24 * 60 * 60 * 1000).toString(16).slice(-6),
    }));

  //   console.info({ numberOfPlayers, playerIds: localPlayers });
  //   console.table(localPlayers);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.info(event);

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
    // console.info(formData);
    // console.info(formData.get("player-101-name"));
    // console.table(localTeams);
    setTeams(() => localTeams);
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

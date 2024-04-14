import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Player, Team } from "../../../common/types";

export type TeamFormProps = {
  numberOfTeams: number | null;
  setTeams: Dispatch<SetStateAction<Team[]>>;
};

export const TeamForm: FC<TeamFormProps> = ({ numberOfTeams, setTeams }) => {
  if (!numberOfTeams) return;

  const teamIdRef = useRef(1e5);
  const playerIdRef = useRef(1e2);

  const [numberOfPlayersPerTeam, setNumberOfPlayersPerTeam] =
    useState<number>(2);

  console.info({ numberOfTeams, numberOfPlayersPerTeam });

  const localTeams = new Array(numberOfTeams).fill(null).map((_, index) => ({
    id: (index + ++teamIdRef.current).toString(),
    name: `Team ${index + 1}`,
    // chipColor is derived using the unix timestamp in milliseconds but subtracting ${index} days from it
    chipColor:
      "#" + (Date.now() - index * 24 * 60 * 60 * 1000).toString(16).slice(-6),
  }));

  const localPlayers: Player[] = new Array(
    numberOfTeams * numberOfPlayersPerTeam
  )
    .fill(null)
    .map((_, index) => ({
      id: (index + ++playerIdRef.current).toString(),
      name: `Player ${index + 1}`,
      cards: [],
    }));

  console.table(localTeams);

  const validateSubmittedForm = () => {};

  // @ts-ignore
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.info(event);

    validateSubmittedForm();

    const formData = new FormData(event.target);

    const teamIdToPlayersMap = localPlayers.reduce((map, localPlayer) => {
      const teamId = formData.get(`player-${localPlayer.id}-team`) as string;
      const playerName = formData.get(
        `player-${localPlayer.id}-name`
      ) as string;

      const player = {
        id: localPlayer.id,
        name: playerName,
      };

      // @ts-ignore
      if (!map.hasOwnProperty(teamId)) map[teamId] = [];

      // @ts-ignore
      map[teamId].push(player);
      // if (map.hasOwnProperty(teamId)) {
      // } else {
      //   map[teamId] = [player];
      // }
      return map;
    }, {});

    const finalTeams = localTeams.map((team) => {
      const finalTeam: Team = {
        id: team.id,
        name: formData.get(`team-${team.id}-name`) as string,
        chipColor: formData.get(`team-${team.id}-chip-color`) as string,
        // @ts-ignore
        players: teamIdToPlayersMap[team.id],
      };
      return finalTeam;
    });

    // console.table(finalTeams);
    setTeams(() => finalTeams);
  };

  return (
    <form action="" onSubmit={handleFormSubmit}>
      <fieldset>
        <label>
          Players per Team:
          <input
            type="number"
            name="numberOfPlayersPerTeam"
            id="numberOfPlayersPerTeam"
            min="2"
            max="24" // in team mode, minimum 2 players per team, maximum 96 players in total for 2 teams
            value={numberOfPlayersPerTeam}
            onChange={(e) => setNumberOfPlayersPerTeam(e.target.valueAsNumber)}
          />
        </label>

        <label>
          [feature unavailable]Distribute players
          <select>
            <option value="randomly">randomly</option>
            <option value="manually">manually</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Teams</legend>
        {localTeams.map((team) => (
          <fieldset key={team.id}>
            {/* <legend>Team {team.name}</legend> */}
            <label>
              Team Name:
              <input
                type="text"
                name={`team-${team.id}-name`}
                id={`team-${team.id}-name`}
                defaultValue={team.name}
              />
            </label>
            <label>
              Chip color:
              <input
                type="color"
                name={`team-${team.id}-chip-color`}
                id={`team-${team.id}-chip-color`}
                value={team.chipColor}
                onChange={(e) => (team.chipColor = e.target.value)}
              />
            </label>
          </fieldset>
        ))}
      </fieldset>

      <fieldset>
        <legend>Players</legend>
        {localPlayers.map((player, index) => (
          <div key={player?.id}>
            <label>
              Player Name
              <input
                type="text"
                name={`player-${player.id}-name`}
                id={`player-${player.id}-name`}
                defaultValue={`Player ${index + 1}`}
              />
            </label>

            <label>
              Team
              <select
                name={`player-${player.id}-team`}
                id={`player-${player.id}-team`}
              >
                {localTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit">Start Game</button>
    </form>
  );
};

export default TeamForm;

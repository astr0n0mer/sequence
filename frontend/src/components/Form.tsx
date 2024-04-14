import { FC, useRef, useState } from "react";
import { Team } from "../App";

type GameMode = "individual" | "team";

type FormProps = {
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
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
        <IndividualForm numberOfPlayers={numberOfEntities} />
      ) : (
        <TeamForm numberOfTeams={numberOfEntities} />
      )}
    </section>
  );
};

const IndividualForm = ({
  numberOfPlayers,
}: {
  numberOfPlayers: number | null;
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

  console.info({ numberOfPlayers, playerIds: localPlayers });
  console.table(localPlayers);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.info(event);

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
    console.table(localTeams);
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

const TeamForm = ({ numberOfTeams }: { numberOfTeams: number | null }) => {
  if (!numberOfTeams) return;

  const teamIdRef = useRef(1e5);
  //   const teamIds = new Array(numberOfTeams)
  //     .fill(null)
  //     .map((_, index) => index + ++teamIdRef.current);
  const [numberOfPlayersPerTeam, setNumberOfPlayersPerTeam] =
    useState<number>(2);

  console.info({ numberOfTeams, numberOfPlayersPerTeam });

  //   const [localTeams, setLocalTeams] = useState<
  //     { id: string; name: string; chipColor: string }[]
  //   >(() =>
  //     new Array(numberOfTeams).fill(null).map((_, index) => ({
  //       id: (index + ++teamIdRef.current).toString(),
  //       name: `Team ${index + 1}`,
  //       chipColor: "#000000",
  //     }))
  //   );

  const localTeams = new Array(numberOfTeams).fill(null).map((_, index) => ({
    id: (index + ++teamIdRef.current).toString(),
    name: `Team ${index + 1}`,
    // chipColor is derived using the unix timestamp in milliseconds but subtracting ${index} days from it
    chipColor:
      "#" + (Date.now() - index * 24 * 60 * 60 * 1000).toString(16).slice(-6),
  }));

  console.table(localTeams);

  const handleFormSubmit = () => {};

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
              <input type="text" defaultValue={team.name} />
            </label>
            <label>
              Chip color:
              <input
                type="color"
                value={team.chipColor}
                onChange={(e) => (team.chipColor = e.target.value)}
              />
            </label>
          </fieldset>
        ))}
      </fieldset>

      <fieldset>
        <legend>Players</legend>
        {new Array(numberOfTeams * numberOfPlayersPerTeam)
          .fill(null)
          .map((_, index) => (
            <div>
              <label>
                Player Name
                <input
                  type="text"
                  name=""
                  id=""
                  defaultValue={`Player ${index + 1}`}
                />
              </label>

              <label>
                Team
                <select name="team" id="team">
                  {localTeams.map((team) => (
                    <option value={team.id}>{team.name}</option>
                  ))}
                </select>
              </label>
            </div>
          ))}
      </fieldset>
    </form>
  );
};

export default Form;

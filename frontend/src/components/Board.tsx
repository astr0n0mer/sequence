import { FC } from "react";
// import deckFolder from "../assets/deck";
import styled from "styled-components";
import "../App.css";
import { Card, Deck } from "../services/deck";

type CardOnBoard = Card & { chipColor: string | undefined };

const excludeList: Card[] = Deck.suits.map((suit) => ({ value: "jack", suit }));
const wildCardChipColor = `
    conic-gradient(
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
    );
`;

const StyledBoard = styled.main`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  padding: 4px;

  overflow-y: scroll;
  width: min(95%, 678px);
  max-height: 90vh;

  //   background-color: grey;
`;

type StyledButtonProps = {
  $isPlayerCard: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  all: unset;

  position: relative;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  // TODO: need to figure out why this is needed, since without it, there is extra space between grid items
  margin-bottom: -4px;
  //   height: calc(100% - 4px);

  outline: ${({ $isPlayerCard }) =>
    $isPlayerCard ? "4px solid magenta" : "unset"};
`;

const CardImg = styled.img`
  //   position: absolute;
  //   inset: 0;

  max-height: 100%;
  max-width: 100%;
  pointer-events: none;
`;

const ChipContainer = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chip = styled.div`
  border-radius: 50%;
  border: 6px double rgb(48 48 48 / 82%);

  width: 45%;
  aspect-ratio: 1;

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  ${(props) => {
    let style = "";
    if (!props.color) {
      style = "border-color: transparent; box-shadow: unset;";
    } else if (props.color === "*") {
      style = `border: 2px solid; width: 65%; background-image: ${wildCardChipColor};`;
    } else {
      style = `background-color: ${props.color}`;
    }
    return style;
  }}
`;

export type BoardProps = {
  board: CardOnBoard[];
  playerCards: Card[];
};

export const Board: FC<BoardProps> = ({ board, playerCards }) => {
  // console.count("rendering board");
  // console.info(board);

  // const [deck, setDeck] = useState(() => new Deck(excludeList));
  // const [doubleCards, setDoubleCards] = useState(() => {
  //   const doubleCards: CardOnBoard[] = deck
  //     .getCards()
  //     .concat(deck.shuffle())
  //     .map((card) => ({ ...card, chipColor: undefined }));

  //   const wildCard: CardOnBoard = { value: "*", suit: "*", chipColor: "*" };
  //   doubleCards.splice(0, 0, wildCard);
  //   doubleCards.splice(9, 0, wildCard);
  //   doubleCards.splice(90, 0, wildCard);
  //   doubleCards.splice(99, 0, wildCard);

  //   // TODO: remove these later
  //   doubleCards[1].chipColor = "red";
  //   doubleCards[2].chipColor = "green";
  //   doubleCards[3].chipColor = "yellow";
  //   return doubleCards;
  // });

  // useEffect(() => {
  // console.table(deck.getCards());
  // }, []);

  return (
    <StyledBoard className="board">
      {board.map((card, index) => (
        <StyledButton
          key={index}
          data-value={card.value}
          data-suit={card.suit}
          onClick={() => console.info(card)}
          $isPlayerCard={playerCards.some(
            (playerCard) =>
              playerCard.value === card.value && playerCard.suit === card.suit
          )}
        >
          <CardImg
            src={
              card.value === "*"
                ? "./src/assets/deck/black_joker.svg"
                : `./src/assets/deck/${card.value}_of_${card.suit}${
                    ["king", "queen", "jack"].includes(card.value) ? "2" : ""
                  }.svg`
              // : `./src/assets/deck/${card.value}_of_${card.suit}.svg`
            }
            alt={`${card.value}_of_${card.suit}`}
          />
          <ChipContainer>
            {/* // TODO: need one more prop below for chipCircleCount */}
            <Chip color={card.chipColor} />
          </ChipContainer>
        </StyledButton>
      ))}
    </StyledBoard>
  );
};

export default Board;

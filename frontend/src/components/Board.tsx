import { FC, useContext } from "react";
import styled from "styled-components";
import { CardOnBoard } from "../../../common/types";
import { GlobalContext } from "../App";
import "../App.css";

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

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

  //   background-color: grey;
`;

type StyledButtonProps = {
  $isPlayerCard: boolean;
  $chipColor: string | undefined;
};

const StyledButton = styled.div<StyledButtonProps>`
  all: unset;

  position: relative;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  // TODO: need to figure out why this is needed, since without it, there is extra space between grid items
  margin-bottom: -4px;
  //   height: calc(100% - 4px);

  outline: ${({ $isPlayerCard, $chipColor }) =>
    $isPlayerCard && !$chipColor ? `4px solid #3688ed` : "unset"};
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

export const Board: FC = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const { board, playerCards, chipColor } = globalState;

  const handleCardOnBoardClick = ({ value, suit, index }: CardOnBoard) => {
    setGlobalState((prevGlobalState) => ({
      ...prevGlobalState,
      board: prevGlobalState.board.map((card) => ({
        ...card,
        chipColor:
          card.index === index && card.value === value && card.suit === suit
            ? chipColor
            : card.chipColor,
      })),
    }));
  };

  return (
    <StyledBoard className="board">
      {board.map((card, index) => {
        const isPlayerCard = playerCards.some(
          (playerCard) =>
            playerCard.value === card.value && playerCard.suit === card.suit
        );

        return (
          <StyledButton
            key={index}
            data-value={card.value}
            data-suit={card.suit}
            onClick={
              isPlayerCard ? () => handleCardOnBoardClick(card) : undefined
            }
            $isPlayerCard={isPlayerCard}
            $chipColor={card.chipColor}
          >
            <CardImg
              src={
                card.value.toString() === "*" // TODO: remove toString from here later, instead the type should be Array<Card | Wildcard>
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
        );
      })}
    </StyledBoard>
  );
};

export default Board;

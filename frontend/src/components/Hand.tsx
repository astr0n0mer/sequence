import { FC, useContext } from "react";
import styled from "styled-components";
import { Card } from "../../../common/types";
import { GlobalContext } from "../App";

const StyledHand = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  max-height: 100px;
`;

const StyledCard = styled.button`
  background-color: purple;

  & > img {
    height: 100%;
  }

  // TODO: remove this later, just added for simulating dark mode
  filter: invert(0.9);
`;

export const Hand: FC = () => {
  const { globalState } = useContext(GlobalContext);
  const { playerCards }: { playerCards: Card[] } = globalState; // TODO: maybe I can remove this explicit typing from here

  return (
    <StyledHand>
      {playerCards.map((card, index) => (
        <StyledCard key={index}>
          <img
            src={`../src/assets/deck/${card.value}_of_${card.suit}${
              ["king", "queen", "jack"].includes(card.value) ? "2" : ""
            }.svg`}
            alt={`${card.value}_of_${card.suit}`}
          />
        </StyledCard>
      ))}
    </StyledHand>
  );
};

export default Hand;

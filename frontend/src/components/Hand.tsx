import { FC } from "react";
import styled from "styled-components";
import { Card } from "../../../common/types";

export type HandProps = {
  cards: Card[];
};

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
`;

export const Hand: FC<HandProps> = ({ cards }) => {
  return (
    <StyledHand>
      {cards.map((card, index) => (
        <StyledCard key={index}>
          <img
            src={`./src/assets/deck/${card.value}_of_${card.suit}${
              ["king", "queen", "jack"].includes(card.value) ? "2" : ""
            }.svg`}
            alt={`${card.value}_of_${card.suit}`}
          />
        </StyledCard>
      ))}
    </StyledHand>
  );
};

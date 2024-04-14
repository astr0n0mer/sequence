export type Card = {
  value: string;
  suit: string;
};

export type PlayerCreate = {
  id: string;
  name: string;
};

export type Player = PlayerCreate & {
  cards: Card[];
};

export type Team = {
  id: string;
  name: string;
  players: Player[];
  chipColor: string;
};

export type CardOnBoard = Card & { chipColor: string | undefined };

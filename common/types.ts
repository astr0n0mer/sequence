import { Deck } from "./deck";
import { CardValue, PlayerEvent, ServerEvent, Suit } from "./enums";

export type Card = {
  value: CardValue;
  suit: Suit;
};

export type CardOnBoard = Card & {
  index: number;
  chipColor?: string;
};

export type PlayerCreateDTO = {
  id: string;
  name: string;
};

export type Player = PlayerCreateDTO & {
  cards: Card[];
};

export type Team = {
  id: string;
  name: string;
  players: Player[];
  chipColor: string;
};

export type ServerMessagePayload = {
  event: ServerEvent;
  body: object;
};

export type PlayerMessagePayload = {
  // id: UUID;
  event: PlayerEvent;
  body: object;
};

// following types were moved from the backend
export type WildCard = {
  value: "*";
  suit: "*";
  index: number;
  chipColor: "*";
};

export type Board = Array<CardOnBoard | WildCard>;

export type Game = {
  gameId: string;
  deck: Deck;
  board: Board;
  teams: Team[];
  //   players: Array<PlayerCreate & { cards: Card[] }>;
};

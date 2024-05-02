export enum Suit {
  CLUBS = "clubs",
  DIAMONDS = "diamonds",
  HEARTS = "hearts",
  SPADES = "spades",
}

export enum CardValue {
  ACE = "ace",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  KING = "king",
  QUEEN = "queen",
  JACK = "jack",
}

export enum GameState {
  CREATED,
  STARTED,
  RUNNING,
  PAUSED,
  COMPLETED,
}

export enum PlayerEvent {
  CREATE_GAME,
  START_GAME, // TODO: CREATE and START are merged for this type of game
  JOIN_GAME,
  LEAVE_GAME,
  MAKE_MOVE,
}

export enum ServerEvent {
  GAME_CREATED,
  PLAYER_JOINED,
  PLAYER_LEFT,
  MOVE_REGISTERED,
}

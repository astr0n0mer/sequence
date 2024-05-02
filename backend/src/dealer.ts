import { Deck } from "../../common/deck";
import { CardValue } from "../../common/enums";
import { Board, Card, Game, Team } from "../../common/types";

// "jack" is not a valid card on a sequence board
const jacksOfAllSuits: Card[] = Deck.suits.map((suit) => ({
  value: CardValue.JACK,
  suit,
}));

export class Dealer {
  private static gameId = 1;
  private activeGames: Map<typeof Dealer.gameId, Game> = new Map();

  public startNewGame = (teams: Team[]): Game => {
    const newBoard: Board = new Deck(jacksOfAllSuits)
      .getCards()
      .concat(new Deck(jacksOfAllSuits).getCards())
      // .map((card, index) => ({ ...card, index, chipColor: undefined }));
      .map((card, index) => ({ ...card, index }));

    for (let i of [0, 9, 90, 99]) {
      newBoard.splice(i, 0, {
        value: "*",
        suit: "*",
        index: i,
        chipColor: "*",
      });
    }

    const deckWithDealer = new Deck();
    const numberOfCardsWithEachPlayer = 4;

    // assign cards to teams
    for (let _ = 0; _ < numberOfCardsWithEachPlayer; _++) {
      for (let i = 0; i < teams[0].players.length; i++) {
        for (let j = 0; j < teams.length; j++) {
          teams[j].players[i].cards.push(deckWithDealer.dealCard());
        }
      }
    }

    const newGame: Game = {
      gameId: Dealer.gameId.toString(),
      deck: deckWithDealer,
      board: newBoard,
      teams: teams,
    };

    this.activeGames.set(Dealer.gameId++, newGame);
    return newGame;
  };

  public dealCard = (gameId: typeof Dealer.gameId) =>
    this.activeGames.get(gameId)?.deck.dealCard();

  public get gameId(): typeof Dealer.gameId {
    return Dealer.gameId;
  }

  public get getActiveGames(): typeof this.activeGames {
    return this.activeGames;
  }
}

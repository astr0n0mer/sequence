import { Deck } from "../../common/deck";
import { Card, CardOnBoard, Team } from "../../common/types";

type Game = {
  deck: Deck;
  board: Card[];
  teams: Team[];
  //   players: Array<PlayerCreate & { cards: Card[] }>;
};

// "jack" is not a valid card on a sequence board
const excludeList: Card[] = Deck.suits.map((suit) => ({ value: "jack", suit }));

export class Dealer {
  // @ts-ignore
  private games: { gameId: string; game: Game } = {};
  private static gameId = 1;

  public startNewGame = (teams: Team[]) => {
    const deckForBoard = new Deck(excludeList);
    const newBoard: CardOnBoard[] = deckForBoard
      .getCards()
      .concat(deckForBoard.shuffle())
      .map((card) => ({ ...card, chipColor: undefined }));

    const wildCard: CardOnBoard = { value: "*", suit: "*", chipColor: "*" };
    newBoard.splice(0, 0, wildCard);
    newBoard.splice(9, 0, wildCard);
    newBoard.splice(90, 0, wildCard);
    newBoard.splice(99, 0, wildCard);

    const deckWithDealer = new Deck();

    // assign cards to teams
    for (let _ = 0; _ < 4; _++) {
      for (let i = 0; i < teams[0].players.length; i++) {
        for (let j = 0; j < teams.length; j++) {
          teams[j].players[i].cards.push(deckWithDealer.dealCard());
        }
      }
    }

    const newGame: Game = {
      deck: deckWithDealer,
      board: newBoard,
      teams: teams,
    };
    // @ts-ignore
    this.games[Dealer.gameId.toString()] = newGame;

    return newGame;
  };

  // @ts-ignore
  public dealCard = (gameId: string) => this.games[gameId].deck.dealCard();
}

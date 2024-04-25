import { Deck } from "../../common/deck";
import { Card, CardOnBoard, Team } from "../../common/types";

type Game = {
  gameId: string;
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
    const newBoard: CardOnBoard[] = new Deck(excludeList)
      .getCards()
      .concat(new Deck(excludeList).getCards())
      .map((card, index) => ({ ...card, index, chipColor: undefined }));

    for (let i of [0, 9, 90, 99]) {
      newBoard.splice(i, 0, {
        value: "*",
        suit: "*",
        index: i,
        chipColor: "*",
      });
    }

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
      gameId: Dealer.gameId.toString(),
      deck: deckWithDealer,
      board: newBoard,
      teams: teams,
    };
    // @ts-ignore
    this.games[Dealer.gameId.toString()] = newGame;
    Dealer.gameId++;

    return newGame;
  };

  // @ts-ignore
  public dealCard = (gameId: string) => this.games[gameId].deck.dealCard();
}

export type Card = {
  value: string;
  suit: string;
};

export class Deck {
  private cards: Card[] = [];
  public static suits = ["clubs", "diamonds", "hearts", "spades"];
  public static values = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "king",
    "queen",
    "jack",
  ];

  constructor(excludeList: Card[] = []) {
    for (let suit of Deck.suits) {
      for (let value of Deck.values) {
        if (!this.isExcluded({ value, suit }, excludeList)) {
          this.cards.push({ value, suit });
        }
      }
    }
    this.shuffle();
  }

  private isExcluded = (card: Card, excludeList: Card[]): boolean =>
    excludeList.some(
      (excludedCard) =>
        card.value === excludedCard.value && card.suit === excludedCard.suit
    );

  /**
   * The shuffle method is based on Fisher-Yates shuffle algorithm, also known as the Knuth shuffle algorithm.
   * Here's how it works:
   * 1. The algorithm iterates through the array of cards from the end to the beginning.
   * 2. For each index i in the array, it generates a random index j between 0 and i (inclusive).
   * 3. It then swaps the elements at index i and index j.
   * This process ensures that each card has an equal chance of ending up at any position in the array,
   * resulting in a uniformly shuffled deck.
   */
  public shuffle = (): Card[] => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  };

  public dealCard = () => {
    const newCard = this.cards.pop();
    if (!newCard) {
      throw new Error("No more cards in the deck");
    }
    return newCard;
  };

  //   public getSuits = () => Deck.suits;
  //   public getValues = () => Deck.values;
  public getCards = () => this.cards;
}

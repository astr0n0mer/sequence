import { useEffect, useState } from "react";
// import deckFolder from "../assets/deck";
import { Deck } from "../services/deck";

export const Server = () => {
  const [deck, setDeck] = useState(() => new Deck());
  const [currentCard, setCurrentCard] = useState(() => deck.dealCard());
  const [currentCardImgPath, setCurrentCardImgPath] = useState<string>("");

  const handleDraw = () => {
    setCurrentCard(() => deck.dealCard());
  };

  //   console.count("Server");

  useEffect(() => {
    console.table(deck.getCards());
    const currentCardFilename = `${currentCard.value}_of_${currentCard.suit}.svg`;
    setCurrentCardImgPath(() => `./src/assets/deck/${currentCardFilename}`);
    // handleDraw();
  }, [currentCard]);

  return (
    <div>
      <img src={currentCardImgPath} alt={currentCardImgPath} />
      <button onClick={handleDraw}>Draw</button>
    </div>
  );
};

export default Server;

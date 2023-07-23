import { SUITS, RANKS } from "../constants.js";
import { Card } from "./Card.js";

export class Deck {
  #deck;
  #numberOfDecks;

  constructor(numberOfDecks = 1) {
    this.#numberOfDecks = numberOfDecks;
    this.#deck = this.generateDeck();
  }

  generateDeck() {
    let deck = [];
    for (let i = 0; i < this.#numberOfDecks; i++) {
      for (let suit of SUITS) {
        for (let rank of RANKS) {
          deck.push(new Card(rank.name, suit.name));
        }
      }
    }
    return deck;
  }

  shuffleDeck() {
    for (let i = this.#deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#deck[i], this.#deck[j]] = [this.#deck[j], this.#deck[i]];
    }
  }

  sortDeck() {
    this.#deck.sort((a, b) => {
      if (SUITS.indexOf(a.getCardDetails().suit) - SUITS.indexOf(b.getCardDetails().suit) === 0) {
        return RANKS.indexOf(a.getCardDetails().rank) - RANKS.indexOf(b.getCardDetails().rank);
      }
      return SUITS.indexOf(a.getCardDetails().suit) - SUITS.indexOf(b.getCardDetails().suit);
    });
  }

  drawCard() {
    if(this.cards.length === 0) {
        throw new Error("No cards left in the deck");
    }
    return this.cards.pop();
}


  count() {
    return this.#deck.length;
  }

  isEmpty() {
    return this.#deck.length === 0;
  }
}

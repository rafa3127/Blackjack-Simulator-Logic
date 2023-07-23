import { Card } from "./Card.js";

export class Hand {
    #cards;

    constructor() {
        this.#cards = [];
    }

    addCard(card) {
        if (!(card instanceof Card)) {
            throw new Error("Invalid card");
        }
        this.#cards.push(card);
    }

    calculateValue() {
        let totalValue = 0;
        let acesCount = 0;
    
        this.#cards.forEach((card) => {
          if (card.getCardDetails().rank === "A") {
            acesCount += 1;
          } else {
            totalValue += card.getCardDetails().values[0];  // assuming values[0] is the main value
          }
        });
    
        // Handle aces
        while (acesCount > 0) {
          // If adding 11 keeps the total at 21 or below, count the Ace as 11. 
          // Otherwise, count it as 1.
          if (totalValue + (acesCount * 11) <= 21) {
            totalValue += 11;
          } else {
            totalValue += 1;
          }
          acesCount -= 1;
        }
    
        return totalValue;
    }
    

    getCards() {
        return this.#cards;
    }

    getCardCount() {
        return this.#cards.length;
    }

    resetHand() {
        this.#cards = [];
    }
}

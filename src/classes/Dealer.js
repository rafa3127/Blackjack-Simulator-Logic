import { Hand } from './Hand.js';

export class Dealer {
    #hand;

    constructor() {
        this.#hand = new Hand();
    }

    getHand() {
        return this.#hand;
    }

    addCard(card) {
        this.#hand.addCard(card);
    }

    draw(deck) {
        while (this.#hand.calculateValue() < 17) {
            this.#hand.addCard(deck.drawCard());
        }
    }

    isBlackjack() {
        return this.#hand.calculateValue() === 21 && this.#hand.getCardCount() === 2;
    }

    isBusted() {
        return this.#hand.calculateValue() > 21;
    }

    reset() {
        this.#hand = new Hand();
    }
}

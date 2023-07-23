import { RANKS, SUITS } from "../constants.js";

export class Card {
    #rank;
    #suit;
    #color;
    #values;

    constructor(rank, suit) {
        const suitObject = SUITS.find(s => s.name === suit);
        const rankObject = RANKS.find(r => r.name === rank);

        if (!suitObject || !rankObject) {
            throw new Error(`Invalid rank or suit: ${rank}, ${suit}`);
        }

        this.#rank = rankObject.name;
        this.#suit = suitObject.name;
        this.#color = suitObject.color;
        this.#values = rankObject.values;
    }

    getCardDetails() {
        return {
            rank: this.#rank,
            suit: this.#suit,
            color: this.#color,
            values: this.#values,
        };
    }

    toString() {
        return `${this.#rank} of ${this.#suit} (${this.#color})`;
    }
}


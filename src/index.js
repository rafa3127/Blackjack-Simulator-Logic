import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import { RANKS, SUITS } from './constants.js';

const main = () => {
    // testCardClass()
    testDeck()

}


const testCardClass = () => {
    //Use nested forEach to generate a deck
    SUITS.forEach((suit) => {
      RANKS.forEach((rank) => {
        const card = new Card(rank.name, suit.name);
        console.log(card.toString());
      });
    });
}

const testDeck = () => {
    const deck = new Deck(6);
    deck.shuffle()

    console.log(`Count: ${deck.getCount()}`);
    console.log('x'.repeat(50));

    for(let i = 0; i < 10; i++) {
        const card = deck.drawCard();
        console.log(card.toString());
    }

    console.log(`Count: ${deck.getCount()}`);
    console.log('x'.repeat(50));

    while(!deck.isEmpty()) {
        const card = deck.drawCard();
        console.log(card.toString());
    }

    console.log(`Count: ${deck.getCount()}`);
}





main()

import { Card } from './classes/Card.js';
import { Deck } from './classes/Deck.js';
import { Hand } from './classes/Hand.js';
import { RANKS, SUITS } from './constants.js';

const main = () => {
    // testCardClass()
    // testDeck()
    testHand()

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


const testHand = () => {
    const deck = new Deck();
    deck.shuffle();
    
    const hand1 = new Hand();
    const hand2 = new Hand();
    const dealerHand = new Hand();

    // Deal initial cards
    hand1.addCard(deck.drawCard());
    hand2.addCard(deck.drawCard());
    dealerHand.addCard(deck.drawCard());

    // Print initial hands
    console.log("Initial Hands:");
    console.log("Hand 1:", hand1.getCards().map( card => card.toString()));
    console.log("Hand 2:", hand2.getCards().map( card => card.toString()));
    console.log("Dealer Hand:", dealerHand.getCards().map( card => card.toString()));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    // Deal second card
    hand1.addCard(deck.drawCard());
    hand2.addCard(deck.drawCard());

    // Print hands after second deal
    console.log("Hands after second deal:");
    console.log("Hand 1:", hand1.getCards().map( card => card.toString()));
    console.log("Hand 2:", hand2.getCards().map( card => card.toString()));
    console.log("Dealer Hand:", dealerHand.getCards().map( card => card.toString()));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    // Hand 1 hits until more than 16
    while (hand1.calculateValue() <= 16) {
        hand1.addCard(deck.drawCard());
    }

    // Hand 2 hits until more than 16
    while (hand2.calculateValue() <= 16) {
        hand2.addCard(deck.drawCard());
    }

    // Dealer hits until more than 16
    while (dealerHand.calculateValue() <= 16) {
        dealerHand.addCard(deck.drawCard());
    }

    // Print final hands
    console.log("Final Hands:");
    console.log("Hand 1:", hand1.getCards().map( card => card.toString()));
    console.log("Hand 2:", hand2.getCards().map( card => card.toString()));
    console.log("Dealer Hand:", dealerHand.getCards().map( card => card.toString()));
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

    // Print the winner
    const hand1Value = hand1.calculateValue() > 21 ? 0 : hand1.calculateValue();
    const hand2Value = hand2.calculateValue() > 21 ? 0 : hand2.calculateValue();
    const dealerValue = dealerHand.calculateValue() > 21 ? 0 : dealerHand.calculateValue();

    if (hand1Value > hand2Value && hand1Value > dealerValue) {
        console.log("Hand 1 wins!");
    } else if (hand2Value > hand1Value && hand2Value > dealerValue) {
        console.log("Hand 2 wins!");
    } else {
        console.log("Dealer wins!");
    }
}





main()

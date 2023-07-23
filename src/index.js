import { Card } from './classes/Card.js';
import { RANKS, SUITS } from './constants.js';

//Use nested forEach to generate a deck
SUITS.forEach((suit) => {
  RANKS.forEach((rank) => {
    const card = new Card(rank.name, suit.name);
    console.log(card.toString());
  });
});

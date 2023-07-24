import { Card } from './classes/Card.js';
import { Dealer } from './classes/Dealer.js';
import { Deck } from './classes/Deck.js';
import { Hand } from './classes/Hand.js';
import { Player } from './classes/Player.js';
import { RANKS, SUITS } from './constants.js';

const main = () => {
    // testCard()
    // testDeck()
    // testHand()
    testPlayer()

}


const testCard = () => {
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

const testPlayer = () => {
    // Creación de jugadores, mazo y repartición inicial
    let player1 = new Player('Pedro',100);
    let player2 = new Player('Juana',100);
    const players = [player1, player2]
    
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log('jugadores creados')
    players.map( player => {
        console.log(player.getName(), player.getBalance())
    })

    //Creacion y shuffle del mazo
    let deck = new Deck(6);
    let dealer = new Dealer()

    deck.shuffle();
    
    // Inicio de apuestas
    player1.placeBet(10)
    player2.placeBet(5)
 
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log('jugadores Apuestan 10 y 5 respectivamente')
    players.map( player => {
        console.log(player.getName(),  player.getBalance(), 'Bet:', player.getHands()[0].bet)
    })
    
    // Repartición inicial
    players.forEach( player => player.addCardToHand(deck.drawCard(),0))
    dealer.addCard(deck.drawCard())
    players.forEach( player => player.addCardToHand(deck.drawCard(),0))
    
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log('Se hace la repartición inicial')
    players.forEach( player => {
        console.log(player.getName())
        player.getHands().forEach(hand => { hand.hand.getCards().forEach(card => {console.log(card.toString())})})
    })
    console.log('dealer hand')
    dealer.getHand().getCards().map( card => {
        console.log(card.toString())
    })
    
    
    // Itera sobre cada jugador y juega su mano de acuerdo a las reglas
    players.forEach(player => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(`Juega ${player.getName()}`)
        let i = 0
        
        while(i < player.getHands().length){
            console.log(`Mano ${i+1}`)
            player.getHands()[i].hand.getCards().forEach(card => {console.log(card.toString())})
            //Si la mano se puede picar, se pica
            if(player.getHands()[i].hand.canSplit()){
                console.log('Se pica la mano')
                player.splitHand(i)
                player.addCardToHand(deck.drawCard(), i)
            }
            //Si la mano es 9, 10 u 11, se dobla
            if(player.getHands()[i].hand.calculateValue() >= 9 && player.getHands()[i].hand.calculateValue() <= 11){
                console.log('Se dobla la mano')
                player.doubleDown(deck.drawCard(), i)
                player.getHands()[i].hand.getCards().forEach(card => {console.log(card.toString())})
            }else{
                //Mientras la mano sea menor a 17, se pide
                while(player.getHands()[i].hand.calculateValue() < 17){
                    player.addCardToHand(deck.drawCard(), i)
                }
                player.getHands()[i].hand.getCards().forEach(card => {console.log(card.toString())})
            }

            i++
        }
    })

    // Juega la mano del dealer de acuerdo a las reglas
    console.log('Dealer juega según reglas')
    dealer.draw(deck)
    dealer.getHand().getCards().forEach(card => console.log(card.toString()))

    // Determina el ganador y actualiza los saldos de los jugadores
    console.log('se evaluan las manos contra el dealer')
    let dealerValue = dealer.getHand().calculateValue();
    players.forEach(player => {
        console.log(`Resultado de ${player.getName()}`)
        let hands = player.getHands();

        hands.forEach((hand, handIndex) => {
            let handValue = hand.hand.calculateValue();
            if (player.isBusted(handIndex) || (dealerValue <= 21 && dealerValue > handValue)) {
                console.log(`la mano ${handIndex + 1} Perdió`)
                player.updateBalance('lose', handIndex);
            } else if (dealerValue > 21 || handValue > dealerValue) {
                console.log(`la mano ${handIndex + 1} Ganó`)
                player.updateBalance('win', handIndex);
            } else {
                console.log(`la mano ${handIndex + 1} Empató`)
                player.updateBalance('push', handIndex);
            }
            console.log(`Balance de ${player.getName()} despues de mano ${handIndex + 1}: ${player.getBalance()}`)
        });
    });
};






main()

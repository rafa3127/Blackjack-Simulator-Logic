import { Deck } from "./Deck.js";
import { Dealer } from "./Dealer.js";
import { Player } from "./Player.js";

export class Table {
    #players;
    #dealer;
    #deck;
    #cutPoint;
    
    constructor(numberOfDecks = 6) {
        this.#players = Array(7).fill(null); // Represents 7 seats at the table
        this.#dealer = new Dealer();
        this.#deck = new Deck(numberOfDecks);
        this.#cutPoint = 0;
    }

    addPlayer(player, seat) {
        // Validate seat number
        if (seat < 1 || seat > 7) {
            throw new Error("Invalid seat number. Seat number must be between 1 and 7");
        }

        // Validate if the seat is empty
        if (this.#players[seat - 1] !== null) {
            throw new Error("Seat is already occupied");
        }

        this.#players[seat - 1] = player;
    }

    removePlayer(seat) {
        // Validate seat number
        if (seat < 1 || seat > 7) {
            throw new Error("Invalid seat number. Seat number must be between 1 and 7");
        }

        this.#players[seat - 1] = null;
    }

    getPlayers() {
        return this.#players
    }

    getPlayersString() {
        return this.getPlayers().map( player => player === null ? 'empty seat' : player.getName())
    }

    getDealerHand() {
        return this.#dealer.getHand()
    }

    getDeckCutPoint() {
        return this.#cutPoint
    }

    getDeck() {
        return this.#deck
    }

    getHandsByPlayer() {
        return(this.#players.reduce((acc, player) => {
            if(player !== null){
                return [...acc, {player: player, hands: player.getHands()}]
            }else{
                return [...acc]
            }
        }, []))
    }

    #checkDeckStatus() {
        console.log('checking deck status')
        return this.#cutPoint !== 0 && this.#deck.getCount() <= this.#cutPoint
    }

    #resetDeck () {
        console.log('new shuffle deck...')
        this.#deck.reset();
        this.#deck.shuffle();

        // Set a new cut point in the latter half of the deck
        const min = Math.floor(this.#deck.getCount() / 2);
        const max = this.#deck.getCount();
        this.#cutPoint = Math.floor(Math.random() * (max - min)) + min;

        // Burn first card
        this.#deck.drawCard();
    }

    #resetPlayersAndDealer () {
        console.log('preparing new hands...')
        this.#dealer.reset();
        this.#players.forEach(player => {
            if(typeof player === Player){
                player.reset()
            }
        })
    }

    #setOneCardToAllHands () {
        this.getRoundActivePlayers().forEach( player => {
            player.getHands().forEach( (hand, handIndex) => {
                player.addCardToHand(this.#deck.drawCard(), handIndex)
            })
        })
    }


    restartRound() {
        // Check if we passed the cut point, and if we did, reset the deck
        console.log('restarting round...')
        this.#resetPlayersAndDealer()
        if (!this.#checkDeckStatus()) {
            this.#resetDeck()
        }
        // Reset dealer's hand
    }
    
    placeBet(playerIndex, bet) {
        // Ensure the player exists
        if (this.#players[playerIndex] === null) {
            throw new Error("Player does not exist");
        }
    
        // Place the bet for the player
        this.#players[playerIndex].placeBet(bet);
    }

    getRoundActivePlayers () {
        return this.#players.filter(player => {
            return player !== null && player.getHands().length > 0 && player.getHands().filter( hand => hand.bet > 0).length > 0
        })    
    }
    
    initialDeal() {
        console.log('Dealing cards...')
        // Deal cards to players
        this.#setOneCardToAllHands()
        // Deal card to dealer
        this.#dealer.addCard(this.#deck.drawCard());
        // Deal second card to players
        this.#setOneCardToAllHands()
        
    
        // Check for blackjack
        const handsWithBlackjack = this.#checkForBlackjacks();
        if(handsWithBlackjack.length > 0 ){
            if(this.#dealer.hasPosibleBlackJack()){
                console.log(`pending blackjack for ${ handsWithBlackjack.map(handWithBlackjack => handWithBlackjack.player.getName() + ' ' )} `)
            }else{
                console.log(`blackjack for ${handsWithBlackjack.map(handWithBlackjack => handWithBlackjack.player.getName() + ' ')}...`)
                handsWithBlackjack.forEach( handWithBlackjack => {
                    handWithBlackjack.player.updateBalance('blackjack', 0)
                    handWithBlackjack.player.reset()
                })
            }
        }
    }
    
    #checkForBlackjacks() {
        return this.#players.reduce( (acc, player) => {
            if(player !== null){
                player.getHands().forEach( hand => {
                    if (hand.hand.isBlackjack()) {
                        acc = acc.concat({player, hand});
                    }
                });
            }
            return acc;
        }, []);
    }
    
    

    playPlayerTurn(player, action, handIndex = 0) {
        switch (action) {
            case 'addCard':
                if(!player.isBusted(handIndex)){
                    console.log('adding a card...')
                    player.addCardToHand(this.#deck.drawCard(), handIndex)
                }else{
                    throw new Error('Hand is busted')
                }
                break;
            case 'split':
                if(player.canSplit(handIndex)){
                    console.log('hand splited...')
                    player.splitHand(handIndex)
                }else{
                    throw new Error('can not split this hand')
                }
                break;
            case 'doubleDown':
                if(player.canDoubleDown(handIndex)){
                    console.log('adding double of bet...')
                    player.doubleDown(this.#deck.drawCard(), handIndex)
                }else{
                    throw new Error('can not doubledown this hand')
                }
                break;
            case 'keep': 
                break
            default:
                break;
        }
    }

    playDealerTurn() {
        // Dealer draws cards until total is 17 or more
        while (this.#dealer.getHand().calculateValue() < 17) {
            this.#dealer.addCard(this.#deck.drawCard());
        }
    }
    

    compareHands() {
        const dealerValue = this.#dealer.getHand().calculateValue();
    
        // Loop through all players
        this.getRoundActivePlayers().forEach(player => {
    
            // Loop through all hands of the player
            player.getHands().forEach((hand, index) => {
                
                // Compare the value of the hand with the dealer's value
                const handValue = hand.hand.calculateValue();
                
                if(handValue > 21){
                    console.log('Player ' + player.getName() + ' has busted with hand ' + index);
                    player.updateBalance('lose', index);
                }else if (handValue > dealerValue || dealerValue > 21) {
                    console.log('Player ' + player.getName() + ' wins with hand ' + index);
                    player.updateBalance('win', index);
                } else if (handValue < dealerValue) {
                    console.log('Player ' + player.getName() + ' loses with hand ' + index);
                    player.updateBalance('lose', index);
                } else {
                    console.log('Player ' + player.getName() + ' draws with hand ' + index);
                    player.updateBalance('push', index);
                }
            });
            
            // At the end of comparing all hands, the player's hands should be reset
            player.reset();
        });
        
        // After comparing with all players, the dealer's hand should also be reset
        this.#dealer.reset();
    }
    

}

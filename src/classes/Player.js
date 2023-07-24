import { Hand } from "./Hand.js";

export class Player {
    #name;
    #balance;
    #hands;

    constructor(name, initialBalance) {
        this.#name = name;
        this.#balance = initialBalance;
        this.#hands = [{hand: new Hand(), bet: 0}];
    }

    getName() {
        return this.#name;
    }

    getBalance() {
        return this.#balance;
    }

    getHands() {
        return this.#hands.map(handObject => handObject);
    }

    placeBet(amount, handIndex = 0) {
        if (amount > this.#balance) {
            throw new Error("Insufficient balance");
        }

        this.#balance -= amount;
        // Associate bet with the hand
        this.#hands[handIndex].bet = amount;
    }

    winBet(handIndex = 0) {
        this.#balance += 2 * this.#hands[handIndex].bet;
    }

    loseBet(handIndex = 0) {
        this.#hands[handIndex].bet = 0;
    }

    addCardToHand(card, handIndex = 0) {
        this.#hands[handIndex].hand.addCard(card);
    }

    splitHand(handIndex = 0) {
        // Ensure that the player has no more than 3 hands (maximum 4 after split)
        if (this.#hands.length >= 4) {
            throw new Error("Maximum split hands reached");
        }

        // Ensure that the hand has exactly two cards and they have the same rank
        if (this.#hands[handIndex].hand.canSplit()) {
            let newHand = new Hand();
            newHand.addCard(this.#hands[handIndex].hand.getCards().pop());
            this.#hands.push({hand: newHand, bet: this.#hands[handIndex].bet});
        } else {
            throw new Error("Cannot split hand");
        }
    }

    doubleDown(card, handIndex = 0) {
        const currentBet = this.#hands[handIndex].bet;
        if (this.#balance < currentBet) {
            throw new Error("Insufficient balance");
        }

        this.#balance -= currentBet;
        this.#hands[handIndex].bet += currentBet;
        this.#hands[handIndex].hand.addCard(card)
    }

    updateBalance(result, handIndex) {
        switch (result) {
            case 'blackjack':
                this.#balance += this.#hands[handIndex].bet * 3;
                break;
            case 'win':
                this.#balance += this.#hands[handIndex].bet * 2;
                break;
            case 'push':
                this.#balance += this.#hands[handIndex].bet;
                break;
            case 'lose':
                break;  // Nothing to add since player lost
            default:
                throw new Error('Invalid result');
        }
        console.log(`new balance for ${this.#name}: ${this.#balance}`)
    }


    isBusted(handIndex = 0) {
        return this.#hands[handIndex].hand.calculateValue() > 21;
    }

    isBlackjack(handIndex = 0) {
        return this.#hands[handIndex].hand.isBlackjack();
    }

    canSplit(handIndex = 0){
        return this.#hands[handIndex].hand.canSplit()
    }

    canDoubleDown(handIndex = 0){
        return this.#hands[handIndex].hand.getCards().length === 2
    }

    reset() {
        this.#hands = [{hand: new Hand(), bet: 0}];
    }
}

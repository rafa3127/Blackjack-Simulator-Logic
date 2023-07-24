# Blackjack-Simulator-Logic
Desarrollo de base de software de simulación del juego de naipes 21 Blackjack siguiendo el paradigma de Programación Orientada a Objetos y los principios SOLID

---

# Card 
La clase `Card` representa una carta individual en un juego de Blackjack. Cada carta tiene un rango, un palo, un color y valores asociados.

### Instanciación:
La forma de instanciar un objeto de la clase `Card` es la siguiente:

```javascript
const card = new Card(rank, suit);
```
- `rank` (String): Es el rango de la carta (Ej: 'A', '2', '3', etc.)
- `suit` (String): Es el palo de la carta (Ej: 'Hearts', 'Diamonds', 'Clubs', 'Spades')

Los rangos y palos válidos se definen en las constantes `RANKS` y `SUITS` respectivamente. Si se proporciona un rango o un palo inválido, se lanzará un error.

### Métodos:
La clase `Card` tiene los siguientes métodos:

- `getCardDetails()` - Este método no toma argumentos y devuelve un objeto con los detalles de la carta, incluyendo el rango, el palo, el color y los valores.

- `toString()` - Este método no toma argumentos y devuelve una cadena de texto representando a la carta con el formato "Rango de Palo (Color)". 

#### Ejemplo de Uso:

```javascript
// Instanciar una nueva carta
const card = new Card('A', 'Spades');

// Obtener detalles de la carta
console.log(card.getCardDetails()); 
// { rank: 'A', suit: 'Spades', color: 'black', values: [1, 11] }

// Obtener la representación de la carta en cadena de texto
console.log(card.toString()); 
// 'A of Spades (black)'
```

# Deck 
La clase `Deck` representa un mazo de cartas en un juego de Blackjack. Cada mazo está compuesto por varias cartas y puede contener múltiples mazos según se especifique.

### Instanciación:
La forma de instanciar un objeto de la clase `Deck` es la siguiente:

```javascript
const deck = new Deck(numberOfDecks);
```
- `numberOfDecks` (Número): Es el número de mazos que se quiere tener en el mazo. Por defecto es 1.

### Métodos:
La clase `Deck` tiene los siguientes métodos:

- `shuffle()` - Este método no toma argumentos y baraja las cartas en el mazo de manera aleatoria.

- `sort()` - Este método no toma argumentos y ordena las cartas en el mazo por palo y rango.

- `drawCard()` - Este método no toma argumentos y saca una carta del mazo. Lanza un error si el mazo está vacío.

- `getCount()` - Este método no toma argumentos y devuelve el número de cartas restantes en el mazo.

- `isEmpty()` - Este método no toma argumentos y devuelve `true` si el mazo está vacío, `false` en caso contrario.

- `reset()` - Este método no toma argumentos y restablece el mazo a su estado inicial, generando nuevamente las cartas correspondientes al número de mazos especificado.

#### Ejemplo de Uso:

```javascript
// Instanciar un nuevo mazo con dos mazos de cartas
const deck = new Deck(2);

// Barajar el mazo
deck.shuffle();

// Sacar una carta del mazo
const card = deck.drawCard();

// Obtener el número de cartas restantes
console.log(deck.getCount()); 

// Comprobar si el mazo está vacío
console.log(deck.isEmpty()); 

// Restablecer el mazo
deck.reset();
```

# Hand
La clase `Hand` representa una mano de cartas en un juego de Blackjack. Cada mano está compuesta por un conjunto de cartas.

### Instanciación:
Para instanciar un objeto de la clase `Hand`, simplemente debe hacer lo siguiente:

```javascript
const hand = new Hand();
```

### Métodos:
La clase `Hand` tiene los siguientes métodos:

- `addCard(card)` - Este método toma un objeto de tipo `Card` como argumento y lo agrega a la mano. Lanza un error si el argumento no es una instancia de `Card`.

- `calculateValue()` - Este método no toma argumentos y calcula el valor total de la mano, teniendo en cuenta que el As puede valer 1 o 11 dependiendo del total actual de la mano.

- `getCards()` - Este método no toma argumentos y devuelve una lista de todas las cartas en la mano.

- `getCardCount()` - Este método no toma argumentos y devuelve el número total de cartas en la mano.

- `resetHand()` - Este método no toma argumentos y limpia todas las cartas de la mano.

- `canSplit()` - Este método no toma argumentos y devuelve `true` si la mano se puede dividir (es decir, si tiene exactamente dos cartas del mismo valor), `false` en caso contrario.

- `isBlackjack()` - Este método no toma argumentos y devuelve `true` si la mano es un Blackjack (es decir, si está compuesta por un As y una carta con valor 10), `false` en caso contrario.

#### Ejemplo de Uso:

```javascript
// Instanciar una nueva mano
const hand = new Hand();

// Añadir cartas a la mano
const card1 = new Card('10', 'Hearts');
const card2 = new Card('A', 'Spades');
hand.addCard(card1);
hand.addCard(card2);

// Calcular el valor de la mano
console.log(hand.calculateValue()); 

// Obtener las cartas en la mano
console.log(hand.getCards());

// Verificar si la mano puede ser dividida
console.log(hand.canSplit()); 

// Verificar si la mano es un Blackjack
console.log(hand.isBlackjack()); 

// Resetear la mano
hand.resetHand();
```

# Dealer
La clase `Dealer` representa al crupier en un juego de Blackjack. Cada crupier tiene una mano de cartas, representada por una instancia de la clase `Hand`.

### Instanciación:
Para instanciar un objeto de la clase `Dealer`, simplemente debes hacer lo siguiente:

```javascript
const dealer = new Dealer();
```

### Métodos:
La clase `Dealer` tiene los siguientes métodos:

- `getHand()` - Este método no toma argumentos y devuelve la mano del crupier.

- `addCard(card)` - Este método toma un objeto de tipo `Card` como argumento y lo agrega a la mano del crupier.

- `draw(deck)` - Este método toma un objeto de tipo `Deck` como argumento y permite al crupier robar cartas del mazo hasta que el valor de su mano sea 17 o más.

- `isBlackjack()` - Este método no toma argumentos y devuelve `true` si la mano del crupier es un Blackjack (es decir, un As y una carta con valor 10), `false` en caso contrario.

- `isBusted()` - Este método no toma argumentos y devuelve `true` si el crupier se ha pasado de 21, `false` en caso contrario.

- `hasPosibleBlackJack()` - Este método no toma argumentos y devuelve `true` si la primera carta del crupier tiene un valor de 10 o 11 y solo tiene una carta, `false` en caso contrario.

- `reset()` - Este método no toma argumentos y resetea la mano del crupier, creando una nueva mano vacía.

#### Ejemplo de Uso:

```javascript
// Instanciar un nuevo crupier
const dealer = new Dealer();

// Agregar cartas a la mano del crupier
const card1 = new Card('10', 'Hearts');
const card2 = new Card('A', 'Spades');
dealer.addCard(card1);
dealer.addCard(card2);

// Verificar si el crupier tiene un Blackjack
console.log(dealer.isBlackjack());

// Verificar si el crupier se ha pasado de 21
console.log(dealer.isBusted());

// Verificar si la primera carta del crupier puede dar lugar a un posible Blackjack
console.log(dealer.hasPosibleBlackJack());

// Resetear la mano del crupier
dealer.reset();
```

# Player 
La clase `Player` representa a un jugador en un juego de Blackjack. Cada jugador tiene un nombre, un saldo y una o más manos de cartas.

### Instanciación:
Para crear una nueva instancia de la clase `Player`, necesitas proporcionar un nombre y un saldo inicial:

```javascript
const player = new Player('John Doe', 1000);
```

### Métodos:
La clase `Player` tiene los siguientes métodos:

- `getName()` - Este método no toma argumentos y devuelve el nombre del jugador.

- `getBalance()` - Este método no toma argumentos y devuelve el saldo actual del jugador.

- `getHands()` - Este método no toma argumentos y devuelve todas las manos de cartas del jugador.

- `placeBet(amount, handIndex = 0)` - Este método toma una cantidad a apostar y un índice de mano opcional (por defecto 0). El jugador coloca una apuesta de la cantidad especificada en la mano indicada.

- `winBet(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y actualiza el saldo del jugador como si hubiera ganado la apuesta asociada a la mano.

- `loseBet(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y actualiza la apuesta de la mano a 0.

- `addCardToHand(card, handIndex = 0)` - Este método toma un objeto de tipo `Card` y un índice de mano opcional (por defecto 0). El jugador agrega la carta especificada a la mano indicada.

- `splitHand(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0). Si es posible, el jugador divide la mano indicada en dos.

- `doubleDown(card, handIndex = 0)` - Este método toma un objeto de tipo `Card` y un índice de mano opcional (por defecto 0). Si es posible, el jugador dobla su apuesta en la mano indicada y agrega la carta especificada a esa mano.

- `updateBalance(result, handIndex)` - Este método toma un resultado ('blackjack', 'win', 'push', 'lose') y un índice de mano. Actualiza el saldo del jugador de acuerdo con el resultado de la mano.

- `isBusted(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y devuelve `true` si la mano del jugador se ha pasado de 21, `false` en caso contrario.

- `isBlackjack(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y devuelve `true` si la mano del jugador es un Blackjack, `false` en caso contrario.

- `canSplit(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y devuelve `true` si la mano del jugador puede dividirse, `false` en caso contrario.

- `canDoubleDown(handIndex = 0)` - Este método toma un índice de mano opcional (por defecto 0) y devuelve `true` si el jugador puede doblar su apuesta en la mano indicada, `false` en caso contrario.

- `reset()` - Este método no toma argumentos y resetea todas las manos del jugador y las apuestas asociadas.

#### Ejemplo de Uso:

```javascript
// Crear un nuevo jugador
const player = new Player('John Doe', 1000);

// Colocar una apuesta
player.placeBet(100);

// Añadir una carta a la mano del jugador
const card1 = new Card('10', 'Hearts');
player.addCardToHand(card1);

// Comprobar si el jugador puede doblar su apuesta
console.log(player.canDoubleDown());

// Duplicar la apuesta y añadir otra carta
const card2 = new Card('A', 'Spades');
player.doubleDown(card2);

// Comprobar si el jugador tiene un Blackjack
console.log(player.isBlackjack());

// Resetear el jugador
player.reset();
```
# Table
La clase `Table` representa una mesa de Blackjack con un número determinado de mazos de cartas, jugadores y un crupier.

```javascript
export class Table {
    #players;
    #dealer;
    #deck;
    #cutPoint;
    
    constructor(numberOfDecks = 6) {
        this.#players = Array(7).fill(null); // Representa 7 asientos en la mesa
        this.#dealer = new Dealer();
        this.#deck = new Deck(numberOfDecks);
        this.#cutPoint = 0;
    }
```
En el constructor de la clase, se inicializan los jugadores (representados como un array de 7 elementos, donde cada elemento puede ser un jugador o `null` si el asiento está vacío), el crupier, el mazo de cartas, y el punto de corte del mazo.

A continuación, se detallan los métodos de la clase `Table`:

- `addPlayer(player, seat)`: Añade un jugador en un asiento específico. Este método valida si el número de asiento es válido y si el asiento está vacío antes de agregar al jugador.

- `removePlayer(seat)`: Elimina a un jugador de un asiento específico. Este método valida si el número de asiento es válido antes de eliminar al jugador.

- `getPlayers()`: Devuelve la lista de jugadores en la mesa.

- `getPlayersString()`: Devuelve una representación en string de los jugadores en la mesa.

- `getDealerHand()`: Devuelve la mano del crupier.

- `getDeckCutPoint()`: Devuelve el punto de corte del mazo.

- `getDeck()`: Devuelve el mazo.

- `getHandsByPlayer()`: Devuelve las manos de cada jugador.

- `#checkDeckStatus()`: Verifica el estado del mazo. Se considera que el mazo necesita ser reiniciado si el número de cartas en el mazo es menor o igual al punto de corte.

- `#resetDeck()`: Reinicia el mazo. Este método reinicia el mazo, lo baraja, establece un nuevo punto de corte y quema la primera carta.

- `#resetPlayersAndDealer()`: Reinicia a los jugadores y al crupier.

- `#setOneCardToAllHands()`: Reparte una carta a cada mano de cada jugador.

- `restartRound()`: Reinicia la ronda. Este método verifica si es necesario reiniciar el mazo, reinicia al crupier y a los jugadores, y luego reparte las cartas iniciales.

- `placeBet(playerIndex, bet)`: Coloca una apuesta para un jugador específico.

- `getRoundActivePlayers()`: Devuelve los jugadores activos en la ronda actual.

- `initialDeal()`: Reparte las cartas iniciales.

- `#checkForBlackjacks()`: Verifica si hay Blackjacks en las manos de los jugadores.

- `playPlayerTurn(player, action, handIndex = 0)`: Juega el turno de un jugador en función de la acción proporcionada (`addCard`, `split`, `doubleDown` o `keep`).

- `playDealerTurn()`: Juega el turno del crupier.

- `compareHands()`: Compara las manos de los jugadores con la mano del crupier y actualiza las apuestas en función de si el jugador gana, pierde o empata.

Por último, es importante notar que los métodos precedidos por `#` son métodos privados, lo que significa que no se pueden acceder ni utilizar fuera de la clase `Table`. Estos métodos generalmente se utilizan para realizar operaciones internas dentro de la clase.

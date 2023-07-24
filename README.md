# Blackjack-Simulator-Logic
Desarrollo de base de software de simulación del juego de naipes 21 Blackjack siguiendo el paradigma de Programación Orientada a Objetos y los principios SOLID

---

# Clase Card

La clase `Card` representa una carta individual de un mazo de cartas. Cada objeto `Card` tiene un palo, un rango y un color.

## Instanciación

Para crear una nueva instancia de `Card`, debes pasar dos argumentos al constructor: el rango y el palo. Los rangos y los palos válidos se pueden encontrar en las constantes `RANKS` y `SUITS`, respectivamente.

```javascript
import Card from './classes/Card';
const card = new Card('2', 'hearts');
```

Si se pasa un rango o un palo no válido, se lanzará un error.

## Métodos

### getCardDetails()

Este método devuelve un objeto con los detalles de la carta, incluyendo el rango, el palo, el color y los posibles valores de la carta. Este método no toma ningún argumento.

```javascript
const details = card.getCardDetails();
console.log(details);  // { rank: '2', suit: 'hearts', color: 'red', values: [2] }
```

### toString()

Este método devuelve una representación de la carta como una cadena de texto. Esta cadena de texto incluye el rango, el palo y el color.

```javascript
console.log(card.toString());  // '2 of hearts (red)'
```

---

Espero que esto te ayude. Recuerda que es importante mantener la documentación actualizada conforme sigues desarrollando y modificando tu proyecto.

# Clase Deck (Mazo)

La clase Deck permite simular un mazo de cartas para el juego de Blackjack. Puede manejar múltiples mazos y proporciona funcionalidades para barajar y sacar cartas.

## Creación de un objeto Deck

Para crear un nuevo mazo de cartas, instanciamos la clase Deck. Podemos especificar cuántos mazos de 52 cartas queremos incluir. Si no se especifica un número, se asumirá que es 1.

```javascript
import { Deck } from './classes/Deck.js';

// Crea un mazo con un solo mazo de 52 cartas
const deck1 = new Deck();

// Crea un mazo con 4 mazos de 52 cartas
const deck2 = new Deck(4);
```

## Métodos de la clase Deck

La clase Deck proporciona los siguientes métodos:

### shuffle()

Baraja el mazo de cartas.

```javascript
deck1.shuffle();
```

### sort()

Ordena el mazo de cartas por palo y rango.

```javascript
deck1.sort();
```

### drawCard()

Retira la última carta del mazo. Si el mazo está vacío, se lanzará un error.

```javascript
try {
    const card = deck1.drawCard();
    console.log(card.toString());
} catch(error) {
    console.error(error);
}
```

### getCount()

Devuelve la cantidad de cartas que quedan en el mazo.

```javascript
console.log(deck1.getCount());
```

La clase Deck es una herramienta esencial en nuestro simulador de Blackjack, proporcionando un modelo realista de un mazo de cartas y las operaciones que se pueden realizar sobre él.

## Clase `Hand`

### Instanciación

Para crear una nueva instancia de la clase `Hand`, simplemente se instancia sin necesidad de parámetros:

```javascript
let playerHand = new Hand();
```

### Métodos

- `addCard(card: Card)`: Agrega una nueva carta al array interno `#cards` de la mano. 

```javascript
let newCard = deck.drawCard();  // Assuming 'deck' is an instance of Deck.
playerHand.addCard(newCard);
```

- `calculateValue()`: Calcula el valor total de la mano teniendo en cuenta las reglas especiales del As en Blackjack (puede valer 1 u 11 dependiendo de la situación). Retorna un entero que representa el valor de la mano.

```javascript
let handValue = playerHand.calculateValue();
```

- `getCards()`: Retorna una copia del array interno `#cards` de la mano, cada carta es una instancia de la clase `Card`.

```javascript
let cardsInHand = playerHand.getCards();  // This is an array of Card instances.
```

- `getCardCount()`: Retorna el número de cartas en la mano actual.

```javascript
let cardCount = playerHand.getCardCount();
```

- `resetHand()`: Borra todas las cartas en la mano (útil para prepararse para una nueva ronda de juego).

```javascript
playerHand.resetHand();
``` 

Estos métodos permiten que se maneje una "mano" en el juego de Blackjack, proporcionando todas las funcionalidades necesarias para agregar cartas a la mano, calcular y obtener su valor, y limpiar la mano para una nueva ronda.

# Clase Player 
La clase `Player` representa a un jugador en el juego de Blackjack. 

Para instanciar un nuevo jugador, debes proporcionar dos argumentos: un nombre (cadena) y un saldo inicial (número). El constructor de la clase creará automáticamente una nueva mano vacía para el jugador y establecerá su apuesta a 0.

```javascript
let player = new Player("John Doe", 100);
```

Aquí está un desglose de los métodos disponibles en la clase `Player`:

- `getName()`: Este método no toma ningún argumento y devuelve el nombre del jugador.

- `getBalance()`: Este método no toma ningún argumento y devuelve el saldo actual del jugador.

- `getHands()`: Este método no toma ningún argumento y devuelve un array con las manos del jugador. Cada mano es un objeto que contiene la mano (`hand`) y la apuesta asociada (`bet`).

- `placeBet(amount, handIndex = 0)`: Este método toma un monto de apuesta y un índice de mano opcional. Deduce el monto de la apuesta del saldo del jugador y asocia la apuesta con la mano.

- `winBet(handIndex = 0)`: Este método toma un índice de mano opcional y duplica la apuesta asociada con la mano seleccionada, añadiendo el resultado al saldo del jugador.

- `loseBet(handIndex = 0)`: Este método toma un índice de mano opcional y reinicia la apuesta asociada con la mano seleccionada a 0.

- `addCardToHand(card, handIndex = 0)`: Este método toma una carta y un índice de mano opcional. Añade la carta a la mano seleccionada.

- `splitHand(handIndex = 0)`: Este método toma un índice de mano opcional y divide la mano seleccionada en dos, si es posible.

- `doubleDown(card, handIndex = 0)`: Este método toma una carta y un índice de mano opcional. Duplica la apuesta del jugador y añade una carta a la mano seleccionada.

- `updateBalance(result, handIndex)`: Este método toma un resultado ('win', 'push' o 'lose') y un índice de mano opcional. Actualiza el saldo del jugador en función del resultado.

- `isBusted(handIndex = 0)`: Este método toma un índice de mano opcional y comprueba si la mano seleccionada se ha pasado de 21.

- `isBlackJack(handIndex = 0)`: Este método toma un índice de mano opcional y comprueba si la mano seleccionada tiene BlackJack.

- `reset()`: Este método no toma ningún argumento y reinicia las manos del jugador a una mano vacía y establece su apuesta a 0.

# Clase Dealer

La clase Dealer representa al crupier en el juego de Blackjack.

## Instanciación

Un Dealer se instancia de la siguiente forma:

```javascript
let dealer = new Dealer();
```

## Métodos

### getHand()

Este método devuelve la mano del Dealer.

### addCard(card)

Este método agrega una carta a la mano del Dealer.

### play(deck)

Este método simula el turno del Dealer. Continuará pidiendo cartas del mazo proporcionado hasta que el valor de su mano sea de 17 o más.

### isBlackjack()

Este método verifica si la mano del Dealer es un Blackjack (una mano que suma 21 con sólo dos cartas).

### isBusted()

Este método verifica si la mano del Dealer se ha pasado de 21.

### reset()

Este método restablece la mano del Dealer a una mano vacía.

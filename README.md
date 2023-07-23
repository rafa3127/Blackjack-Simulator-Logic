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
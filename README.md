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
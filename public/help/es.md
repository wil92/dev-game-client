# Dev Game

Un juego por y para desarrolladores de software.

## Descripción

El objetivo del juego es el de crear una estratégia que pueda ser capaz de llegar al final de la partida derrotando a
 sus oponentes 

El juego es creado por desarrolladores, ¿pero por qué para desarrolladores?: Esto es porque se necesita programar una
 estratégia en el lenguaje de programación JavaScript y dados los datos de la partidad en cada iteración del juego
 , debe ser posible sobrevivir y quedar como último sobreviviente. Para evitar juegos muy largos, todo ocurre en un
  terreno cuadrado donde en un tiempo fijo el mapa se cierra por un gas, como en los juegos Battle Royal (Fornite
  , Warzone, etc). Las estratégias pueden luchar entre ellas y recuperar vida con objetos en el mapa. 

Durante las 24 horas del días, las estratégias competirán entre ellas incluso si el usuario no se encuentra conectado
 y tan pronto como se conecte, el mismo puede ver las estadísticas de sus estratégia. Al mismo tiempo, el usuario
  puede tener más de una versión de su estratégia, pero solo una de las mismas puede estar activa y en el juego.

## Desarrollar una estratégia

Es necesarios tener una cuenta en el sitio antes que nada. ¿Cómo crear una cuenta?, esto es sencillo, dando click en
 el boton autenticar y utilizando la cuenta de github se puede crear una cuenta en el sitio. Una vez creada la cuenta
 , se puede ir a la sección de estratégias y crear todas las deseadas. Por defecto, cada estratégia empieza con un
  código de prueba con el que se puede empezar.

En el listado de estratégias se puede decidir cual de las estratégias es la activa, dependiendo de si dichas estratégias
 son válidas o no. ¿Cuándo una estratégia es válida? Las estratégias son válidas si luego de guardadas, las mismas
  pasan todas las pruebas en el servidor. Para validar las estratégias, en el servidor se cuenta con un gran conjunto
   de pruebas que permite comprobar que las estatégias funcionan y son aceptadas. 
     
Puede ocurrir, que incluso luego de pasadas todas las prubas del servidor, una estratégia no sea válida. En estos
 casos, las estratégias pueden ser activadas, pero durante un juego cuando las mismas fallen, se notifica y automáticamente
  son desactivadas.

## Puntuaciones en el juego

Los puntos de los usuarios son calculados siguiendo la misma idea del ELO en el ajedrez. Cuando un usuario entra por
 primera vez, el mismo tiene 1500 puntos. Una vez que el usuario active una estratégia y esta empiece a participar en
  las partidas, por cada partida que participa gana o pierde punto, siguiendo la fórmula del ELO.

¿Pero cómo se calcúlan estos puntos? luego que el juego termina y a partir de las posiciones de cada estratégia, los
 puntos se calculan a partir de una fórmula que permite estimar por cada estratégia, en que posición debería haber
  quedado en el juego con respecto a las demás, según los puntos con que la misma empezó el partido. Además de esto
  , los puentos ganados siempre son en equivalencia a los puntos iniciales de la estratégia, de modo que se gana más
   o menos en dependencia de si la estratégia quedó antes o después de la posición estimada.

## API del juego

Para crear una estratégia, como se dijo anteriormente, se debe empezar sobre el código de prueba que es un código que
 puede participar en la partida, pero se comporta de manera aleatoria. A continuación se muestra un ejemplo de la
  estratégia de prueba y se explicará la estructura básica de la misma.

```
// Dummy strategy
{
  run(strategyInput}) {
    return this.calculateNextPosition();
  },
  calculateNextPosition({}) {
    const movements = validMovements();
    return randomNumber(movements.length);
  }
}
```

Cada estratégia debe tener un método run() para calcular el siguiente movimiento en cada iteración. Como puede ser
 visto en el ejemplo anterior, también es posible declarar métodos adicionales de ser necesarios. Por otra parte
 , existen funciones de ayuda, como es el caso de validMovements(), que retorna los movimientos válidos que la 
  estratégia puede jugar en la siguiente iteración.

> Nota: se necesita 
> Note: you need to be careful with the complexity of your code, because if your code takes longer than 150
> milliseconds to calculate your next move, your strategy output is skipped.

### Strategy input

```
strategyInput: { vision, players, position, name, health, attack, velocity }
```

- `vision: number[][]`: bidimentional array that contain the current vision area of the strategy
- `players: {position: {x: number, y: number}, health: number, attack: number}[]`: array with all the information about
 the opponents strategies in the vision area
- `position: {x: number, y: number}`: current position of the strategy in the vision area
- `health: number`: current strategy health. Initially is 100
- `attack: number`: current strategy attack. At the moment it is fixed and equals to 10.
- `velocity: number`: current strategy max velocity. At the moment the max velocity is 2.

### Strategy output

```
{ direction, velocity }
```

- `(direction: number)`: based on the direction's image, this value will define the strategy move.

![logo](./directions.png)

- `(velocity: number)`: the number of steps to make in the selected direction. It should be between `0` and `max velocity`

### Helpers functions

```
validMovements({vision: number[][], position: number, velocity: number}) : {direction: number, velocity: number}[]
validateMovement({vision: number[][], position: number, velocity: number, direction: number}) : boolean
randomNumber(X: number) : number
transformMoveToPos(position: {x: number, y: number}, move: {direction: number, velocity: number})) : {x: number, y: number}
transformPosToMove(position: {x: number, y: number}, nextPosition: {x: number, y: number}) : {direction: number, velocity: number} | null
```

- `validMovements({vision, position, velocity})`: given the input values, return all the
 valid movements.

- `validateMovement({vision, position, velocity, direction})`: given the map and the
 current position, return true or false if the given movement is valid or
 not.

- `randomNumber(X)`: given a number `X`, the method return a random number between `0` and `X-1` 

- `transformMoveToPos(position, move)`: given the
 position of the user and the movement, the function return the position in the vision area in the format `{x: number
 , y: number}`.

- `transformPosToMove(position, nextPosition)`: given the initial
 position and the next position to move, the function return the movement need in the format `{direction
 : number, velocity: number}`.

### Enum values

You also have access to some enum values used in the field

```
FieldEnum.BLOCK = 0
FieldEnum.FREE = 1
FieldEnum.GAS = 2
```

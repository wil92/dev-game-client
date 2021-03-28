# Dev Game

Un juego por y para desarrolladores de software. El presente juego es totalmente opensource, por lo que pueden
 encontrarlo en el siguiente enlace: [wil92/dev-game-docker](https://github.com/wil92/dev-game-docker)

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

> Nota: Tener cuidado con la complejidad algorítmica del código, puesto que si al ejecutarse la estratégia, esta
> tarda más de 150 milisegundos, automáticamente se detiene la ejecución de la misma y no se tiene en cuenta en esa
> iteración.

### Parámetros de entrada de la estratégia

```
strategyInput: { vision, players, position, name, health, attack, velocity }
```

- `vision: number[][]`: Arrego bidireccional que contiene el área de visión actual en que se encuentra la
 estratégia.
- `players: {position: {x: number, y: number}, health: number, attack: number}[]`: Arreglo que contiene toda la
 información sobre las estratégias oponentes en el área de visión.
- `position: {x: number, y: number}`: Actual posición de la estratégia en el área de visión.
- `health: number`: Valor de la vida de la estratégia. Inicialmente es 100.
- `attack: number`: Ataque de la estratégia. Este valor actualmente es 2.
- `velocity: number`: Velocidad de la estratégia. Este valor actualmente es 2.

### Formato de la respuesta de la estratégia

```
{ direction, velocity }
```

- `(direction: number)`: Basado en la siguiente imágen, este valor debe determinar hacia donde se moverá la
estratégia en la siguiente iteración

![logo](./directions.png)

- `(velocity: number)`: Determina el número de pasos que se moverá la estratégia en la dirección especificada. Este
 valor debe ser entre `0` y `max velocity`

### Funciones de ayuda

```
validMovements({vision: number[][], position: number, velocity: number}) : {direction: number, velocity: number}[]
validateMovement({vision: number[][], position: number, velocity: number, direction: number}) : boolean
randomNumber(X: number) : number
transformMoveToPos(position: {x: number, y: number}, move: {direction: number, velocity: number})) : {x: number, y: number}
transformPosToMove(position: {x: number, y: number}, nextPosition: {x: number, y: number}) : {direction: number, velocity: number} | null
```

- `validMovements({vision, position, velocity})`: Dados los valores de entrada, retorna todos los posibles
 movimientos válidos que la estratégia puede realizar.

- `validateMovement({vision, position, velocity, direction})`: Dado el mapa y la posición actual de la estratégia
, retorna true o false si el movimiento definido es válido o no.

- `randomNumber(X)`: Dado el valor `X`, el método retorna un valor aleatorio entre `0` y `X-1` 

- `transformMoveToPos(position, move)`: A partir de la posición de la estratégia y el movimiento que se desea, la
 función retorna la posición en que terminaría la estratégia en el área de visión con el formato `{x: number, y
 : number}`. 

- `transformPosToMove(position, nextPosition)`: A partir de una posición origen y una posición destino, la función
 retorna el movimiento necesario en el formato `{direction : number, velocity: number}`.

### Valores Enum

También se tiene acceso a algunos valores Enum de la aplicación

```
FieldEnum.BLOCK = 0
FieldEnum.FREE = 1
FieldEnum.GAS = 2
```

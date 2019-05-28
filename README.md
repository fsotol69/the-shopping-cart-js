# DOM | The Shopping Cart

## Introducción

Crearemos un carrito de la compra, donde los usuarios podrán añadir o quitar productos del carrito. Además, podrán calcular el precio total de los ítems por cada producto así como el precio total del carrito.

## Ejercicio

## Requerimientos

- Usaremos un normalizador para evitar diferencias entre estilos de navegadores. Su CDN es:
	https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.cs

- Usa al menos tres eventos `onclick`
- Usa al menos un `getElementById`
- Usa al menos una vez `getElementsByTagName`
- Usa al menos una vez `getElementsByClassName`

## Entregables
Escribe el código JavasScript organizado en los ficheros disponibles y súbelo al repositorio para después hacer pull-request.

### Iteración 1: Crear un producto
Empezaremos creando el HTML para los productos. Debería parecerse a esto:


![](carrito-1.png)

Cada producto tendrá:

- Un div con un span, mostrando el nombre del producto
- Un div con un span, mostrando el coste de una unidad
- Un div con un label y un input, donde el usuario indicará cuantas unidades comprará
- Un div con un span, mostrando el precio total de todos los ítems. Este será el resultado de calcular el número de ítems multiplicado por el precio de un producto. El valor por defecto del precio total es 0
- Un div con un botón delete, para eliminar un producto de la lista
  
#### Calcula el precio total

Una vez que hayas preparado el HTML y el CSS (usa SASS para los estilos), usa JavaScript para obtener los datos necesarios para calcular el precio total y cambiar el valor del DOM.

- Crea un evento click para el botón  `Calculate Prices` 
- Este evento ejecutará una función que:
	* Recupera el precio unitario del producto
	* Recupera la cantidad de ítems deseados
	* Calcula el precio total según los datos anteriores
	* Actualiza el precio toal del DOM

### Iteración 2: Añadir otro producto

Añade otro producto

![](carrito-2.png)

Cuando cliquees en el botón `Calculate Prices`, todos los precios se deberían actualizar al mismo tiempo.

### Iteración 3: Calcula el precio total

Tendrás que sumar los precios totales de cada producto para calcular el valor total del carrito. Después se mostrará en el DOM.


Crea un nuevo `div` por debajo del botón `Calculate Prices`. Este  elemento `div` tendrá un título `h2` que mostrará:

`<h2>Total Price: <span>0€</span></h2>`

También has de crear una función que:

- Seleccione los totales de cada producto
- Sume todos los elementos seleccionados en el paso anterior y calcule el precio total
- Muestre el precio total en el DOM

### Iteration 4: Borrar un producto

Crearemos un evento click asociado a botones Delete para borrar un producto de la lista. Para hacer eso:
- Selecciona todos los botones `Delete` 
- Asígnales un evento click a cada uno con la siguiente funcionalidad:
	- Selecciona el div que contiene el elemento HTML del producto que queremos borrar
	- Selecciona el div que contiene la lista de productos 
	- Utiliza la función `removeChild` 
  
:bulb: Es posible trazar que botón se ha clicado mediante la función `e.currentTarget`. Además, selecciona el nodo del elemento padre con `parentNode`.

### Iteración 5: Crear nuevos productos 

Crearemos dinámicamente los nuevos productos de la tienda. El formulario debería parecerse a esto:
![](carrito-2.png)

Aquí tendremos dos inputs que representen el nombre y el precio por unidad del nuevo producto. Al final, añadiremos un botón para crear el producto.

- Crea dos input que permitan al usuario añadir los datos del nuevo producto.
- Crea un botón. Este botón tendrá asignado un evento click con la siguiente funcionalidad:
	- Recoger los datos de los inputs.
	- Crear una nueva fila con los los datos del producto almacenado.

:warning: Asegúrate que el nuevo producto tenga el mismo comportamiento de los ya existentes.
- Deberías ser capaz de calcular el precio total del producto
- Se debería actualizar el valor total del carrito con el precio total del producto añadido
- El producto debería poder borrarse

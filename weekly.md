# Resumen de Weeklies - Grupo 05

Entregable: Archivo weekly.md con un resumen de las tareas completadas, los impedimentos encontrados y las soluciones propuestas indicando los integrantes.

# Reunión 25/11

## Qué se hizo la semana pasada

Durante los días previos a la reunión se llevaron a cabo las siguientes tareas:

-   Refactorización del código siguiendo el patrón de diseño MVC
-   Implementación del motor de vistas EJS
-   Modularización y reutilización de los componentes 'header' y 'footer'
-   Separación de las vistas en las carpetas /partials, /users y /products

## Impedimentos con los cuales nos encontramos

-   Nos encontramos con problemas a la hora de modularizar en un partial el componente 'head', ya que el mismo no es igual en todas las vistas al variar la etiqueta title y la vinculación de los archivos CSS correspondientes. Esto queda pendiente para consultarlo en clase.
-   Al separar las vistas en distintas carpetas, nos dimos cuenta Express estaba buscando las mismas en la raíz de la carpeta /views pero no accedía a las subcarpetas. Investigamos cómo solucionar este problema y descubrimos que se pueden setear distintas carpetas simultáneamente implementando el siguiente código (Solución encontrada en Stack Overflow):

```
app.set("views", [
    __dirname + "/site/views",
    __dirname + "/site/views/users",
    __dirname + "/site/views/products",
]);
```

## Qué se va a hacer la semana próxima

Durante la semana próxima vamos a estar trabajando en la página de creación y edición de productos, una vez que hayamos visto la unidad relacionada con formularios y la aplicación de los distintos métodos HTTP.

# Reunión 04/12

## Qué se hizo la semana pasada

Durante la semana pasada no logramos completar la tarea que nos queda pendiente en el sprint, ya que todavía nos faltaba afianzar los conocimientos en lo que respecta a manejo de métodos HTTP para implementarlos en los formularios de edición y creación de productos.
Sin embargo, nos enfocamos en agregar pequeñas mejoras al código como la implementación de una vista para errores 404 a través del método `app.use((req, res, next) => { res.status(404).render(); });`o la instalación y configuración de paquetes necesarios para trabajar con métodos HTTP como lo es methodOverride.

## Impedimentos con los cuales nos encontramos

Nuestro único impedimento fue la falta de práctica a la hora de implementar rutas y métodos para crear y modificar productos, lo cual nos quedó más claro luego de haber completado la ejercitación de "MercadoLiebre" el jueves 03/12 en la clase.

## Qué se va a hacer la semana próxima

Establecimos un día fijo para reunirnos y trabajar bajo la modalidad pair programming. Durante la semana próxima nos vamos a encargar de finalizar las vistas de creación y edición de productos para posteriormente darle las funcionalidades HTTP correspondientes trabajando en equipo de forma sincrónica.

# Reunión 11/12

## Qué se hizo la semana pasada

Se completaron las páginas de creación y edición de productos. Se dejaron listas las rutas get, post y put de dichas vistas para poder implementar las funcionalidades que correspondan en el siguiente Sprint.

## Impedimentos con los cuales nos encontramos

A la hora de probar que las rutas funcionaran nos encontrmaos con un inconveniente en el método PUT. La solución fue subir la línea de código `app.use(methodOverride("_method")); ` del archivo app.js para que la misma fuera leida antes de requerir las rutas.

## Qué se va a hacer la semana próxima

Durante la semana próxima vamos a empezar a trabajar con el Sprint 4 (el cual se lanza a partir del lunes 14/12).

# Reunión 18/12

## Qué se hizo la semana pasada

Recibimos las indicaciones para completar el nuevo Sprint (JSON y HTTP). Creamos nuestra base de datos de productos y agregamos las imagenes correspondientes a cada uno.
Durante la reunión semanal hicimos pair programming para lograr entre todos leer y mostrar todos los productos de la base de datos en el sitio web.

## Impedimentos con los cuales nos encontramos

De momento no nos encontramos con ninguna situación que nos haya impedido continuar con las indicaciones dadas. Únicamente surgieron temas a resolver en cuanto al CSS cuando intentamos mostrar en pantalla todos los productos obtenidos de la base de datos en tarjetas de producto, pero es un inconveniente cuya resolución no debería representar mayores esfuerzos.

## Qué se va a hacer la semana próxima

Durante la semana entrante vamos a trabajar en implementar los métodos de escritura, edición y borrado de productos en los controladores correspondientes.

# Reunión 28/12

## Qué se hizo la semana pasada
- Creación de ruta y controlador "create" para poder cargar nuevos productos en la base de datos.
- Creación de ruta y controlador "edit" para poder editar productos de la base de datos.
- Instalación de multer
- Corrección de formularios en las vistas.

## Impedimentos con los cuales nos encontramos
- De momento multer no permite subir ni editar las imagenes.
- En la vista de edición, al traer los datos del producto al formulario, sólo se visualiza la primera palabra del campo en cuestión.

## Qué se va a hacer la semana próxima
Solucionar inconvenientes con multer y con la vista de edición de productos.



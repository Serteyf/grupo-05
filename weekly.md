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

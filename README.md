# Instrucciones de Uso

## Pasos a seguir e indicaciones

1. Para levantar el servidor, ejecute el siguiente comando: `npm start`

2. No se realizó un formulario dentro de `realTimeProducts.handlebars` porque se implementó la conexión de socket emits con HTTP.

3. Para poder hacer la conexión de socket emits con HTTP, se exportó la función `socketServer` de `app.js`. Luego, se importó en `views.router.js` para poder utilizarla en los métodos POST y DELETE.

4. Para corroborar que el servidor haya conectado con el cliente, en la consola del servidor se muestra un mensaje que dice “Nuevo Cliente Conectado, id: ” junto al ID del cliente.

## API

La API cuenta con los siguientes métodos:

- **GET**: [http://localhost:8080/](http://localhost:8080/) (Ruta para ver los productos por HTTP)
- **GET**: [http://localhost:8080/realtimeproducts](http://localhost:8080/realtimeproducts) (Ruta para ver los productos por webSockets)
- **POST**: [http://localhost:8080/realtimeproducts](http://localhost:8080/realtimeproducts) (Ruta para ingresar un nuevo producto a través de Postman)
- **DELETE**: [http://localhost:8080/realtimeproducts/:pid](http://localhost:8080/realtimeproducts/:pid) (Ruta para eliminar un producto con un ID específico)

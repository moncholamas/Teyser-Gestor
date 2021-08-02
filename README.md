# Teyser-Gestor Backend
Gestor y sistema de facturación para imprenta de Jujuy con sucursal en Tucumán.

## Correr en modo desarrollo
Clonar el repositorio
- ingresar al directorio nuevo teyser-gestor
- ingresar en la terminal
    ```sh  
    npm run dev
    ```

## Generar el archivo de producción
Clonar el repositorio
- Ingresar al directorio nuevo teyser-gestor
- Ingresar en la terminal
    ```sh  
    npm run build
    ```
- El comando anterior genera los documentos en el directorio /dist el package.json ya sabe donde encontrar los archivos nuevos solo ejecutamos:
    ```sh  
    npm run start
    ```
    
## End Points
Para interactuar con la base de datos estan definidas las siguientes rutas y sus respectivos verbos HTTP
```sh  
    Routes
          |-clientes
          |-equipos
          |-insumos
          |-novedades
          |-operador
          |-pagos
          |-parte-diario
          |-productos
          |-ventas
          
    Sub rutas y verbos HTTP
    GET:
          /     #obtiene todos los elementos de ese END POINT
          /id   #obtiene un elemento en particular por su ID
    POST:
          /nuevo    #genera un nuevo elemento
    DELETE:
          /eliminar/id    #elimina un elemento por el ID correspondiente
    PUT:
          /actualizar/id  #actualiza un elemento con nuevos datos 
          
```
## Ejemplo de uso
Usando Postamn ingresamos dos nuevas Request
```sh  
    #obtener todos los equipos
    [GET] http://localhost:3009/equipos
    
    #cargar un nuevo equipo
    [POST] http://localhost:3009/equipos/nuevo
```

## Contacto
Agregar datos de contacto

# Teyser-Gestor Backend
Gestor y sistema de facturación para imprenta de Jujuy con sucursal en Tucumán.
## Clonar e instalar

```sh  
#Clonar el repositorio
git clone https://github.com/moncholamas/Teyser-Gestor.git
    
#Instalar las dependencias 
npm install
```


## Ejecutar en modo desarrollo
- ingresar en la terminal
    ```sh  
    npm run dev
    ```

## Salir a producción
Crear los archivos de producción
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
Usando Postman o algun otro soft similar ingresamos nuevas Request:
```sh  
    #obtener todos los equipos
    [GET] http://localhost:3009/equipos
    
    #obtener el equipo con el Id 1
    [GET] http://localhost:3009/equipos/1
    
    #cargar un nuevo equipo
    [POST] http://localhost:3009/equipos/nuevo
```

## Contacto
Agregar datos de contacto

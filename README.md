# Teyser-Gestor Backend
Gestor de stocks, generación de tickets de mantenimiento y sistema de facturación para imprenta de Jujuy con sucursal en Tucumán.



## Ejemplo funcional
En la carpeta /samples podras ver el gestor en funcionamiento con un deploy temporal en Heroku y una colección de Postman para todas las rutas.
[Ver Ejemplos.](https://github.com/moncholamas/Teyser-Gestor/tree/master/samples)


***

## Clonar e instalar

```sh  
#Clonar el repositorio
git clone https://github.com/moncholamas/Teyser-Gestor.git
    
#Instalar las dependencias 
npm install
```
Esto generará la carpeta node_modules, las principales dependencias son:

~~~
Node JS: v14.16.1
Express JS: v4.17.1
Sequelize: v6.6.5
Json Web Token: v8.5.1

#Para la BD se requiere
Postgres: 13.2
~~~

## Generar la Base de datos
En la carpeta /teyserdb se encuentra el Esquema Relacional y el backUp del SQL con toda la estructura. Para la conexión para desarrollo local crear las siguiente variables de entorno:
```sh  
#Crear un archivo .DOTENV en la raiz del proyecto con:

DATA_BASE=[string]      #nombre de la base de datos
USER_NAME=[string]      #nombre de usuario de la DB
PASSWORD=[string]       #clave del usuario
HOST=[string]           #host (localhost)
SECRET=[string]         #palabra usada para generar los tokens
ENV=DEV                 #para logs en local
TEYSERMAILPASS=[string] #clave para el envio de correos por codemailer
MAIL=[string]           #correo a donde enviar los logs (tener habilitada la autenticacion en 2 pasos de Google)
PUERTODB=[int]          #puerto para la base de datos 5432 por defecto en postgres
    
```


## Ejecutar en modo desarrollo
ingresar en la terminal
```sh  
    npm run dev
 ```

## Salir a producción
Crear los archivos de producción
Ingresar en la terminal
```sh  
    npm run build
```
El comando anterior genera los documentos en el directorio /dist el package.json ya sabe donde encontrar los archivos nuevos solo ejecutamos:
```sh  
    npm run start
```
    
***

## Implementaciones próximas
~~~
- Búsquedas por distintos atributos con query params
- Lista de permisos CORS más amplia para desarrollo
~~~
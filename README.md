# Teyser-Gestor Backend
Gestor de stocks y sistema de facturación para imprenta de Jujuy con sucursal en Tucumán.
## Clonar e instalar

```sh  
#Clonar el repositorio
git clone https://github.com/moncholamas/Teyser-Gestor.git
    
#Instalar las dependencias 
npm install
```

## Generar la Base de datos
En la carpeta /teyserdb se encuentra el Esquema Relacional, el SQL que genera toda la base de datos y el backup de ERStudio
Una vez generada la base de datos en Postgres hay que agregar los datos para la conexión
```sh  
#dentro de src/config.js
#cambiar los datos por los locales
    dataBase:'teyserdb',
    userName: '',
    password: '',
    host: 'localhost'    
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
    
## End Points
Para interactuar con la base de datos estan definidas las siguientes rutas y sus respectivos verbos HTTP
```sh
    Rutas
    #Endpoints Principales
        #no requiere token
        /ingresar       

        #requieren validación de token
        /clientes       #comun
        /equipos        #comun
        /insumos        #comun
        /novedades      #comun
        /operador       
        /pagos
        /parte-diario
        /productos
        /ventas
```

## Inicio de sesión **/ingresar** 

Los nuevos usuarios ingresan como operarios e inactivos, el admin da los permisos.

```sh
Metodos Disponibles:

#Iniciar Sesion
[POST]:
        /ingresar            
        
        BODY:   {
                    correo: string
                    clave: string
                }
        HEADERS: {}

#Crea un nuevo usuario
[POST]:
        /ingresar/nuevo   

        BODY:   {
                    nombre: string
                    apellido: string
                    correo:string
                    clave: string
                }
        HEADERS: {}    


```         
## End Points comunes 

Todos estos end points tiene definido los 4 verbos HTTP: GET, POST, PUT y DELETE y su funcionamiento es similar, por eso están agrupados:

```sh
#ejemplo con Equipos
Metodos Disponibles:

#Obtener todos los equipos
[GET]:
        /equipos            
        
        BODY:   {}
        HEADERS: {
            x-token: token
        }

#Obtener un equipo especifico por ID enviado por la url
[GET]:
        /equipos/:id            
        
        BODY:   {}
        HEADERS: {
            x-token: token
        }

#ingresar nuevo equipo
#el cuerpo de POST y PUT son iguales y hay una sección detallada de C/U para determinado endpoint
[POST]:
        /equipos            
        
        BODY:   {
                    nombre: string
                    nombre: string
                }
        HEADERS: {
            x-token: token
        }

#actualizar un equipo por ID enviado por url
[PUT]:
        /equipos/:id            
        
        BODY:   {
                    nombre: string
                    nombre: string
                }
        HEADERS: {
            x-token: token
        }

#Borrar un equipo por ID enviado por url
[DELETE]:
        /equipos/:id

        BODY:   {}
        HEADERS: {
            x-token: token
        }   


``` 


## Ejemplo de uso

```sh  
    #obtener todos los equipos
    [GET] http://localhost:3009/equipos
    
    #obtener el equipo con el Id 1
    [GET] http://localhost:3009/equipos/1
    
    #cargar un nuevo equipo
    [POST] http://localhost:3009/equipos/nuevo
```

## End Points particulares
Las siguientes rutas tienen un tratamiento diferenciado de los datos de los casos anteriores:
## */operador*
```sh
Metodos Disponibles:

#Obtener todos los operadores o uno por ID enviado por la url 
#funciona igual que en los end points comunes

#Obtener todos los operadores devuelve el listado completo menos aquel operador que hace la solicitud



# actualizar un operador por ID enviado por url
## solo se puede modificar el rol (admin o operario) o activar la cuenta 
[PUT]:
        /operador/:id            
        
        BODY:   {
                    activo: boolean
                    tipo_operario: string
                }
        HEADERS: {
            x-token: token
        }

#Borrar un equipo por ID enviado por url
[DELETE]:
        /operador/:id

        BODY:   {}
        HEADERS: {
            x-token: token
        }   

#NO SE CREAN OPERADORES

``` 

## */productos*
```sh
Metodos Disponibles:

#Obtener todos los productos o uno por ID enviado por la url 
#funciona igual que en los end points comunes

# actualizar un operador por ID enviado por url
## solo se puede modificar el rol (admin o operario) o activar la cuenta 

[POST]:
        /pagos            
        
        BODY:   {
                    nombre: string
                    descripcion: string
                    precio: decimal
                    categoria: enum
                    #se envia un arreglo con objetos del tipo
                    detalle_insumos: [
                        {
                            id_insumo: integer,
                            cantidad: integer
                        }
                    ]
                }
        HEADERS: {
            x-token: token
        }

#TODAVIA NO ESTA DEFINIDO COMO SE ACTUZIZAN LOS PRODUCTOS
[PUT]: #PENDIENTE
        /operador/:id            
        
        BODY:   {}
        HEADERS: {
            x-token: token
        }

#Borrar un equipo por ID enviado por url
[DELETE]:
        /operador/:id

        BODY:   {}
        HEADERS: {
            x-token: token
        }   

#NO SE CREAN OPERADORES

``` 

## */pagos*
```sh
Metodos Disponibles:


[POST]:
        /pagos            
        
        BODY:   {
                    tipo: enum 
                    fecha: date
                    observacion: string
                    id_operador: integer
                    #Se envia un arreglo de objetos del siguiente tipo
                    detalles_pago: [
                        {
                            id_insumo: integer,
                            cantidad: integer
                        }
                    ]
                }
        HEADERS: {
            x-token: token
        }



#Borrar un equipo por ID enviado por url
[DELETE]:
        /pagos/:id

        BODY:   {}
        HEADERS: {
            x-token: token
        }   

# Obtener todos los pagos y un solo pago por ID enviado por url
# funcionan igual que en los end points comunes
        
# LOS PAGOS NO SE ACTUALIZAN
# SE BORRAN Y REINGRESAN Y QUEDAN AUDITADOS
``` 
## */ventas*
```sh
Metodos Disponibles:


[POST]:
        /ventas            
        
        BODY:   {
                    observacion,
                    estado,
                    id_parte_diario,
                    id_cliente,
                    #se envia un arreglo con objetos del tipo
                    detalles_venta: [
                        {
                            id_producto: integer,
                            cantidad: integer
                        }
                    ]
                }
        HEADERS: {
            x-token: token
        }



#Borrar un equipo por ID enviado por url
[DELETE]:
        /ventas/:id

        BODY:   {}
        HEADERS: {
            x-token: token
        }   

# Obtener todas las ventas y una sola venta por ID enviado por url
# funcionan igual que en los end points comunes
        
# LOS VENTAS NO SE ACTUALIZAN
# SE BORRAN Y REINGRESAN Y QUEDAN AUDITADAS
``` 

## Contacto
Agregar datos de contacto

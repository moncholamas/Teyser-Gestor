# End Points
## Pruebas desde Heroku
### El deploy a Heroku escucha peticiones desde **localhost:3000** (en _127.0.0.1:3000_ no va realizar los request por politica de CORS, futura mejora)


## Copiar el backup de Postman localmente:

```sh
#Descargar dentro de esta carpeta Teyser la copia: heroku.postman_collection.json

#En este backup los endpoints apuntan al Deploy de Heroku:
https://infinite-shelf-47181.herokuapp.com/
```

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
        /operadores       
        /pagos
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
        HEADERS #No requiere

#Crea un nuevo usuario
[POST]:
        /ingresar/nuevo   

        BODY:   {
                    nombre: string
                    apellido: string
                    correo:string
                    clave: string
                }
        HEADERS #No requiere   


```         
## End Points comunes 

Todos estos end points tiene definido los 4 verbos HTTP: GET, POST, PUT y DELETE y su funcionamiento es similar, por eso están agrupados:

```sh
#ejemplo con Equipos
Metodos Disponibles:

#Obtener todos los equipos
[GET]:
        /equipos            
        
        BODY #No requiere
        HEADERS: {
            x-token: token
        }

#Obtener un equipo especifico por ID enviado por la url
[GET]:
        /equipos/:id            
        
        BODY #No requiere
        HEADERS: {
            x-token: token
        }

#ingresar nuevo equipo
#el cuerpo de POST y PUT son iguales (ver los detalles de cada caso en la carpeta de Postman)
[POST]:
        /equipos            
        
        BODY:   {
            nombre_tecnico: string,
            nombre_fantasia: string,
            categoria: "impresora", "fotocopiadora", "libreria", "red", "otro",
            estado: "operativo", "en mantenimiento", "inoperable"
}
        HEADERS: {
            x-token: token
        }

#actualizar un equipo por ID enviado por url
[PUT]:
        /equipos/:id            
        
        BODY:  #Mismo cuerpo que POST
        HEADERS: {
            x-token: token
        }

#Borrar un equipo por ID enviado por url
[DELETE]:
        /equipos/:id

        BODY #No requiere
        HEADERS: {
            x-token: token
        }   


``` 


## Ejemplo de uso

```sh  
    #obtener todos los equipos
    [GET] https://infinite-shelf-47181.herokuapp.com//equipos
    
    #obtener el equipo con el Id 1
    [GET] https://infinite-shelf-47181.herokuapp.com/equipos/1
    
    #cargar un nuevo equipo
    [POST] https://infinite-shelf-47181.herokuapp.com/equipos/nuevo
```

## End Points particulares
Las siguientes rutas tienen un tratamiento diferenciado de los datos de los casos anteriores:
## */operadores*
```sh
Metodos Disponibles:

#Obtener todos los operadores o uno por ID enviado por la url 
#funciona igual que en los end points comunes

#Obtener todos los operadores devuelve el listado completo menos aquel operador que hace la solicitud



# actualizar un operador por ID enviado por url
## solo se puede modificar el rol (admin o operario) o activar la cuenta 
[PUT]:
        /operadores/:id            
        
        BODY:   {
                    activo: boolean
                    tipo_operario: string
                }
        HEADERS: {
            x-token: token
        }

#Borrar un equipo por ID enviado por url
[DELETE]:
        /operadores/:id

        BODY #No requiere
        HEADERS: {
            x-token: token
        }   

#NO SE CREAN OPERADORES, SOLO SE REGISTRAN POR VOLUNTAD PROPIA

``` 

## */productos*
```sh
Metodos Disponibles:

#Obtener todos los productos o uno por ID enviado por la url 
#funciona igual que en los end points comunes


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

#LOS PRODUCTOS TIENEN VERSIONES, LAS ACTUALIZACIONES SOLO CREAN UNA NUEVA VERSION DEL PRODUCTO
[PUT]: #PENDIENTE
        /productos/:id            
        
        BODY:   {
            precio: decimal,
            descripcion: string
                 }
        HEADERS: {
            x-token: token
        }

#BORRAR UN PRODUCTOS, SOLO SI NO APARECE NINGUNA VERSION EN ALGUNA VENTA REALIZADA
[DELETE]:
        /productos/:id

        BODY #No requiere
        HEADERS: {
            x-token: token
        }   


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



#Borrar un pago por ID enviado por url
[DELETE]:
        /pagos/:id

        BODY #No requiere
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



#Borrar una venta or ID enviado por url
[DELETE]:
        /ventas/:id

        BODY #No requiere
        HEADERS: {
            x-token: token
        }   

# Obtener todas las ventas y una sola venta por ID enviado por url
# funcionan igual que en los end points comunes
        
# LOS VENTAS NO SE ACTUALIZAN
# SE BORRAN Y REINGRESAN Y QUEDAN AUDITADAS
``` 


Para más detalle ingresar al backup y revisar las carpetas definidas para cada ruta con todas las acciones disponibles ya hechas en un modelo base para cada una.
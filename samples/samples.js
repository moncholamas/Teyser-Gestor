/*
MODELOS DE JSONS PARA LA CARGA DE DATOS O ACTUALIZACION (POST y PUT)
*/

/* CLIENTES

nuevo cliente/actualizar cliente requiere pasar:
{
    "nombre":"ejemploNombre",
    "apellido": "ejemploApellido",
    "telefono":"stringTelefono",
    "correo":"stringCorreo"
}

*/

/* Equipos

nuevo equipo/actualizar equipo requiere pasar:
{
    "estado":"operativo" "en mantenimiento" "inoperable" (solo una de estas opciones)
    "nombre_tecnico":"ejemploNombre",
    "nombre_fantasia": "ejemploNombre",
    "categoria": "impresora" "fotocopiadora" "libreria" "red" "otro" (solo una de estas opciones)
}

*/

/* Insumos

nuevo insumo/actualizar insumo requiere pasar:
{
    "unidades": 500 (numero)
    "nombre": "ejemploNombre",
    "presentacion": "ejemploPresentacion"
}

*/

/* Operadores

nuevo operador/actualizar operador requiere pasar:
{
    "cuenta":"activo" "inactivo" (solo una de estas opciones)
    "nombre":"ejemploNombre",
    "apellido": "ejemploNombre",
    "correo": "ejemploCorreo",
    "tipo_operador": "operario", "admin", "tecnico" (solo una de estas opciones)
}

*/

/* Productos

nuevo producto/actualizar producto requiere pasar:
{
    "nombre":"ejemploNombre",
    "descripcion": "ejemploDescripcion",
    "precio": 15.00 (numero),
    "categoria": "impresion" "fotocopia" "articulo de libreria" "servicio" "servicio digital" "otro" (solo una de estas opciones)
}

*/


/* Novedades

nueva novedad/actualizar novedad requiere pasar:
{
    "fecha_actualizacion": "2021-08-02", (tipo fecha)
    "categoria": "emergencia" "mantenimiento" "informativa", (solo una de estas opciones)
    "estado": "nuevo" "arreglado" "trabajando",
    "novedad": "ejemploNovedad",
    "observacion": "ejemploObservacion",
    "id_parte_diario": 1 (numero entero),
    "id_equipo": 1(numero entero, puede ser NULL)
}

*/

/* Pagos
//no esta definida la actulizacion completamente (solo usar la carga)
nuevo pago requiere pasar:
{
    "tipo": "compra de insumo" "luz" "internet" "rentas" "afip" "municipio" "otro",
    "fecha": "2021-07-31",
    "observacion": "ejemploObservacion",
    "id_operador": 1 (numero entero),
    "detalles_pago": [
        {
            "id_insumo": 1 (numero entero),
            "cantidad": 10 (numero entero, puede ser decimal),
            "precio": 50.00 (numero decimal)
        },{
            "id_insumo": 2 (numero entero),
            "cantidad": 10 (numero entero, puede ser decimal),
            "precio": 50.00 (numero decimal)
        },{
            //un objeto por cada insumo comprado
        }
    ]
}

*/

/* Parte Diario

nuevo parte diario/actualizar parte diario requiere pasar:
{
    "id_operador": 1 (numero entero),
    "fecha": "2021-08-02", (tipo fecha)
    "hora_inicio": "16:35:50", (tipo hora hh:mm:ss)
    "hora_cierre": "16:35:50", (tipo hora hh:mm:ss)
    "turno": "maniana" "tarde" "noche", (solo una de estas opciones)
    "recaudacion": 52225.50(mumero decimal),
    "observacion": "ejemploObservacion"
}

*/

/* Ventas
//no esta definida la actulizacion completamente (solo usar la carga)
//nueva venta requiere pasar:
{
    "observacion": "ejemploObservacion",
    "total": 50.0 (decimal, la base de datos calcula este valor por seguridad),
    "estado": "pendiente" "cancelado",
    "id_parte_diario": 1 (numero entero),
    "id_cliente": 1 (numero entero),
    "detalles_venta":[
        {
            "id_producto": 1 (numero entero),
            "cantidad": 150 (numero entero)
        },
        {
            "id_producto": 2 (numero entero),
            "cantidad": 150 (numero entero)
        },{
            //un objeto por cada producto vendido
        }
    ]
}

*/

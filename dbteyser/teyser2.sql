-----------------------------------------------
--              Nuevos tipos de datos definidos
-----------------------------------------------

--T: equipos
CREATE TYPE estado_equipos AS ENUM
    ('operativo', 'en mantenimiento', 'inoperable');
CREATE TYPE categoria_equipo AS ENUM
    ('impresora', 'fotocopiadora', 'libreria','red','otro');

--T: pagos
CREATE TYPE tipo_pago AS ENUM
    ('compra de insumo', 'luz', 'internet', 'rentas', 'afip', 'municipio', 'otro');

--T: operadores
CREATE TYPE rol AS ENUM
    ('operario', 'admin', 'tecnico');

--T: ventas
CREATE TYPE estado_venta AS ENUM
    ('pendiente', 'cancelado');

--T: novedades
CREATE TYPE estado_novedades AS ENUM
    ('nuevo', 'arreglado', 'trabajando');

--T: productos
CREATE TYPE categorias_producto AS ENUM
    ('impresion', 'fotocopia', 'articulo de libreria', 'servicio', 'servicio digital', 'otro');
CREATE TYPE estado_producto AS ENUM
    ('activo', 'inactivo');

--T: novedades
CREATE TYPE categoria_novedades AS ENUM
    ('emergencia', 'mantenimiento', 'informativa');


------------------------------------------------------
--                         Tablas
------------------------------------------------------


-- 
-- TABLE: clientes 
--
CREATE TABLE clientes(
    id_cliente    SERIAL           NOT NULL,
    nombre        varchar(50)    NOT NULL,
    apellido      varchar(50)    NOT NULL,
    telefono      char(10),
    correo        varchar(50),
    CONSTRAINT "PK19" PRIMARY KEY (id_cliente)
)
;

-- 
-- TABLE: consumos 
--
CREATE TABLE consumos(
    id_producto    int2        NOT NULL,
    id_insumo      int2        NOT NULL,
    cantidad       decimal(10,2),
    CONSTRAINT "PK22" PRIMARY KEY (id_producto, id_insumo)
)
;

-- 
-- TABLE: detalle_compras 
--
CREATE TABLE detalle_compras(
    id_compra    int4             NOT NULL,
    id_insumo    int2             NOT NULL,
    precio       decimal(6, 2)    NOT NULL,
    cantidad     int2             NOT NULL,
    CONSTRAINT "PK16" PRIMARY KEY (id_compra, id_insumo)
)
;

-- 
-- TABLE: detalle_ventas 
--
CREATE TABLE detalle_ventas(
    id_version_producto    int4             NOT NULL,
    id_venta               int4             NOT NULL,
    cantidad               int2             NOT NULL,
    total                  decimal(10, 2)    NOT NULL,
    CONSTRAINT "PK13" PRIMARY KEY (id_producto, id_venta)
)
;

-- 
-- TABLE: equipos 
--
CREATE TABLE equipos(
    id_equipo          SERIAL           NOT NULL,
    estado             estado_equipos,
    nombre_tecnico     varchar(50),
    nombre_fantasia    varchar(50),
    categoria          categoria_equipo,
    "createdAt" timestamp,
    "udatedAt" timestamp,
    CONSTRAINT "PK7" PRIMARY KEY (id_equipo)
)
;

-- 
-- TABLE: insumos 
--
CREATE TABLE insumos(
    id_insumo       SERIAL              NOT NULL,
    unidades        decimal(10, 2),
    nombre          varchar(50),
    presentacion    varchar(100),
    "createdAt" timestamp,
    "udatedAt" timestamp,
    CONSTRAINT "PK9" PRIMARY KEY (id_insumo)
)
;

-- 
-- TABLE: novedades 
--
CREATE TABLE novedades(
    id_novedad             SERIAL           NOT NULL,
    categoria              categoria_novedades,
    estado                 estado_novedades,
    novedad                varchar(150)    NOT NULL,
    observacion            text,
    id_operador        int4           NOT NULL,
    id_equipo              int2,
    "createdAt" timestamp,
    "udatedAt" timestamp,
    CONSTRAINT "PK15" PRIMARY KEY (id_novedad)
)
;

-- 
-- TABLE: operadores
--
CREATE TABLE operadores(
    id_operador      SERIAL           NOT NULL,
    activo    BOOLEAN       NOT NULL,
    nombre           varchar(50)    NOT NULL,
    apellido         char(10)   NOT NULL,
    correo           varchar(50)    NOT NULL,
    clave            text   NOT NULL,
    tipo_operador              rol,
    "createdAt" timestamp,
    "udatedAt" timestamp,
    CONSTRAINT "PK3" PRIMARY KEY (id_operador)
)
;

-- 
-- TABLE: pagos 
--
CREATE TABLE pagos(
    id_compra      SERIAL             NOT NULL,
    tipo           tipo_pago,
    observacion    varchar(200),
    total          decimal(6, 2),
    "createdAt" timestamp,
    id_operador    int2             NOT NULL,
    CONSTRAINT "PK18" PRIMARY KEY (id_compra)
)
;

-- 
-- TABLE: productos 
--
CREATE TABLE productos(
    id_producto    SERIAL             NOT NULL,
    nombre         varchar(100)     NOT NULL,
    descripcion    varchar(100)      NOT NULL,
    categoria      categorias_producto,
    estado         estado_producto,
    "createdAt" timestamp,
    CONSTRAINT "PK4" PRIMARY KEY (id_producto)
)
;

--
-- TABLE: versiones_productos
--

CREATE TABLE versiones_productos(
    id_version_producto SERIAL NOT NULL,
    id_producto int,
    "createdAt" timestamp,
    precio DECIMAL(8,2),
    CONSTRAINT "PK31" PRIMARY KEY (id_version_producto)
)
;

-- 
-- TABLE: stock 
--
CREATE TABLE stock(
    id_insumo    SERIAL              NOT NULL,
    cantidad     decimal(10, 2)    NOT NULL,
    CONSTRAINT "PK17" PRIMARY KEY (id_insumo)
)
;

-- 
-- TABLE: venta 
--
CREATE TABLE ventas(
    id_venta           BIGSERIAL             NOT NULL,
    observacion        varchar(200),
    total              decimal(6, 2)    NOT NULL,
    estado          estado_venta       NOT NULL,
    id_operador    int4             NOT NULL,
    id_cliente         int4             NOT NULL,
    "createdAt" timestamp,
    CONSTRAINT "PK5" PRIMARY KEY (id_venta)
)
;

-- 
-- TABLE: consumos 
--
ALTER TABLE consumos ADD CONSTRAINT "Refproducto22" 
    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
;

ALTER TABLE consumos ADD CONSTRAINT "Refinsumos23" 
    FOREIGN KEY (id_insumo)
    REFERENCES insumos(id_insumo)
;

-- 
-- TABLE: detalle_compras 
--
ALTER TABLE detalle_compras ADD CONSTRAINT "Refpagos13" 
    FOREIGN KEY (id_compra)
    REFERENCES pagos(id_compra)
;

ALTER TABLE detalle_compras ADD CONSTRAINT "Refinsumos14" 
    FOREIGN KEY (id_insumo)
    REFERENCES insumos(id_insumo)
;

-- 
-- TABLE: detalle_ventas 
--
ALTER TABLE detalle_ventas ADD CONSTRAINT "Refversion_producto1" 
    FOREIGN KEY (id_version_producto)
    REFERENCES versiones_productos(id_version_producto)
;

ALTER TABLE detalle_ventas ADD CONSTRAINT "Refventa2" 
    FOREIGN KEY (id_venta)
    REFERENCES ventas(id_venta)
;

-- 
-- TABLE: versiones_producto 
--
ALTER TABLE versiones_productos ADD CONSTRAINT "Refversion_versiones_prod" 
    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
;


-- 
-- TABLE: novedades 
--
ALTER TABLE novedades ADD CONSTRAINT "Refoperadores11" 
    FOREIGN KEY (id_operador)
    REFERENCES operadores(id_operador)
;

ALTER TABLE novedades ADD CONSTRAINT "Refequipos17" 
    FOREIGN KEY (id_equipo)
    REFERENCES equipos(id_equipo)
;


-- 
-- TABLE: pagos 
--
ALTER TABLE pagos ADD CONSTRAINT "Refoperador15" 
    FOREIGN KEY (id_operador)
    REFERENCES operadores(id_operador)
;


-- 
-- TABLE: stock 
--
ALTER TABLE stock ADD CONSTRAINT "Refinsumos12" 
    FOREIGN KEY (id_insumo)
    REFERENCES insumos(id_insumo)
;


-- 
-- TABLE: ventas
--
ALTER TABLE ventas ADD CONSTRAINT "Refoperadores19" 
    FOREIGN KEY (id_operador)
    REFERENCES operadores(id_operador)
;

ALTER TABLE ventas ADD CONSTRAINT "Refclientes20" 
    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
;


-------------------------------------------------
--                                      FUNCIONES
-------------------------------------------------


-------------------------------------------------
-- Retorna TRUE si un version de un producto ya se vendió
-------------------------------------------------

CREATE OR REPLACE FUNCTION producto_vendido(integer) RETURNS boolean
AS $$
DECLARE
productos_encontrados RECORD;
BEGIN
	select * into productos_encontrados from  detalle_ventas inner join versiones_productos 
			using (id_version_producto) where id_producto = $1;
	IF FOUND THEN
		RETURN true;
	END IF;
	RETURN false;
END;
$$ LANGUAGE 'plpgsql';


/*
-- MUESTRA EL MONTO PARCIAL DE la recaudacion del dia (para cada vez que se ingresa una venta);
CREATE OR REPLACE FUNCTION recaudacion_parte_diario() RETURNS decimal 
AS $$
DECLARE 
v_total_temporal decimal;
BEGIN
	v_total_temporal := (SELECT SUM(total) FROM ventas 
						GROUP BY id_parte_diario ORDER BY id_parte_diario DESC LIMIT 1);
	return v_total_temporal;
END;
$$ LANGUAGE 'plpgsql';
*/

------------------------------------------------
--                                      TRIGGERS
------------------------------------------------

-------------------------------------------------------------------
-- Actualiza el monto de la venta cuando se iserta un nuevo detalle
-------------------------------------------------------------------
CREATE OR REPLACE FUNCTION actualiza_venta()RETURNS TRIGGER AS $$
DECLARE
BEGIN
	UPDATE ventas SET total = (total + new.total) WHERE id_venta=new.id_venta;
	RETURN new;
END;
$$ language 'plpgsql';

CREATE TRIGGER actualizar_venta
AFTER INSERT ON detalle_ventas
FOR EACH ROW EXECUTE PROCEDURE actualiza_venta();

----------------------------------------------------------------------------
-- Actualiza el monto de la compra cuando se iserta un nuevo detalle_compras
-----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION actualiza_compra()RETURNS TRIGGER AS $$
DECLARE
BEGIN
	UPDATE pagos SET total = (total + new.precio * new.cantidad) WHERE id_compra=new.id_compra;
	RETURN new;
END;
$$ language 'plpgsql';

CREATE TRIGGER actualizar_compra
AFTER INSERT ON detalle_compras
FOR EACH ROW EXECUTE PROCEDURE actualiza_compra();

---------------------------------------------
--Borra los detalles_venta antes que la venta
---------------------------------------------
CREATE OR REPLACE FUNCTION borrar_detalles()RETURNS TRIGGER
AS $$
DECLARE
BEGIN
	DELETE FROM detalle_ventas WHERE id_venta = OLD.id_venta;
    RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER borrar_venta
BEFORE DELETE ON ventas
FOR EACH ROW EXECUTE PROCEDURE borrar_detalles();

-----------------------------------------------
--Borra los detalles_compra antes que la compra
-----------------------------------------------
CREATE OR REPLACE FUNCTION borrar_detalles_compra()RETURNS TRIGGER
AS $$
DECLARE
BEGIN
	DELETE FROM detalle_compras WHERE id_compra = OLD.id_compra;
    RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER borrar_compra
BEFORE DELETE ON pagos
FOR EACH ROW EXECUTE PROCEDURE borrar_detalles_compra();

------------------------------------------------------
--Borra los consumos de un producto antes que el mismo
------------------------------------------------------

CREATE OR REPLACE FUNCTION borrar_consumos()RETURNS TRIGGER
AS $$
DECLARE
BEGIN
	DELETE FROM consumos WHERE id_producto = OLD.id_producto;
    RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER borrar_producto
BEFORE DELETE ON productos
FOR EACH ROW EXECUTE PROCEDURE borrar_consumos();

------------------------------------------------------
--Borra las versiones de un producto antes que el mismo
------------------------------------------------------

CREATE OR REPLACE FUNCTION borrar_versiones()RETURNS TRIGGER
AS $$
DECLARE
BEGIN
	DELETE FROM versiones_productos WHERE id_producto = OLD.id_producto;
    RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER borrar_versiones_producto
BEFORE DELETE ON productos
FOR EACH ROW EXECUTE PROCEDURE borrar_versiones();



------------------------------------
-- Aactualiza el monto de cada stock
------------------------------------
CREATE OR REPLACE FUNCTION actualizar_stock()RETURNS TRIGGER
AS $$
DECLARE
v_cantidad INTEGER;
v_id INTEGER;
consumo RECORD;
BEGIN
IF TG_TABLE_NAME = 'detalle_ventas' THEN
-- si la tabla es detalles_venta y es un insert
	IF TG_OP = 'INSERT' THEN
		--Resto al stock actual la cantidad de insumos de la tabla consumos
		--recorro la tabla de consumos
		FOR consumo IN SELECT * FROM consumos 
		WHERE id_producto IN (select id_producto from versiones_productos inner join detalle_ventas 
		using(id_version_producto)
		where id_version_producto = NEW.id_version_producto) LOOP
			-- modifico en la tabla stock por cada producto encontrado en la tabla consumos
			UPDATE stock SET cantidad = cantidad - (consumo.cantidad * NEW.cantidad) WHERE id_insumo = consumo.id_insumo ;
		END LOOP;
	ELSE
	-- solo hay dos operaciones que disparan el trigger, aqui seria un delete
		FOR consumo IN SELECT * FROM consumos 
		WHERE id_producto IN (select id_producto from versiones_productos inner join detalle_ventas 
		using(id_version_producto)
		where id_version_producto = OLD.id_version_producto) LOOP
			-- modifico en la tabla stock por cada producto encontrado en la tabla consumos
			UPDATE stock SET cantidad = cantidad + (consumo.cantidad * OLD.cantidad) WHERE id_insumo = consumo.id_insumo;
		END LOOP;
	END IF;
ELSE
	-- solo se ejecuta sobre dos tablas, esta es detalle_compras y es un insert
	IF TG_OP = 'INSERT' THEN
		--Sumo al stock actual la cantidad de unidades nuevas compradas
		--busco la cantidad total de unidades nuevas de insumo
		v_cantidad := (SELECT unidades FROM insumos WHERE id_insumo = NEW.id_insumo)*NEW.cantidad;
		--seteo el stock
		UPDATE stock SET cantidad = cantidad + v_cantidad WHERE id_insumo = NEW.id_insumo;
	ELSE
	-- solo hay dos operaciones que disparan el trigger, aqui seria un delete
		--busco la cantidad total de unidades de insumo
		v_cantidad := (SELECT unidades FROM insumos WHERE id_insumo = OLD.id_insumo)*OLD.cantidad;
		--seteo el stock
		---> ingreso el stock por primera vez cuando ingreso un producto (el producto tiene que existir)
                --> funcion de trigger SETEAR_STOCK
		UPDATE stock SET cantidad = cantidad - v_cantidad WHERE id_insumo = OLD.id_insumo;
	END IF;
END IF;
RETURN coalesce(NEW, OLD);
END;
$$ language 'plpgsql';



create trigger actualizar_stock_ventas
AFTER INSERT OR DELETE ON detalle_ventas
FOR EACH ROW EXECUTE PROCEDURE actualizar_stock();

create trigger actualizar_stock_compras
AFTER INSERT OR DELETE ON detalle_compras
FOR EACH ROW EXECUTE PROCEDURE actualizar_stock();

-----------------------------------------------------------------------------------------
-- Inicia el stock de un insumo nuevo en 0 y borra el stock cuando se elimina un insumo
-----------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION setear_stock() RETURNS TRIGGER
AS $$
DECLARE 
BEGIN
	IF TG_OP = 'INSERT' AND TG_WHEN = 'AFTER' THEN
		INSERT INTO stock VALUES (OLD.id_insumo,0);
	END IF;
	IF TG_OP = 'DELETE' AND TG_WHEN = 'BEFORE' THEN
		DELETE FROM stock WHERE id_insumo = OLD.id_insumo;
	END IF;
	RETURN COALESCE (NEW, OLD);
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER ingresar_insumo
AFTER INSERT ON insumos
FOR EACH ROW EXECUTE PROCEDURE setear_stock();

CREATE TRIGGER borrar_insumo
BEFORE DELETE ON insumos
FOR EACH ROW EXECUTE PROCEDURE setear_stock();


------------------------------------------------------------------
-----------------                 ||| AUDITORIAS |||
------------------------------------------------------------------


--
-- Auditoria ventas borradas
-- Auditoria pagos borrados
-- 

--tabla
CREATE TABLE auditorias_compras_ventas(
id_auditoria SERIAL,
fecha TIMESTAMP WITHOUT TIME ZONE,
operador int,
tabla VARCHAR,
operacion VARCHAR,
monto DECIMAL
);

--funcion
CREATE OR REPLACE FUNCTION ingreso_auditoria() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	INSERT INTO auditorias_compras_ventas VALUES(default,CURRENT_TIMESTAMP,OLD.id_operador,TG_TABLE_NAME,TG_OP,OLD.total);
	RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';

--triggers
CREATE TRIGGER audita_ventas
BEFORE DELETE ON ventas
FOR EACH ROW EXECUTE PROCEDURE ingreso_auditoria();

CREATE TRIGGER audita_pagos
BEFORE DELETE ON pagos
FOR EACH ROW EXECUTE PROCEDURE ingreso_auditoria();

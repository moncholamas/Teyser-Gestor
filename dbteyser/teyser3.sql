--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg20.04+1)

-- Started on 2021-10-15 09:40:07 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 660 (class 1247 OID 37486)
-- Name: categoria_equipo; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.categoria_equipo AS ENUM (
    'impresora',
    'fotocopiadora',
    'libreria',
    'red',
    'otro'
);


ALTER TYPE public.categoria_equipo OWNER TO manuel;

--
-- TOC entry 681 (class 1247 OID 37556)
-- Name: categoria_novedades; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.categoria_novedades AS ENUM (
    'emergencia',
    'mantenimiento',
    'informativa'
);


ALTER TYPE public.categoria_novedades OWNER TO manuel;

--
-- TOC entry 675 (class 1247 OID 37536)
-- Name: categorias_producto; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.categorias_producto AS ENUM (
    'impresion',
    'fotocopia',
    'articulo de libreria',
    'servicio',
    'servicio digital',
    'otro'
);


ALTER TYPE public.categorias_producto OWNER TO manuel;

--
-- TOC entry 657 (class 1247 OID 37478)
-- Name: estado_equipos; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.estado_equipos AS ENUM (
    'operativo',
    'en mantenimiento',
    'inoperable'
);


ALTER TYPE public.estado_equipos OWNER TO manuel;

--
-- TOC entry 672 (class 1247 OID 37528)
-- Name: estado_novedades; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.estado_novedades AS ENUM (
    'nuevo',
    'arreglado',
    'trabajando'
);


ALTER TYPE public.estado_novedades OWNER TO manuel;

--
-- TOC entry 678 (class 1247 OID 37550)
-- Name: estado_producto; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.estado_producto AS ENUM (
    'activo',
    'inactivo'
);


ALTER TYPE public.estado_producto OWNER TO manuel;

--
-- TOC entry 669 (class 1247 OID 37522)
-- Name: estado_venta; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.estado_venta AS ENUM (
    'pendiente',
    'cancelado'
);


ALTER TYPE public.estado_venta OWNER TO manuel;

--
-- TOC entry 666 (class 1247 OID 37514)
-- Name: rol; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.rol AS ENUM (
    'operario',
    'admin',
    'tecnico'
);


ALTER TYPE public.rol OWNER TO manuel;

--
-- TOC entry 663 (class 1247 OID 37498)
-- Name: tipo_pago; Type: TYPE; Schema: public; Owner: manuel
--

CREATE TYPE public.tipo_pago AS ENUM (
    'compra de insumo',
    'luz',
    'internet',
    'rentas',
    'afip',
    'municipio',
    'otro'
);


ALTER TYPE public.tipo_pago OWNER TO manuel;

--
-- TOC entry 235 (class 1255 OID 37752)
-- Name: actualiza_auditoria(character varying, character varying); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.actualiza_auditoria(usuario character varying, auditoria character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
DECLARE
nombre_tabla_auditoria text := quote_ident('auditoria');
ultima_aud record;
BEGIN
-- segun que tabla se modifique actualizo alguna de las 2 tablas de auditoria
        --traigo la ultima auditoria hecha en cualquiera de las 2 tablas
        EXECUTE 'SELECT * FROM ' || nombre_tabla_auditoria || ' ORDER BY id_auditoria DESC LIMIT 1' INTO ultima_aud;
		IF NOT FOUND THEN
			RAISE EXCEPTION 'No existe la auditoria';
		ELSE
			EXECUTE 'UPDATE ' || nombre_tabla_auditoria || ' set operador = $1 where id_auditoria =$2'
            USING usuario, ultima_aud.id_auditoria;
			
            -- si la operacion es UPDATE tambien actualizo el campo usuario de la fila anterior
			IF ultima_aud.operacion = 'UPDATE' THEN
                EXECUTE 'UPDATE ' || nombre_tabla_auditoria || ' set operador = $1 where id_auditoria =$2'
                USING usuario, ultima_aud.id_auditoria -1 ;
		    END IF;
		RETURN true;
	END IF;
END;
$_$;


ALTER FUNCTION public.actualiza_auditoria(usuario character varying, auditoria character varying) OWNER TO manuel;

--
-- TOC entry 228 (class 1255 OID 37726)
-- Name: actualiza_compra(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.actualiza_compra() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	UPDATE pagos SET total = (total + new.precio * new.cantidad) WHERE id_compra=new.id_compra;
	RETURN new;
END;
$$;


ALTER FUNCTION public.actualiza_compra() OWNER TO manuel;

--
-- TOC entry 227 (class 1255 OID 37724)
-- Name: actualiza_venta(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.actualiza_venta() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	UPDATE ventas SET total = (total + new.total) WHERE id_venta=new.id_venta;
	RETURN new;
END;
$$;


ALTER FUNCTION public.actualiza_venta() OWNER TO manuel;

--
-- TOC entry 250 (class 1255 OID 37734)
-- Name: actualizar_stock(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.actualizar_stock() RETURNS trigger
    LANGUAGE plpgsql
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
$$;


ALTER FUNCTION public.actualizar_stock() OWNER TO manuel;

--
-- TOC entry 236 (class 1255 OID 37753)
-- Name: borrar_consumos(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.borrar_consumos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	DELETE FROM consumos WHERE id_producto = OLD.id_producto;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.borrar_consumos() OWNER TO manuel;

--
-- TOC entry 229 (class 1255 OID 37728)
-- Name: borrar_detalles(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.borrar_detalles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	DELETE FROM detalle_ventas WHERE id_venta = OLD.id_venta;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.borrar_detalles() OWNER TO manuel;

--
-- TOC entry 237 (class 1255 OID 37755)
-- Name: borrar_detalles_compra(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.borrar_detalles_compra() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	DELETE FROM detalle_compras WHERE id_compra = OLD.id_compra;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.borrar_detalles_compra() OWNER TO manuel;

--
-- TOC entry 230 (class 1255 OID 37762)
-- Name: borrar_versiones(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.borrar_versiones() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	DELETE FROM versiones_productos WHERE id_producto = OLD.id_producto;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.borrar_versiones() OWNER TO manuel;

--
-- TOC entry 234 (class 1255 OID 37892)
-- Name: hacer_admin(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.hacer_admin() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	IF NEW.id_operador = 1 THEN
	UPDATE operadores SET activo = true, tipo_operador='admin' WHERE id_operador = 1;
	END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.hacer_admin() OWNER TO manuel;

--
-- TOC entry 233 (class 1255 OID 37779)
-- Name: ingreso_auditoria(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.ingreso_auditoria() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	INSERT INTO auditorias_compras_ventas VALUES(default,CURRENT_TIMESTAMP,OLD.id_operador,TG_TABLE_NAME,TG_OP,OLD.total);
	RETURN OLD;
END;
$$;


ALTER FUNCTION public.ingreso_auditoria() OWNER TO manuel;

--
-- TOC entry 232 (class 1255 OID 37767)
-- Name: producto_vendido(integer); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.producto_vendido(integer) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$
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
$_$;


ALTER FUNCTION public.producto_vendido(integer) OWNER TO manuel;

--
-- TOC entry 231 (class 1255 OID 37737)
-- Name: setear_stock(); Type: FUNCTION; Schema: public; Owner: manuel
--

CREATE FUNCTION public.setear_stock() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE 
BEGIN
	IF TG_OP = 'INSERT' AND TG_WHEN = 'AFTER' THEN
		INSERT INTO stock VALUES (NEW.id_insumo,0);
	END IF;
	IF TG_OP = 'DELETE' AND TG_WHEN = 'BEFORE' THEN
		DELETE FROM stock WHERE id_insumo = OLD.id_insumo;
	END IF;
	RETURN COALESCE (NEW, OLD);
END;
$$;


ALTER FUNCTION public.setear_stock() OWNER TO manuel;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 37772)
-- Name: auditorias_compras_ventas; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.auditorias_compras_ventas (
    id_auditoria integer NOT NULL,
    fecha timestamp without time zone,
    operador integer,
    tabla character varying,
    operacion character varying,
    monto numeric
);


ALTER TABLE public.auditorias_compras_ventas OWNER TO manuel;

--
-- TOC entry 225 (class 1259 OID 37770)
-- Name: auditorias_compras_ventas_id_auditoria_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.auditorias_compras_ventas_id_auditoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auditorias_compras_ventas_id_auditoria_seq OWNER TO manuel;

--
-- TOC entry 3204 (class 0 OID 0)
-- Dependencies: 225
-- Name: auditorias_compras_ventas_id_auditoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.auditorias_compras_ventas_id_auditoria_seq OWNED BY public.auditorias_compras_ventas.id_auditoria;


--
-- TOC entry 203 (class 1259 OID 37565)
-- Name: clientes; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    telefono character(10),
    correo character varying(50)
);


ALTER TABLE public.clientes OWNER TO manuel;

--
-- TOC entry 202 (class 1259 OID 37563)
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_cliente_seq OWNER TO manuel;

--
-- TOC entry 3205 (class 0 OID 0)
-- Dependencies: 202
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;


--
-- TOC entry 204 (class 1259 OID 37571)
-- Name: consumos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.consumos (
    id_producto smallint NOT NULL,
    id_insumo smallint NOT NULL,
    cantidad numeric(10,2)
);


ALTER TABLE public.consumos OWNER TO manuel;

--
-- TOC entry 205 (class 1259 OID 37576)
-- Name: detalle_compras; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.detalle_compras (
    id_compra integer NOT NULL,
    id_insumo smallint NOT NULL,
    precio numeric(6,2) NOT NULL,
    cantidad smallint NOT NULL
);


ALTER TABLE public.detalle_compras OWNER TO manuel;

--
-- TOC entry 206 (class 1259 OID 37581)
-- Name: detalle_ventas; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.detalle_ventas (
    id_version_producto integer NOT NULL,
    id_venta integer NOT NULL,
    cantidad smallint NOT NULL,
    total numeric(10,2) NOT NULL
);


ALTER TABLE public.detalle_ventas OWNER TO manuel;

--
-- TOC entry 208 (class 1259 OID 37588)
-- Name: equipos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.equipos (
    id_equipo integer NOT NULL,
    estado public.estado_equipos,
    nombre_tecnico character varying(50),
    nombre_fantasia character varying(50),
    categoria public.categoria_equipo,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.equipos OWNER TO manuel;

--
-- TOC entry 207 (class 1259 OID 37586)
-- Name: equipos_id_equipo_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.equipos_id_equipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipos_id_equipo_seq OWNER TO manuel;

--
-- TOC entry 3206 (class 0 OID 0)
-- Dependencies: 207
-- Name: equipos_id_equipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.equipos_id_equipo_seq OWNED BY public.equipos.id_equipo;


--
-- TOC entry 210 (class 1259 OID 37596)
-- Name: insumos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.insumos (
    id_insumo integer NOT NULL,
    unidades numeric(10,2),
    nombre character varying(50),
    presentacion character varying(100),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.insumos OWNER TO manuel;

--
-- TOC entry 209 (class 1259 OID 37594)
-- Name: insumos_id_insumo_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.insumos_id_insumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insumos_id_insumo_seq OWNER TO manuel;

--
-- TOC entry 3207 (class 0 OID 0)
-- Dependencies: 209
-- Name: insumos_id_insumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.insumos_id_insumo_seq OWNED BY public.insumos.id_insumo;


--
-- TOC entry 212 (class 1259 OID 37604)
-- Name: novedades; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.novedades (
    id_novedad integer NOT NULL,
    categoria public.categoria_novedades,
    estado public.estado_novedades,
    novedad character varying(150) NOT NULL,
    observacion text,
    id_operador integer NOT NULL,
    id_equipo smallint,
    "createdAt" time without time zone NOT NULL,
    "updatedAt" time without time zone NOT NULL
);


ALTER TABLE public.novedades OWNER TO manuel;

--
-- TOC entry 211 (class 1259 OID 37602)
-- Name: novedades_id_novedad_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.novedades_id_novedad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.novedades_id_novedad_seq OWNER TO manuel;

--
-- TOC entry 3208 (class 0 OID 0)
-- Dependencies: 211
-- Name: novedades_id_novedad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.novedades_id_novedad_seq OWNED BY public.novedades.id_novedad;


--
-- TOC entry 214 (class 1259 OID 37615)
-- Name: operadores; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.operadores (
    id_operador integer NOT NULL,
    activo boolean NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character(10) NOT NULL,
    correo character varying(50) NOT NULL,
    clave text NOT NULL,
    tipo_operador public.rol,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.operadores OWNER TO manuel;

--
-- TOC entry 213 (class 1259 OID 37613)
-- Name: operadores_id_operador_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.operadores_id_operador_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operadores_id_operador_seq OWNER TO manuel;

--
-- TOC entry 3209 (class 0 OID 0)
-- Dependencies: 213
-- Name: operadores_id_operador_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.operadores_id_operador_seq OWNED BY public.operadores.id_operador;


--
-- TOC entry 216 (class 1259 OID 37626)
-- Name: pagos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.pagos (
    id_compra integer NOT NULL,
    tipo public.tipo_pago,
    observacion character varying(200),
    total numeric(6,2),
    id_operador smallint NOT NULL,
    "createdAt" timestamp without time zone NOT NULL
);


ALTER TABLE public.pagos OWNER TO manuel;

--
-- TOC entry 215 (class 1259 OID 37624)
-- Name: pagos_id_compra_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.pagos_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pagos_id_compra_seq OWNER TO manuel;

--
-- TOC entry 3210 (class 0 OID 0)
-- Dependencies: 215
-- Name: pagos_id_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.pagos_id_compra_seq OWNED BY public.pagos.id_compra;


--
-- TOC entry 218 (class 1259 OID 37634)
-- Name: productos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(100) NOT NULL,
    categoria public.categorias_producto,
    estado public.estado_producto,
    "createdAt" timestamp without time zone
);


ALTER TABLE public.productos OWNER TO manuel;

--
-- TOC entry 217 (class 1259 OID 37632)
-- Name: productos_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_producto_seq OWNER TO manuel;

--
-- TOC entry 3211 (class 0 OID 0)
-- Dependencies: 217
-- Name: productos_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;


--
-- TOC entry 222 (class 1259 OID 37650)
-- Name: stock; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.stock (
    id_insumo integer NOT NULL,
    cantidad numeric(10,2) NOT NULL
);


ALTER TABLE public.stock OWNER TO manuel;

--
-- TOC entry 221 (class 1259 OID 37648)
-- Name: stock_id_insumo_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.stock_id_insumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_id_insumo_seq OWNER TO manuel;

--
-- TOC entry 3212 (class 0 OID 0)
-- Dependencies: 221
-- Name: stock_id_insumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.stock_id_insumo_seq OWNED BY public.stock.id_insumo;


--
-- TOC entry 224 (class 1259 OID 37658)
-- Name: ventas; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.ventas (
    id_venta bigint NOT NULL,
    observacion character varying(200),
    total numeric(6,2) NOT NULL,
    estado public.estado_venta NOT NULL,
    id_operador integer NOT NULL,
    id_cliente integer NOT NULL,
    "createdAt" timestamp without time zone
);


ALTER TABLE public.ventas OWNER TO manuel;

--
-- TOC entry 223 (class 1259 OID 37656)
-- Name: ventas_id_venta_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.ventas_id_venta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ventas_id_venta_seq OWNER TO manuel;

--
-- TOC entry 3213 (class 0 OID 0)
-- Dependencies: 223
-- Name: ventas_id_venta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.ventas_id_venta_seq OWNED BY public.ventas.id_venta;


--
-- TOC entry 220 (class 1259 OID 37642)
-- Name: versiones_productos; Type: TABLE; Schema: public; Owner: manuel
--

CREATE TABLE public.versiones_productos (
    id_version_producto integer NOT NULL,
    id_producto integer,
    "createdAt" timestamp without time zone,
    precio numeric(8,2)
);


ALTER TABLE public.versiones_productos OWNER TO manuel;

--
-- TOC entry 219 (class 1259 OID 37640)
-- Name: versiones_productos_id_version_producto_seq; Type: SEQUENCE; Schema: public; Owner: manuel
--

CREATE SEQUENCE public.versiones_productos_id_version_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.versiones_productos_id_version_producto_seq OWNER TO manuel;

--
-- TOC entry 3214 (class 0 OID 0)
-- Dependencies: 219
-- Name: versiones_productos_id_version_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: manuel
--

ALTER SEQUENCE public.versiones_productos_id_version_producto_seq OWNED BY public.versiones_productos.id_version_producto;


--
-- TOC entry 2996 (class 2604 OID 37775)
-- Name: auditorias_compras_ventas id_auditoria; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.auditorias_compras_ventas ALTER COLUMN id_auditoria SET DEFAULT nextval('public.auditorias_compras_ventas_id_auditoria_seq'::regclass);


--
-- TOC entry 2986 (class 2604 OID 37568)
-- Name: clientes id_cliente; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);


--
-- TOC entry 2987 (class 2604 OID 37591)
-- Name: equipos id_equipo; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id_equipo SET DEFAULT nextval('public.equipos_id_equipo_seq'::regclass);


--
-- TOC entry 2988 (class 2604 OID 37599)
-- Name: insumos id_insumo; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.insumos ALTER COLUMN id_insumo SET DEFAULT nextval('public.insumos_id_insumo_seq'::regclass);


--
-- TOC entry 2989 (class 2604 OID 37607)
-- Name: novedades id_novedad; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.novedades ALTER COLUMN id_novedad SET DEFAULT nextval('public.novedades_id_novedad_seq'::regclass);


--
-- TOC entry 2990 (class 2604 OID 37618)
-- Name: operadores id_operador; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.operadores ALTER COLUMN id_operador SET DEFAULT nextval('public.operadores_id_operador_seq'::regclass);


--
-- TOC entry 2991 (class 2604 OID 37629)
-- Name: pagos id_compra; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id_compra SET DEFAULT nextval('public.pagos_id_compra_seq'::regclass);


--
-- TOC entry 2992 (class 2604 OID 37637)
-- Name: productos id_producto; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);


--
-- TOC entry 2994 (class 2604 OID 37653)
-- Name: stock id_insumo; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.stock ALTER COLUMN id_insumo SET DEFAULT nextval('public.stock_id_insumo_seq'::regclass);


--
-- TOC entry 2995 (class 2604 OID 37661)
-- Name: ventas id_venta; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id_venta SET DEFAULT nextval('public.ventas_id_venta_seq'::regclass);


--
-- TOC entry 2993 (class 2604 OID 37645)
-- Name: versiones_productos id_version_producto; Type: DEFAULT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.versiones_productos ALTER COLUMN id_version_producto SET DEFAULT nextval('public.versiones_productos_id_version_producto_seq'::regclass);


--
-- TOC entry 3198 (class 0 OID 37772)
-- Dependencies: 226
-- Data for Name: auditorias_compras_ventas; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.auditorias_compras_ventas (id_auditoria, fecha, operador, tabla, operacion, monto) FROM stdin;
1	2021-10-12 14:47:47.407087	1	ventas	DELETE	1800.00
2	2021-10-12 14:48:20.7648	1	pagos	DELETE	8000.00
\.


--
-- TOC entry 3175 (class 0 OID 37565)
-- Dependencies: 203
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.clientes (id_cliente, nombre, apellido, telefono, correo) FROM stdin;
2	Franco	De La Rosa	66666666  	ejemlo@c.com
\.


--
-- TOC entry 3176 (class 0 OID 37571)
-- Dependencies: 204
-- Data for Name: consumos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.consumos (id_producto, id_insumo, cantidad) FROM stdin;
3	1	1.00
5	1	1.00
6	2	1.00
\.


--
-- TOC entry 3177 (class 0 OID 37576)
-- Dependencies: 205
-- Data for Name: detalle_compras; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.detalle_compras (id_compra, id_insumo, precio, cantidad) FROM stdin;
7	1	400.00	20
8	1	400.00	20
9	2	400.00	20
12	2	400.00	10
\.


--
-- TOC entry 3178 (class 0 OID 37581)
-- Dependencies: 206
-- Data for Name: detalle_ventas; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.detalle_ventas (id_version_producto, id_venta, cantidad, total) FROM stdin;
7	16	20	2400.00
\.


--
-- TOC entry 3180 (class 0 OID 37588)
-- Dependencies: 208
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.equipos (id_equipo, estado, nombre_tecnico, nombre_fantasia, categoria, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3182 (class 0 OID 37596)
-- Dependencies: 210
-- Data for Name: insumos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.insumos (id_insumo, unidades, nombre, presentacion, "createdAt", "updatedAt") FROM stdin;
1	500.00	hoja oficio 80gr	resma marca patito RELOADED	2021-10-11 11:54:33.768	2021-10-11 11:57:45.906
2	100.00	hoja A3 120gr	resma marca patito	2021-10-12 13:11:45.14	2021-10-12 13:11:45.14
\.


--
-- TOC entry 3184 (class 0 OID 37604)
-- Dependencies: 212
-- Data for Name: novedades; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.novedades (id_novedad, categoria, estado, novedad, observacion, id_operador, id_equipo, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3186 (class 0 OID 37615)
-- Dependencies: 214
-- Data for Name: operadores; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.operadores (id_operador, activo, nombre, apellido, correo, clave, tipo_operador, "createdAt", "updatedAt") FROM stdin;
1	t	admin	admin     	admin@admin.admin	$2a$10$nSQa7O8f.NKvzAvR0vO.Iuci/9yWljbuXl6OzgUFlrmbAbii7tOgi	admin	2021-10-11 11:25:52.999	2021-10-11 11:25:52.999
\.


--
-- TOC entry 3188 (class 0 OID 37626)
-- Dependencies: 216
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.pagos (id_compra, tipo, observacion, total, id_operador, "createdAt") FROM stdin;
7	compra de insumo	una compra para probar triggers	8000.00	1	2021-10-12 13:08:31.824
8	compra de insumo	una compra para probar triggers	8000.00	1	2021-10-12 13:10:54.586
9	compra de insumo	una compra para probar triggers	8000.00	1	2021-10-12 13:12:21.481
12	compra de insumo	una compra para probar triggers	4000.00	1	2021-10-12 13:24:15.431
\.


--
-- TOC entry 3190 (class 0 OID 37634)
-- Dependencies: 218
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.productos (id_producto, nombre, descripcion, categoria, estado, "createdAt") FROM stdin;
3	impresion a4 negro	impresion en negro en formato a4	impresion	\N	2021-10-11 14:22:56.362
6	impresion fotográfica	impresion en color en formato A3	impresion	\N	2021-10-12 13:13:48.014
5	impresion fotográfica	nuevo precio 3	impresion	\N	2021-10-11 20:47:30.019
\.


--
-- TOC entry 3194 (class 0 OID 37650)
-- Dependencies: 222
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.stock (id_insumo, cantidad) FROM stdin;
2	3046.00
\.


--
-- TOC entry 3196 (class 0 OID 37658)
-- Dependencies: 224
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.ventas (id_venta, observacion, total, estado, id_operador, id_cliente, "createdAt") FROM stdin;
16	venta con confirmacion y recuento stock	2400.00	cancelado	1	2	2021-10-12 13:14:49.386
\.


--
-- TOC entry 3192 (class 0 OID 37642)
-- Dependencies: 220
-- Data for Name: versiones_productos; Type: TABLE DATA; Schema: public; Owner: manuel
--

COPY public.versiones_productos (id_version_producto, id_producto, "createdAt", precio) FROM stdin;
3	\N	2021-10-11 20:05:27.411	20.00
4	\N	2021-10-11 20:06:03.449	20.00
6	5	2021-10-11 20:47:30.04	120.00
7	6	2021-10-12 13:13:48.156	120.00
11	5	2021-10-12 18:21:52.577	250.00
\.


--
-- TOC entry 3215 (class 0 OID 0)
-- Dependencies: 225
-- Name: auditorias_compras_ventas_id_auditoria_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.auditorias_compras_ventas_id_auditoria_seq', 2, true);


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 202
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 2, true);


--
-- TOC entry 3217 (class 0 OID 0)
-- Dependencies: 207
-- Name: equipos_id_equipo_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.equipos_id_equipo_seq', 1, true);


--
-- TOC entry 3218 (class 0 OID 0)
-- Dependencies: 209
-- Name: insumos_id_insumo_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.insumos_id_insumo_seq', 2, true);


--
-- TOC entry 3219 (class 0 OID 0)
-- Dependencies: 211
-- Name: novedades_id_novedad_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.novedades_id_novedad_seq', 1, true);


--
-- TOC entry 3220 (class 0 OID 0)
-- Dependencies: 213
-- Name: operadores_id_operador_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.operadores_id_operador_seq', 2, true);


--
-- TOC entry 3221 (class 0 OID 0)
-- Dependencies: 215
-- Name: pagos_id_compra_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.pagos_id_compra_seq', 15, true);


--
-- TOC entry 3222 (class 0 OID 0)
-- Dependencies: 217
-- Name: productos_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.productos_id_producto_seq', 8, true);


--
-- TOC entry 3223 (class 0 OID 0)
-- Dependencies: 221
-- Name: stock_id_insumo_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.stock_id_insumo_seq', 1, false);


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 223
-- Name: ventas_id_venta_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.ventas_id_venta_seq', 18, true);


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 219
-- Name: versiones_productos_id_version_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: manuel
--

SELECT pg_catalog.setval('public.versiones_productos_id_version_producto_seq', 11, true);


--
-- TOC entry 3004 (class 2606 OID 37585)
-- Name: detalle_ventas PK13; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT "PK13" PRIMARY KEY (id_version_producto, id_venta);


--
-- TOC entry 3010 (class 2606 OID 37612)
-- Name: novedades PK15; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "PK15" PRIMARY KEY (id_novedad);


--
-- TOC entry 3002 (class 2606 OID 37580)
-- Name: detalle_compras PK16; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT "PK16" PRIMARY KEY (id_compra, id_insumo);


--
-- TOC entry 3020 (class 2606 OID 37655)
-- Name: stock PK17; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT "PK17" PRIMARY KEY (id_insumo);


--
-- TOC entry 3014 (class 2606 OID 37631)
-- Name: pagos PK18; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT "PK18" PRIMARY KEY (id_compra);


--
-- TOC entry 2998 (class 2606 OID 37570)
-- Name: clientes PK19; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT "PK19" PRIMARY KEY (id_cliente);


--
-- TOC entry 3000 (class 2606 OID 37575)
-- Name: consumos PK22; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.consumos
    ADD CONSTRAINT "PK22" PRIMARY KEY (id_producto, id_insumo);


--
-- TOC entry 3012 (class 2606 OID 37623)
-- Name: operadores PK3; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.operadores
    ADD CONSTRAINT "PK3" PRIMARY KEY (id_operador);


--
-- TOC entry 3018 (class 2606 OID 37647)
-- Name: versiones_productos PK31; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.versiones_productos
    ADD CONSTRAINT "PK31" PRIMARY KEY (id_version_producto);


--
-- TOC entry 3016 (class 2606 OID 37639)
-- Name: productos PK4; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "PK4" PRIMARY KEY (id_producto);


--
-- TOC entry 3022 (class 2606 OID 37663)
-- Name: ventas PK5; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT "PK5" PRIMARY KEY (id_venta);


--
-- TOC entry 3006 (class 2606 OID 37593)
-- Name: equipos PK7; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT "PK7" PRIMARY KEY (id_equipo);


--
-- TOC entry 3008 (class 2606 OID 37601)
-- Name: insumos PK9; Type: CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT "PK9" PRIMARY KEY (id_insumo);


--
-- TOC entry 3036 (class 2620 OID 37727)
-- Name: detalle_compras actualizar_compra; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER actualizar_compra AFTER INSERT ON public.detalle_compras FOR EACH ROW EXECUTE FUNCTION public.actualiza_compra();


--
-- TOC entry 3037 (class 2620 OID 37736)
-- Name: detalle_compras actualizar_stock_compras; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER actualizar_stock_compras AFTER INSERT OR DELETE ON public.detalle_compras FOR EACH ROW EXECUTE FUNCTION public.actualizar_stock();


--
-- TOC entry 3039 (class 2620 OID 37735)
-- Name: detalle_ventas actualizar_stock_ventas; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER actualizar_stock_ventas AFTER INSERT OR DELETE ON public.detalle_ventas FOR EACH ROW EXECUTE FUNCTION public.actualizar_stock();


--
-- TOC entry 3038 (class 2620 OID 37725)
-- Name: detalle_ventas actualizar_venta; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER actualizar_venta AFTER INSERT ON public.detalle_ventas FOR EACH ROW EXECUTE FUNCTION public.actualiza_venta();


--
-- TOC entry 3043 (class 2620 OID 37781)
-- Name: pagos audita_pagos; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER audita_pagos BEFORE DELETE ON public.pagos FOR EACH ROW EXECUTE FUNCTION public.ingreso_auditoria();


--
-- TOC entry 3047 (class 2620 OID 37780)
-- Name: ventas audita_ventas; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER audita_ventas BEFORE DELETE ON public.ventas FOR EACH ROW EXECUTE FUNCTION public.ingreso_auditoria();


--
-- TOC entry 3042 (class 2620 OID 37756)
-- Name: pagos borrar_compra; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER borrar_compra BEFORE DELETE ON public.pagos FOR EACH ROW EXECUTE FUNCTION public.borrar_detalles_compra();


--
-- TOC entry 3044 (class 2620 OID 37754)
-- Name: productos borrar_producto; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER borrar_producto BEFORE DELETE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.borrar_consumos();


--
-- TOC entry 3046 (class 2620 OID 37729)
-- Name: ventas borrar_venta; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER borrar_venta BEFORE DELETE ON public.ventas FOR EACH ROW EXECUTE FUNCTION public.borrar_detalles();


--
-- TOC entry 3045 (class 2620 OID 37763)
-- Name: productos borrar_versiones_producto; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER borrar_versiones_producto BEFORE DELETE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.borrar_versiones();


--
-- TOC entry 3040 (class 2620 OID 37764)
-- Name: insumos ingresar_insumo; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER ingresar_insumo AFTER INSERT ON public.insumos FOR EACH ROW EXECUTE FUNCTION public.setear_stock();


--
-- TOC entry 3041 (class 2620 OID 37893)
-- Name: operadores primer_operador; Type: TRIGGER; Schema: public; Owner: manuel
--

CREATE TRIGGER primer_operador AFTER INSERT ON public.operadores FOR EACH ROW EXECUTE FUNCTION public.hacer_admin();


--
-- TOC entry 3035 (class 2606 OID 37719)
-- Name: ventas Refclientes20; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT "Refclientes20" FOREIGN KEY (id_cliente) REFERENCES public.clientes(id_cliente);


--
-- TOC entry 3030 (class 2606 OID 37699)
-- Name: novedades Refequipos17; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "Refequipos17" FOREIGN KEY (id_equipo) REFERENCES public.equipos(id_equipo);


--
-- TOC entry 3033 (class 2606 OID 37709)
-- Name: stock Refinsumos12; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT "Refinsumos12" FOREIGN KEY (id_insumo) REFERENCES public.insumos(id_insumo);


--
-- TOC entry 3026 (class 2606 OID 37679)
-- Name: detalle_compras Refinsumos14; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT "Refinsumos14" FOREIGN KEY (id_insumo) REFERENCES public.insumos(id_insumo);


--
-- TOC entry 3024 (class 2606 OID 37669)
-- Name: consumos Refinsumos23; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.consumos
    ADD CONSTRAINT "Refinsumos23" FOREIGN KEY (id_insumo) REFERENCES public.insumos(id_insumo);


--
-- TOC entry 3031 (class 2606 OID 37704)
-- Name: pagos Refoperador15; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT "Refoperador15" FOREIGN KEY (id_operador) REFERENCES public.operadores(id_operador);


--
-- TOC entry 3029 (class 2606 OID 37694)
-- Name: novedades Refoperadores11; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.novedades
    ADD CONSTRAINT "Refoperadores11" FOREIGN KEY (id_operador) REFERENCES public.operadores(id_operador);


--
-- TOC entry 3034 (class 2606 OID 37714)
-- Name: ventas Refoperadores19; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT "Refoperadores19" FOREIGN KEY (id_operador) REFERENCES public.operadores(id_operador);


--
-- TOC entry 3025 (class 2606 OID 37674)
-- Name: detalle_compras Refpagos13; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_compras
    ADD CONSTRAINT "Refpagos13" FOREIGN KEY (id_compra) REFERENCES public.pagos(id_compra);


--
-- TOC entry 3023 (class 2606 OID 37664)
-- Name: consumos Refproducto22; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.consumos
    ADD CONSTRAINT "Refproducto22" FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- TOC entry 3028 (class 2606 OID 37689)
-- Name: detalle_ventas Refventa2; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT "Refventa2" FOREIGN KEY (id_venta) REFERENCES public.ventas(id_venta);


--
-- TOC entry 3027 (class 2606 OID 37684)
-- Name: detalle_ventas Refversion_producto1; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT "Refversion_producto1" FOREIGN KEY (id_version_producto) REFERENCES public.versiones_productos(id_version_producto);


--
-- TOC entry 3032 (class 2606 OID 37757)
-- Name: versiones_productos Refversion_versiones_prod; Type: FK CONSTRAINT; Schema: public; Owner: manuel
--

ALTER TABLE ONLY public.versiones_productos
    ADD CONSTRAINT "Refversion_versiones_prod" FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


-- Completed on 2021-10-15 09:40:09 -03

--
-- PostgreSQL database dump complete
--


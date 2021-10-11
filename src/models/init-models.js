import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _clientes from  "./clientes.js";
import _consumos from  "./consumos.js";
import _detalle_compras from  "./detalle_compras.js";
import _detalle_ventas from  "./detalle_ventas.js";
import _equipos from  "./equipos.js";
import _insumos from  "./insumos.js";
import _novedades from  "./novedades.js";
import _operadores from  "./operadores.js";
import _pagos from  "./pagos.js";
import _productos from  "./productos.js";
import _stock from  "./stock.js";
import _ventas from  "./ventas.js";
import _versiones_productos from  "./versiones_productos.js";

export default function initModels(sequelize) {
  var clientes = _clientes.init(sequelize, DataTypes);
  var consumos = _consumos.init(sequelize, DataTypes);
  var detalle_compras = _detalle_compras.init(sequelize, DataTypes);
  var detalle_ventas = _detalle_ventas.init(sequelize, DataTypes);
  var equipos = _equipos.init(sequelize, DataTypes);
  var insumos = _insumos.init(sequelize, DataTypes);
  var novedades = _novedades.init(sequelize, DataTypes);
  var operadores = _operadores.init(sequelize, DataTypes);
  var pagos = _pagos.init(sequelize, DataTypes);
  var productos = _productos.init(sequelize, DataTypes);
  var stock = _stock.init(sequelize, DataTypes);
  var ventas = _ventas.init(sequelize, DataTypes);
  var versiones_productos = _versiones_productos.init(sequelize, DataTypes);

  insumos.belongsToMany(pagos, { as: 'id_compra_pagos', through: detalle_compras, foreignKey: "id_insumo", otherKey: "id_compra" });
  insumos.belongsToMany(productos, { as: 'id_producto_productos', through: consumos, foreignKey: "id_insumo", otherKey: "id_producto" });
  pagos.belongsToMany(insumos, { as: 'id_insumo_insumos_detalle_compras', through: detalle_compras, foreignKey: "id_compra", otherKey: "id_insumo" });
  productos.belongsToMany(insumos, { as: 'id_insumo_insumos', through: consumos, foreignKey: "id_producto", otherKey: "id_insumo" });
  ventas.belongsToMany(versiones_productos, { as: 'id_version_producto_versiones_productos', through: detalle_ventas, foreignKey: "id_venta", otherKey: "id_version_producto" });
  versiones_productos.belongsToMany(ventas, { as: 'id_venta_venta', through: detalle_ventas, foreignKey: "id_version_producto", otherKey: "id_venta" });
  ventas.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(ventas, { as: "venta", foreignKey: "id_cliente"});
  novedades.belongsTo(equipos, { as: "id_equipo_equipo", foreignKey: "id_equipo"});
  equipos.hasMany(novedades, { as: "novedades", foreignKey: "id_equipo"});
  consumos.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasMany(consumos, { as: "consumos", foreignKey: "id_insumo"});
  detalle_compras.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasMany(detalle_compras, { as: "detalle_compras", foreignKey: "id_insumo"});
  stock.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasOne(stock, { as: "stock", foreignKey: "id_insumo"});
  novedades.belongsTo(operadores, { as: "id_operador_operadore", foreignKey: "id_operador"});
  operadores.hasMany(novedades, { as: "novedades", foreignKey: "id_operador"});
  pagos.belongsTo(operadores, { as: "id_operador_operadore", foreignKey: "id_operador"});
  operadores.hasMany(pagos, { as: "pagos", foreignKey: "id_operador"});
  ventas.belongsTo(operadores, { as: "id_operador_operadore", foreignKey: "id_operador"});
  operadores.hasMany(ventas, { as: "venta", foreignKey: "id_operador"});
  detalle_compras.belongsTo(pagos, { as: "id_compra_pago", foreignKey: "id_compra"});
  pagos.hasMany(detalle_compras, { as: "detalle_compras", foreignKey: "id_compra"});
  consumos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(consumos, { as: "consumos", foreignKey: "id_producto"});
  versiones_productos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto"});
  productos.hasMany(versiones_productos, { as: "versiones_productos", foreignKey: "id_producto"});
  detalle_ventas.belongsTo(ventas, { as: "id_venta_venta", foreignKey: "id_venta"});
  ventas.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_venta"});
  detalle_ventas.belongsTo(versiones_productos, { as: "id_version_producto_versiones_producto", foreignKey: "id_version_producto"});
  versiones_productos.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_version_producto"});

  return {
    clientes,
    consumos,
    detalle_compras,
    detalle_ventas,
    equipos,
    insumos,
    novedades,
    operadores,
    pagos,
    productos,
    stock,
    ventas,
    versiones_productos,
  };
}

import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _clientes from  "./clientes.js";
import _consumos from  "./consumos.js";
import _detalle_compras from  "./detalle_compras.js";
import _detalle_ventas from  "./detalle_ventas.js";
import _equipos from  "./equipos.js";
import _insumos from  "./insumos.js";
import _novedades from  "./novedades.js";
import _operador from  "./operador.js";
import _pagos from  "./pagos.js";
import _parte_diario from  "./parte_diario.js";
import _producto from  "./producto.js";
import _stock from  "./stock.js";
import _venta from  "./venta.js";

export default function initModels(sequelize) {
  var clientes = _clientes.init(sequelize, DataTypes);
  var consumos = _consumos.init(sequelize, DataTypes);
  var detalle_compras = _detalle_compras.init(sequelize, DataTypes);
  var detalle_ventas = _detalle_ventas.init(sequelize, DataTypes);
  var equipos = _equipos.init(sequelize, DataTypes);
  var insumos = _insumos.init(sequelize, DataTypes);
  var novedades = _novedades.init(sequelize, DataTypes);
  var operador = _operador.init(sequelize, DataTypes);
  var pagos = _pagos.init(sequelize, DataTypes);
  var parte_diario = _parte_diario.init(sequelize, DataTypes);
  var producto = _producto.init(sequelize, DataTypes);
  var stock = _stock.init(sequelize, DataTypes);
  var venta = _venta.init(sequelize, DataTypes);

  insumos.belongsToMany(pagos, { as: 'id_compra_pagos', through: detalle_compras, foreignKey: "id_insumo", otherKey: "id_compra" });
  insumos.belongsToMany(producto, { as: 'id_producto_productos', through: consumos, foreignKey: "id_insumo", otherKey: "id_producto" });
  pagos.belongsToMany(insumos, { as: 'id_insumo_insumos_detalle_compras', through: detalle_compras, foreignKey: "id_compra", otherKey: "id_insumo" });
  producto.belongsToMany(insumos, { as: 'id_insumo_insumos', through: consumos, foreignKey: "id_producto", otherKey: "id_insumo" });
  producto.belongsToMany(venta, { as: 'id_venta_venta', through: detalle_ventas, foreignKey: "id_producto", otherKey: "id_venta" });
  venta.belongsToMany(producto, { as: 'id_producto_producto_detalle_venta', through: detalle_ventas, foreignKey: "id_venta", otherKey: "id_producto" });
  venta.belongsTo(clientes, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  clientes.hasMany(venta, { as: "venta", foreignKey: "id_cliente"});
  novedades.belongsTo(equipos, { as: "id_equipo_equipo", foreignKey: "id_equipo"});
  equipos.hasMany(novedades, { as: "novedades", foreignKey: "id_equipo"});
  consumos.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasMany(consumos, { as: "consumos", foreignKey: "id_insumo"});
  detalle_compras.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasMany(detalle_compras, { as: "detalle_compras", foreignKey: "id_insumo"});
  stock.belongsTo(insumos, { as: "id_insumo_insumo", foreignKey: "id_insumo"});
  insumos.hasOne(stock, { as: "stock", foreignKey: "id_insumo"});
  pagos.belongsTo(operador, { as: "id_operador_operador", foreignKey: "id_operador"});
  operador.hasMany(pagos, { as: "pagos", foreignKey: "id_operador"});
  parte_diario.belongsTo(operador, { as: "id_operador_operador", foreignKey: "id_operador"});
  operador.hasMany(parte_diario, { as: "parte_diarios", foreignKey: "id_operador"});
  detalle_compras.belongsTo(pagos, { as: "id_compra_pago", foreignKey: "id_compra"});
  pagos.hasMany(detalle_compras, { as: "detalle_compras", foreignKey: "id_compra"});
  novedades.belongsTo(parte_diario, { as: "id_parte_diario_parte_diario", foreignKey: "id_parte_diario"});
  parte_diario.hasMany(novedades, { as: "novedades", foreignKey: "id_parte_diario"});
  venta.belongsTo(parte_diario, { as: "id_parte_diario_parte_diario", foreignKey: "id_parte_diario"});
  parte_diario.hasMany(venta, { as: "venta", foreignKey: "id_parte_diario"});
  consumos.belongsTo(producto, { as: "id_producto_producto", foreignKey: "id_producto"});
  producto.hasMany(consumos, { as: "consumos", foreignKey: "id_producto"});
  detalle_ventas.belongsTo(producto, { as: "id_producto_producto", foreignKey: "id_producto"});
  producto.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_producto"});
  detalle_ventas.belongsTo(venta, { as: "id_venta_ventum", foreignKey: "id_venta"});
  venta.hasMany(detalle_ventas, { as: "detalle_venta", foreignKey: "id_venta"});

  return {
    clientes,
    consumos,
    detalle_compras,
    detalle_ventas,
    equipos,
    insumos,
    novedades,
    operador,
    pagos,
    parte_diario,
    producto,
    stock,
    venta,
  };
}

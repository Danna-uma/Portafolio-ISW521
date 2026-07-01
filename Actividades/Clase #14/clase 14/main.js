export function mensajePedido(pedido) {
  return `Pedido creado para ${pedido.cliente}: ${pedido.producto} - ₡${pedido.precio}`;
};

export function mensajeTotal(total) {
  return `Total del dia: ₡${total}`;
};

export function mensajeEdificio(cliente, edificio) {
  return `${cliente} tiene registrado el edificio: ${edificio ?? "No registrado"}`;
};

export default function resumenDia(...pedidos) {
  return `${pedidos.map(pedido =>`${pedido.cliente} pidio ${pedido.producto} por ₡${pedido.precio}`)}`;
};
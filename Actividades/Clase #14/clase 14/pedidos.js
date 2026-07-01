export const nombreSoda = "La Sodita UTN";

export const pedidos = [];

export function crearPedido(
  { cliente, producto, precio, notas }, ...extras) {
  const pedido = {cliente, producto, precio, notas, extras};
  pedidos.push(pedido);
  return pedido;
};

export function calcularTotalDia() {
  return pedidos.reduce((total, pedido) => {const precio = pedido.precio ?? 0;
    return total + precio;}, 0);
};

export function aplicarDescuento(pedido, porcentaje) {
  const nuevoPrecio = (pedido.precio ?? 0) - ((pedido.precio ?? 0) * porcentaje) / 100;
  return { ...pedido, precio: nuevoPrecio};
};
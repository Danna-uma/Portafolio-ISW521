//Datos iniciales
const ventasFeria = [
  {
    stand: "Stand 3", producto: "Empanadas", categoria: "comida",
    monto: 15000, etiquetas: ["salado", "artesanal"]
  },
  {
    stand: "Stand 3", producto: "Refresco natural", categoria: "bebida",
    monto: 6000, etiquetas: ["natural"]
  },
  {
    stand: "Stand 7", producto: "Llavero tallado", categoria: "artesania",
    monto: 3500, etiquetas: ["madera", "artesanal"]
  },
  {
    stand: "Stand 7", producto: "Pulsera tejida", categoria: "artesania",
    monto: 2500, etiquetas: ["tejido"]
  },
  {
    stand: "Stand 12", producto: "Jabon artesanal", categoria: "cuidado",
    monto: 4000, etiquetas: ["natural", "artesanal"]
  },
  {
    stand: "Stand 5", producto: "Cafe de altura", categoria: "bebida",
    monto: 8000, etiquetas: ["organico"]
  },
  {
    stand: "Stand 5", producto: "Postre de cafe", categoria: "comida",
    monto: 3000, etiquetas: ["dulce"]
  },
];

// Parte A
console.log("typeof:", typeof ventasFeria);
// Devuelve object porque los arreglos internamente son objetos con indices numericos

ventasFeria[15] = {stand: "Stand 20", producto: "Sorpresa"};

console.log("Nuevo length:", ventasFeria.length);
// Resultado: 16

console.log(ventasFeria);
// Entre los indices 7 y 14 un for imprimiria undefined.

ventasFeria.length = 7;

//Parte B
const ventasAltas = ventasFeria.filter( venta => venta.monto > 5000);

console.log("Ventas altas:");
console.log(ventasAltas);

// Transformacion de elementos
const nombresProductos = ventasFeria.map(venta => venta.producto.toUpperCase());

console.log("Productos:");
console.log(nombresProductos);

//Parte C
function ordenarPorMonto(lista) {
  return [...lista].sort((a, b) => b.monto - a.monto);
};

const ordenadas = ordenarPorMonto(ventasFeria);

console.log("Ordenadas:");
console.log(ordenadas);

console.log("Original:");
console.log(ventasFeria);

//Parte D
const reporteProductos = ventasFeria.map(venta =>`${venta.producto.toUpperCase()} (${venta.stand.toUpperCase()}) — ${venta.monto} colones`);

console.log(reporteProductos);
console.log("Mismo length:",reporteProductos.length === ventasFeria.length);

//Parte E
const artesanias = ventasFeria.filter( venta => venta.categoria === "artesania"
);

console.log(artesanias);
console.log("Cantidad:",artesanias.length);
console.log("Productos:",artesanias.map(v => v.producto));

const nombresArtesania = ventasFeria.filter(venta => venta.categoria === "artesania").map(venta => venta.producto);

console.log(nombresArtesania);

//Parte F
const primeraVenta = ventasFeria.find(venta => venta.monto > 7000);

console.log(primeraVenta);

const indice = ventasFeria.findIndex(venta => venta.monto > 7000);

console.log(indice);

// find es mejor porque se detiene al encontrar el primer elemento y no crea un arreglo nuevo

//Parte G
const ventasPorCategoria = ventasFeria.reduce((acumulador, venta) => {acumulador[venta.categoria] =(acumulador[venta.categoria] || 0)+ venta.monto;
    return acumulador;}, {});

console.log(ventasPorCategoria);

const totalGeneral = ventasFeria.reduce((total, venta) => total + venta.monto,0);

console.log(totalGeneral);

// El primer reduce inicia con un objeto porque es lo que construye el segundo inicia con 0 porque construye un numero

//Parte H
const montos = ventasFeria.map( venta => venta.monto);

console.log("Original:");
console.log(montos);

console.log("Sort sin comparador:");
console.log([...montos].sort());

// 15000 termina despues de 8000 porque sort() convierte los numeros a texto y los compara de manera alfabetica

const ventasOrdenadas = [...ventasFeria].sort((a, b) => b.monto - a.monto);

console.log(ventasOrdenadas);
console.log(ventasFeria);

//Parte I
const etiquetas = ventasFeria.flatMap(venta => venta.etiquetas);

console.log(etiquetas);

const etiquetasUnicas = new Set(etiquetas);

console.log("Cantidad de etiquetas:", etiquetasUnicas.size);

console.log([...etiquetasUnicas]);

// Si se hubiera usado map el resultado seria un arreglo de mas arreglos

//Opcional
const reporteArtesania = ventasFeria.filter(venta => venta.categoria === "artesania").map(venta =>`${venta.producto} — ${venta.monto} colones`).sort();

console.log(reporteArtesania);
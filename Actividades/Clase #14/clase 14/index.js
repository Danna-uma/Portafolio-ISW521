// const numeros = [200,150,140,360,100,1000];
// numeros.sort((a,b)=> a-b);
// console.log(numeros);

// // Imperativo
// for(let i = 0; i < numeros.length; i++){
//     console.log(numeros[i]);
// }
// // Declarativo
// const declarativo = numeros.map((n) =>n);

// console.log(declarativo);


// Actividad 2 clase 13
// const precios = [100, 250, 80, 400];
// const caros = [];
// for (let i = 0; i < precios.length; i++) {
//   if (precios[i] > 150) caros.push(precios[i]);
// }

// const caros = precios.filter((p) =>p);
// console.log(caros);

// Actividad 4
// const estudiantes = [
//   { nombre: "Ana", carnet: "2024001" },
//   { nombre: "Luis", carnet: "2024002" }
// ];

const estu= estudiantes.map(e=> `${e.nombre}(${e.carnet})`.toUpperCase());

// console.log(estu);

// const estudiantes = [
//   { nombre: "Ana", promedio: 85 },
//   { nombre: "Luis", promedio: 67 },
//   { nombre: "Sara", promedio: 91 }
// ];

// const promedio= estudiantes.filter(e =>e.promedio>=80);

// console.log(promedio);

// Actividad 7
// const gastos = [
//     {cat: "comida", monto: 5000},
//     {cat: "transporte", monto: 2000},
//     {cat: "comida", monto: 3000}
// ];

// const suma = gastos.reduce((acc,g) => +g.monto, 0)

// console.log(suma);

// El valor inicial correcto es 0
// Resultado: 10,000
// Mismo metodo reduce, pero el valor inicial y la funcion cambian completamentamente lo que se construye

// Actividad 8

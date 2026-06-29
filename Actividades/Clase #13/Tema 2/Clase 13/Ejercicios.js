// function saludar (nombre){
//     return `Hola, ${nombre}`;
// }

// function procesar (fuctionSaludo, nombre){
//     return fuctionSaludo(nombre).toUpperCase();
// }

// console.log(procesar (saludar, "Ana"));

// const persona = {nombre: "Luis", edad: 30, rol: "dev"};
// const {nombre, rol: puesto = "invitado"} = persona;

// const colores = ["rojo", "verde", "azul"];
// const [primero, ,tercero] = colores;

// console.log(nombre, puesto);
// console.log(primero, tercero);

// console.log(persona);
// console.log(colores);

// function sumarTodo(...numeros){
//     return numeros.reduce((acum, n)=> acum + n, 0);
// }
// console.log(sumarTodo(1,2,3));
// console.log(sumarTodo(5,10,15,20));

// const original = {nombre: "Equipo", puntos: 10};
// const actualizado = {...original, puntos: 15};

// console.log(original.puntos);
// console,log(actualizado.puntos);

// const numeros =[1,2,3];
// const copia = [...numeros, 4];

// import{sumar, restar} from "./matematicas.js";

// console.log (sumar(1,1));
// console.log (restar(1,1));

// const estudiante = {
//     nombre: "Diego",
//     carnet : "123"
// };

// let copia = estudiante;
// copia.nombre = "Andres";

// console.log(estudiante.nombre);

import{Perro} from "./index.js"; 

const perro1 = new Perro ("Santi", "colochos", "chihuahua", "12kg", "negro");

console.log (perro1);

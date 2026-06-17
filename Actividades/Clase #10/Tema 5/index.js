const v8 = require("v8");

const variableJulian = {
    nombre: "Javascript",
    version: 2026,
};

const tamano = v8.serialize(variableJulian).length;

console.log(`El tamano de la variable es de: ${tamano} bytes`);

if(true) {
    var edad = 25;
}
console.log(edad);

if(true) {
    let puntos = 100;
    console.log(puntos);

}

const user = {id: 1};
user.id = 2;

console.log(typeof 42);

let edad = 15
let categoria;

if (edad <= 12) {
  categoria = "niño";
} else if (edad <= 17) {
  categoria = "joven";
} else {
  categoria = "adulto";
}

console.log(categoria);

let edad = 15;
let categoria =  edad <= 12 ? "niño": edad <= 17 ? "joven": "adulto";
console.log(categoria); 

const rol = "admin";
var permiso;

permiso = rol === "admin" ? "admin": rol === "editor" ? "editor": rol === "viewer" ? "viewer"
        : "sin acceso";

const rol = "admin";
var permiso;

switch (rol) {
  case "admin":
    permiso = "admin";
    break;
  case "editor":
    permiso = "editor";
    break;
  case "viewer":
    permiso = "viewer";
    break;
  default:
    permiso = "sin acceso";
}
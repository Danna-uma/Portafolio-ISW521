export class Animal {
    constructor (nombre, tipoPelo, raza, peso){
    this.nombre = nombre;
    this.tipoPelo = tipoPelo;
    this.raza = raza;
    this.peso = peso;
    }
}

export class Perro extends Animal{
    constructor(nombre, tipoPelo, raza, peso, color){
        super(nombre, tipoPelo, raza, peso);
        this.color = color;
    }
}
const A = productos.map(el => el.nombre).join(', ')
const B = productos.reduce((acc, el) => acc + el.precio, 0).toFixed(2)
const C = (productos.reduce((acc, el) => acc + el.precio, 0) / productos.length).toFixed(2)
const D = productos.sort((a, b) => a.precio - b.precio )[0]
const E = productos.sort((a, b) => b.precio - a.precio )[0]
const F = {
    productos: A,
    precioTotal: B,
    precioPromedio: C,
    prodMenorPrecio: D,
    prodMayorPrecio: E
}

let a = 5; 
let b = 10; 

//función para obtener número random
function obtenerRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
//objeto vacío
let resultado = {}; 

for(let i = 0; i < 100; i++){
    let numero = obtenerRandom(1, 21);
    if( resultado[numero] == null){
        resultado[numero] = 1;
    } else{
        resultado[numero] = resultado[numero]+ 1; 
    }
}

console.log(resultado); 




let productos = [
    {
        labial: 'Matte ink',
        precio: 300
    
    },
    {
        crema: 'Nivea',
        precio: 1000
    },
    {
        mascaraPestañas: 'Maybelline',
        precio: 700
    }
];


let productoPrecio = productos.map(producto => `${producto.precio}`);



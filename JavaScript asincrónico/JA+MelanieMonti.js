const esperar = (tiempo) => {
    return new Promise((resolve) => {
        setTimeout(resolve, tiempo);
    });
}

const mostrarPalabras = (cadena, tiempo, cantidadPalabras, callback) => {
    if (!tiempo) {
        tiempo = 1000;
    }
    let palabras = cadena.split(' ');
    cantidadPalabras += palabras.length;
    const promesas = [];
    palabras.forEach(palabra => {
        promesas.push(esperar(tiempo).then(()=>{
            console.log(palabra);
        }));
        tiempo += tiempo;
    });
    Promise.all(promesas).then(()=>{
        callback(null, cantidadPalabras);
    });
}

let texto1 = "Estrellas y galaxias";
let texto2 = "Cámara fotográfica";
let texto3 = "Lizzie McGuire";
const tiempo = 3000;


mostrarPalabras(texto1, tiempo, 0, (error, totalPalabras) => {
    mostrarPalabras(texto2, tiempo, totalPalabras, (error, totalPalabras) => {
        mostrarPalabras(texto3, tiempo, totalPalabras, (error, totalPalabras) => {
            console.log('Proceso terminado, cantidad de palabras:', totalPalabras);
        });
    });
});
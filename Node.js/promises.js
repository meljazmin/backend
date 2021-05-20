const fs = require('fs');


fs.promises.readFile('fyh.txt', 'utf-8').then(contenido =>{
    console.log(contenido); 
});

async function(){
    let contenido = await fs.promises.readFile('fyh.txt', 'utf-8'); 
    return contenido; 
}
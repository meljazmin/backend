//Manejo de archivos 


const fs = require('fs');



fs.readFile('fyh.txt', (error, contenido) => {
    if(error){
        console.log("error", error.message);
    }else{
       const info ={
        contenidoStr: contenido, 
        contenidoObj: JSON.parse(contenido),
        size: contenido.length,
       }
       console.log(info); 
    }
})


// newDate().toLocaleString();

// try {
//     const data = fs.readFileSync('fyh.txt', 'utf-8');
//     console.log(data);

// } catch(error) {
//     console.error("Error"); 
// }


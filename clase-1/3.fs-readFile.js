const fs = require('node:fs')
//const { promisify } = require('node:util')
//const readFilePromise = promisify(fs.readFile) //solo utilizar para cuando no se tenga una versión nativa con promesas
//readFilePromise('./archivo.txt', 'utf-8') // versión con promesas
//   .then(text => {
//        console.log('primer texto promesa:',text)
//    })


console.log('Leyendo el primer archivo...')
// const text = fs.readFileSync('./archivo.txt', 'utf-8') //síncrono
fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // ejecuta este callback
    console.log('primer texto:',text) //cuando termina de leer el archivo, se ejecuta 
}) //asíncrono


console.log('Haciendo cosas mientras lee el archivo ...')

console.log('Leyendo el segundo archivo...')
// const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
fs.readFile('./archivo2.txt', 'utf-8', (er, text) => {
    console.log('segundo texto:',text) //cuando termina de leer el archivo, se ejecuta 
})



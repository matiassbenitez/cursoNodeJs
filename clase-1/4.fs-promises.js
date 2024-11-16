const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo...')
// const text = fs.readFileSync('./archivo.txt', 'utf-8') //síncrono
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('primer texto:', text)
    })

console.log('Haciendo cosas mientras lee el archivo ...')

console.log('Leyendo el segundo archivo...')
// const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text =>{
        console.log('segundo texto:',text)
    })


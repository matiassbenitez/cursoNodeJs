import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo...')
// const text = fs.readFileSync('./archivo.txt', 'utf-8') //síncrono
const text = await readFile('./archivo.txt', 'utf-8') // Top Level Await - no se puede hacer en CommonJS - sí en ES modules
console.log('primer texto:', text)

console.log('Haciendo cosas mientras lee el archivo ...')

console.log('Leyendo el segundo archivo...')
// const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
readFile('./archivo2.txt', 'utf-8')
    .then(text =>{
        console.log('segundo texto:',text)
    })


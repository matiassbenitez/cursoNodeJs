const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234
const app = express()
app.disable('x-powered-by')

// middleware

app.use(express.json())

// app.use((req, res, next) => {
//     //console.log('mi primer middleware')
//     // trackear la request a la base de datos
//     // revisar si es usuario tiene cookies
//     //next()

//     if (req.method !== 'POST') return next()
//     if (req.headers['content-type'] !== 'application/json') return next()

//     // solo llegan las request que son POST y tienen el header Content-Type: application/json
//     let body = ''

//     //escuchar el evento data
//     req.on('data', chunk => {
//         body += chunk.toString()
//     })

//     req.on('end', () => {
//         const data = JSON.parse(body)
//         // llamar a una base de datos para guardar la info
//         data.timestamp = Date.now()
//         // mutar la request y meter la información en req.body
//         req.body = data
//         next()
//     })

// })

app.get('/', (req, res) => {
    // res.status(200).send('<h1>Mi página</h1>')
    res.send('<h1>Mi página</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
})

app.post('/pokemon', (req, res) => {
    // req.body deberíamos guardar en base de datos
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})

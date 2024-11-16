const http = require('node:http')
const { findAvailablePort } = require('./10.free-ports.js')

const desirePort = process.env.PORT ?? 3000

const server = http.createServer((req, res) =>{
    console.log('request received')
    res.end('Hola mundo')
})

findAvailablePort(desirePort).then(port => {
    server.listen(port, () => {
        console.log(`server listening on port http://localhost:${port}`)
    })
})

//server.listen(0, () => {
//    console.log(`server listening on port http://localhost:${server.address().port}`)
//})

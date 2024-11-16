const http = require('node:http')
const fs = require('node:fs')

const desirePort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    console.log(req.url)
    if (req.url === '/') {
        res.statusCode = 200 //OK
        res.end('<h1>Bienvenido a mi página de inicio</h1>')
    }else if(req.url === '/imagen.png'){
        fs.readFile('./mollo4.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            }else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    }else if (req.url === '/contactos') {
        res.statusCode = 200 //OK
        res.end('<h1>Contactos</h1>')
    }else {
        res.statusCode = 404 //OK
        res.end('<h1>404</h1>')
    }
}

const server = http.createServer(processRequest)

// en la request viene información: url, headers, method(GET), body, entre otros
// headers(User-Agent: desde dónde hago la solicitud, navegador, terminal, api, etc.)

// la response viene con statusCode, headers, body, entre otros

server.listen(desirePort, () => {
    console.log(`server listening on port http://localhost:${desirePort}`)
})

const net = require('node:net')

function findAvailablePort(desirePort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer()

        server.listen(desirePort, () => {
            const { port } = server.address()
            server.close(() => {
                resolve(port)
            })
        })

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))                // busca el primer puerto libre (recomendable)
            //  findAvailablePort(desirePort + 1).then(port => resolve(port))   // va sumando 1 y prueba cada vez
            }else{
                reject(err)
            }
        })
    })
}

module.exports = { findAvailablePort }
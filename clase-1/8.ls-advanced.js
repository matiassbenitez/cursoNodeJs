const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (directory) {
    let files
    try {
        files = await fs.readdir(folder)        // hasta que no termine fs.readdir, ls no puede continuar
    } catch {
        console.log(pc.red(`No se pudo leer el directorio ${folder}`))
        process.exit(1)
    }

    const filesPromises = files.map(async file => {     //trata los archivos concurrentemente, no espera que termine unop para seguir con el siguiente
        const filePath = path.join(folder, file)
        let stats
        try {
            stats = await fs.stat(filePath)     // espera que se resuelva la promesa
        } catch {
            console.log(`No se pudo leer el archivo ${filePath}`)
            process.exit(1)
        }
        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString()

        return `${pc.cyan(fileType)} ${pc.yellow(fileModified)} ${pc.green(fileSize.toString().padStart(10))} ${pc.blueBright(file.padEnd(40))}`
    })

    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)

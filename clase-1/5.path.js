const path = require('node:path')

// barra separadora de carpeta segun SO
console.log(path.sep)

const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath)

const base = path.basename('tmp/secret/password.txt')
console.log(base)

const filename = path.basename('tmp/secret/password.txt', '.txt')
console.log(filename)

const extension = path.extname('image.super.jpg')
console.log(extension)

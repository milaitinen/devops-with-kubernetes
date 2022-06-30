const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'hash.txt')

let newHash = ""

const storeHash = () => {
  newHash = new Date().toISOString() + ": " + Math.random().toString(36).substring(2, 24)
  fs.writeFileSync(filePath, newHash, err => {
    if (err) return console.error(err)
  })
  setTimeout(storeHash, 5000)
}

storeHash()
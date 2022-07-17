const fs = require('fs')

const filePath = '/usr/src/app/files/hash.txt'

let newHash = ""

const storeHash = () => {
  newHash = new Date().toISOString() + ": " + Math.random().toString(36).substring(2, 24)
  fs.writeFileSync(filePath, newHash, err => {
    if (err) return console.error(err)
  })
  setTimeout(storeHash, 5000)
}

storeHash()
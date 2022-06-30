const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 3002

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'count.txt')

const app = express()
let count = 0

function writeCountToFile(count) {
  fs.writeFileSync(filePath, count.toString(), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('wrote: ' + count.toString())
    }
  })
}

function readCount() {
  fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
    } else {
      count = data
    }
  })
}

app.get('/pingpong', (req, res) => {
  if (fs.existsSync(filePath)) {
    readCount()
  }
  writeCountToFile(++count)
  res.send("pong " + count)
})


app.listen(PORT)
console.log(`pong ${count}`)
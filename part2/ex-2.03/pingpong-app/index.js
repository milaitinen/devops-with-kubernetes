const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()
let count = 0

app.get('/', (req, res) => {
  count += 1
  res.send(count.toString())
})

app.listen(PORT)
console.log(`pong ${count}`)
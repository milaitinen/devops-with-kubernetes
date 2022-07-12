const express = require('express')
const PORT = process.env.PORT || 3001

const db = require('./queries')
db.initDB()

const app = express()

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get('/pingpong', (req, res) => {
  db.updateCount(req, res)
})

app.listen(PORT)
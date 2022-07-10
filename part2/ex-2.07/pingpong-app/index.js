const express = require('express')
const PORT = process.env.PORT || 3001

const db = require('./queries')
db.initDB()

const app = express()

app.get('/', (req, res) => {
  db.updateCount(req, res)
})
// app.get('/', (req, res) => res.send("1")) /* this works in localhost:8081*/

app.listen(PORT)
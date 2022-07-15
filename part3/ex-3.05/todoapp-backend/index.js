const express = require('express')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001

const db = require('./queries')
db.initDB()

const app = express()

const imagePath = path.join(__dirname, '/files/image.jpg')

//app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
//app.use(serve(path.join(__dirname, '/files')))

app.use(express.json())
app.use(express.static(path.join(__dirname, "/files")))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

const textParser = bodyParser.text({ type: '*/*' })

const fetchImage = async () => {
  let imageIsUpToDate = false

  if (fs.existsSync(imagePath)) {
    fs.accessSync(imagePath);
    const fileDate = fs.statSync(imagePath).mtime.toDateString()
    const currentDate = new Date().toDateString()
    if (fileDate === currentDate) {
        imageIsUpToDate = true
    }
  } else {
    fs.writeFileSync(imagePath, '', err => console.log(err))
  }
  
  if (!imageIsUpToDate) {
    const image = await axios.get('https://picsum.photos/500', { responseType: 'stream' })
    image.data.pipe(fs.createWriteStream(imagePath))
  }
}

const getImage = async () => new Promise(res => {
  fs.readFile(imagePath, (err, buffer) => {
    if (err) return console.log(err)
    res(buffer)
  })
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get('/todos', async (req, res) => {
  const todos = JSON.stringify(await db.fetchTodos())
  res.setHeader('Content-type', 'application/json')
  res.send(todos)
})

app.post('/todos', textParser, async (req, res) => {
  await db.insertTodo(req.body)
  res.sendStatus(200)
})

app.get('/files/image.jpg', async(req, res) => {
  const image = await getImage()
  res.setHeader('content-type', 'image/jpeg')
  res.send(image)
})

app.listen(PORT, function () {
  console.log(`Server started in port ${PORT}`)
})

fetchImage()
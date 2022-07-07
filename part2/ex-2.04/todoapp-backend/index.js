const Koa = require('koa')
const fs = require('fs')
const axios = require('axios')
const serve = require('koa-static')
const Router = require('koa-router')
const path = require('path')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()
const PORT = process.env.PORT || 3000

const imagePath = '/usr/src/app/files/image.jpg'

app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
app.use(serve(path.join(__dirname, '/files')))

let todoList = []

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

router.get('/files/image.jpg', async (ctx, next) => {
  ctx.body = await getImage()
  ctx.response.set('content-type', 'image/jpeg')
  ctx.status = 200
})

router.get('/todos', async (ctx, next) => {
  ctx.body = JSON.stringify(todoList)
  ctx.set('Content-type', 'application/json')
  ctx.status = 200
})

router.post('/todos', async (ctx, next) => {
  todoList.push(ctx.request.body)
  ctx.status = 200
})

app.use(router.routes()).use(router.allowedMethods()).use(cors({ origin: '*' }))

app.listen(PORT, function () {
  console.log(`Server started in port ${PORT}`)
})

fetchImage()
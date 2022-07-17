const Koa = require('koa')
const Router = require('koa-router')
const axios = require('axios')

const PORT = process.env.PORT || 3000
const SERVER_URL = process.env.SERVER_URL || ""

const hashPath = '/usr/src/app/files/hash.txt'

const app = new Koa()
const router = new Router()

let currentHash = ""

const updateHash = () => {
  currentHash = new Date().toISOString() + ": " + Math.random().toString(36).substring(2, 24)
  setTimeout(updateHash, 5000)
}

const readHash = async () => new Promise(res => {
  const hash = fs.existsSync(hashPath) ? fs.readFileSync(hashPath) : ""
  res(`${hash}\n`)
})

router.get('/', async (ctx, next) => {
  const hash = await readHash()
  const count = await axios.get(`${SERVER_URL}/pingpong`)
  ctx.body = `${process.env.MESSAGE}\n${hash}.\nPing / Pongs: ${count.data}`
  ctx.status = 200
})

router.get('/health', async (ctx, next) => {
  const ping = await axios.get(`${SERVER_URL}/health`)
  if (ping.status == 200) {
    ctx.status = 200
  } else {
    ctx.status = 500
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, function () {
  console.log(`Server started in port ${PORT}`)
})

updateHash()
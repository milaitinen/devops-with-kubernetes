// Couldn't get this to work with Express for some reason so took example from Koa project shared in the course.

const Koa = require('koa')
const axios = require('axios')

const PORT = process.env.PORT || 3000
const app = new Koa()

let currentHash = ""

const updateHash = () => {
  currentHash = new Date().toISOString() + ": " + Math.random().toString(36).substring(2, 24)
  setTimeout(updateHash, 5000)
}

app.use(async ctx => {
  const count = await axios.get('http://pingpong-svc:2346')
  console.log('count: ', count)
  ctx.body = `${currentHash}.\nPing / Pongs: ${count.data}`
  ctx.status = 200
})

app.listen(PORT)
updateHash()
// Couldn't get this to work with Express for some reason so took example from Koa project shared in the course.

const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = new Koa()

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const hashPath = path.join(directory, 'hash.txt')
const countPath = path.join(directory, 'count.txt')

const readFiles = async () => new Promise(res => {
  const hash = fs.existsSync(hashPath) ? fs.readFileSync(hashPath) : ""
  const count = fs.existsSync(countPath) ? fs.readFileSync(countPath) : 0
  res(`${hash}\nPing / Pongs: ${count}`)
})

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
  ctx.body = await readFiles()
  ctx.status = 200
})

app.listen(PORT)
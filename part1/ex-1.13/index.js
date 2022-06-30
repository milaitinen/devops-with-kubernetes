const Koa = require('koa')
const fs = require('fs')
const axios = require('axios')
const serve = require('koa-static')
const path = require('path')

const app = new Koa()
const PORT = process.env.PORT || 3000

const imagePath = '/usr/src/app/files/image.jpg'
const htmlFile = path.join(__dirname, '/index.html')

app.use(serve(path.join(__dirname, '/files')))

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
      fs.writeFileSync(filePath, '', err => console.log(err))
    }
    
    if (!imageIsUpToDate) {
      const image = await axios.get('https://picsum.photos/500', { responseType: 'stream' })
      image.data.pipe(fs.createWriteStream(imagePath))
    }
}

app.use(async ctx => {
  await fetchImage()
  ctx.type = 'html'
  ctx.body = await fs.createReadStream(htmlFile)
})

console.log(`Server started in port ${PORT}`)
app.listen(PORT)
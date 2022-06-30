const Koa = require('koa')
const fs = require('fs')
const axios = require('axios')

const app = new Koa()
const PORT = process.env.PORT || 3000

const imagePath = '/usr/src/app/files/image.jpg'

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

const getFile = async () => new Promise(res => {
  fs.readFile(imagePath, (err, buffer) => {
    if (err) return console.log(err)
    res(buffer)
  })
})

app.use(async ctx => {
  await fetchImage()
  ctx.body = await getFile()
  ctx.set('Content-type', 'image/jpeg')
  ctx.status = 200
});

console.log(`Server started in port ${PORT}`)
app.listen(PORT)
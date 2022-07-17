const axios = require('axios')
const db = require('./queries')

const insertDailyTodo = async () => {
  const res = await axios.get('https://en.wikipedia.org/wiki/Special:Random')
  const url = res.request.res.responseUrl
  await db.insertTodo(`Read ${url}`)
}

insertDailyTodo()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DBNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

const connectionEstablished = async () => {
  try {
    const client = await pool.connect()
    client.release(true)
    return true
  } catch (e) {
    return false
  }
}


const initDB = async () => {
  try {
    const client = await pool.connect()
    await pool.query(`CREATE TABLE IF NOT EXISTS todos (
      id serial PRIMARY KEY,
      todo TEXT,
      inserted_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`)
    // tell the pool to destroy this client
    client.release(true)
  } catch (err) {
    console.log(err)
  }
}

const insertTodo = async (newTask) => {
  if (newTask.length > 140) {
    console.error("The task is too long. Keep it within 140 characters.")
    return
  }
  try {
    const client = await pool.connect()
    await client.query(`INSERT into todos (todo, inserted_dttm) VALUES ('${newTask}', current_timestamp);`)
    client.release(true)
    console.log(`Added new task "${newTask}" to list of todos`)
  } catch (err) {
    console.log(err)
  }
}

const fetchTodos = async () => {
  try {
    const client = await pool.connect()
    const tasks = await client.query('SELECT * FROM todos ORDER BY inserted_dttm;')
    client.release(true)
    return tasks.rows
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectionEstablished,
  initDB,
  insertTodo,
  fetchTodos
}
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
    await pool.query(`CREATE TABLE IF NOT EXISTS pingpong (
      id serial PRIMARY KEY,
      pong INT,
      inserted_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`)
    // tell the pool to destroy this client
    client.release(true)
  } catch (err) {
    console.log(err)
  }
}

const updateCount = async (req, res) => {
  try {
    const client = await pool.connect()
    const count = await client.query('SELECT * FROM pingpong ORDER BY inserted_dttm DESC LIMIT 1;')
    let updatedCount = 0
    if (count.rows.length < 1) {
      await pool.query('INSERT into pingpong (pong, inserted_dttm) VALUES (0, current_timestamp);')
    } else {
      updatedCount = count.rows[0]['pong'] + 1
      await pool.query(`INSERT into pingpong (pong, inserted_dttm) VALUES (${updatedCount}, current_timestamp);`)
    }
    client.release(true)
    res.status(200).send(updatedCount.toString())
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connectionEstablished,
  initDB,
  updateCount
}
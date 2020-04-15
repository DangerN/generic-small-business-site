const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL

console.log(process.env.DATABASE_URL);

let pool

if(process.env.NODE_ENV === 'production') {
  pool = new Pool({connectionString: connectionString, ssl: true})
} else {
  pool = new Pool()
}

module.exports = {
  query: (text, params) => pool.query(text, params),
}

const { Pool } = require('pg');

const options = process.env.DATABASE_URL ? {connectionString: process.env.DATABASE_URL} : {}
const pool = new Pool(options)

module.exports = {
  query: (text, params) => {
    return new Promise(function(resolve, reject) {
      pool.query(text, params, (err, res) => {
        if (err) {reject(err)}
        resolve(res)
      })
    });
  }
}

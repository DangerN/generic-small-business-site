const { Pool } = require('pg');
// const connectionString = process.env.DATABASE_URL

// console.log(process.env.DATABASE_URL);

// let pool
//
// if(process.env.NODE_ENV === 'production') {
//   pool = new Pool({connectionString: connectionString, ssl: true})
// } else {
//   pool = new Pool()
// }
//
// module.exports = {
//   query: (text, params) => pool.query(text, params),
// }

// let options = process.env.DATABASE_URL ? {connectionString: process.env.DATABASE_URL, ssl: true} : {}
// let client = new Client(options)
//
// module.exports = {
//   query: (text, params) => {
//     client.connect()
//     return client.query(text, params)
//   }
// }

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

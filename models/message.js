const db = require('../db');

module.exports = {
  get: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from messages')
      .then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  },
  new: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('insert into messages (name, email, subject, body) values ($1, $2, $3, $4) returning *', [data.name, data.email, data.subject, data.body])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  delete: (id) => {
    return new Promise(function(resolve, reject) {
      db.query('delete from messages where id = $1', [id])
      .then(()=>{
        resolve()
      })
      .catch(reject)
    });
  },
}

const db = require('../db');

module.exports = {
  list: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from specs')
      .then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  },
  update: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('update specs set type = $1, unit = $2, filter = $3 where id = $4 returning *', [data.type, data.unit, data.filter, data.id])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  new: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('insert into specs (type, unit, filter) values ($1, $2, $3) returning *', [data.type, data.unit, data.filter])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  delete: (id) => {
    return new Promise(function(resolve, reject) {
      db.query('remove from specs where id = $1', [id])
      .then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  },

}

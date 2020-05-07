const db = require('../db');

module.exports = {
  get: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from meta')
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  set: (column, data) => {
    return new Promise(function(resolve, reject) {
      db.query(`update meta set ${column} = $1 returning *`, [data])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  }
}

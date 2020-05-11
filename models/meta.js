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
  set: (data) => {
    return new Promise(function(resolve, reject) {
      db.query(`update meta set brandname = $1, brandstyle = $2, tagline = $3 returning *`, [data.brandname, data.brandstyle, data.tagline])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  }
}

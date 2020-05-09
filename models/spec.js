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
  set: (data) => {
    return new Promise(function(resolve, reject) {
      db.query(`update meta set brandname = $1, brandstyle = $2, catagories = $3, tagline = $4 returning *`, [data.brandname, data.brandstyle, data.catagories, data.tagline])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  }
}

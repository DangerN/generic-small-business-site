const db = require('../db');

module.exports = {
  getAll: async () => {
    const {rows} = await db.query('select * from posts')
    return new Promise(function(resolve, reject) {
      console.log(rows);
      rows ? resolve(rows) : reject()
    });
  },
  getOne: async (post) => {
    const {rows} = await db.query('select * from posts where id = $1', [post])
    return new Promise(function(resolve, reject) {
      rows[0] ? resolve(rows[0]) : reject()
    });
  },
  create: (title, body) => {
    return new Promise(function(resolve, reject) {
      db.query('insert into posts (title, body) values ($1, $2)', [title, body])
      .then(resolve)
      .catch(reject)
    });
  }
}

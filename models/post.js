const db = require('../db');

module.exports = {
  getAll: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from posts')
      .then(({rows}) => {
        resolve(rows)})
      .catch(reject)
    });
  },
  getOne: (post) => {
    return new Promise(function(resolve, reject) {
      db.query('select * from posts where id = $1', [post])
      .then(({rows}) => {
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  create: (title, body) => {
    return new Promise(function(resolve, reject) {
      db.query('insert into posts (title, body) values ($1, $2) returning *', [title, body])
      .then(({rows}) => {
        resolve(rows[0])
      })
      .catch(reject)
    });
  }
}

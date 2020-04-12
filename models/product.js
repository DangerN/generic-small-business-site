const db = require('../db');

module.exports = {
  getAll: () => {
    //gets all products
    return new Promise(function(resolve, reject) {
      db.query('select * from products')
      .then(({rows}) => {
        console.log('get all products', rows);
        resolve(rows)})
      .catch(reject)
    });
  },
  getOne: (product) => {
    return new Promise(function(resolve, reject) {
      db.query('select * from products where id = $1', [product])
      .then(({rows}) => {
        console.log('get one product',rows[0]);
        resolve(rows[0])})
      .catch(reject)
    });
  }
}

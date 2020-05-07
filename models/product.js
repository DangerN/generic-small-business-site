const db = require('../db');

module.exports = {
  getAll: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from products')
      .then(({rows}) => {
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
  },
  updateOne: (id, data) => {
    console.log(id);
    return new Promise(function(resolve, reject) {
      db.query('update products set name = $2, description = $3, catagory = $4, price = $5 where id = $1 returning *', [
        id, data.name, data.description, data.catagory, data.price
      ])
      .then(({rows}) => {
        console.log('updated one product', rows[0]);
        resolve(rows[0])
      })
      .catch(reject)
    });
  }
}

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
  new: data => {
    return new Promise(function(resolve, reject) {
      db.query('insert into products (name, description, catagory, price, specs_values, stock, oversell, media_links, ship_cost) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',[
        data.name, data.description, data.catagory, data.price, data.specs_values, data.stock, data.oversell, data.media_links, data.ship_cost
      ])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  updateOne: (id, data) => {
    return new Promise(function(resolve, reject) {
      db.query('update products set name = $2, description = $3, catagory = $4, price = $5, specs_values = $6, stock=$7, oversell=$8, media_links=$9, ship_cost=$10 where id = $1 returning *', [
        id, data.name, data.description, data.catagory, data.price, data.specs_values, data.stock, data.oversell, data.media_links, data.ship_cost
      ])
      .then(({rows}) => {
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  delete: id => {
    return new Promise(function(resolve, reject) {
      db.query('delete from products where id = $1', [id])
      .then(resolve)
      .catch(reject)
    });
  }
}

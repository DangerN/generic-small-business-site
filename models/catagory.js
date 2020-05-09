const db = require('../db');

module.exports = {
  list: () => {
    return new Promise(function(resolve, reject) {
      db.query('select * from catagories')
      .then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  },
  new: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('insert catagories (name) values ($1)', [data.name])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  delete: (id) => {
    return new Promise(function(resolve, reject) {
      db.query('delete from catagories where id = $1', [id])
      .then((res)=>{
        console.log(res)
        resolve()
      })
      .catch(reject)
    });
  },
  addSpec: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('insert into catagories_specs (catagory_id, spec_id) values ($1, $2) returning *', [data.catagory_id, data.spec_id])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  removeSpec: (data) => {
    return new Promise(function(resolve, reject) {
      db.query('delete from catagories_specs where catagory_id = $1 and spec_id = $2', [data.catagory_id, data.spec_id])
      .then(({rows})=>{
        resolve(rows[0])
      })
      .catch(reject)
    });
  },
  getCatagoriesWithSpecs: () => {
    return new Promise(function(resolve, reject) {
      db.query(`
        select catagories.*, array_agg (
        	jsonb_build_object(
        		'id', specs.id,
        		'type', specs.type,
        		'unit', specs.unit,
        		'filter', specs.filter
        	)
        ) as catagory_specs
        from catagories
        inner join catagories_specs on catagories_specs.catagory_id = catagories.id
        inner join specs on catagories_specs.spec_id = specs.id
        group by catagories.id
      `).then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  }
}

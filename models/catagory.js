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
      db.query('insert into catagories (name) values ($1) returning *', [data.catagory.name])
      .then(({rows})=>{
        const catID = rows[0].id
        data.specs.map((spec, i)=> {
          db.query('insert into catagories_specs (catagory_id, spec_id) values ($1, $2)', [catID, spec.id])
          .then(()=>{
            if (i === data.specs.length - 1) {resolve()}
          })
          .catch(reject)
        })
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
  updateSpecs: (data) => {
    const catID = data.catagory.id
    return new Promise(function(resolve, reject) {
      db.query('delete from catagories_specs where catagory_id = $1', [catID]).then(res=>{
        data.specs.map((spec, i)=> {
          db.query('insert into catagories_specs (catagory_id, spec_id) values ($1, $2)', [catID, spec.id])
          .then(()=>{
            if (i === data.specs.length - 1) {resolve()}
          })
          .catch(reject)
        })
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
        full join catagories_specs on catagories_specs.catagory_id = catagories.id
        left join specs on catagories_specs.spec_id = specs.id
        group by catagories.id
      `).then(({rows})=>{
        resolve(rows)
      })
      .catch(reject)
    });
  }
}

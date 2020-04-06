const db = require('../db');

module.exports = {
  getAll: async () => {
    const {rows} = await db.query('select * from test')
    console.log(rows);
    return new Promise(function(resolve, reject) {
      console.log(rows);
      rows ? resolve(rows) : reject()
    });
  },
  getOne: (post) => {
    return {}
  }
}

const db = require('../db');

module.exports = {
  getAll: async () => {
    console.log('should be trying to get all');
    const {rows} = await db.query('select * from test', '')
    console.log(rows);
  },
  getOne: (post) => {
    return {}
  }
}

const db = require('../db');

module.exports = {
  getAll: () => {
    db.query('select * from post', '', function (res) {
      console.log('wut`');
      return res
    })
    // return [{}]
  },
  getOne: (post) => {
    return {}
  }
}

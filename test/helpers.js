module.exports = {
  fakePG: (text, params) => {
    return Promise.resolve({
      'select * from posts': () => {
        return {rows: [{id: 1}, {id: 2}, {id: 3}]}
      },
      'select * from posts where id = $1': (params) => {
        return {rows: [{id: params[0]}]}
      },
      'insert into posts (title, body) values ($1, $2) returning *': (params) => {
        return {rows: [{id: 1, title: params[0], body: params[1]}]}
      }
    }[text](params))
  }
}

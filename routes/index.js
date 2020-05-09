const Router = require('express-promise-router')
const router = new Router()

module.exports = (bucket) => {
  router.use(require('./meta'))
  router.use(require('./store'))
  router.use(require('./blog'))
  router.use(require('./images')(bucket))

  router.all('*', function (req, res) {
    res.status(404).send('You probably did someting you\'re not supposed to.')
  })

  return router
}

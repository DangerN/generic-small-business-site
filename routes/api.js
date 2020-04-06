const orm = require('../models')
const Router = require('express-promise-router')
const router = new Router()

router.get('/', function (req, res) {
  res.send('api ok!')
})

router.get('/blog', async function (req, res) {
  res.json(await orm.post.getAll())
})

router.post('/blog', function (req, res) {
  res.status(201)
  res.json()
})

router.put('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

router.delete('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

router.get('/store', function (req, res) {
  res.json()
})

router.get('/store/products', function (req, res) {
  res.json()
})

module.exports = router

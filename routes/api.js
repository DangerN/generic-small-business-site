const { post, product } = require('../models')
const Router = require('express-promise-router')
const router = new Router()

router.get('/blog', function (req, res) {
  post.getAll()
  .then(posts => {
    res.json(posts)
  })
  .catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })
})

router.post('/blog', function (req, res) {
  post.create(req.body.title, req.body.body)
  .then(newPost => {
    console.log(newPost);
    res.status(201).json(newPost)
  })
  .catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })
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

router.all('*', function (req, res) {
  res.status(404).send('You probably did someting you\'re not supposed to.')
})

module.exports = router

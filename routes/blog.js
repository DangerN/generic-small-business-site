const router = require('express').Router()
const {post} = require('../models');

router.get('/blog', function (req, res) {
  post.getAll()
  .then(posts => {
    res.json(posts)
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.post('/blog', function (req, res) {
  post.create(req.body.title, req.body.body)
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.put('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

router.delete('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

module.exports = router

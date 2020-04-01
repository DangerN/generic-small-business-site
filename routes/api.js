const express = require('express');
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', function (req, res) {
  res.send('api ok!')
})

router.get('/blog', function (req, res) {
  res.json('you got the blog!')
})

router.post('/blog', function (req, res) {
  res.sendStatus(501)
})

router.put('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

router.delete('/blog/:id', function (req, res) {
  res.sendStatus(501)
})

module.exports = router

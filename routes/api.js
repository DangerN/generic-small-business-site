const express = require('express');
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/', function (req, res) {
  res.send('api ok!')
})

router.get('/blog', function (req, res) {

})

router.post('/blog', function (req, res) {

})

router.put('/blog/:id', function (req, res) {

})

router.delete('/blog/:id', function (req, res) {

})

module.exports = router

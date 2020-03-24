const express = require('express');
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/api', function (req, res) {

})

router.get('/api/blog', function (req, res) {

})

router.post('/api/blog', function (req, res) {

})

router.put('api/blog/:id', function (req, res) {

})

router.delete('api/blog/:id', function (req, res) {

})

module.exports = router

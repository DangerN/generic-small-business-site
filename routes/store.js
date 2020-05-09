const router = require('express').Router()
const {product} = require('../models');

router.get('/store', function (req, res) {
  res.json()
})

router.get('/store/products', function (req, res) {
  product.getAll()
  .then(products=>{
    res.json(products)
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.post('/store/products/:id', function (req, res) {
  console.log(req.body)
  product.updateOne(req.params.id, req.body)
  .then(product=>{
    res.json(product)
  }).catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

module.exports = router

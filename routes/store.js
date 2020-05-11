const router = require('express').Router()
const {product} = require('../models');

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

router.post('/store/products', function (req, res) {
  console.log(req.body)
  product.new(req.body)
  .then(product=>{
    res.json(product)
  }).catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.post('/store/products/:id', function (req, res) {
  product.updateOne(req.params.id, req.body)
  .then(product=>{
    res.json(product)
  }).catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.delete('/store/products/:id', function (req, res) {
  product.delete(req.params.id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500))
})

module.exports = router

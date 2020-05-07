const { post, product, meta } = require('../models')

const Router = require('express-promise-router')
const router = new Router()
const stream = require('stream');
let metaCache

// shut down server if no/bad db connection
meta.get().then(meta=>metaCache=meta)
.catch(err=>{
  console.log(err);
  process.exit
})

module.exports = (bucket) => {
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

  router.get('/images/background', function (req, res) {
    bucket.file('page-background-2400x1600.jpg').download().then(data=>{
      res.contentType('image/jpeg')
      res.send(data[0])
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  })

  router.get('/meta', function (req, res) {
    res.json(metaCache)
  })

  router.post('/meta', function(req, res) {
    console.log(req.body.attr);
    console.log(req.body.data);
    meta.set(req.body.attr, req.body.data)
    .then(newMeta=>{
      metaCache = newMeta
      res.json(newMeta)
    })
    .catch(err=>{
      console.log(err);
      res.status(500).send(err)
    })
  })


  router.get('/images/:id', function (req, res) {
    bucket.file('cute-potato.jpg').getMetadata().then(data=>{
      res.send(data[0].mediaLink)
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  })

  // TODO: Add check for file name conflicts
  router.post('/images', function (req, res) {
    const bodyStream = new stream.PassThrough()
    bodyStream.end(req.body)
    bodyStream.pipe(bucket.file(req.get('File-Name')).createWriteStream({
      contentType: 'auto',
      public: true
    }))
    .on('error', err=>{
      console.log(err)
      res.sendStatus(500)
    })
    .on('finish', ()=> {
      res.status(201).send(req.get('File-Name'))
    })
  })

  router.all('*', function (req, res) {
    res.status(404).send('You probably did someting you\'re not supposed to.')
  })
  return router
}

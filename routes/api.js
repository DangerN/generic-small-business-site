const { post, product } = require('../models')
const admin = require('firebase-admin');

const adminCred = JSON.parse(process.env.FIREBASE_CREDENTIALS)

admin.initializeApp({
  credential: admin.credential.cert(adminCred),
  databaseURL: "https://business-app-38533.firebaseio.com",
  storageBucket: "business-app-38533.appspot.com"
})

const bucket = admin.storage().bucket()

const Router = require('express-promise-router')
const router = new Router()

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

router.get('/images/background', function (req, res) {
  bucket.file('page-background-2400x1600.jpg').download().then(data=>{
    res.contentType('image/jpeg')
    res.send(data[0])
  })
  .catch(err=>{
    res.status(500).send(err)
  })
})
router.get('/images/:id', function (req, res) {

})

router.post('images', function (req, res) {

})

router.all('*', function (req, res) {
  res.status(404).send('You probably did someting you\'re not supposed to.')
})

module.exports = router

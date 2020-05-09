const router = require('express').Router()
const stream = require('stream')

module.exports = bucket => {
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
    bucket.file(req.params.id).getMetadata().then(data=>{
      res.send(data[0].mediaLink)
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  })

  // TODO: Add check for file name conflicts
  router.post('/images', function (req, res) {
    const fileName = req.get('File-Name')
    const bodyStream = new stream.PassThrough()
    bodyStream.end(req.body)
    bodyStream.pipe(bucket.file(fileName).createWriteStream({
      contentType: 'auto',
      public: true
    }))
    .on('error', err=>{
      console.log(err)
      res.sendStatus(500)
    })
    .on('finish', ()=> {
      bucket.file(fileName).getMetadata().then(data=>{
        res.status(201).send(data[0].mediaLink)
      })
    })
  })
  return router
}

const router = require('express').Router()
const {message} = require('../models');

router.get('/messages', function (req, res) {
  message.get().then(messages=>{
    res.json(messages)
  }).catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.post('/messages', function (req, res) {
  message.new(req.body).then(message=>{
    res.json(message)
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})

router.delete('/messages/:id', function (req, res) {
  message.delete(req.params.id).then(()=>{
    res.send()
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send(e)
  })
})


module.exports = router

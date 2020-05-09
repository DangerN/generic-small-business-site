const router = require('express').Router()
const {meta} = require('../models');

let metaCache

// shut down server if no/bad db connection
meta.get().then(meta=>metaCache=meta)
.catch(err=>{
  console.log(err);
  process.exit
})

router.get('/meta', function (req, res) {
  res.json(metaCache)
})

router.post('/meta', function(req, res) {
  meta.set(req.body)
  .then(newMeta=>{
    metaCache = newMeta
    res.json(newMeta)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

module.exports = router

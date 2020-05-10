const router = require('express').Router()
const {meta, catagory, spec} = require('../models');

let metaCache = {}

// shut down server if no/bad db connection
const refreshMetaData = () => {
  return new Promise(async function(resolve, reject) {
    await meta.get().then(meta=>{
      metaCache = {...metaCache, meta}
    })
    .catch(reject)

    await catagory.getCatagoriesWithSpecs().then(catagories=>{
      // this is a hokey fix to clean the null entries from catagories that arent associated with any spec
      let cleanCats = catagories.map(cat=>{
        return cat.catagory_specs[0].id ? cat : {...cat, catagory_specs: []}
      })
      metaCache = {...metaCache, catagories: cleanCats}
    })
    .catch(reject)

    resolve(metaCache)
  })
}

refreshMetaData().catch(err=>{
  console.log(err)
  process.exit
})



router.get('/meta', function (req, res) {
  res.json(metaCache)
})

router.get('/meta/catagory-list', function (req, res) {
  catagory.list().then(cats=>{
    res.json(cats)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

router.get('/meta/spec-list', function (req, res) {
  spec.list().then(specs=>{
    res.json(specs)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

router.post('/meta/specs/:id', function (req, res) {
  spec.update(req.body).then(spec=>{
    refreshMetaData().then(()=>{
      res.json(spec)
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

router.post('/meta/specs', function (req, res) {
  spec.new(req.body).then(spec=>{
    refreshMetaData().then(()=>{
      res.json(spec)
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})



router.post('/meta/catagories/:id', function (req, res) {
  catagory.updateSpecs(req.body).then(()=>{
    refreshMetaData().then(()=>{
      res.send()
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

router.post('/meta/catagories', function (req, res) {
  catagory.new(req.body).then(()=>{
    refreshMetaData().then(()=>{
      res.send()
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})



router.post('/meta', function(req, res) {
  meta.set(req.body)
  .then(newMeta=>{
    refreshMetaData().then(meta=>{
      res.json(meta)
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send(err)
  })
})

module.exports = router

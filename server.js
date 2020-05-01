require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const api = require('./routes/api')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static('public/main/build'))
app.use('/dashboard', express.static('public/dashboard/build'))
app.use('/api', api)

app.listen(port, () => {
  console.log(`Ready to go on port ${port}!`);
})

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// const adminCred = JSON.parse(process.env.FIREBASE_CREDENTIALS)

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
  databaseURL: "https://business-app-38533.firebaseio.com",
  storageBucket: "business-app-38533.appspot.com"
})

const bucket = admin.storage().bucket()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static('public/main/build'))
app.use('/dashboard', express.static('public/dashboard/build'))
app.use('/api', require('./routes/api')(bucket))

app.listen(port, () => {
  console.log(`Ready to go on port ${port}!`);
})

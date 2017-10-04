const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
const index = require('./routes/index')
const contacts = require('./routes/contacts')
const profiles = require('./routes/profiles')
const addresses = require('./routes/addresses');
const groups = require('./routes/groups');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', index)
app.use('/contacts', contacts)
app.use('/profiles', profiles)
app.use('/addresses', addresses)
app.use('/groups', groups)

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})

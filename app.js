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

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', index)
app.use('/contacts', contacts)
app.use('/profiles', profiles)
app.use('/addresses', addresses)



let qSelectProfiles = `SELECT * FROM  contacts C JOIN  profiles P ON C.id = P.idContacts`
let qSelectContacts = `SELECT * FROM contacts`
let qSelectAddress = `SELECT * FROM  contacts C JOIN  addresses A ON C.id = A.idContacts`
let qSelectGroups = `SELECT * FROM contacts C JOIN contactGroup CG on C.id = CG.idContacts JOIN groups G ON CG.idGroups = G.id`


app.get('/groups', (req, res)=>{
  db.all(qSelectGroups, (err, rows)=>{
    // res.send(rows)
    res.render('groups', {dataGroups : rows})
  })
})

app.post('/groups', (req, res)=>{
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`,() =>{
    res.redirect('/groups')
  })
})

app.get('/groups/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('groupsedit', {dataGroups : rows})
  })
})

app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/groups');
   })
})

app.get('/groups/delete/:id', (req, res)=>{
  db.run(`DELETE FROM groups WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/groups')
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})

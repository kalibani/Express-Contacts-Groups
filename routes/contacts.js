const express = require('express');
const router = express.Router();

const modelContacts = require('../models/contacts');

router.get('/', (req, res)=>{
  modelContacts.findAll((rowsContacts)=>{
    res.render('contacts', { dataContacts : rowsContacts, title : 'Halaman Contacts'})
  })
})

router.post('/', (req, res)=>{
  modelContacts.createContacts(req.body, (err)=>{
    if (!err) {
      res.redirect('/contacts')
    }else {
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  modelContacts.findByid(req.params.id, (err, rowsContacts)=>{
    if (!err) {
      // res.send(rowsContacts)
      res.render('contactsedit', {dataContacts: rowsContacts})
    }else {
      console.log(err)
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  modelContacts.updateContacts(req.body, req.params.id, (err)=>{
    if (!err) {
      res.redirect('/contacts')
    }else {
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  modelContacts.deleteContacts(req.params.id, (err)=>{
    if (!err) {
      res.redirect('/contacts')
    }else {
      res.send(err)
    }
  })
})


module.exports = router;

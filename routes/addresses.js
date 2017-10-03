const express = require('express');
const router = express.Router();

const ModelAddress = require('../models/addresses');

router.get('/', (req, res)=>{
  ModelAddress.findAll((err, rowsAddress, rowsContacts)=>{
    if (!err) {
      res.render('addresses', {dataAddress : rowsAddress, dataContacts: rowsContacts})
    }else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  ModelAddress.CreateAddress(req.body, (err)=>{
    if (!err) {
      res.redirect('/addresses')
    }else {
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  ModelAddress.findByid(req.params.id, (err, rowsAddress, rowsContacts)=>{
    if (!err) {
      res.render('addressesEdit', {dataAddress : rowsAddress, dataContacts: rowsContacts})
    }else {
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  ModelAddress.UpdateAddress(req.body, req.params.id, (err)=>{
    if (!err) {
      res.redirect('/addresses')
    }else {
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  ModelAddress.deleteAddress(req.params.id, ()=>{
    res.redirect('/addresses')
  })
})

module.exports = router;

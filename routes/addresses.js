const express = require('express');
const router = express.Router();
const ModelAddress = require('../models/addresses');
const ModelContacts = require('../models/contacts');

router.get('/', (req, res)=>{
  ModelAddress.findAll()
  .then(rowsAddress =>{
    ModelContacts.findAll()
    .then(rowsContacts=>{
      res.render('addresses', {dataAddress : rowsAddress, dataContacts: rowsContacts})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/', (req, res)=>{
  ModelAddress.CreateAddress(req.body)
  .then(()=>{
    res.redirect('/addresses')
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  ModelAddress.findByid(req.params.id)
  .then(rowsAddress=>{
    ModelContacts.findAll()
    .then(rowsContacts=>{
      res.render('addressesEdit', {dataAddress : rowsAddress, dataContacts: rowsContacts})
    })
    .catch(err=>{
      res.send(err)
    })
  })
})

router.post('/edit/:id', (req, res)=>{
  ModelAddress.UpdateAddress(req.body, req.params.id)
  .then(()=>{
    res.redirect('/addresses')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  ModelAddress.deleteAddress(req.params.id)
  .then(()=>{
    res.redirect('/addresses')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;

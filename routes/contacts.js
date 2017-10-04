const express = require('express');
const router = express.Router();
const modelContacts = require('../models/contacts');

router.get('/', (req, res)=>{
  modelContacts.findAll()
  .then((rowsContacts)=>{
    res.render('contacts', { dataContacts : rowsContacts, title : 'Halaman Contacts'})
  })
  .catch(err =>{
    res.send(err)
  })
})

router.post('/', (req, res)=>{
  modelContacts.createContacts(req.body)
  .then(()=>{
    res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  modelContacts.findByid(req.params.id)
  .then(rowsContacts=>{
    res.render('contactsedit', {dataContacts: rowsContacts})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  modelContacts.updateContacts(req.body, req.params.id)
  .then(()=>{
    res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  modelContacts.deleteContacts(req.params.id)
  .then(()=>{
      res.redirect('/contacts')
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;

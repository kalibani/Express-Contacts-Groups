const express = require('express');
const router = express.Router();
const ModelProfiles = require('../models/profiles');
const ModelContacts = require('../models/contacts');


router.get('/', (req, res)=>{
  ModelProfiles.findAll()
  .then((rowsProfiles)=>{
    ModelContacts.findAll()
    .then((rowsContacts)=>{
      res.render('profiles', {dataError: null, dataProfile : rowsProfiles, dataContacts: rowsContacts})
    })
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/', (req, res)=>{
  ModelProfiles.createProfiles(req.body)
  .then(()=>{
      res.redirect('/profiles')
  })
  .catch((err)=>{
    ModelProfiles.findAll()
    .then((rowsProfiles)=>{
      ModelContacts.findAll()
      .then((rowsContacts)=>{
        res.render('profilesERR', {dataError: 'ID Contacts Sudah Terpakai!!!', dataProfile: rowsProfiles, dataContacts : rowsContacts})
      })
    })
  })
})

router.get('/edit/:id', (req, res)=>{
  ModelProfiles.findByid(req.params.id)
  .then((rowsProfiles)=>{
    ModelContacts.findAll(req.body)
    .then((rowsContacts)=>{
      res.render('profileEdit', {dataError:null, dataProfile : rowsProfiles, dataContacts: rowsContacts})
    })
    .catch((err)=>{
      res.send(err)
    })
  })
})

router.post('/edit/:id', (req, res)=>{
  ModelProfiles.UpdateProfiles(req.body, req.params.id)
  .then(()=>{
    res.redirect('/profiles')
  })
  .catch((err)=>{
    ModelProfiles.findAll()
    .then((rowsProfiles)=>{
      ModelContacts.findAll()
      .then((rowsContacts)=>{
        res.render('profilesERR', {dataError: 'ID Contacts Sudah Terpakai!!!', dataProfile: rowsProfiles, dataContacts : rowsContacts})
      })
    })
  })
})

router.get('/delete/:id', (req, res)=>{
  ModelProfiles.deleteProfiles(req.params.id)
  .then(()=>{
    res.redirect('/profiles')
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports = router;

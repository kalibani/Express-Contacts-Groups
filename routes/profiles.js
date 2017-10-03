const express = require('express');
const router = express.Router();
const ModelProfiles = require('../models/profiles');


router.get('/', (req, res)=>{
  ModelProfiles.findAll((err, rowsProfiles, rowsContacts)=>{
    if (!err) {
      res.render('profiles', {dataError:null, dataProfile : rowsProfiles, dataContacts: rowsContacts})
    }else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  ModelProfiles.createProfiles(req.body, (err)=>{
    if (!err) {
      res.redirect('/profiles')
    }else {
      ModelProfiles.findAll((err, rowsProfiles, rowsContacts)=>{
        res.render('profilesERR', {dataError: 'ID Contacts Sudah Terpakai!!!', dataProfile: rowsProfiles, dataContacts : rowsContacts})
      })
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  ModelProfiles.findByid(req.params.id, (err, rowsProfiles, rowsContacts)=>{
    if (!err) {
      res.render('profileEdit', {dataError:null, dataProfile : rowsProfiles, dataContacts: rowsContacts})
    }else {
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  ModelProfiles.UpdateProfiles(req.body, req.params.id, (err)=>{
    if (!err) {
      res.redirect('/profiles')
    }else {
      ModelProfiles.findAll((err, rowsProfiles, rowsContacts)=>{
        res.render('profilesERR', {dataError: 'ID Contacts Sudah Terpakai!!!', dataProfile: rowsProfiles, dataContacts : rowsContacts})
      })
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  ModelProfiles.deleteProfiles(req.params.id, ()=>{
    res.redirect('/profiles')
  })
})

module.exports = router;

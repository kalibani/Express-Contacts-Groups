const express = require('express');
const router = express.Router();
const ModelGroups = require('../models/groups');

router.get('/', (req, res)=>{
  ModelGroups.findAll()
  .then((rowsGroups)=>{
    res.render('groups', {dataGroups: rowsGroups})
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');
const modelContacts = require('../models/contacts');

class ModelProfiles {

  static findAll(callback){
    db.all(`SELECT * FROM  contacts C JOIN  profiles P ON C.id = P.idContacts`,(err, rowsProfiles)=>{
      modelContacts.findAll((rowsContacts)=>{
        if (!err) {
          callback(err, rowsProfiles, rowsContacts)
        }else {
          console.log(err);
        }
      })
    })
  }

  static createProfiles(body, callback){
    db.run(`INSERT INTO profiles (username, password, idContacts) VALUES ('${body.username}','${body.password}','${body.idContacts}')`,(err)=>{
      if (!err) {
        callback()
      }else {
        callback(err)
      }
    })
  }

  static findByid(params, callback){
    db.all(`SELECT * FROM contacts C JOIN profiles P ON C.id = P.idContacts WHERE P.id = ${params}`, (err, rowsProfiles)=>{
      modelContacts.findAll((rowsContacts)=>{
        if (!err) {
          callback(err, rowsProfiles, rowsContacts)
        }else {
          console.log(err);
        }
      })
    })
  }

  static UpdateProfiles(body, params, callback){
    db.run(`UPDATE profiles SET username = '${body.username}', password = '${body.password}', idContacts = '${body.idContacts}'
      WHERE id = ${params}`, (err) => {
        if (!err) {
          callback()
        }else {
          callback(err)
        }
    })
  }

  static deleteProfiles(params, callback){
    db.run(`DELETE FROM profiles WHERE id = ${params}`, () => {
      callback()
    })
  }

}

module.exports = ModelProfiles;

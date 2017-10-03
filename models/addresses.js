const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');
const ModelContacts = require('../models/contacts');

class ModelAddress {
  static findAll(callback){
    db.all(`SELECT * FROM  contacts C JOIN  addresses A ON C.id = A.idContacts`, (err, rowsAddress) => {
      ModelContacts.findAll((rowsContacts)=>{
        callback(err, rowsAddress, rowsContacts )
      })
    })
  }

  static CreateAddress(params, callback){
    db.run(`INSERT INTO addresses (street,city,zipcode, idContacts) VALUES
    ('${params.street}', '${params.city}', '${params.zipcode}',${params.idContacts})`, (err) => {
      if(!err) {
        callback()
      }
    })
  }

  static findByid(params, callback){
    db.all(`SELECT * FROM contacts C JOIN addresses A ON C.id = A.idContacts
      WHERE A.id = ${params}`, (err, rowsAddress) => {
        ModelContacts.findAll((rowsContacts)=>{
        if(!err){
          callback(err, rowsAddress, rowsContacts)
        }else {
          return err
        }
      })
    })
  }

  static UpdateAddress(body, params, callback){
    db.run(`UPDATE addresses SET street = '${body.street}', city = '${body.city}', zipcode = ${body.zipcode}, idContacts = '${body.idContacts}'
      WHERE id = ${params}`, () => {
        callback()
    })
  }

  static deleteAddress(params, callback){
    db.run(`DELETE FROM addresses WHERE id = ${params}`, () => {
      callback()
    })
  }

}

module.exports = ModelAddress;

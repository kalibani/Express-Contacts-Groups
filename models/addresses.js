const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');


class ModelAddress {
  static findAll(){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM  contacts C JOIN  addresses A ON C.id = A.idContacts`, (err, rowsAddress) => {
        if (!err) {
          resolve(rowsAddress)
        }else {
          reject(err)
        }
      })
    })
  }

  static CreateAddress(params){
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO addresses (street,city,zipcode, idContacts) VALUES
      ('${params.street}', '${params.city}', '${params.zipcode}',${params.idContacts})`, (err) => {
        if(!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

  static findByid(params){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM contacts C JOIN addresses A ON C.id = A.idContacts
        WHERE A.id = ${params}`, (err, rowsAddress) => {
        if(!err){
          resolve(rowsAddress)
        }else {
          reject(err)
        }
      })
    })
  }

  static UpdateAddress(body, params){
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE addresses SET street = '${body.street}', city = '${body.city}', zipcode = ${body.zipcode}, idContacts = '${body.idContacts}'
        WHERE id = ${params}`, (err) => {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

  static deleteAddress(params){
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM addresses WHERE id = ${params}`, (err) => {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

}

module.exports = ModelAddress;

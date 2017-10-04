const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class ModelContacts {
  static findAll(){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM contacts`, (err, rowsContacts) =>{
        if (!err) {
          resolve(rowsContacts)
        }else {
          reject(err)
        }
      });
    })
  }

  static createContacts(column){
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${column.name}','${column.company}','${column.telp_number}','${column.email}')`, (err)=>{
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

  static findByid(params){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM contacts WHERE id = ${params}`, (err, rowsContacts)=>{
        if (!err) {
          resolve(rowsContacts)
        }else {
          reject(err)
        }
      })
    })
  }

  static updateContacts(body, params){
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email='${body.email}' WHERE id = ${params}`, (err) => {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

  static deleteContacts(params){
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM contacts WHERE id = ${params}`,(err)=> {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

}
module.exports = ModelContacts;

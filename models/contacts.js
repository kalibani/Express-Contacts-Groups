const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class ModelContacts {
  static findAll(callback){
    db.all(`SELECT * FROM contacts`, (err, rowsContacts) =>{
      callback(rowsContacts)
    })
  }

  static createContacts(column, callback){
    db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${column.name}','${column.company}','${column.telp_number}','${column.email}')`, (err)=>{
      callback(err)
    })
  }

  static findByid(params, callback){
    db.all(`SELECT * FROM contacts WHERE id = ${params}`, (err, rowsContacts)=>{
      callback(err, rowsContacts)
    })
  }

  static updateContacts(body, params, callback){
    db.run(`UPDATE contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email='${body.email}' WHERE id = ${params}`, (err) => {
      callback(err)
    })
  }

  static deleteContacts(params, callback){
    db.run(`DELETE FROM contacts WHERE id = ${params}`,(err)=> {
      callback(err)
    })
  }

}
module.exports = ModelContacts;

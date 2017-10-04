const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class ModelProfiles {

  static findAll(){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM  contacts C JOIN  profiles P ON C.id = P.idContacts`,(err, rowsProfiles)=>{
        if (!err) {
          resolve(rowsProfiles)
        }else {
          reject(err)
        }
      })
    })
  }

  static createProfiles(body){
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO profiles (username, password, idContacts) VALUES ('${body.username}','${body.password}','${body.idContacts}')`,(err)=>{
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
      db.all(`SELECT * FROM contacts C JOIN profiles P ON C.id = P.idContacts WHERE P.id = ${params}`, (err, rowsProfiles)=>{
        if (!err) {
          resolve(rowsProfiles)
        }else {
          reject(err);
        }
      })
    })
  }

  static UpdateProfiles(body, params){
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE profiles SET username = '${body.username}', password = '${body.password}', idContacts = '${body.idContacts}'
        WHERE id = ${params}`, (err) => {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

  static deleteProfiles(params){
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM profiles WHERE id = ${params}`, (err) => {
        if (!err) {
          resolve()
        }else {
          reject(err)
        }
      })
    })
  }

}

module.exports = ModelProfiles;

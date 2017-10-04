const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

class ModelGroups {
  static findAll(){
    return new Promise(function(resolve, reject) {
      db.all(`SELECT * FROM groups`, (err, rowsGroups)=>{
        if (!err) {
          resolve(rowsGroups)
        }else {
          reject(err)
        }
      })
    })
  }


}

module.exports = ModelGroups;

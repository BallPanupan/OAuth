const mysql = require('mysql');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection( config ); 
  }

  query(sql, arge) {
    //note: here, for practical pureposes 'resolve' means 'fulfilled'
    return new Promise( (resolve, reject) => {

      this.connection.query(sql, args, (err, rows) => {
        if(err){
          return reject(err);
        }

        resolve(rows);
      });

    });
  }

  colse(){
    return new Promise((resolve, reject) => {
      this.connection.end(err=>{
        if(err){
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = Database;
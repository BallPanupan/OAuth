const Database = require("./class_mysql_db");

const config = {
  host     : process.env.DATABASE_HOST || 'localhost',
  port     : process.env.DATABASE_PORT || 3306,
  user     : process.env.DATABASE_USER || 'root',
  password : process.env.DATABASE_PASSWORD || '',
  database : process.env.DATABASE_NAME || 'oauth'
};

console.log('config : ', config)

// let mydb = new Database(config);
exports.Database = new Database(config);

// mydb.query(str_sql_2)
//   .then (rows => {
//     someRows = rows;
//     return mydb.query(str_sql_3)
//   })
//   .then(rows => {
//     otherRows = rows;
//     return mydb.colse();
//   }, err => {
//     return mydb.colse().then( () => { throw err; } )
//   })
//   .then( () => {
//     console.log("someRows: " + JSON.stringify(someRows, null, 2));
//     console.log(`otherRows: ${JSON.stringify(someRows, null, 2)}`);
//   }).catch( err => {
//     console.log(err.message);
//   })
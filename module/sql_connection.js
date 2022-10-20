const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  port     : process.env.DATABASE_PORT,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
});

function mainConnection (query) {
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
  })
}

exports.register = async function (info) {
  let query = `INSERT INTO user SET username = '${info.username}', password = '${info.password}', type_id = 1;`
  mainConnection(query);
  console.log('Register : ', info.username)
}
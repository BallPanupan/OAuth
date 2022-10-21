const mysql = require('mysql2');
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
    return results
  })
  
}

exports.register = async function (info) {
  let query = `INSERT INTO user SET 
  username = '${info.username}', 
  password = '${info.password}', 
  type_id = 1, accessToken = '${info.accessToken}', 
  refreshToken = '${info.refreshToken}';`
  
  mainConnection(query);
  // console.log('Register : ', info.username)
}

exports.CheckUser = async function (info) {
  let sqlQuery = `SELECT * FROM user WHERE username = '${info.username}' LIMIT 1;`

  async function main() {
    // create the pool
    const pool = connection
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query(sqlQuery);
    return rows
  }

  return main()
  
}


exports.InsertToken = async function (data) {
  let sqlQuery = `SELECT * FROM user WHERE username = '${data.username}' LIMIT 1;`
  connection.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;

    let sqlInsert = `INSERT INTO token SET 
    user_id = '${results[0].id}', 
    refreshToken = '${data.refreshToken}', 
    tokenStatus = '';`

    connection.query(sqlInsert, function (error, results, fields) {
      if (error) throw error;
    })

  })
}

exports.CheckRefToken = async function (data) {
  let sqlQuery = `SELECT * FROM token WHERE refreshToken = '${data.refreshToken}' LIMIT 1;`

  async function main() {
    // create the pool
    const pool = connection
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
    // query database using promises
    const [rows,fields] = await promisePool.query(sqlQuery);
    return rows
  }

  return main()

}
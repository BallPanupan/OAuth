const { Database } = require("../database")

exports.CheckUser = async function (info) {
  let query = `SELECT * FROM user WHERE username = '${info.username}' LIMIT 1;`
  let result = await Database.query(query);

  if(Object.keys(result).length > 0){
    return true
  } else {
    return false
  } 
}
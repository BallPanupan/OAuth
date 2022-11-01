const { Database } = require("../database")

exports.Register = async function (info) {
  let query = `INSERT INTO user SET 
  username = '${info.username}', 
  password = '${info.password}', 
  type_id = 1, accessToken = '${info.accessToken}', 
  refreshToken = '${info.refreshToken}';`
  
  try {
    await Database.query(query)
    return true
  } catch (error) {
    console.error(error);
  }

}

const { Database } = require("../database")

exports.Register = async function (info) {
  let query = `INSERT INTO user SET 
  username = '${info.username}', 
  password = '${info.password}', 
  type_id = 1, accessToken = '${info.accessToken}', 
  refreshToken = '${info.refreshToken}',
  first_name = '${info.first_name}',
  last_name = '${info.last_name}',
  email = '${info.email}',
  email_verified_at = '${info.email_verified_at}',
  status = '${info.status}',
  avatar = '${info.avatar}',
  role_id = '${info.role_id}',
  created_at = '${info.created_at}',
  updated_at = '${info.updated_at}';`

  console.log(query)
  
  try {
    await Database.query(query)
    return true
  } catch (error) {
    console.error(error);
  }

}

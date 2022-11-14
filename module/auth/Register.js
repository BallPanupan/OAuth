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

  try {
    let result = await Database.query(query)

    if(Object.keys(result).length > 0){
      return {
        'status' : true,
        'result' : result
      }
    }
    

  } catch (error) {
    console.error(error);
  }

}

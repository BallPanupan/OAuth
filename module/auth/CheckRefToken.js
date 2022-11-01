const { Database } = require("../database")

exports.CheckRefToken = async function (refreshToken) {
  let query = `SELECT * FROM token WHERE refreshToken = '${refreshToken.refreshToken}' LIMIT 1;`
  let result = await Database.query(query)

  if(Object.keys(result).length > 0){
    return {
      'status': true,
      'result':result[0]
    }
  }else{
    return {
      'status': false,
      'result': null
    }
  }

}

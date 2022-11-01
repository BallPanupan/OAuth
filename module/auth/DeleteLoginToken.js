const { Database } = require("../database")

exports.DeleteLoginToken = async function (data) {
  let query = `DELETE FROM token WHERE id = '${data.tokenId}'`;
  let result = await Database.query(query);

  if(Object.keys(result).length > 0){
    return {
      'status': true,
      'result' : result
    }
  }else {
    return {
      'status': false,
      'result' : null
    }
  }
}

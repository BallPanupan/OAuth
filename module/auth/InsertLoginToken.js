const { Database } = require("../database")

exports.InsertLoginToken = async function (info) {

  let query = `INSERT INTO token SET 
    user_id = '${info.id}', 
    refreshToken = '${info.refreshToken}', 
    tokenStatus = '';`

  await Database.query(query);

}

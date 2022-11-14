const { Database } = require("../database")

exports.AddPermisstion = async function (userId) {
  let query = `INSERT INTO permisstion SET 
  user_id = '${userId}', 
  application_name = '1', 
  app_read = '1',
  app_write = '1', 
  app_edit = '1'`

  for (let index = 1; index < 5; index++) {
    query = `INSERT INTO permisstion SET 
    user_id = '${userId}', 
    application_name = '${index}', 
    app_read = '1',
    app_write = '1', 
    app_edit = '1'`;

    await Database.query(query)
  }

  return true
}

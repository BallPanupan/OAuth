const Database = require("./class_mysql_db");

const config = {
  host     : process.env.DATABASE_HOST,
  port     : process.env.DATABASE_PORT,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME
};

console.log('config : ', config)
exports.Database = new Database(config);
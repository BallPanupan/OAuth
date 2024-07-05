const User = require("../../../models/User");

async function CheckUser(username) {
  try {
    const result = await User.findOne({username: username}).lean(); 
    if(!result || Object.keys(result).length <= 0) throw new Error('user.username is not exists.')
    return {
      data: result,
      status: true
    };
  } catch(err){
    console.error('CheckUser: ', err.message)
    return false
  }
}

module.exports = {
  CheckUser
}
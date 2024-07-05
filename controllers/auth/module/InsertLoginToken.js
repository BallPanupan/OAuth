const RefreshToken = require("../../../models/RefreshTokenSchema");

async function SaveRefreshToken(data) {
  try {
    if(!data.userId || !data.refreshToken) throw new Error(`Can't save a refreshToken`);
    const result = await RefreshToken.create({
      userId: data.userId,
      refreshToken: data.refreshToken,
      expired: false,
    })
    return true
  }catch(error){
    console.error(`\x1b[31m[SaveRefreshToken]`, error.message);
    return false;
  }
}

module.exports = {
  SaveRefreshToken
}
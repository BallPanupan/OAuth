const RefreshToken = require("../../../models/RefreshTokenSchema");

async function SaveRefreshToken(data) {
  try {
    if(!data.userId || !data.refreshToken) throw new Error(`Can't save a refreshToken`);
    const checkFirse = await RefreshToken.find({refreshToken: data.refreshToken}).lean();
    // if(checkFirse.length > 0) throw new Error('duplicate refreshToken');

    const duplicate = await RefreshToken.find({
      refreshToken: data.refreshToken
    })
    if(duplicate.length > 0){
      const update = await RefreshToken.updateOne({refreshToken: data.refreshToken},{
        $set: {
          expired: false
        }
      })
    }else{
      const result = await RefreshToken.create({
        userId: data.userId,
        refreshToken: data.refreshToken,
        expired: false,
      })
    }
    return true
  }catch(error){
    console.error(`\x1b[31m[SaveRefreshToken]`, error.message);
    return false;
  }
}

module.exports = {
  SaveRefreshToken
}
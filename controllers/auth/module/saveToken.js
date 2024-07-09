const RefreshToken = require("../../../models/RefreshTokenSchema");

async function refreshToken(data) {
  try {
    if(!data.userId || !data.refreshToken) throw new Error(`Can't save a refreshToken`);
    const checkFirse = await RefreshToken.find({refreshToken: data.refreshToken}).lean();
    if(checkFirse.length > 0) throw new Error('duplicate refreshToken');

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

async function accessToken(data) {
  try {
    if(!data.userId || !data.accessToken) throw new Error(`Can't save a accessToken`);
    const checkFirse = await RefreshToken.find({accessToken: data.accessToken}).lean();
    if(checkFirse.length > 0) throw new Error('duplicate accessToken');
    const duplicate = await RefreshToken.find({
      accessToken: data.accessToken
    })
    if(duplicate.length > 0){
      const update = await RefreshToken.updateOne({accessToken: data.accessToken},{
        $set: {
          expired: false
        }
      })
    }else{
      const result = await RefreshToken.create({
        userId: data.userId,
        accessToken: data.accessToken,
        expired: false,
      })
    }
    return true
  }catch(error){
		console.log('save accessToken', error);
    console.error(`\x1b[31m[SaveAccessToken]`, error.message);
    return false;
  }
}


module.exports = {
  refreshToken,
  accessToken,
}
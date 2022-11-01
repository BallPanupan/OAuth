const { generateAccessToken } = require("../module/generateAccessToken")
const jwt = require('jsonwebtoken')
const { Register } = require("../module/Register")
exports.main = (req, res) => {
  res.json({
    'status': true,
    'result': "Wellcome"
  })
}

exports.register = async (req, res) => {
  let prepareData = {
    username : req.body.username,
    password : req.body.password,
    accessToken : generateAccessToken({name: req.body.username}),
    refreshToken : jwt.sign({name: req.body.username}, process.env.REFRESH_TOKEN_SECRET)
  }
  if(await Register(prepareData)){
    res.json({accessToken:prepareData.accessToken, refreshToken: prepareData.refreshToken})
  } else {
    res.json({status:'error'})
  }
}

const { generateAccessToken } = require('./auth/module/generateAccessToken')
const jwt = require('jsonwebtoken')
// const { Register } = require("../module/auth/Register")
// const { CheckUser } = require("../module/auth/CheckUser")
// const { InsertLoginToken } = require("../module/auth/InsertLoginToken")
// const { CheckRefToken } = require("../module/auth/CheckRefToken")
// const { DeleteLoginToken } = require("../module/auth/DeleteLoginToken")
// const { AddPermisstion } = require('../module/auth/AddPermisstion')



// exports.register = async (req, res) => {
//   let prepareData = {
//     username : req.body.username,
//     password : req.body.password,
//     accessToken : generateAccessToken({name: req.body.username}),
//     refreshToken : jwt.sign({name: req.body.username}, process.env.REFRESH_TOKEN_SECRET),
//     first_name : req.body.first_name,
//     last_name : req.body.last_name,
//     email : "",
//     email_verified_at : "",
//     status : "",
//     avatar : "",
//     role_id : "",
//     created_at : "",
//     updated_at : "",
//   }

  // let registerResult = await Register(prepareData)
  // if(registerResult.status){
  //   if (await AddPermisstion(registerResult.result.insertId)){
  //     res.json({accessToken:prepareData.accessToken, refreshToken: prepareData.refreshToken})
  //   }
  // } else {
  //   res.json({status:'error'})
  // }
// }

// exports.posts = async (req, res) => {
//   let userResult = await CheckUser({username:req.user.username})
//   if(userResult.status){
//     res.json(userResult.data)
//   }else{
//     res.sendStatus(401)
//   }
// }

// exports.login = async (req, res) => {
//   const username = req.body.username
//   let userResult = await CheckUser({username:username})
//   if(userResult.status){
//     const userData = {
//       "id": userResult.data.id,
//       "username": userResult.data.username,
//       "type_id": userResult.data.type_id,
//     }

//     const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)

//     InsertLoginToken({ id:userResult.data.id, refreshToken:refreshToken })

//     res.json({
//       accessToken: generateAccessToken(userData),
//       refreshToken: refreshToken
//     })
//   }else{
//     res.sendStatus(401)
//   }
// }

// exports.newToken = async (req, res) => {
//   const refreshToken = req.body.token

//   if(refreshToken == null ) return res.sendStatus(401)

//   // check token on Database
//   let userToken = await CheckRefToken({refreshToken:refreshToken})

//   if(userToken.status){
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if(err) return res.sendStatus(403)
//       const userData = {
//         "id": user.id,
//         "username": user.username,
//         "type_id": user.type_id,
//       }
//       const accessToken = generateAccessToken(userData)
//       res.json({accessToken: accessToken})
//     })
//   }else {
//     res.sendStatus(401)
//   }
// }

// exports.logout = async (req, res) => {
//   // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   let userData = await CheckRefToken({refreshToken:req.body.token})
//   if(userData.status){
//     let result = await DeleteLoginToken({tokenId:userData.result.id})
//     if(result.status){
//       res.sendStatus(204)
//     }else{
//       res.sendStatus(401)
//     }
//   }else{
//     res.sendStatus(401)
//   }
// }
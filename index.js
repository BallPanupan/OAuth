require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const port = 3000
const jwt = require('jsonwebtoken')
const { CheckRefToken } = require('./module/CheckRefToken')
const { CheckUser } = require('./module/CheckUser')
const { DeleteLoginToken } = require('./module/DeleteLoginToken')
const { InsertLoginToken } = require('./module/InsertLoginToken')
const { Register } = require('./module/Register')

// express app
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require('./routes/authRoutes');


app.use('/auth', authRoutes);

// app.post('/register', async (req, res) => {
//   let prepareData = {
//     username : req.body.username,
//     password : req.body.password,
//     accessToken : generateAccessToken({name: req.body.username}),
//     refreshToken : jwt.sign({name: req.body.username}, process.env.REFRESH_TOKEN_SECRET)
//   }
//   if(await Register(prepareData)){
//     res.json({accessToken:prepareData.accessToken, refreshToken: prepareData.refreshToken})
//   } else {
//     res.json({status:'error'})
//   }

// })

//query and show detial of user
app.get('/posts', authenticateToken, async (req, res) => {
  let userResult = await CheckUser({username:req.user.username})
  if(userResult.status){
    res.json(userResult.data)
  }else{
    res.sendStatus(401)
  }
}) 

app.post('/login', async (req, res) => {
  const username = req.body.username

  let userResult = await CheckUser({username:username})

  if(userResult.status){
    const userData = {
      "id": userResult.data.id,
      "username": userResult.data.username,
      "type_id": userResult.data.type_id,
    }

    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)

    InsertLoginToken({ id:userResult.data.id, refreshToken:refreshToken })

    res.json({
      accessToken: generateAccessToken(userData),
      refreshToken: refreshToken
    })
  }else{
    res.sendStatus(401)
  }

})

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


app.post('/newToken', async (req, res) => {
  const refreshToken = req.body.token

  if(refreshToken == null ) return res.sendStatus(401)

  // check token on Database
  let userToken = await CheckRefToken({refreshToken:refreshToken})

  if(userToken.status){
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if(err) return res.sendStatus(403)
      const userData = {
        "id": user.id,
        "username": user.username,
        "type_id": user.type_id,
      }
      const accessToken = generateAccessToken(userData)
      res.json({accessToken: accessToken})
    })
  }else {
    res.sendStatus(401)
  }

})

app.delete('/logout', async (req, res) => {
  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  let userData = await CheckRefToken({refreshToken:req.body.token})
  if(userData.status){
    let result = await DeleteLoginToken({tokenId:userData.result.id})
    if(result.status){
      res.sendStatus(204)
    }else{
      res.sendStatus(401)
    }
  }else{
    res.sendStatus(401)
  }

})

// Middleware functions
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
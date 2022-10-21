require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const { register, CheckUser, InsertToken } = require('./module/sql_connection')
app.use(express.json())

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 1'
  },
  {
    username: 'testRegister28',
    title: 'Post 28'
  }
]

let refreshTokens = []

app.post('/register', (req, res) => {
  let prepareData = {
    username : req.body.username,
    password : req.body.password,
    accessToken : generateAccessToken({name: req.body.username}),
    refreshToken : jwt.sign({name: req.body.username}, process.env.REFRESH_TOKEN_SECRET)
  }
  register(prepareData)

  res.json({accessToken:prepareData.accessToken, refreshToken: prepareData.refreshToken})
})


//query and show detial of user
app.get('/posts', authenticateToken, (req, res) => {
  let userToken = CheckUser({username:req.user.name})
  userInfo = userToken.then(function(result) {
    if(result.length > 0 ){
      res.json(result)
    }else{
      res.sendStatus(401)
    }
  })
}) 

app.post('/login', (req, res) => {
  const username = req.body.username
  const user = { name: username }

  let userToken = CheckUser({username:username})

  userInfo = userToken.then(function(result) {
    if(result.length > 0 ){
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      //next : keep this on Database

      // refreshTokens.push(refreshToken)

      InsertToken({ username:username, refreshToken:refreshToken })

      res.json({
        accessToken: generateAccessToken(user),
        refreshToken: refreshToken
      })
    }else{
      res.sendStatus(401)
    }
  })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


app.post('/req_newToken', (req, res) => {

  const refreshToken = req.body.token
  if(refreshToken == null ) return res.sendStatus(401)

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  console.log(refreshTokens)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({name: user.name})
    res.json({accessToken: accessToken})
  })

})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
  console.log(refreshTokens)
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
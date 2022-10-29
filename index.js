require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const { Database } = require('./database')
const { register, CheckUser, InsertToken, CheckRefToken, DeleteToken } = require('./module/sql_connection')
app.use(express.json())


async function ftest(){
  let xsql = 'SELECT * FROM user'; 
  const testQuery = await Database.query(xsql);
  
  console.log(testQuery)
}
ftest()

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
  let userToken = CheckUser({username:req.user.username})
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
  // const user = { name: username }
  let userToken = CheckUser({username:username})

  userInfo = userToken.then(function(result) {
    if(result.length > 0 ){
      const userData = {
        "id": result[0].id,
        "username": result[0].username,
        "type_id": result[0].type_id,
      }
      const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET)
      InsertToken({ username:username, refreshToken:refreshToken })
      res.json({
        accessToken: generateAccessToken(userData),
        refreshToken: refreshToken
      })
    }else{
      res.sendStatus(401)
    }
  })
})

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


app.post('/newToken', (req, res) => {
  // console.log(refreshTokens)
  const refreshToken = req.body.token
  if(refreshToken == null ) return res.sendStatus(401)
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  // check token on Database
  let userToken = CheckRefToken({refreshToken:refreshToken})
  userInfo = userToken.then(function(result) {
    if(result.length > 0 ) {
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
    } else {
      res.sendStatus(401)
    }
  })

})

app.delete('/logout', (req, res) => {
  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  let userToken = CheckRefToken({refreshToken:req.body.token})
  userInfo = userToken.then(function(result) {
    if(result.length > 0 ) {
      DeleteToken(result[0])
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  })
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
const jsonwebtoken = require("jsonwebtoken")
const { CheckUser } = require("./module/CheckUser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateAccessToken } = require("./module/generateAccessToken");

async function _login(req, res) {
  const username = req.body.username;
	const password = req.body.password;

  let user = await CheckUser(username);
	const match = await bcrypt.compare(password, user.data.password);

	if(user.status && match){
    const userData = {
      "id": user.data.id,
      "username": user.data.username,
      "type_id": user.data.type_id,
    }

    const refreshToken = jsonwebtoken.sign(userData, process.env.REFRESH_TOKEN_SECRET)

    // InsertLoginToken({ id:user.data.id, refreshToken:refreshToken })

    res.status(200).json({
			status: true,
      accessToken: generateAccessToken(userData),
      refreshToken: refreshToken
    })
  }else{
    res.sendStatus(401)
  }
}

module.exports = {
	_login,
};

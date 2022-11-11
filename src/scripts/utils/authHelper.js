const JWT = require('jsonwebtoken')

const generateAccessToken = (user) => {
     return JWT.sign({ name: user.email, ...user }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1w' })
}

const generateRefreshToken = (user) => { 
    return JWT.sign({ name: user.email, ...user }, process.env.REFRESH_TOKEN_SECRET_KEY)
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}
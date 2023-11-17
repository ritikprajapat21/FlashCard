import jwt from 'jsonwebtoken'
import env from 'dotenv'
import User from '../Model/User.model.js'

env.config()

export const refreshTokenHandler = async (req, res) => {
    const cookie = req.cookie
    console.log(cookie)
    if (!cookie?.jwt) res.sendStatus(403)
    const token = cookie.jwt

    const foundUser = await User.findOne({ refreshToken: token }).exec()
    if (!foundUser) return res.sendStatus(403)

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN,
        (err, decode) => {
            if (err || foundUser.email !== decode.email) return res.sendStatus(403)

            const accessToken = jwt.sign(
                {
                    userID: decode.userID,
                    email: decode.email,
                },
                process.env.TOKEN,
                { expiresIn: '300s' }
            )

            res.json({ accessToken })
        }
    )
}
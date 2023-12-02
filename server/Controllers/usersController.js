import UserModel from '../Model/User.model.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

// To create user
export const registerUser = async (req, res) => {
    const { name, email, password, mobile, profile } = req.body;
    console.log(req.body)
    if (!email || !name || !password) return res.status(400).json({ 'message': 'Missing Data', name, email, password })

    const exists = await UserModel.findOne({ email }).exec()
    if (exists) return res.status(409).json({ 'message': 'Email already taken' })

    const hashPassword = await bcrypt.hash(password, 10)

    const result = await UserModel.create({
        name,
        email,
        password: hashPassword,
        mobile,
        profile,
    })

    if (!result) return res.status(500).json({ 'message': 'Server error' })

    res.status(201).json({ 'message': 'User created' })
}

// To authenticate user
export const authenticateUser = async (req, res) => {
    const { email, password: pwd } = req.body
    if (!email || !pwd)
        return res.status(400).json({ 'message': 'Missing Data' })

    const foundUser = await UserModel.findOne({ email }).exec()

    if (!foundUser) return res.send(404).json({ 'message': 'User not found' })

    const match = await bcrypt.compare(pwd, foundUser.password)

    if (!match) return res.status(400).json({ 'message': 'Password not match' })

    const { password, refreshToken, ...user } = foundUser.toJSON()

    const accessToken = jwt.sign(
        {
            userID: user._id,
            username: user.email
        },
        process.env.TOKEN,
        {
            expiresIn: '300s'
        }
    )

    const rToken = jwt.sign(
        {
            userID: user._id,
            email: user.email
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn: '1d'
        }
    )

    foundUser.refreshToken = rToken
    foundUser.save()

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

    res.json({ user, accessToken })
}

// To update user
export const updateUser = async (req, res) => {
    const { email } = req.params
    const { name, mobile, profile } = req.body

    if (!email) res.status(400).json({ 'message': 'Email Required' })

    const user = await UserModel.findOne({ email }).exec()

    if (!user)
        return res.status(404).json({ 'message': 'User not found' })

    const result = await UserModel.updateOne({ email }, {
        name,
        mobile,
        profile
    })

    if (!result) return res.status(500).json({ 'message': 'Server error' })

    res.sendStatus(200)
}

// To change password
export const changePassword = (req, res) => {

}

// To log user out
export const logout = async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.jwt) return res.sendStatus(204)
    const refreshToken = cookie.jwt
    console.log(refreshToken)

    // Find refreshToken in DB
    const foundUser = await UserModel.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(403)
    }

    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.send(204)
}
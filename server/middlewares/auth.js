import UserModel from "../Model/User.model.js"

export const auth = async (req, res, next) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ 'message': 'Email Required!' })

    const result = await UserModel.findOne({ email })

    if (!result) return res.status(404).json({ 'message': 'User not found' })

    next()
}
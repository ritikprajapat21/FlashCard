import toast from "react-hot-toast"
import axios from "../axios/axios"

export const useSignUp = ({ name, email, password }) => {
    try {
        const response = axios.post('/register',
            JSON.stringify(name, email, password),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        console.log(response?.data)

    } catch (err) {
        if (!err?.response) {
            toast.error('No server response')
        } else if (err.response?.status === 409) {
            toast.error('Email already taken')
        } else {
            toast.error('Registration failed')
        }
        console.error(err)
    }
}
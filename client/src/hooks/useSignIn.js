import axios from "../axios/axios"

const useSignIn = async () => {
    const response = await axios.post('/auth',
        JSON.stringify({ email, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    )
    
    console.log(response?.data)
}
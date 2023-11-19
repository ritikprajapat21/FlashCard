import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    /** For user login */
    const [isLogin, setIsLogin] = useState(false)

    return <AuthContext.Provider value={{ auth, setAuth, isLogin, setIsLogin }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext
import { useContext,createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}){
    const [currentUser, setCurrentuser] = useState(false)
    const [userRole, setUserRole] = useState("")
    const navigate = useNavigate() 

    console.log(currentUser)
    function handleLogin(email,password,role){
        //DATA FETCHING FUNCTION COMES HERE
        if(role === 'patient'){
            setUserRole('patient')
            setCurrentuser(true)
            navigate('/dashboard')
        }

        if(role === 'doctor'){
            setUserRole('doctor')
            setCurrentuser(true)
        }
    }
    
    const value = {
        currentUser: currentUser,
        userRole: userRole,
        handleLogin: handleLogin
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
import { useAuth } from "../../store/AuthProvider"
import { Navigate } from "react-router-dom"

const FindDoc = () => {
    const {userRole} = useAuth()
    
    if(userRole === 'doctor'){
       return (
            <Navigate to='/'/>
        )
    }
    
    return(
        <div>Find Doc</div>
    )
}

export default FindDoc
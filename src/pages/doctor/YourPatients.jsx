import { useAuth } from "../../store/AuthProvider"
import { Navigate } from "react-router-dom"

const YourPatients = () => {
    const {userRole} = useAuth()

    if(userRole === 'patient'){
        return <Navigate to='/'/>
    }
    return (
        <div>Your Patients</div>
    )
}

export default YourPatients
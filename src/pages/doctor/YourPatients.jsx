import { useAuth } from "../../store/AuthProvider"
import { Navigate } from "react-router-dom"

const YourPatients = () => {
    const {currentUser} = useAuth()

    if(currentUser.role === 'patient'){
        return <Navigate to='/'/>
    }
    return (
        <div>Your Patients</div>
    )
}

export default YourPatients
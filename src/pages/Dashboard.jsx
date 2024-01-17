import { useAuth } from "../store/AuthProvider"
export const Dashboard = () => {
    const {userRole} = useAuth()

    if(userRole === 'patient'){
        return (
            <div>PATIENT DASHBOARD</div>
        )
    }
    if(userRole === 'doctor'){
        return (
            <div>DOCTOR DASHBOARD</div>
        )
    }
}
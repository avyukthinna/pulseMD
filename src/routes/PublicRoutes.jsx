import { useAuth } from "../store/AuthProvider"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

export default function PublicRoutes(){
    const {currentUser} = useAuth()

    return(
        !currentUser ? <Outlet/> : <Navigate to='/'/>
    )
}
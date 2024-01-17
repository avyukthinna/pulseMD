import { Outlet,Link} from "react-router-dom";
import Slideshow from "./Slideshow";

const Register = () => {

    return (
        <div className="flex flex-wrap flex-row h-screen">
            <Slideshow/>
            <div className="w-4/12 flex flex-col items-center justify-center bg-blue-50 font-poppins">
                <div className="text-6xl mb-10 font-logo"><Link to='/'>Pulse<span className="text-primary-blue">MD</span></Link></div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Register;
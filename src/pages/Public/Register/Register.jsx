import { Outlet,Link} from "react-router-dom";
import Slideshow from "./Slideshow";

const Register = () => {

    return (
        <div className="flex flex-col-reverse md:flex-row md:h-screen fadein">
            <Slideshow/>
            <div className="py-10 md:w-6/12 lg:w-5/12 flex flex-col items-center justify-center bg-blue-50 font-poppins md:p-0">
                <div className="text-6xl mb-10 font-logo" data-aos="fade-down"><Link to='/'>Pulse<span className="text-primary-blue">MD</span></Link></div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Register;
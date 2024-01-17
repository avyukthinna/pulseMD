import { Link } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useAuth } from "../../../store/AuthProvider";

const Home = () => {
    const {userRole} = useAuth()
    console.log(userRole)
    
    return (
        <div>
            <div className="font-poppins bg-home-background bg-cover min-h-screen bg-no-repeat">
                <div className="relative top-52 left-20 w-fit">
                    <p className="font-medium">Healthcare for all</p>
                    <div className="font-bold text-5xl">Empowering
                        <div className="my-2">
                            <span className="text-primary-blue">Health</span> and <span className="text-primary-blue">Healing</span>
                        </div>
                    </div>

                    <p className="mt-5">Your Trusted Online Hub for Expert Medical Advice and Care</p>
                    {userRole !== 'doctor' && <button className='mt-2 p-3 bg-blue-700 text-primary-white' >
                        <Link to='/find-doctors'>Book Appointment <ArrowOutwardIcon fontSize="small"/></Link>
                    </button>}
                </div>
            </div>

            <div className="mt-14 font-poppins flex flex-col justify-center items-center">
                <div className="text-5xl font-bold">How It <span className="text-primary-blue">Works</span></div>
                <div className="text-center font-medium mt-4 w-1/2">Seamless healthcare at your fingertips: Connect with a certified medical professional from the comfort of your home.</div>

                <div className="flex mt-5 border-2 items-center">
                    <div className="flex flex-col items-center justify-center mx-10">
                        <p>Step 1</p>
                        <p className="font-bold">Find a Doctor</p>
                    </div>

                    <span>------&gt;</span>

                    <div className="flex flex-col items-center justify-center mx-10">
                        <p>Step 2</p>
                        <p className="font-bold">Request for Appointment</p>
                    </div>

                    <span>------&gt;</span>

                    <div className="flex flex-col items-center justify-center mx-10">
                        <p>Step 3</p>
                        <p className="font-bold">Schedule Appointment</p>
                    </div>
                    <span>------&gt;</span>
                    <div className="flex flex-col items-center justify-center mx-10">
                        <p>Step 4</p>
                        <p className="font-bold">Get your Solution</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
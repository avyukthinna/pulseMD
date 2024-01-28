import { Link } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useAuth } from "../../../store/AuthProvider";
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import we_provide from '../../../images/we-provide.jpg'
import why_md from '../../../images/pexels-antoni-shkraba-5214958.jpg'
import CategorySlider from "./categorySlider";

const Home = () => {
    const {currentUser} = useAuth()
   
    return (
        <div className="font-poppins">
            <div className="bg-home-background bg-cover min-h-screen bg-no-repeat">
                <div className="relative top-52 w-fit ml-2 text-center md:ml-0 md:text-left md:left-20">
                    <p className="font-medium">Healthcare for all</p>
                    <div className="font-bold text-5xl">Empowering
                        <div className="my-2">
                            <span className="text-primary-blue">Health</span> and <span className="text-primary-blue">Healing</span>
                        </div>
                    </div>

                    <p className="mt-5">Your Trusted Online Hub for Expert Medical Advice and Care</p>
                    {currentUser.role !== 'doctor' && <button className='mt-2 p-3 bg-blue-600 text-primary-white hover:bg-blue-700' data-aos='fade-up'>
                        <Link to='/find-doctors'>Book Appointment <ArrowOutwardIcon fontSize="small"/></Link>
                    </button>}
                </div>
            </div>

            <div className="mt-12 flex flex-col justify-center items-center">
                <div className="text-5xl font-bold">How It <span className="text-primary-blue">Works</span></div>
                <div className="text-center font-medium mt-4 sm:w-full md:w-1/2">Seamless healthcare at your fingertips: Connect with a certified medical professional from the comfort of your home.</div>

                <div className="flex mt-10 items-center justify-center flex-wrap flex-col lg:flex-nowrap lg:flex-row">
                    <div className=" flex flex-col items-center justify-center mb-8 lg:mx-4 lg:mb-0" data-aos='fade-right'>
                        <div className="border-2 border-dashed border-blue-700 p-5 rounded-full mb-3 text-primary-blue">
                            <PeopleAltIcon fontSize="large" />
                        </div>
                        <p className="text-primary-blue">Step 1</p>
                        <p className="font-semibold">Find a Doctor</p>
                    </div>

                    <span className="text-primary-blue font-semibold sm:hidden lg:inline">------&gt;</span>

                    <div className="flex flex-col items-center justify-center mb-8 lg:mx-4 lg:mb-0" data-aos='fade-right' data-aos-delay='200'>
                        <div className="border-2 border-dashed border-yellow-500 p-5 rounded-full mb-3 text-primary-yellow"> 
                            <PersonIcon fontSize="large"/>
                        </div>
                        <p className="text-primary-yellow">Step 2</p>
                        <p className="font-semibold">Request for Appointment</p>
                    </div>

                    <span className="text-primary-yellow sm:hidden  md:hidden lg:inline">------&gt;</span>

                    <div className="flex flex-col items-center justify-center mb-8 lg:mx-4 lg:mb-0" data-aos='fade-right' data-aos-delay='400'>
                        <div className="border-2 border-dashed border-purple-700 p-5 rounded-full mb-3 text-primary-purple">
                            <EventIcon fontSize="large"/>
                        </div>

                        <p className="text-primary-purple">Step 3</p>
                        <p className="font-semibold">Schedule Appointment</p>
                    </div>

                    <span className="text-primary-purple sm:hidden md:hidden lg:inline">------&gt;</span>

                    <div className="flex flex-col items-center justify-center mb-8 lg:mx-4 lg:my-0" data-aos='fade-right' data-aos-delay='600'>
                        <div className="border-2 border-dashed border-green-600 p-5 rounded-full mb-3 text-primary-green">
                            <CheckBoxIcon fontSize="large"/>
                        </div>
                        <p className="text-primary-green">Step 4</p>
                        <p className="font-semibold">Get your Solution</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col sm:my-10 md:flex-row md:mx-10 lg:my-20">
                <div className="flex flex-col justify-center items-center mx-5 md:items-start md:w-3/4 lg:w-2/4">
                    <div className="text-5xl font-bold text-center md:text-left" data-aos='fade-down'>We provide the <span className="text-primary-blue">best doctors</span></div>
                    <hr className="w-24 mt-3 border-2 border-blue-600" />
                    <div className="my-8 text-justify">At PulseMD, we take pride in providing you with the best doctors for your healthcare needs. Our carefully curated network consists of highly qualified and experienced medical professionals dedicated to delivering top-notch care. Each doctor within our platform is committed to excellence, ensuring that you receive personalized and expert guidance for your health concerns.</div>   
                    <Link className="p-3 bg-blue-600 text-primary-white hover:bg-blue-700" to='/about-us'>Read More</Link>
                </div>  

                <div className="ml-0 mt-5 sm:w-3/5 md:w-6/12 md:ml-5 lg:w-3/12" data-aos='fade-up' data-aos-delay='600'>
                    <img className="rounded-2xl w-full" src={we_provide} alt="" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-16 lg:mt-0 bg-blue-200 py-10">
                <div className="text-5xl font-bold text-center" data-aos='fade-right'><span>Specialist </span> <span className="text-primary-blue">Categories</span></div>
                <div className="text-center font-medium mt-4 mx-5 sm:w-full md:w-1/2">Seamless healthcare at your fingertips: Connect with a certified medical professional from the comfort of your home.</div>
                <CategorySlider/>
            </div>

            <div className="flex justify-center items-center flex-col-reverse sm:my-10 sm:mx-1 md:flex-row md:mx-10 lg:my-20">
                <div className="ml-0 mt-5 sm:w-3/5 md:w-6/12 md:ml-5 lg:w-3/12" data-aos='fade-down' data-aos-delay='600'>
                    <img className="rounded-2xl w-full" src={why_md} alt="" />
                </div>

                <div className="flex flex-col justify-center items-center mx-8 md:items-start md:w-3/4 lg:w-2/4">
                    <div className="text-5xl font-bold text-center md:text-left" data-aos='fade-up'>Why <span className="text-primary-blue">PulseMD?</span></div>
                    <hr className="w-24 mt-3 border-2 border-blue-600" />
                    <div className="mt-8 mb-5 text-justify">Our platform connects you with highly qualified doctors for virtual consultations at your convenience, prioritizing your privacy with advanced security measures. Accessible to all, PulseMD brings quality medical consultations, eliminating geographical barriers.</div>   
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        <div><CheckCircleIcon className="text-primary-blue"/> Always Online Service</div>
                        <div><CheckCircleIcon className="text-primary-blue"/> Easy Make Appointment</div>
                        <div><CheckCircleIcon className="text-primary-blue"/> Instant Prescription</div>
                        <div><CheckCircleIcon className="text-primary-blue"/> Always Doctor</div>
                    </div>
                    <Link className="mt-5 p-3 bg-blue-600 text-primary-white hover:bg-blue-700" to='/about-us'>Read More</Link>
                </div>  
            </div>
        </div>
    )
}

export default Home;
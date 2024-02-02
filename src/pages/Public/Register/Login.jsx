import { useState } from "react"
import PatientLogin from "../../patients/PatientLogin"
import DocLogin from "../../doctor/DocLogin"
import { Link } from "react-router-dom"

const Login = () => {
    const [tab, setTab] = useState("patient")

    return ( 
        <div className="p-5 w-5/6 rounded-xl backdrop-blur-lg bg-white/30 shadow-lg ring-black-5 md:w-4/5 lg:w-4/6 md:py-8 flex flex-col justify-center items-center">
            <div className="text-4xl mb-4 font-bold">Log In</div>
            <div className="flex">
                <button onClick={() => setTab('patient')} className={`${tab === 'patient' && "active-tab"} tab rounded-md px-3 py-2`}>Patient</button>
                <button onClick={() => setTab('doctor')} className={`${tab === 'doctor' && "active-tab"} tab rounded-md px-3 mx-3`}>Doctor</button>
            </div>

            {tab === 'patient' && <PatientLogin/>}
            {tab === 'doctor' && <DocLogin/>}

            <div><span>Don't have an account? </span><Link className="underline text-primary-blue" to='/Register/signup'>Sign up</Link></div>
        </div>

    )
}

/*<Link className="mr-4 py-1 px-3 border-blue-700 bg-blue-700 text-primary-white rounded-full">Patient</Link>
                <Link className="py-1 px-3 rounded-full bg-gradient-to-r from-blue-700 from-50% to-white/30 to-50% bg-right bg-200% hover:bg-left transition-all duration-300 hover:text-primary-white" to='/Register/doclogin'>
                    Doctor
                </Link>*/

export default Login;
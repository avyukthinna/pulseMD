import { useState } from "react"
import PatientSignUp from "../../patients/PatientSignup"
import DocSignup from "../../doctor/DocSignup"
import { Link } from "react-router-dom"

const Signup = () => {
    const [tab, setTab] = useState("patient")

    return (
        <div className="rounded-xl backdrop-blur-lg bg-white/30 shadow-lg ring-black-5 w-4/5 py-8 flex flex-col justify-center items-center">
            <div className="text-4xl mb-4 font-bold">Sign Up</div>
            <div className="flex">
                <button onClick={() => setTab('patient')} className={`${tab === 'patient' && "active-tab"} tab rounded-md px-3 py-2`}>Patient</button>
                <button onClick={() => setTab('doctor')} className={`${tab === 'doctor' && "active-tab"} tab rounded-md px-3 py-0 mx-3`}>Doctor</button>
            </div>

            {tab === 'patient' && <PatientSignUp/>}
            {tab === 'doctor' && <DocSignup/>}

            <div><span>Already have an account? </span><Link className="underline text-primary-blue" to='/Register'>Log In</Link></div>
        </div>

    )
}

/*<Link className="mr-4 py-1 px-3 border-blue-700 bg-blue-700 text-primary-white rounded-full">Patient</Link>
                <Link className="py-1 px-3 rounded-full bg-gradient-to-r from-blue-700 from-50% to-white/30 to-50% bg-right bg-200% hover:bg-left transition-all duration-300 hover:text-primary-white" to='/Register/doclogin'>
                    Doctor
                </Link>*/

export default Signup;
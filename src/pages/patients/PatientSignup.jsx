import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PatientSignup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")

    const handleSignup = (e) => {
        e.preventDefault()
        if(password !== cpassword){
            setPasswordError("Passwords don't match!")
        } else{
            navigate('/')
        }
    }

    return (
        <div className="py-5 rounded-xl backdrop-blur-lg bg-white/30 shadow-lg ring-black-5 w-4/5 flex flex-col justify-center items-center">
            <div className="text-4xl mb-4 font-bold">Sign Up!</div>
            <div className="flex">
                <Link className="mr-4 py-1 px-3 border-blue-700 bg-blue-700 text-primary-white rounded-full">Patient</Link>
                <Link className="py-1 px-3 rounded-full bg-gradient-to-r from-blue-700 from-50% to-white/30 to-50% bg-right bg-200% hover:bg-left transition-all duration-300 hover:text-primary-white" to='/Register/docsignup'>
                    Doctor
                </Link>
            </div>

            <div className="mt-8 mb-4 w-4/5 flex-col">
                <form onSubmit={handleSignup}>
                    <div>
                        <label className="text-primary-blue font-semibold" htmlFor="email">Email Address</label><br />
                        <input 
                        className="outline w-full mt-2 mb-7 h-8 p-2 rounded-md" 
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-primary-blue font-semibold" htmlFor="password">Password</label><br />
                        <input 
                        className="outline mt-2 w-full mb-7 h-8 p-2 rounded-md" 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-primary-blue font-semibold" htmlFor="password">Confirm Password</label><br />
                        <input 
                        className="outline w-full mt-2 h-8 p-2 mb-2 rounded-md" 
                        type="password"
                        required
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}/>
                        {passwordError && <p className="text-error text-sm">{passwordError}</p>}
                    </div>
                    <div className="text-center mt-4">
                        <input type="submit" value='Sign up' className="border-2 text-primary-white bg-blue border-blue-700 bg-blue-700 w-full text-lg rounded-md hover:bg-blue-600 hover:border-blue-600 cursor-pointer"/>
                    </div>
                </form>
            </div>

            <div><span>Already have an account? </span><Link className="underline text-primary-blue" to='/Register'>Log In</Link></div>
        </div>
    )
}

export default PatientSignup;